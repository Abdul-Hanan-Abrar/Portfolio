# Figma AI Prompt: Abdul Hanan Urdu Tutor & Language Data Portfolio


Create a polished, modern, responsive personal portfolio website for **Abdul Hanan**, using they/them pronouns.


The website should position Abdul as:



- An Urdu language tutor

- A native Urdu speaker with C2-level Urdu communication

- An AI language-data and bilingual data-support specialist

- A Computer Science student

- A careful, reliable professional available for remote opportunities



The primary audience is recruiters, tutoring organizations, AI language teams, annotation companies, and clients looking for Urdu language support.


The primary goals are:



1. Attract Urdu tutoring opportunities.

2. Showcase Abdul’s Urdu communication and voice abilities.

3. Highlight experience with transcription, annotation, bilingual support, data quality, Excel, Python, and reporting automation.

4. Make it easy for visitors to view the CV, listen to Urdu voice samples, open the public personal website, view LinkedIn, and contact Abdul through Gmail.



Do not invent employers, qualifications, teaching history, testimonials, client names, awards, rates, statistics, audio content, or work that is not listed below.



## Overall visual direction


Use a professional, editorial, warm, modern visual identity.


The design should feel:



- Professional but personal

- Confident but approachable

- Suitable for recruiters

- Suitable for Urdu learners and language-AI teams

- Clean and structured

- Visually distinctive without looking overly decorative

- Dense and informative without excessive empty space



Use a strong combination of:



- Deep green

- Dark forest green

- Orange

- Black

- Warm cream

- Soft pale green

- White or warm off-white cards



Suggested color system:


Plain text






```
Deep green: #123B2D
Secondary green: #1E5943
Orange accent: #E86D35
Dark text: #18201B
Muted text: #627066
Warm paper background: #F6F3EC
Card background: #FFFDF8
Soft green background: #E8EEE6
Dark footer: #0D2C22

```





Use orange for:



- Primary buttons

- Accent lines

- Eyebrows and small labels

- Active states

- Icons

- Important highlights

- Section numbering



Use deep green for:



- Hero artwork panel

- Dark sections

- Contact section

- Footer

- Strong contrast areas



Use warm cream and pale green for:



- Main page background

- Cards

- Education and teaching backgrounds

- Secondary buttons




## Typography


Use a clear, modern sans-serif font for English content.


Recommended fonts:



- DM Sans for primary body and interface text

- DM Mono for small uppercase labels, section numbering, and metadata

- Playfair Display Italic for selected emphasis words in large hero headings

- Noto Nastaliq Urdu for all Urdu text



Typography should be readable and moderately bold. Do not make section titles or navigation text too small.


Use:



- Large, bold hero headline

- Strong section headings

- Bold section labels

- Readable card headings

- Body text with comfortable line height

- Good contrast in both light and dark mode



Urdu text must use:


Plain text






```
Noto Nastaliq Urdu

```





with graceful serif fallbacks.


All Urdu text must use:


HTML






```
lang="ur"
dir="rtl"

```





Important Urdu text:


Plain text






```
السلام علیکم — زبان سیکھنے کا سفر خوشگوار ہو۔

```





Plain text






```
یہ جملہ اردو میں ہے۔

```





Plain text






```
آپ سے بات کرنے کا انتظار ہے

```






## Responsive structure


Create a responsive one-page website for:



- Desktop

- Tablet

- Mobile



Desktop layout:



- Maximum content width approximately 1240–1440px

- Two-column hero

- Two-column section layouts

- Four-column voice-sample grid where space permits

- Three-column teaching-card grid

- Clear spacing but no oversized blank areas



Tablet layout:



- Two-column cards where possible

- Two-column voice-sample cards

- Collapsed section grids when necessary



Mobile layout:



- Single-column layout

- Horizontally scrollable navigation row

- Buttons wrap naturally

- Cards use full available width

- Portrait remains prominent

- No content is hidden

- Avoid extremely large empty sections

- Ensure all links are easy to tap




# Header and navigation


Create a sticky top navigation bar with a subtle translucent background and bottom border.


Do not show Abdul Hanan’s full name in the top bar.


Do not show an “AH” logo or a “PORTFOLIO” brand in the top bar.


The header should contain:



1. Section navigation

2. Theme toggle



Navigation labels must be bold and readable, with icons.


Use these seven main navigation items:



1. About

2. Expertise

3. Voice Samples

4. AI Language Data

