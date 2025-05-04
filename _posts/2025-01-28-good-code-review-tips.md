---
layout: post-with-comments
---

# Good code review tips

This is the third post in a series about code reviews. See the [previous post](/2024/10/26/who-fixes-the-bug) to read about some ideas for who is responsible for what throughout the code review process. This post is a collection of practices that I've found and followed over the years as I've performed literally thousands of code reviews for my teammates.

### Find something to say

I always try to find something to say on a code review. 
This signals to the author that I care enough about their work to read and think about it carefully.
At the same time, setting the goal of saying _something_ does a great job of keeping me engaged with the review. 
What you say doesn't have to be something you want them to change, it can just be a compliment, or other positive feedback about the work they did.
 
### Only block code if it's dangerous

I recommend that almost all requested changes are deferred to subsequent Pull Requests, and will often "Accept" or unblock PRs before all the changes I want have been made.
Merging code often helps the team stay motivated and moving forward.
Keep in mind that every round of code review adds substantial delay to the process of building and iterating on products and systems - and we want to move fast!

For this to work well, you have to have a good system for making sure that the changes are ultimately performed. 
This can look like a process for follow-ups, with TODO comments pointing to ticket numbers, or it often happens organically on teams with high levels of trust (where individuals manage their follow-ups themselves).

There are a few exceptions to this rule:
1. Block code that is unsafe. If you know that the code is going to cause an incident if it's deployed, don't let it proceed. Require the author to put it safely behind some gating mechanism if they want to merge it incrementally.
1. When someone is ramping up, it serves them better to get the feedback and pointers to resources like style guides quickly, rather than burden themselves with a long list of TODOs.

### Remove debates around style

Use tools like prettier, gofmt, etc. to automate the process of code formatting.
Computers are really good at formatting code, and having consistently formatted code makes so many things better (e.g. code diffing).

If I do comment on someone's code style, I force myself to include a link to a published and shared style guide. 
Everyone forgets the style sometimes, and it's easy for debates to spiral out of control if they aren't based in agreed-upon standards.

### Make sure the next steps for every comment are clear

If you add a comment, make sure the author knows exactly what the next steps they need to takefor it are.
The author shouldn't need to read your mind to know what to do next.

Small "nits" should by convention not require further conversation, and the author can decide to ignore them.
If you want to discuss something more before they make changes, put it in the comment. Otherwise, they might dive in and waste their precious cycles doing something other than what you had in mind.

