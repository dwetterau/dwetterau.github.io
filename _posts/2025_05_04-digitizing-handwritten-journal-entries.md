----
layout: post-with-comments
----

# Digitizing my handwritten journal entries

I have journaled every day since April 15th, 2018.
Each of these entries is written by hand, and is one full page of a Large Moleskin "[Classic Notebook](https://www.moleskine.com/en-us/shop/notebooks/the-legendary-notebook/classic-notebook-black-9788883701122.html)".
With my handwriting size, this comes out to around 300 words that I write every day, by hand.

For me, journaling serves two main purposes: 
1. It forces me to reflect on my day
1. Writing the details causes me to remember them better

Interestingly, I rarely read my journal entries after I write them.
Basically the only time I do is when I'm trying to figure out when something happened - which can take a long time to find across the 12 notebooks I currently have.
 
I have tried several times over the years, most seriously back in the middle of November in 2019, to digitize my journal entries.
If I can succeed in converting all of my handwritten text into digital form, I should be able to search for things more easily (especially with AI-powered search these days) and won't need to worry about losing them.
The process of typing up ~750k words of my journal has always felt too daunting (even when that number was smaller).

## Early attempts

Back in 2019, I attempting to digitize my journal entries with a multi-step [Text Segmenetation](https://arthurflor23.medium.com/text-segmentation-b32503ef2613) process I read online.

This involved first writing heuristic-based software to break up scanned journal entries first into lines, then into words. 
After every word was its own little image, it could be passed to a computer vision model to attempt to convert it to text.

I struggled for a while to get the line-segmentation step to work well with my scans, since the lines were often quite _curved_, not just slanted because of the way I scanned them. 

I eventually threw in the towel, and decided to [wait](https://en.wikipedia.org/wiki/Wait/walk_dilemma) for handwriting recognition libraries to get better as technology progressed. 

## Scanning the entries

Even though I wasn't able to automatically convert scanned journal entries into text yet, I could still take the images for safekeeping.
I used [Dropbox's PDF Scanner](https://www.dropbox.com/features/productivity/document-scanner) to take a picture of each journal page, and rescale the image to a black-and-white rectangular image. 
Since this was Dropbox's tool, it also saved each scan into my Dropbox account which I use due in part to my time working there.
This process was quite slow - it takes about 20 seconds still to scan and save an image this way.

I took all of the images in order, and then used a [short python script](TODO) to convert them from PNG to JPG and rename them to the proper date.
Writing little scripts like this is something ChatGPT can do with no trouble - and not bothering to type the name for each image as I scanned them was a huge time-saver.

## Converting the scans to text

AI has obviously taken off since 2019 when I was last looking to digitize these entries. 
Periodically, I've experimented with passing a scanned journal entry into an LLM that accepts image inputs and asked it to convert it to text. 
The results have generally been mixed when using LLMs - it's difficult to have them not hallucinate when they encounter hard-to-read words.
I also would prefer that my entries were transcribed as literally as possible, in case I am actually writing something that has a non-standard spelling or name.

This weekend, I tried searching again and found a few "HTR" models that seemed both recent and promising.
I have a desktop PC that I predominently use to play games, but justified buying a Nvidia 3080 ti card for a few years ago because I thought machine learning was something I might one day want to play with.

After a few hours of struggling to get CUDA working inside of Ubuntu inside of WSL2 inside of Windows 11 (this setup is a story for another day), I was ready to try out some models.
I first tried [TrOCR](https://huggingface.co/microsoft/trocr-base-handwritten) because it mentioned it was fine-tuned on a handwriting database that sounded relevant. 
I missed the fine print that it only could process one line of text at a time, which meant it still needed line segmentation first to work.
Luckily, I then found and tried out [Florence-2](https://huggingface.co/microsoft/Florence-2-large) which worked amazingly well, out of the box. 

On my setup, it seems to need around 6GB of VRAM to run - and takes a minute and a half to load into memory.
Inference for each image took around 4 seconds, and then I spent another 1.5 seconds or so uploading the image and inferred text to Airtable.

![Image]()

## Wrapping up 

I work at Airtable, and specifically have been working on many of our AI capabilities lately.
For one of my personal Airtable bases, I'm eager to have the text content of my journal entries available so that I can start processing them with AI search and summarization tools.

After converting each scanned image to text with the model above, I then uploaded the image along with the text to an Airtable table with [this Python script](TODO).
The end result of this is I now have a "Journal" table in Airtable with the date, scanned image, and extracted text of each entry. 
I might also use this table to help keep track of the process of auditing and correcting all of the text output, since it's definitely not perfect.

I'm excited to start asking questions about and search over everything I've written.
I intend to write a few more blog posts about what I end up doing with all of this data.