5. Experience & Projects

6. Education

7. Contact



Each item should include a small accessible icon:



- About: person icon

- Expertise: book, teaching, or presentation icon

- Voice Samples: waveform or audio icon

- AI Language Data: document/data icon

- Experience & Projects: trend/chart icon

- Education: graduation-cap icon

- Contact: envelope icon



Navigation links:


Plain text






```
#about
#teaching
#voice
#data
#work
#education
#contact

```





The navigation should remain usable on mobile with horizontal scrolling if necessary.



## Theme toggle


Add a light/dark mode toggle in the top-right area.


Use:



- Sun icon for light-mode representation

- Moon icon for dark-mode representation



The toggle must:



- Respect the user’s system preference on first visit

- Persist the selected preference in local storage

- Update `aria-label`

- Update `aria-pressed`

- Have visible keyboard focus styling

- Work in light and dark mode

- Preserve readable contrast




# Hero section


Create a strong first-screen hero section.


The hero should have two columns.


## Left hero column


Add this small bold label:


Plain text






```
Urdu tutor · language data support · Faisalabad, Pakistan

```





This line should be slightly bold and clearly readable.


Main headline:


Plain text






```
Clear language.
Careful data.
Human connection.

```





Make “Careful data.” orange or use an italic editorial font for emphasis.


Hero paragraph:


Plain text






```
I’m Abdul Hanan (they/them), a native Urdu speaker helping people learn with confidence and helping language teams build better bilingual data.

```





Add this Urdu greeting using Nastaliq:


Plain text






```
السلام علیکم — زبان سیکھنے کا سفر خوشگوار ہو۔

```





Do not add the old “Language with care / Native Urdu — C2” badge near the portrait.


Do not place a “Native Urdu — C2” badge over or beside the portrait. The Urdu C2 information should appear in the About or language expertise section instead.


## Hero buttons


Create three buttons:


### Button 1


Label:


Plain text






```
Let’s work together ↗

```





Open this Gmail compose link in a new tab:


Plain text






```
https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abdulhananabrar941@gmail.com&su=Urdu%20tutoring%20or%20language%20data%20collaboration

```





Use:


HTML






```
target="_blank"
rel="noopener noreferrer"

```





Accessible label:


Plain text






```
Let’s work together via Gmail, opens in a new tab

```





### Button 2


Label:


Plain text






```
Download CV ↓

```





Download this local file:


Plain text






```
Abdul_Hanan CV.pdf

```





The file should be represented as:


Plain text






```
Abdul_Hanan%20CV.pdf

```





Use a download attribute.


### Button 3


Label:


Plain text






```
Personal website ↗

```





Open this URL in a new tab:


Plain text






```
https://abdul-hanan-abrar.github.io/abdulhanan/#

```





Use:


HTML






```
target="_blank"
rel="noopener noreferrer"

```





Accessible label:


Plain text






```
Personal website, opens in a new tab

```





Under the buttons, add:


Plain text






```
Available for remote opportunities

```





Use a small green status dot.



## Hero portrait panel


Use the supplied portrait asset:


Plain text






```
abdul-hanan-portrait.jpeg

```





The portrait should appear in a deep green rounded vertical panel on the right side of the hero.


Use:


Plain text






```
Portrait of Abdul Hanan

```





as the image alt text.


Design requirements:



- Professional crop

- Responsive image

- Portrait should be visible in the first viewport

- Use an organic rounded top shape

- Avoid hiding the face

- Use subtle green geometric motifs or circles behind the image

- Use restrained shadows

- Do not overcrowd the portrait



Immediately below the portrait, show:


Plain text






```
Abdul Hanan

```





Make this name large, bold, and clearly visible on first load.


Below the name, show:


Plain text






```
they/them · Urdu tutor & language data support

```






# Intro band


Add a full-width orange information band below the hero.


Label:


Plain text






```
For recruiters & language teams

```





Text:


Plain text






```
I bring a practical mix of language sensitivity, customer support discipline and structured data work.

```





Keep this band compact and visually strong.



# Section 1: About


Section label:


Plain text






```
01 / About

```





Use a person icon beside the title.


Main heading:


Plain text






```
A thoughtful bridge between people and language.

```





Body content:


Plain text






```
Whether I’m guiding a learner through Urdu pronunciation or checking a bilingual data set, I work patiently, precisely and with context in mind.

```





Additional paragraph:


Plain text






