---
layout: post-with-comments
---

# Coding agents are no longer interns

Last year, [I wrote about](/2025/06/13/how-I-use-AI-coding-tools-in-2025.html) how LLM coding models at the time were capable of autonomously working at small, simple tasks, like those that you would scope out and assign to an intern.
Since I wrote that about 9 months ago, both the models and my usage of them have evolved dramatically.

## A step function change

Up until December 2025, models slowly got smarter, and I started using them [much more](https://x.com/dwetterau/status/2002420205020950765) as part of my new job at Cursor.
During this time, I was still using Cursor's Tab completion model as I wrote code by hand along with Agents to draft early versions of what I tried to build, or make specific fixes.

Opus 4.5 and GPT-5.2 changed everything for me.
These models suddenly changed from being simple interns to being competent, experienced teammates.
In addition, the GPT-5.2 models were the first ones that felt like true engineers to me, that care about writing tests and refactoring code rather than sloppily copy-pasting.
With these improvements, I basically stopped writing code by hand, both for personal projects and for work.

A subtle, but significant, change happened a few months ago with the release of Opus 4.6 and GPT 5.3-Codex.
These models are more capable of running for long periods of time without going off the rails.
They run for so long in fact, that I need them to run somewhere else to avoid interrupting them when I go to meetings or need to context switch.

## The senior engineer in the cloud

If I had to put a label on them, I would say that the Opus 4.6, Composer 2, and GPT 5.4 models are about as capable as an engineer with 3-5 years of software engineering experience.
Often, for specific domains or projects using well-documented technologies, they are far better than that.
But overall, they don't yet seem capable of designing architectures or systems any better than a "senior" engineer would.

An engineer like this, before AI, would be someone on my team that I could ask to build something, and they would come up with a design and build it over the course of a week or more.
These models are capable of something very similar, although plan modes don't quite work as well as engineering RFCs do, and the models finish their work in a handful of hours rather than days.

Running a program for a handful of hours is a challenge, so to let them run reliably for that long, I use Cursor's Cloud Agents. 
This is also what I am building and helping run at my job - so I'm certainly biased here.
Also, the models can produce a lot of code for me to review and keep track of in that span - the same that I would end up looking at a TL on a team of several engineers. 

## How I try to keep up with the agents

I treat these agents similar to how I would treat teammates. 
I keep track of their tasks in an agent-integrated task tracker I built called [Tasky](https://tasky.davidw.tech/).
I once again spend most of my job reviewing code rather than writing it, which is something [I've been a fan of](/2024/09/22/review-more-code.html) for a long time.
[Bugbot](https://cursor.com/bugbot) helps with the reviews too, and so do [Cloud-agent based review Automations](https://cursor.com/blog/security-agents).

With all of this, I still find it hard to have more than 3-5 things in flight at once. 
Any more than that, and I find I'm spending more energy getting PR's reviewed and up-to-date with our fast-moving main branch.
One or two of those will be my primary project, while the others are usually low-priority improvements or other fixes that aren't time sensitive.

## What's next

I'm not sure what the next stage of coding models will be, but I am personally hopeful that agents will get better at designing systems rather than just implementing them.
I hope that we don't fall behind on reigning in the complexity that agents can cause, by investing in ways to ensure they're making our software better, rather than just making more of it.

One way this might manifest is with even more agents running all the time, in the cloud.
These agents could constantly be testing out features manually or automatically, refactoring code into better abstractions, proposing architectural improvements, and even helping keep the humans up-to-date on what's changing and why.

I'll be back in a few months to see how these predictions held up!