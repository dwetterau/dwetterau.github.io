---
layout: post-with-comments
---

# Who fixes the bug?

This is the second post in a series about code reviews.
Check out the [first one](/2024/09/22/review-more-code) to hear about why I think code reviews are so valuable to do.
In this post, I want to explore the question of who ultimately is responsible for fixing the bugs and issues that a code review misses.
We'll start with two competing philosophies I've encountered on the question, and we'll end with a healthy blend of both that I've found to be most productive.

## Extreme #1: Code must be ready to deploy before review

One philosophy around code review is that you should only send code out for review if you're ready for it to be merged, as is, into the codebase and potentially sent to production immediately.
Most companies don't actually ever operate this way, but there are some good ideas that lead to this approach.
There are some environments (e.g. Open Source Software development) where this might be the only viable approach, but for this exercise we're going to consider the code reviews that happen within a small team at a software company.

### Pros:

The main benefit of this approach is that it encourages the author to think more carefully about all aspects of their changes before spending someone's time on the review.
These aspects include finding edge cases, writing test cases, and generally better understanding the code they're changing and the changes they're making.
This also leads to faster code reviews, since the reviewer doesn't need to spend as much time pointing out small issues, and can ideally focus on higher-level feedback.
Since code reviews take less time, this can help team that are constrained on code review bandwidth to be blocked less often, although I would recommend instead investing in training more people on the team to be good code reviewers.

### Cons:

Polishing code before any feedback has taken place on the approach or code itself is a dangerous way to spend time.
There will almost always be some feedback in a code review, and if that happens after code has been polished, the polishing was probably wasted time and will need to be re-done.
In this model you also have to facilitate feedback outside of code reviews early and often, to avoid people going in the wrong direction, or showing up with code that needs to be rewritten entirely after working on it for a long time.

## Extreme #2: Issues that make it through review are the reviewer's fault

Another not-quite-opposite philosophy to code review shifts a large amount of the responsibility from the code author to the code reviewer.
I doubt many teams would explicitly adopt this approach, but it seems to emerge frequently if the majority of code reviews are performed by the most experienced members of the team.
These reviewing individuals might not literally be responsible for the issues they miss in review, but they might end up feeling and acting that way anyway.

### Pros:

In this model, the benefit is that code authors get feedback faster and more frequently.
Instead of working on a polished version of the wrong approach, reviewers can work with authors to change course earlier.
As a result of all of this extra feedback, it can make teams feel more collaborative and like they're moving faster.

### Cons:

This model requires more rounds of detailed code review and probably still will likely result in overall lower code quality.
The bandwidth of code reviewers is not infinite, and eventually after many rounds of back and forth, the author and reviewer will get tired.
The incentives in this model are backwards - if the code author intentionally doesn't cover a hard case in their implementation, then someone else might have to fix it because they didn't find it.

## The team fixes the bug

Hopefully both of the extremes above sound "wrong".
In a functioning team, we should always be thinking about the health and productivity of the team as a whole, rather than whose fault something is.
At the same time, there are pros to both approaches that I find really valuable, so how do we blend them?

1. Set some baseline quality that is expected of all code before it goes through review (e.g. code should have tests that prove the author confirmed it worked and thought about edge cases).
1. Promote an environment where team members can send code out for review before polishing, or ideally, whenever they want feedback. If this conflicts with the point above, introduce a concept to make it clear what _type_ of review is expected - we'll explore this more in the next post.
1. If some issue does make it past code review, share the responsibility of fixing it between the author and the reviewer. In some utopian company this might be handled by the team's rotation continually working on bugfixes , but I have found that it's best if the teammates involved still have some skin in the game.

Next time, we'll finally dig into some tips and strategies for giving great code reviews.