```
My experience spans bilingual customer support, transcription accuracy, data labelling and reporting workflows. I notice the details that affect meaning: an accent, a dialect, a date format, or the difference between a useful record and a confusing one.

```





Add a facts row:


Plain text






```
Native
Urdu · C2

```





Plain text






```
Fluent
Punjabi

```





Plain text






```
B2
English

```





Do not use the C2 badge in the portrait area. Keep this information here.


Include a subtle link to the public website:


Plain text






```
Visit personal website ↗

```





Link:


Plain text






```
https://abdul-hanan-abrar.github.io/abdulhanan/#

```





Open in a new tab securely.



# Section 2: Teaching & language expertise


Section label:


Plain text






```
02 / Teaching & language

```





Use a teaching/book/presentation icon.


Main heading:


Plain text






```
Support that meets learners where they are.

```





Create three compact but readable cards.


Do not make the cards excessively tall.


## Card 1


Number:


Plain text






```
01

```





Title:


Plain text






```
Conversation & pronunciation

```





Description:


Plain text






```
Patient practice for natural Urdu conversation, clear sounds and confident speaking.

```





## Card 2


Number:


Plain text






```
02

```





Title:


Plain text






```
Reading & writing

```





Description:


Plain text






```
Support across reading, writing, listening and speaking, with attention to script and context.

```





## Card 3


Number:


Plain text






```
03

```





Title:


Plain text






```
Dialect awareness

```





Description:


Plain text






```
Respectful language guidance that keeps accent, region and audience in view.

```





The numbers 01, 02, and 03 should be clearly visible, orange, bold, and larger than tiny metadata.


Under the cards, add a dark green bilingual example panel.


Urdu text:


Plain text






```
یہ جملہ اردو میں ہے۔

```





English text:


Plain text






```
“This sentence is in Urdu.”

```





Supporting text:


Plain text






```
A small example of bilingual context-setting.

```





The Urdu text must use Noto Nastaliq Urdu and RTL direction.


The English sentence should be approximately 18–19px and moderately bold.


The supporting text should be approximately 12–13px and readable.


Keep the panel compact.



# Section 3: Urdu voice samples


Section label:


Plain text






```
03 / Voice samples

```





Use a waveform/audio icon.


Main heading:


Plain text






```
Hear the shape of Urdu.

```





Do not leave a large blank area between the heading and the cards.


Use a balanced heading and introduction layout.


Intro text:


Plain text






```
Listen to four examples of Abdul’s Urdu communication, reading, bilingual explanation and careful handling of unclear speech.

```





Do not write that audio links will be added later because the links are now available.


Create four compact voice cards.


Each card must include:



- Audio-related icon

- Sample label

- Bold title

- Short matching description

- Clickable “Listen to sample ↗” link



Use `target="_blank"` and `rel="noopener noreferrer"` on each link.


## Voice sample 1


Sample label:


Plain text






```
Sample 01

```





Title:


Plain text






```
Natural Conversational Urdu

```





Description:


Plain text






```
Natural Urdu conversation with an easy, everyday rhythm.

```





URL:


Plain text






```
https://drive.google.com/file/d/1HwU5rnsZRMyuXdO0r0dKWlIb9KCyvkWS/view?usp=sharing

```





## Voice sample 2


Sample label:


Plain text






```
Sample 02

```





Title:


Plain text






```
Clear Urdu Reading & Natural Explanation

```





Description:


Plain text






```
Clear Urdu reading paired with natural, easy-to-follow explanations.

```





URL:


Plain text






```
https://drive.google.com/file/d/1YlZW5jY3IEz7WI2gNKZWMHBNwzNxcZjw/view?usp=sharing

```





## Voice sample 3


Sample label:


Plain text






```
Sample 03

```





Title:


Plain text






```
Natural Urdu-English Communication

```





Description:


Plain text






```
Natural bilingual communication across Urdu and English.

```





URL:


Plain text






```
https://drive.google.com/file/d/1zc2Ueipl-LcaeeI5lsYRUM3g10GxI4jY/view?usp=sharing

```





## Voice sample 4


Sample label:


Plain text






```
Sample 04

```





Title:


Plain text






```
Careful Listening & Unclear Speech

```





Description:


Plain text






```
Careful listening and patient handling of unclear speech.

```





URL:


Plain text






```
https://drive.google.com/file/d/1xaWRPu_hNAr6GAn24vOTx7MrSE0mNXz8/view?usp=sharing

```





