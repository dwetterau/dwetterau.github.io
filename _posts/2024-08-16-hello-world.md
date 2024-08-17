hello world
=====

I used to imagine that when I ever started a blog, I would resist the urge to make the first post about starting a blog.
Alas, I fell into the same trap.

In my defence, the issue is that setting up a blog is a mess, even in 2024. 
In order to see if it's working at all, I need to make sure that I can actually make posts and view them.

So in this post, I'll try to write down what I did to make this.

## Steps
1. I already had a website, running at [https://davidw.tech](/), and hosted on github pages. 
How that happened will have to be a different post.
2. I followed some random [Github repo](https://github.com/chadbaldwin/simple-blog-bootstrap) I found that was relatively recent (3 years old) and also based on Github pages.
3. I blindly copied the `_config.yml` file from that repo, and made the kind of structure I wanted for the blog.
4. I realized I needed some of the other directories if I wanted to actually have layouts for the posts. 
For now, I'm not trying to depend on any other libraries or anything.
5. Most things worked after this, but I wasn't getting any custom styles or things like the sitemap plugin to load. I'll have to try something else.
6. I decided to follow [Github's own  guide](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll) on how to do this, which I originally got to by trying to figure out how to test this locally. 
7. From here, I had to merge in the posts and other changes I was trying to use from the other guide.
8. It turned out I didn't really want any of those other changes anyway.
9. I'll figure out how to customize more parts of this later, but for now I have it working!
 
## Debugging
- The first time I pushed, my config and post/ files were all in /blog in the repo, this 404'd when I tried to visit it. The example I followed didn't have one, so there must be some other magic going on. Oh, it turns out I just needed to be patient - it totally worked!
- Next I saw that the index.md page wasn't showing any posts to navigate to. I wasn't using the right filename format (date and name, hyphen-separated), so now it might work. 
- Well, the styling of things is definitely not how I want it, but I figured out how to access the posts - and they're working! Why is the site-map not working though?
- Starting from Jekyll's output, more things around the page navigation are working locally - and so is the list of page.
I'll try to use the same title plugin though, this was needed to get jekyll to not show the title multiple times on the index page.
