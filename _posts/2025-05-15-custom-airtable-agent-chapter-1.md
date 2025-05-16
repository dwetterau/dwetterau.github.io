---
layout: post-with-comments
---

# Building an AI personal assistant with no code

I recently read Geoffrey Litt's [recent blogpost](https://www.geoffreylitt.com/2025/04/12/how-i-made-a-useful-ai-assistant-with-one-sqlite-table-and-a-handful-of-cron-jobs) about an AI assistant put together with a SQLite table, some cron jobs, and a telegram integration and immediately wanted something like it for myself.
Since I work at Airtable, I wanted to see how far I could get by building a similar system entirely within a single Airtable base, ideally without having to write any code.

I was thrilled to end up with what I still believe is the most useful (for me) AI-powered thing I've ever built.
This post is the first in a series I intend to post with step-by-step instructions on how to build your own customizable AI personal assistant in Airtable.

_Disclaimer: I am an Airtable employee and will be building in Airtable in this post. Any views expressed are solely my own and do not express the views or opinions of my employer._

## Chapter 1: A personalized morning brief

By the end of this chapter, you will have an AI-powered system that sends you a personalized message in the morning before your day begins.
This will contain a summary of your Google Calendar, the weather, and any other time-based data you might want to stay up-to-date on.

<p><img src="/assets/post_images/custom_personal_assistant/email_preview.png" alt="Email preview" class="centered-image small-image"></p>
<center><i>An example of the daily summary email you can receive.</i></center>
<br />

## Initial setup

1. Create a new Airtable base with access to [Airtable AI](https://airtable.com/pricing/ai).
1. Create a table named "Config" in your base that looks like the following:

<p><img src="/assets/post_images/custom_personal_assistant/config_table_schema.png" alt="Config table schema" class="centered-image medium-image"></p>
<center><i>We will use this table in Automations and AI prompts to personalize your experience.</i></center>
<br />

## 📅 Import Google Calendar events

### Create a Google calendar sync table

Follow the ([help center instructions](https://support.airtable.com/docs/airtable-sync-integration-google-calendar)) if you need some help with this.
Your config should look like the image below. <br /><img src="/assets/post_images/custom_personal_assistant/calendar_sync_config.png" alt="Calendar sync config" class="centered-image medium-image p1">

1. For the second config page, leave it on `All fields in the source and fields added in the future`
1. Rename this table to `Calendar`
1. [Optional] You can add additional sync sources to this same table to bring in other calendars. If you do be sure to include the sync source later on when you are filling out AI prompts.

### Creating a "Context" view

1.  Create a new view in the synced table called `Context`.
1.  In the `Context` view, set filters to only include events for the current week, as shown in the screenshot below.
    - Optionally, exclude events such as "holds" or "blocks" that you don't want your assistant reminding you about (this is what the second gray box below does).<img src="/assets/post_images/custom_personal_assistant/calendar_context_filters.png" alt="Calendar context filters" class="centered-image p1">
1.  On both the `Start` and `End` columns in your `Calendar` table, enable the `Use the same time zone for all collaborators` setting and select your timezone. If you get a warning here, it's okay - just "Confirm". <img src="/assets/post_images/custom_personal_assistant/timezone_config.png" alt="Timezone config" class="centered-image small-image p1">

## 🤖 Create the daily summary automation

1. Create a new [automation](https://support.airtable.com/v1/docs/getting-started-with-airtable-automations) named `Create Daily Summary`
1. Select the `At scheduled time` trigger type and configure it as shown below. <img src="/assets/post_images/custom_personal_assistant/summary_trigger_properties.png" alt="Summary trigger properties" class="centered-image small-image p1">
1. Adjust the time you’d like to get your summary email message by changing "6:00am" to whatever you’d like.

### Define what you want your assistant to read

1. Add a `Find records` action to the automation with a description of `Get the config`, and configure it as shown below.
   This will allow the AI prompt later to read the values you defined in your `Config` table. <img src="/assets/post_images/custom_personal_assistant/find_config_properties.png" alt="Find action Config properties" class="centered-image small-image p1">
1. Add another `Find records` action to the automation with a description of `Get the calendar events`, and configure it as shown below.
   This step will retrieve the relevant calendar events to tell the AI about.
   Notice that this is using the **Context** view with the filters you defined earlier. <img src="/assets/post_images/custom_personal_assistant/find_calendar_context_properties.png" alt="Find action Calendar context properties" class="centered-image small-image p1">

### Define the AI prompt