Link label:


Plain text






```
Listen to sample ↗

```





Do not show “Future URL placeholder.”


Keep the cards visually compact and aligned.



# Section 4: AI language data support


Section label:


Plain text






```
04 / AI language data

```





Use a data/document icon.


Use a dark green background.


Main heading:


Plain text






```
Language data that stays human-readable.

```





Main paragraph:


Plain text






```
I can support language-data workflows where accuracy, consistency and cultural context matter.

```





Add tag-style skill pills:


Plain text






```
Transcription accuracy

```





Plain text






```
Careful data labelling

```





Plain text






```
Accent & dialect awareness

```





Plain text






```
Bilingual support

```





Plain text






```
Python / openpyxl

```





Plain text






```
Advanced Excel

```





Add a small CTA:


Plain text






```
Interested in annotation, evaluation or bilingual support work? Start a conversation.

```





The email link may use:


Plain text






```
mailto:abdulhananabrar941@gmail.com?subject=Language%20data%20collaboration

```






# Section 5: Experience & projects


Section label:


Plain text






```
05 / Experience & projects

```





Use a chart/trend icon.


Main heading:


Plain text






```
Reliable work behind the scenes.

```





Use a vertical timeline or clearly separated project list.


Each item must include an icon and bold readable content.


## Experience item


Icon: headset/customer-support icon


Eyebrow:


Plain text






```
Customer support

```





Title:


Plain text






```
Aptly Pharmaceuticals

```





Description:


Plain text






```
Bilingual customer support and quality-focused inventory work, including a reported 92% CSAT.

```





## Project item


Icon: spreadsheet/workbook icon


Eyebrow:


Plain text






```
Selected project

```





Title:


Plain text






```
12-sheet validation workbook

```





Description:


Plain text






```
Built a structured workbook that cut data-entry errors by half.

```





## Project item


Icon: analytics/automation/trend icon


Eyebrow:


Plain text






```
Selected project

```





Title:


Plain text






```
Reporting automation

```





Description:


Plain text






```
Automated reporting workflows, reducing errors close to zero, and fixed a DD/MM vs MM/DD data-quality issue.

```





Use inline SVG icons or simple dependency-free icons.


Do not use an icon library unless necessary.


Icons should be decorative with `aria-hidden="true"` while the text remains accessible.



# Section 6: Education


Section label:


Plain text






```
06 / Education

```





Use a graduation-cap icon.


Main heading:


Plain text






```
Always learning, always refining.

```





Create a clean education timeline/list.


## Education item 1


Date:


Plain text






```
Sep 2024 — Expected 2028

```





Title:


Plain text






```
BSc Computer Science

```





Institution:


Plain text






```
University of Agriculture, Faisalabad (UAF)

```





Coursework:


Plain text






```
Coursework: Data Structures, Database Systems, Software Engineering

```





## Education item 2


Date:


Plain text






```
2022 — 2024

```





Title:


Plain text






```
Intermediate in Computer Science

```





Institution:


Plain text






```
Punjab Group of Colleges (PGC)

```





Do not include coursework for this entry.


## Certification item


Date:


Plain text






```
2022

```





Title:


Plain text






```
Microsoft Office Management

```





Institution/details:


Plain text






```
Certification

```






# Section 7: Contact


Section label:


Plain text






```
07 / Contact

```





Use an envelope icon.


Use a deep green background.


Main heading:


Plain text






```
Let’s make language work better.

```





Intro paragraph:


Plain text






```
For Urdu tutoring roles, remote language-data collaborations or recruiter enquiries, email is the best way to reach me.

```





Urdu Nastaliq message:


Plain text






```
آپ سے بات کرنے کا انتظار ہے

```





Use RTL and Noto Nastaliq Urdu.


Do not add a contact inquiry form.


Do not include fields for name, email, phone, or message.


The Contact section should remain simple and focused.


## Contact actions


Primary button:


Plain text






```
Email Abdul ↗

```





Open Gmail compose:


Plain text






```
https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abdulhananabrar@gmail.com

```





Use:


HTML






```
target="_blank"
rel="noopener noreferrer"

```





Accessible label:


Plain text






```
Email Abdul via Gmail, opens in a new tab

```





Secondary text link:


Plain text






```
LinkedIn profile ↗

```





URL:


Plain text






```
https://linkedin.com/in/abdul-hanan-abrar-8b6a9140b

```





Open in a new tab.


