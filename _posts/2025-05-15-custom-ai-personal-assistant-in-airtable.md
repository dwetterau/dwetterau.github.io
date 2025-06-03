---
layout: post-with-comments
---

# Building an AI personal assistant with no code

I read [Geoffrey Litt's blog post](https://www.geoffreylitt.com/2025/04/12/how-i-made-a-useful-ai-assistant-with-one-sqlite-table-and-a-handful-of-cron-jobs) about an AI assistant made of just a SQLite table and some cron jobs and immediately wanted something like it for myself.

Since I work at Airtable, I wanted to see how far I could go by building a similar system in a single Airtable base without writing any code.
I was thrilled to end up with what is the most useful (to me) AI-powered thing I have built to date.

This post is the first in a series explaining how to build your own customizable AI personal assistant in Airtable.

## Chapter 1: A personalized morning brief

By the end of this chapter, you will have an AI-powered system that sends you a personalized message in the morning before your day begins.
This daily message will contain a summary of your Google Calendar and any other time-based data you might want to stay up-to-date on.

<p><img src="/assets/post_images/custom_personal_assistant/email_preview.png" alt="Email preview" class="centered-image small-image"></p>
<center><i>An example of the daily summary email you can receive.</i></center>
<br />

## Initial setup

1. Create an Airtable base with access to [Airtable AI](https://airtable.com/pricing/ai).
1. Create a table named `Config` in your base that looks like the following:

<p><img src="/assets/post_images/custom_personal_assistant/config_table_schema.png" alt="Config table schema" class="centered-image medium-image"></p>
<center><i>We will use this table in Automations and AI prompts to personalize your experience.</i></center>
<br />

### 📅 Create a Google calendar sync table

To create a Google Calendar sync, follow the first two steps in the ([help center instructions](https://support.airtable.com/docs/airtable-sync-integration-google-calendar)).
Your config should look like the image below. <br /><img src="/assets/post_images/custom_personal_assistant/calendar_sync_config.png" alt="Calendar sync config" class="centered-image medium-image p1">

1. For the second config page, leave it on `All fields in the source and fields added in the future`
1. Rename this table to `Calendar`
1. (Optional) You can add additional sync sources to this same table to bring in other calendars. If you do, be sure to include the sync source later on when you are filling out AI prompts.

### Create a "Context" view

1.  Create a new view in the `Calendar` table called `Context`.
1.  In the `Context` view, set up some filters to only include events for the current week, as shown in the screenshot below.
    - (Optional) Exclude events such as "holds" or "blocks" that you don't want your assistant reminding you about (this is what the second gray box below does).<img src="/assets/post_images/custom_personal_assistant/calendar_context_filters.png" alt="Calendar context filters" class="centered-image p1">
1.  On both the `Start` and `End` columns in your `Calendar` table, enable the `Use the same time zone for all collaborators` setting and select your timezone. If you get a warning here, it's okay - just "Confirm". <img src="/assets/post_images/custom_personal_assistant/timezone_config.png" alt="Timezone config" class="centered-image small-image p1">

## 🤖 Create the daily summary automation

1. Create a new [automation](https://support.airtable.com/v1/docs/getting-started-with-airtable-automations) named `Create Daily Summary`
1. Select the `At scheduled time` trigger type and configure it as shown below. <img src="/assets/post_images/custom_personal_assistant/summary_trigger_properties.png" alt="Summary trigger properties" class="centered-image small-image p1">
1. Adjust the time you’d like to get your summary email message by changing "6:00am" to whatever you’d like.

### Define what you want your assistant to read

1. Add a `Find records` action to the automation with a description of `Get the config`, and configure it as shown below.
   This will allow the AI prompt later to read the values you defined in your `Config` table at the start. <img src="/assets/post_images/custom_personal_assistant/find_config_properties.png" alt="Find action Config properties" class="centered-image small-image p1">
1. Add another `Find records` action to the automation with a description of `Get the calendar events`, and configure it as shown below.
   This step will retrieve the relevant calendar events to tell the AI about.
   Notice that this is using the **Context** view with the filters you defined earlier. <img src="/assets/post_images/custom_personal_assistant/find_calendar_context_properties.png" alt="Find action Calendar context properties" class="centered-image small-image p1">

### Define the AI prompt

Add a `Generate with AI` action to your automation next.
Copy the [prompt from here](#summary-prompt) into the "Prompt" box on the right side of the screen.
Within this prompt, there are **four** places where you need to replace a tag that looks like this: `<REPLACE ...>` with a chip.
To add a chip in the prompt area, click the blue "+" button in the top right corner.
Each chip you need to add one is explained below.

1. For the `current time` tag, add an "A specific time" -> "Actual run time" chip, and select your preferred date format and timezone.
   <img src="/assets/post_images/custom_personal_assistant/current_time_chip.png" alt="Current time chip" class="centered-image medium-image p1">
1. For the `name` tag, add a chip as shown in the images below. Select the Find records step for `Config`, then select "Field values", then select `Collaborator`, and finally select `Name` at the end. This will dynamically retrieve your name from the Collaborator token.
   <div style="height: 380px" class="carousel p1">
      <div data-step="1" class="slide9s"><img src="/assets/post_images/custom_personal_assistant/collaborator_chip.png" alt="Collaborator chip 1"></div>
      <div data-step="2" class="slide9s"><img src="/assets/post_images/custom_personal_assistant/collaborator_chip_2.png" alt="Collaborator chip 2"></div>
      <div data-step="3" class="slide9s"><img src="/assets/post_images/custom_personal_assistant/collaborator_chip_3.png" alt="Collaborator chip 3"></div>
   </div>
1. For the `pronouns` tag, add a chip the same exact same way, however select the `Pronouns` field (instead of `Collaborator`).
1. For `calendar events`, select the proper Find records step, then display as a _list_, and then add a chip like this:
   <div style="height: 376px" class="carousel p1">
      <div data-step="1" class="slide6s"><img src="/assets/post_images/custom_personal_assistant/calendar_events_chip_1.png" alt="Calendar events chip 1"></div>
      <div data-step="2" class="slide6s"><img src="/assets/post_images/custom_personal_assistant/calendar_events_chip_2.png" alt="Calendar events chip 2"></div>
   </div>
   <center><i>Only select a few fields here. Make sure "Use field timezones if available" at the bottom is checked.</i></center>
1. Change your model to something more powerful such as "Claude Sonnet 3.7" or "GPT-4.1".
1. Change your Randomness to "Medium"

At the end of all of these steps your action should look something like this:
<img src="/assets/post_images/custom_personal_assistant/summary_prompt_end.png" alt="Summary prompt preview" class="centered-image small-image p1">

### Send some emails

Add one last action to your automation, the `Send email` action that will deliver the AI-generated message to you.
Feel free to configure this however you'd like. My email looks like the following:
<img src="/assets/post_images/custom_personal_assistant/summary_email_properties.png" alt="Summary email properties" class="centered-image small-image p1">

1. The chip in the `To` field is configured just like the `name` tag was earlier.
   This time, select `Email` at the end instead of `Name`.
1. The chip in the `Subject` field is the same as the `current time` tag from earlier.
1. The `Message` field should have the AI action's response, without additional formatting (the AI will format it for us).

With this step done, you should be ready to test and enable your automation! It should look like the below screenshot.
<img src="/assets/post_images/custom_personal_assistant/summary_automation.png" alt="Summary automation" class="centered-image small-image p1">

To enable your automation, be sure to toggle the big red "OFF" button in the top left of the window to "ON".

🎉 Congratulations, you've now set up an AI personal assistant that will read through your upcoming calendar events and email you a morning brief before you start your day.

## Adding additional data sources

So far, we have added Calendar events as a source for the AI to use when constructing your daily summary.
You can add additional sources the same way, and these sources can be imported from CSVs, [.ics files](https://support.airtable.com/docs/calendar-import-extension), or other syncs.

For each additional data source, you'll want to follow these steps:

1. Create a new table and import your data.
1. Create a `Context` view in the table that filters down data to the records relevant for the week.
1. Add a new `Find Records` step to the summary automation, similar to the `Get the calendar events` one.
1. Pass in the records to the prompt in the AI action like you did for the `calendar events` tag.
1. (Optional) Add a new section to the prompt explaining the new data source and how to interpret it.

### ⚾ Example: Mets game schedule

I wanted my assistant to know about the Mets baseball team’s schedule.
These are the steps I took:

1. Imported a [CSV](https://www.mlb.com/mets/schedule/downloadable-schedule) for the schedule as a new table.
1. Made a `Context` view with filters like this:
   <img src="/assets/post_images/custom_personal_assistant/mets_table_filters.png" alt="Mets table filters" class="centered-image small-image p1">
1. Added a new `Find records` step with a useful description.
1. Passed the records into the prompt like this:
   <img src="/assets/post_images/custom_personal_assistant/mets_prompt_changes.png" alt="Mets prompt changes" class="centered-image small-image p1">
1. Added some instructions to the prompt for the AI to use when reasoning about these events:

```
## Calendar instructions
... unchanged

## Met's game instructions
- If there are no Mets games, skip this section.
- Don't tell me about the radio station, I don't use that
- Do tell me what TV channel the game is on, and what time it starts.
- Of course, tell me who the Mets are playing and where.
```

By following these steps, you can expand your AI personal assistant with additional events and knowledge sources, all without writing any code.

# Next time

In the next post, we'll add "memories" for the AI to consider in addition to just events.
We'll also set up a way for you to easily send and receive messages directly with the AI.

### Summary prompt

```
# Objective
You are a helpful personal assistant who is tasked with creating fun and useful daily summaries for an individual.
Each day, you will create a summary for the current day - first thing in the morning. You will be given the individual's name and pronouns below - try to make your summary feel personal and authentic!

## Inputs
The current date is: <REPLACE current time>
You are writing this summary for: <REPLACE name> who uses the pronouns <REPLACE pronouns>
This week's calendar events: <REPLACE calendar events>

## Calendar instructions
Don't tell me about standard events like whether I'll be in the office, if there are office-wide events like coffee, or when lunch is.

## Output instructions
Output your summary in a fun, conversational tone. Do not be too flowery with your language, and try to keep things short and to the point. Your summaries should be accurate, and efficient.

Remember that you are are writing the summary for a specific day, but have been informed about upcoming events for the entire week. Focus on today, but try to highlight upcoming important events when you think it's useful.

If you don't have anything to say because there are no inputs, simply wish your individual a nice day, and maybe add in a fun, truthful fact.
Use Markdown formatting for your output text.
```

_Disclaimer: I am an Airtable employee. Any views expressed are solely my own and do not express the views or opinions of my employer._
