---
layout: post-with-comments
---

# hello world

I used to imagine that when I started a blog, I would resist the urge to make the first post about starting a blog.
Alas, I fell into the same trap.

In my defense, the issue is that setting up a blog is a complicated mess, even in 2024.
In order to see if it's working at all, I need to make sure that I can actually make posts and view them.

So in this post, I'll try to write down what I did to make this.

## Setup steps

1. I already had a website, running at [https://davidw.tech](/), and hosted on github pages.
   How that happened will have to be a different post, it's been around for a long time.
1. I followed some random [Github repo](https://github.com/chadbaldwin/simple-blog-bootstrap) I found that was relatively recent (3 years old) and also based on Github pages.
   Copying the actual files and settings from this turned out to be a total mistake.
   I realized this when I found and followed [Github's own guide](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll) on how to do this, which I originally got to by trying to figure out how to test this locally.
1. Now I have a functioning blog, but it also replaced every other part of my old website, since Jekyll didn't seem happy to build in a subdirectory on Github Pages (where this is hosted).
1. I'll figure out how to customize more parts of this later, but for now I have it working!
1. I want comments natively on the post, since I don't expect to find my posts anywhere else on the web.
   To do this, I enabled comments via [utterances](https://utteranc.es/) which creates Github issues for each post, and displays the comments on those issues inline with the posts.
   Clever!

This process took at least 3 days of off-and-on tinkering. Now that I have it working, I have a lot of work to do to replace all of the links and past project pages that I used to have.

## Tips

- Follow Github's guide for setting up a repo and using Jekyll in it.
  I found that I needed to have a single `_config.yml` file that everything in the repo used, otherwise there were build failures in the Github action that tried to build the pages.
- I highly recommend figuring out how to [get this all working locally](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) too, to avoid having to push a bunch of broken configurations and waiting ~45 seconds for Github to slowly build them.
- Copy things from the up-to-date sources.
  For me this meant the Github guides, but also for customizing the CSS on the about page, I made sure I was referencing and forking the layouts from the theme's repo.
  [Github's guide on customizing the themes](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll) is helpful to know where to find these theme repos.

## Future TODOs

- I want a system of tagging, so that I can cleanly separate posts about work topics vs. personal ones
- I don't know how this theme's navigation support is going to work yet - but I'll find out as I post more!
