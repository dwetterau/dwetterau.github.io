---
layout: post-with-comments
---

# Good code review tips

This is the third post in a series about code reviews. See the [previous post](/2024/10/26/who-fixes-the-bug) to read about some ideas for who is responsible for what throughout the code review process. This post is a collection of practices that I've found and followed over the years as I've performed literally thousands of code reviews for my teammates.

### Find something to say
  - It signals to the author that you cared about their work to read and think about it carefully
  - It keeps you engaged as you review to make sure you don't checkout and blindly accept it
  - It doesn't have to be something you want them to change, it can just be a compliment, or positive feedback about the work they did

### Only block code if it's dangerous
- Every round of code review adds substantial delay to the process of building and iterating on products and systems.
- Think about how every additional round of review could have instead been an entire separate PR.
- The longer reviews get, the harder they are to review and make sure they haven't missed anything. Authors and reviewers get tired and eventually throw in the towel.
- Often deferring something to a subsequent review can keep reviews small, and help the team stay motivated and moving forward - just make sure you have a good system for making sure follow-ups aren't forgotten.
- Exceptions to this rule - when someone is ramping up, and it serves them and the team better to iterate a few times as they learn their way around.

### Remove debates around style
- Use tools like prettier, goformat, etc. to automate the process of code formatting
- Comments about style should exclusively contain links to a published and shared style guide. 

### Make sure the next steps from every comment are clear
- nits don't need further conversation or debate
- If you want to discuss something more before they make changes, put it in the comment
- The author shouldn't need to read your mind to know what to do next