Personal website link:


Plain text






```
Personal website ↗

```





URL:


Plain text






```
https://abdul-hanan-abrar.github.io/abdulhanan/#

```





Open securely in a new tab.


## Contact details


Show:


Plain text






```
abdulhananabrar@gmail.com

```





Use a mailto fallback.


Show:


Plain text






```
+92-326-1550100

```





Use a telephone link.


Show:


Plain text






```
abdul-hanan-abrar.github.io/abdulhanan

```





Link to the public personal website.


Show:


Plain text






```
Faisalabad, Pakistan · Remote

```






# Footer


Create a compact dark green footer.


Include:


Plain text






```
© 2026 Abdul Hanan

```





Include:


Plain text






```
Personal website ↗

```





Link:


Plain text






```
https://abdul-hanan-abrar.github.io/abdulhanan/#

```





Open securely in a new tab.


Include:


Plain text






```
Built with clarity & care

```






# Accessibility requirements


Use:



- Semantic HTML structure

- Proper heading hierarchy

- One `h1`

- Clear `h2` headings for all seven sections

- Accessible navigation labels

- Visible keyboard focus rings

- Strong color contrast

- Descriptive image alt text

- `aria-hidden="true"` on decorative icons

- Proper `lang="ur"` and `dir="rtl"` on Urdu text

- Keyboard-accessible buttons and links

- Reduced-motion support

- Accessible labels for external links

- No text embedded only in images

- Touch-friendly buttons and links



Use an orange focus outline with sufficient contrast.



# Interaction requirements


Implement:



1. Smooth section scrolling.

2. Sticky header.

3. Light/dark mode toggle.

4. System theme preference detection.

5. Theme preference persistence.

6. Hover states on buttons and links.

7. Keyboard focus states.

8. Reduced-motion support.

9. External links opening safely in a new tab.

10. Download CV behavior.

11. Gmail compose behavior.

12. Google Drive voice-sample links.

13. Responsive navigation on mobile.



Do not use a contact form.


Do not add fake form submission behavior.


Do not claim that emails are sent automatically. Gmail links should open a compose window and allow the visitor to press Send.



# Required assets


Use these assets:


Plain text






```
abdul-hanan-portrait.jpeg
Abdul_Hanan CV.pdf

```





The portrait should appear in the hero section.


The PDF should be used by the Download CV button.



# Important content accuracy rules


Do not invent:



- Formal teaching employment

- Testimonials

- Client names

- New certifications

- New employers

- New degrees

- New rates

- New projects

- New voice recordings

- New audio descriptions

- New performance claims



Use only these verified facts:



- Abdul Hanan uses they/them pronouns.

- Abdul is based in Faisalabad, Pakistan.

- Abdul is a native Urdu speaker with C2-level Urdu proficiency.

- Abdul is fluent in Punjabi.

- Abdul has B2 English proficiency.

- Abdul has bilingual customer support experience.

- Abdul has worked at Aptly Pharmaceuticals.

- Abdul achieved a reported 92% CSAT.

- Abdul created a 12-sheet validation workbook.

- The workbook reduced data-entry errors by half.

- Abdul created reporting automation using Python/openpyxl and Excel.

- Reporting errors dropped close to zero.

- Abdul identified a DD/MM versus MM/DD data-format issue.

- Abdul is studying BSc Computer Science at UAF.

- Expected graduation is 2028.

- Abdul completed Intermediate in Computer Science at Punjab Group of Colleges.

- Abdul has Microsoft Office Management certification from 2022.

- Abdul is available for remote opportunities.




# Final Figma AI instruction


Create the full portfolio as a coherent design system, not as disconnected screens.


The first viewport must immediately show:



- Abdul’s portrait

- Large bold name: Abdul Hanan

- Pronouns

- Urdu tutor and language-data role

- Main CTA

- Download CV button

- Personal website button

- No excessive blank space



Make every section feel intentional and content-rich.


Keep section headings bold and readable.


Keep the voice-sample section compact and balanced, with no large empty gap between the heading and cards.


Do not show the old AH/PORTFOLIO header brand.


Do not show the old “Language with care / Native Urdu — C2” badge in the portrait area.


Do not add a contact form.


Ensure the final prototype links work correctly and all external links open safely in new tabs.











Provided the complete Figma AI recreation prompt with the portfolio’s verified content, visual system, layout, assets, links, interactions, accessibility requirements, and all requested changes.