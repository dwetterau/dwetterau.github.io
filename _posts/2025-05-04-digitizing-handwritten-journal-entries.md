---
layout: post-with-comments
---

# Digitizing my handwritten journal entries

I have journaled every day since April 15th, 2018.
Each of these entries is one full page of a Large Moleskin "[Classic Notebook](https://www.moleskine.com/en-us/shop/notebooks/the-legendary-notebook/classic-notebook-black-9788883701122.html)".
With my handwriting size, this comes out to around 300 words that I write every day, by hand.
In this post, I'll explain the process that I've started to use to covert these handwritten entries into digitized text.

### Background

For me, journaling serves two main purposes:

1. It forces me to reflect on my day
1. Writing out details causes me to remember them better

Interestingly, I rarely read my journal entries after I write them.
The only time I do is when I'm trying to figure out _when_ something happened - which can take a long time to find across the 12 notebooks I currently have.

I have tried several times over the years, most seriously back in November of 2019, to digitize my journal entries.

If I can succeed in converting all of my handwritten text into digital form, I should be able to search for things more easily (especially with AI-powered search) and won't need to worry about losing them every time I move.
The process of typing up ~750k words of my journal has always felt too daunting (even when that number was smaller).

I'm happy to report that I now have over 600 entries digitized, thanks in large part to recently-released vision models.

### Early attempts

Back in 2019, I attempted to digitize my journal entries with a multi-step [Text Segmentation](https://arthurflor23.medium.com/text-segmentation-b32503ef2613) process.
This involved first writing heuristic-based software to break up scanned journal entries first into lines, then into words.
After every word was its own little image, it could be passed to a computer vision model to attempt to convert it to text.

I struggled for a while to get the line-segmentation step to work well with my scans, since the lines were often quite _curved_, not just slanted because of the way I scanned them.
I eventually threw in the towel, and decided to [wait](https://en.wikipedia.org/wiki/Wait/walk_dilemma) for handwriting recognition libraries to get better as technology progressed.

### Scanning the entries

Even though I wasn't able to automatically convert scanned journal entries into text yet, I could still create the images for safekeeping.
I used [Dropbox's PDF Scanner](https://www.dropbox.com/features/productivity/document-scanner) to take a picture of each journal page, and rescale the image to a black-and-white rectangular image.
Since this was Dropbox's tool, it also saved each scan into my Dropbox account which I used due in part to my time working there.
This process was quite slow - it takes me around 18 seconds to scan and save an image of one page this way.

I took all of the images in order, and then used a [short python script](https://gist.github.com/dwetterau/198123426ce639c70a938aca695ef145) to convert them from PNG to JPG and rename them to the proper date.
Writing little scripts like this is something ChatGPT can do with no trouble - and not bothering to type the name for each image as I scanned them was a huge time-saver.

At the time of writing, I've only does this a process over 600 times, and still have a couple thousand to chew through.
Maybe I'll find a more efficient method in the future.

### Converting the scans to text

AI has obviously taken off since 2019 when I last looked into how to convert images of handwriting to text.
Periodically, I've experimented with passing a scanned journal entry into an LLM that accepts image inputs and asked it to convert it to text.
I most recently got good results with GPT4.5, but processing each scan cost about around $0.11, took a few seconds, and I wasn't exactly happy with these images being in OpenAI's training set one day.

The results have generally been mixed when using LLMs - it's difficult to prompt them to not hallucinate when they encounter hard-to-read words.
I also would prefer that my entries were transcribed as literally as possible in case I am actually writing something that has a non-standard spelling or in case I want to analyze my sub-par grammar some day.
This weekend, I tried searching again and found a few "HTR" models that seemed both recent and promising.

I have a Windows desktop that I predominantly use to play games, so I justified buying a Nvidia 3080 ti card a few years ago both for the games but also because I thought machine learning was something I might one day want to play with.
After a few hours of struggling to get CUDA working inside of Ubuntu inside of WSL2 inside of Windows 11 (this setup is a story for another day), I was ready to try out some models.

I first tried [TrOCR](https://huggingface.co/microsoft/trocr-base-handwritten) because it mentioned it was fine-tuned on a handwriting database that sounded relevant.
But I missed the fine print that it only could process one line of text at a time, which meant it still needed line segmentation first to work.

Luckily, I then found and tried out [Florence-2](https://huggingface.co/microsoft/Florence-2-large) which worked amazingly well, out of the box.
Here are the [~30 lines of code](https://gist.github.com/dwetterau/2d02857419293b5545246d0d6fa68b77) of Python I used to load the model and process an image from a local file.

On my setup, it seems to need around 7GB of VRAM to run - and takes a minute and a half to load into memory.
Inference for each image took around 4 seconds, and then I spent another 1.5 seconds or so uploading the image and inferred text to Airtable.

![Image](/assets/post_images/processing_journal_entries.png)

<center><i>The GPU utilization as it processed each image (and subsequently uploaded the image + result).</i></center>
<br />

The resulting text isn't perfect.
I intend to slowly work my way through every scan to patch up the results.
This model does a good job of also including the line breaks, which should make it much easier for me to read the scan and the text side-by-side.

In the small handful of early entries I looked at, it was only getting 1-2 words wrong per entry (an accuracy of >99%!).
As I work my way through this process, I might report back with some more concrete accuracy numbers.
It seemed like the quality was already high enough to start interpreting the results with LLMs, which pushed me to go ahead and run this on all the scans I have so far.

### Wrapping up

I work at Airtable, and specifically have been working on many of our [AI capabilities](https://www.airtable.com/platform/ai) lately.
For one of my personal Airtable bases ([see post here!](/2025/05/15/custom-airtable-agent-chapter-1.html)), I'm eager to have the text content of my journal entries available so that I can start processing them with AI search and summarization tools.

After converting each scanned image to text with the model above, I then uploaded the image along with the text to an Airtable table with [these Python functions](https://gist.github.com/dwetterau/7ad292d593ff0f84820f237681372232).
The end result of this is I now have a "Journal" table in Airtable with the date, scanned image, and extracted text of each entry.

I'm excited to start asking questions about and search over everything I've written.
I intend to write a few more blog posts about what I end up doing with all of this data.
