---
layout: post-with-comments
---

# AI Coding Summer 2026

The way I wrote code completely changed around the beginning of this year, which I wrote about some [back in March](/2026/03/21/no-longer-an-intern). I noticed it first on side projects - where I found that fully vibe-coded apps were just as good as my old side-project attempts, as long as I [code reviewed](/2025/01/28/good-code-review-tips) the parts such as the interfaces and data models. Anything outside of those it stopped making sense to sweat over, since a full re-implementation is so easily attainable. 

## Vibe-coding professionally

I eventually noticed myself moving towards this trend in established code bases too, probably around the GPT 5.5 vintage, although I’m more careful. Since code in these environments needs to run for the foreseeable future, and many others will have to encounter and update later on, I pretty strongly stand by reviewing all of the code that ends up merging and attributed to me. This doesn’t mean I spend cycles poring over every line of a test’s mocking setup, but I also didn’t really do that for human-written code anyway. There still seems to be tremendous value in looking into just _why_ every PR from an agent ends up being ~1000 lines, and with a little bit of feedback back to the agent, I can usually trim it down substantially.

My standard flow for writing code professionally shifted to one where my coding agents were similar to teammates sending me PRs, and my role was to code review and coach them. I tell myself this is mostly just programming in English rather than a programming language. When I noticed myself giving similar consistent feedback (No GPT, you don’t need to add hundreds of lines of tests that are tightly-coupled to the implementation) that became a new rule or SKILL. I don’t sweat too much on how to organize or structure my agents, since I expect it to keep changing, and the agents can update that too if it ever needs to.

## Long-lived chat sessions 

Another change I made was to stop making as many new agent chats (or threads). Someone mentioned to me that manually taking my own insights from agent session and starting another was just a bad form of human-driven compaction, so I swallowed the bitter pill and stopped caring about the agent compacting over and over again. Sometimes I still notice the agent degrade, but it is genuinely much more reliable to do this now than it was a few months ago. 

I use this strategy for bigger projects or features - where I just have the agent keep going for weeks over a series of PRs, releases, and debugging sessions. Side chats (e.g. /btw) can help avoid some pollution here, but I really only use them when I think it’s not part of the “main thread” of work. If I legitimately do need multiple agents running, I either have the main agent spawn some sub-agents, or fork the whole chat and then discard one eventually. The continually-compacted context from the long-lived chat session fills the role of memory. It’s imperfect, but better than I’ve experienced with any RAG-based memory tools.

## Always-on agents delegating to the Cloud

The last extension to coding that I expect will continue to improve was from using always-on agents to operate one abstraction layer up from Cloud-based coding agents. Tools like Grok Bot can do this quite well, and leverage coding agents using other models (you just need to ask). I found that there were some limits to this approach so far, since the model running in the orchestrator layer needs to be basically as smart as the underlying coding agents to avoid giving them bad instructions. But for simple tasks with a good amount of breadth, these products that are popping up are quite capable team-of-agent orchestrators and planners, and it’s really nice to provide feedback about work one layer of abstraction higher up.
