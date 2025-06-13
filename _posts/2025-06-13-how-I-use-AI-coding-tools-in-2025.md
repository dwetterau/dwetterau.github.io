---
layout: post-with-comments
---

# How I use AI coding tools in 2025

You have probably heard of AI coding tools like Cursor, Claude Code, Codex or their open-source counterparts (e.g. Cline, Zed).
You may have even been encouraged to try to use these tools at work and have licenses procured and ready for you to take advantage of.

If you’re like many of my AI-skeptic colleagues that I respect greatly, you might not have started using these tools, despite the drumbeat and constant pressure to do so.

I am not an expert on using AI coding tools or IDEs, but I do believe that the encouragement to use them is warranted. 
Even with my own limited know-how, these tools make me significantly better at my job, but it’s taken me a while to see exactly how.
This post will focus entirely on my own experience with only some of these tools, although I hope to try more of them in the future.

## It isn’t about autocomplete

The first AI coding tool I used with any regularity was Github’s Copilot, which I got access to at work before they offered their free tier. 
For my entire professional career, I had use IntellJ IDEs (after some early jobs that were primarily Java), and resisted changing to VSCode because it lacked many features I was used to.
When I finally tried Copilot, I found that the autocomplete capabilities were so much better than the “old” ML-based autocomplete in IntelliJ that it was worth switching to VSCode just to use it.

I share this anecdote just to explain that I too am hesitant to try out and switch to new IDEs, but not as hesitant to do so as some of my colleagues. I was already using an IDE and had done so for many years. 
I found the improved autocomplete to be helpful, but I know many great engineers that do phenomenal work in tools like Emacs or Vim, with limited autocomplete. 

I started using Cursor for very similar reasons when it became available to me. 
Not only was the autocomplete even better than Github Copilot, the suggestions of where to move the cursor in the IDE were extremely helpful to me. 
In hindsight, I suspect that advanced editor users wouldn’t benefit nearly as much as I did from this, due to all the navigation-related keybindings that I never finished learning. It is helpful for Cursor to predict where to go, but any editor can also see where the errors are, and I imagine there are similarly fast ways to jump to them to start editing.

At the time when I switched to Cursor, I thought this was my ah-ha moment with AI coding tools, but now I don’t think that was correct. 
The improvements were nice, and made me probably 10-20% faster at the typing part of my job, but you can get similar gains in other ways, without any AI at all. Many of my colleagues do just that.

## An untiring intern

I eventually did discover what I don’t think I or my colleagues have been able to replicate before without AI tools: the ability to completely hand off well-scoped tasks to an agent, and quickly get back new small blocks of code[^1].

My most successful agentic (vibe?) coding workflow is to pretend that the agent is an extremely junior engineer teammate. 
I give the agent a task, with the level of detail that would be in a JIRA ticket, and see if it can rise to the occasion while I go do something else. 

### The happy path

For me, the success case of this workflow looks like some small code blocks (ideally <100 lines), that might have a few obvious bugs. 
When the agent succeeds, I save a tremendous amount of time (far more than 10-20%!) letting the machine type out the code.
 
I have the benefit of programming in a language and tech stack with copious example data that these models have trained on. Cursor and tools like it have also done a great job at ingesting the codebase to find the “right” patterns (and “.cursorrules” files written by my coworkers are doing some heavy lifting too). 

Some tasks that I have had the most reliable success with are:
- Implementing unit tests for a new function, or for new cases in a function that was changed.
- Implementing similar functions to existing ones (such as one that I just wrote myself, but need different versions of).
- Refactoring out common code into helper functions or separate files.

These tasks seem basic, but they all fit the same criteria: they are exactly what I would expect a junior engineer to be able to do independently, with minimal instruction. 
Having an extra junior teammate around, that can type really fast, certainly improves my leverage. 

### The failure cases

When the agent doesn’t rise the occasion, which is common, I do one of the following:
1. Make it start over completely, and give it a few more details in my instructions.
2. Start doing the task myself, using all of the autocomplete goodness, and once I have a smaller-scoped task, I might try again.

Importantly, I don’t often end up in a loop of iteration with agentic tools.
I also don't (currently) try to write out long plans for them to follow.
In my experience they either can do the work or they won’t be able to figure it out. 
It can be extremely frustrating to end up in a hallucination loop with them, so I highly recommend doing one of the above and limiting how much back-and-forth you subject yourself to.

## It’s code reviews all the way down

These agentic tools turn you from being a code writer to a code reviewer for a higher percentage of your time. 
This is nothing new for senior engineers, who already spend significant amounts of time reviewing code, are good at it, and understand that [it’s a sign that they are spending their time efficiently](/2024/09/22/review-more-code.html).

When I use  Cursor in this mode, I make sure to review the majority of what it outputs before “Accepting” the staged changes. 
If something is mostly correct, I accept it in its entirety, and then make the remaining tweaks myself.
As part of my normal workflow, I end up reviewing the changes again later before I commit them with `git` or send them out for review. 

These tools *can* completely turn code writing time into an extra code review pass, which for all of us engineers should be significantly faster.
I personally prefer to keep the outputs of any interaction relatively small, so that I can review each piece easily and thoroughly. 

## My other attempts and struggles

Below are some of my thoughts on other AI tool usages that I have not been as successful with. 
Most of my struggles with these are due to a lack of effort on my end, but I also genuinely think that for some of them, the technology is just not quite there yet. 
Given the progress so far, it will be soon enough.

### Question answering

I often try to ask questions to Cursor about the codebase I’m working in (rather than searching my favorite repository of codebase knowledge, Slack). 
The trouble I run into is that I have to double check the answer. 
Cursor can often find the right pieces of the puzzle, but can’t put them together and explain the why behind a design (unless it’s spelled out already in code comments).  

### Larger changes with plans

I have not succeeded in getting Cursor to make larger changes in a workflow that I’m happy with. 
I think this is user error on my part, and an area I want to continue exploring. 

In my attempts, there seems to be a crossover point where I feel like I’ve spent so long explaining how to do something that in the same amount of time I could have done it myself.
When this happens with a human it’s not a problem since the investment will result in that human’s growth - but for agentic tools, this feels like wasted effort to me.

### Concurrent agents and changes

The idea of having more than just one “AI teammate” around to help me write code is appealing to me because this is already something I grew into being able to leverage as a senior engineer. 
Delegating several tasks to be worked on in parallel, like I would to an engineering team, does seem like where this technology could eventually shine. 

Until I can get these tools to pull off larger changes, they are actually too fast for me to keep busy. 
If I try multiple things in parallel right now, the first one will be done before I even start the next, so there wasn’t a point (and I just end up thrashing myself unnecessarily).


<br/><br/>

*Footnotes*

[^1]:Maybe if you set up macros to help bootstrap new unit test files, request handlers, etc. you could accomplish a basic version of this capability. But I don’t personally know people that do this, and I imagine these setups would be significantly higher maintenance and less flexible. I’m confident many on HackerNews would disagree. 