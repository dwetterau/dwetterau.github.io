---
layout: post-with-comments
---

# Review more code

This post will probably be the first in a series on code reviews because I believe they're greatly underappreciated.
Every company I've worked at in my career has required that code is reviewed and approved by at least one other person before it is deployed to be used by the rest of the world.
This is often something the company enforces for some compliance requirement, but I've also worked in really small environments where we still reviewed all of the code when we didn't strictly have to.
This system can feel overbearing and slow down teams, but there are plenty of benefits from doing them as well.

If you're a brand new software engineer, code reviews are something that you've probably only been on the receiving end of.
Once you're in a role where you're entrusted to review the code of your teammates, I highly recommend you focus as much as you can on it.
I personally learned much more from reviewing code in a professional setting than I did from probably any other on-the-job activity (writing code, tech talks, etc.).

## If you can review faster, you can code faster

While writing code, you often spend far more time reading existing code to find the right place to change or read examples of similar features.
The faster you can read code, the faster you can write code - and a good way to get faster at something is to practice.

You could practice reading code by just diving into a codebase and reading as much as you can, but code reviews are a much more productive way of accomplishing the same thing.
In a code review, you need to read snippets of the code in the changes that they made, and often need to dive into the same parts of the codebase to see how the changes interact with the existing code.
This lets you practice reading code, in a more complicated and targeted way, while also helping keep your coworkers unblocked.

## A team can never have enough good code reviewers

It's not possible for code to always be immediately reviewed, no matter how much we wish it was.
People are busy, and often teams will settle into a mode where the same people that do the most code reviews are the ones with the most busy calendars.
If your team doesn't have everyone on the team participating in reviewing code, that's an easy thing to fix, and it will help make sure people aren't being blocked as often.

I've even been on teams before where we had a code review training program to help new people get more comfortable reviewing tricky code.
In that system, we would let the trainee review the code first, and then afterwards would have a more experienced reviewer double-check before anything merged.
This helped the trainee not stress as much about "letting something dangerous through", while still letting them practice the review.

Having more fully empowered code reviewers doesn't just help code changes get unblocked faster, it also means that more people on the team have enough context of the code to be reviewers.
This often means that the bus-factor for the team on any given piece of code the team owns is much higher, and also means more people are ready and able to review not just code, but requests from other teams or even architectural designs.

## Reviewing code is great practice at giving feedback

In any professional setting, giving and receiving feedback is a key part to improving yourself and your team.
You will inevitably be asked to give feedback to others in person, and this was certainly awkward for me early in my career.
Code reviews are a much more structured environment to practice giving and receiving feedback within - you almost always are commenting on something concrete, and it's often possible to find literature online to reinforce your points, or help you learn.

Giving feedback about more abstract topics will be harder than a code review, but the skills you learn and the relationships you build by reviewing code will help make this easier too.
