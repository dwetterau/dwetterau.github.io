# frozen_string_literal: true

require "addressable/uri"
require "nokogiri"
require "pathname"
require "yaml"

# Check the actual deployable files, including links copied into post excerpts.
# External websites are deliberately not fetched: their outages should not block a build.
root = Pathname.new(ARGV.fetch(0, "_site")).expand_path
config = YAML.safe_load_file(File.expand_path("../_config.yml", __dir__))
origin = Addressable::URI.parse(config.fetch("url"))
errors = []
pages = root.glob("**/*.html").to_h do |path|
  [path, Nokogiri::HTML5(path.read)]
end
abort "No generated HTML found in #{root}" if pages.empty?

pages.each do |path, document|
  name = path.relative_path_from(root).to_s
  # index.html is served at its directory URL, including for relative links.
  page_url = "#{origin}/#{name.delete_suffix('index.html')}"
  document.css("[href], [src]").each do |element|
    %w[href src].each do |attribute|
      value = element[attribute]
      next if value.nil? || value.empty?

      begin
        url = Addressable::URI.join(page_url, value).normalize
        next unless %w[http https].include?(url.scheme)
        if attribute == "src" && url.scheme == "http"
          errors << "#{name}: insecure embedded resource #{value}"
        end
        next unless [origin.host, "dwetterau.github.io"].include?(url.host)

        target = root.join(Addressable::URI.unencode(url.path).delete_prefix("/")).cleanpath
        unless target.to_s.start_with?("#{root}/") || target == root
          errors << "#{name}: link escapes the site: #{value}"
          next
        end
        target = target.join("index.html") if target.directory?
        unless target.file?
          errors << "#{name}: missing local target #{value}"
          next
        end

        fragment = url.fragment
        next if fragment.nil? || fragment.empty? || fragment.start_with?(":~:text=")
        next unless pages.key?(target)

        anchor = Addressable::URI.unencode(fragment)
        found = pages[target].css("[id], a[name]").any? do |node|
          node["id"] == anchor || node["name"] == anchor
        end
        errors << "#{name}: missing anchor #{value}" unless found
      rescue Addressable::URI::InvalidURIError => e
        errors << "#{name}: invalid URL #{value.inspect}: #{e.message}"
      end
    end
  end

  errors << "#{name}: missing page title" if document.at_css("title")&.text.to_s.strip.empty?
  errors << "#{name}: missing site header" unless document.at_css("header.site-header")
  errors << "#{name}: missing site footer" unless document.at_css("footer.site-footer")
end

%w[feed.xml sitemap.xml].each do |name|
  begin
    xml = Nokogiri::XML(root.join(name).read) { |options| options.strict.nonet }
    errors << "#{name}: empty XML document" unless xml.root
  rescue Errno::ENOENT, Nokogiri::XML::SyntaxError => e
    errors << "#{name}: #{e.message}"
  end
end

%w[404.html assets/css/style.css CNAME].each do |name|
  errors << "Missing required output: #{name}" unless root.join(name).file?
end
%w[old_website script test.sh README.md Gemfile Gemfile.lock vendor .git .github].each do |name|
  errors << "Development/archive content was published: #{name}" if root.join(name).exist?
end

unless errors.empty?
  warn errors.uniq.join("\n")
  abort "Site checks failed (#{errors.uniq.length} errors)."
end
puts "Checked #{pages.length} HTML pages: internal links, assets, layouts, XML, and publication exclusions passed."
