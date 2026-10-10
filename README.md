# SahajPath 📖🔊
### Reaching every learner, through every barrier.

> An accessibility-focused learning app that converts any educational content into **simplified text, audio, and the learner's own language** — and lets students **ask questions by voice**, grounded strictly to their own textbook. Built for the learners existing tools leave behind: those who can't read well, can't see, or don't speak the language of instruction.

**Hackathon:** Hackintym (30-hour) · **Track:** EdTech & Social Impact · **Team:** Grix

> 🪔 *"Kadhai kekka ellarukum aasa dhaan… aana ellarukum puriyura maadhiri sollanumla!"*
> — Everyone longs to hear the story; it just has to be told so **everyone** can understand. That line is our entire design brief.

---

## 📑 Table of Contents
- [Problem Statement](#problem-statement)
- [Enhanced Problem Statement](#our-enhanced-problem-statement)
- [Why This Needs Solving](#why-this-needs-solving)
- [Who It's For](#who-its-for)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [Six Signature Features](#six-signature-features)
- [Meeting the Constraints](#meeting-the-constraints)
- [How It's Different (vs ChatGPT & Existing Apps)](#how-its-different)
- [National Alignment](#national-alignment)
- [How It Works](#how-it-works)
- [Input Sources](#input-sources)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Impact](#impact)
- [SDG Alignment](#sdg-alignment)
- [The Full Story](#the-full-story)
- [Team](#team)

---

## Problem Statement

> **EdTech & Social Impact — PS 03/03: AI-Based Accessible Learning Content Transformation Platform**
>
> Create an accessibility-focused application that converts educational content into simplified text, audio, and multiple languages to support learners with diverse learning needs and improve inclusive education.

### Our Enhanced Problem Statement

The official statement asks for an app that *converts* content into simplified text, audio, and languages. We treat that as the **floor**, and push it into something distinctive, defensible, and genuinely inclusive:

| What the PS asks for… | How SahajPath enhances it |
|---|---|
| One-way **transformation** of content | **Two-way interaction** — learners also **ask questions by voice** and hear grounded answers |
| Support for "diverse learning needs" | **The full spectrum in one layer** — can't-read (simplify), can't-see (audio + figure description), doesn't-speak-the-language (translate + voice), can't-understand (adaptive re-explain) |
| **Static** simplified output | **Adaptive** output — auto-calibrates to each learner's level via a comprehension loop |
| An AI that **generates** content | **Grounded** AI — every response locked to the student's *own* material; no hallucination, on-syllabus |
| "Educational content" | **Any format** — typed text, photo/scan, PDF, or document, all normalized into one pipeline |

> **In one line:** *Not a reader that transforms content for one kind of learner — a single adaptive, grounded accessibility layer that makes any lesson learnable for **every** kind of learner.*

---

## Why This Needs Solving

Millions of students sit in classrooms where the lesson is simply out of reach:

- 📉 **The reading gap** — Around **4 in 10 rural Class-5 students in India cannot read a Class-2 level text** (ASER). A child handed a textbook they can't decode quietly falls behind.
- 🗣️ **The language gap** — A large share of children are taught in a language that isn't their mother tongue. **NEP 2020 explicitly recommends mother-tongue instruction till Grade 5** — national policy confirming this is a real barrier.
- ♿ **The accessibility gap** — Blind, low-vision, and dyslexic learners have almost no accessible study material, even though the **Rights of Persons with Disabilities Act, 2016 legally mandates accessible education.**
- 👩‍🏫 **The one-teacher-many-levels reality** — A single teacher in a multi-grade government school cannot hand-craft a version of each lesson for every child's level and language.

> *(Verify the latest exact figures before using them in a submission or pitch.)*

The result: the learners who need the most support get the least.

---

## Who It's For

| Learner | Barrier today | What SahajPath gives them |
|---|---|---|
| Below-grade / slow readers | Text is too hard | Simplified text at their level |
| Blind / low-vision students | Can't read the page or its diagrams | Audio-first + spoken description of figures |
| Students whose home language ≠ medium | Can't understand the language | Translation + voice in their language |
| Low-literacy learners | Can't type or read a prompt | Hands-free, scan-and-speak interface |
| Teachers of multi-grade classes | No time to differentiate | One scan → versions for every level & language |

---

## Our Solution

**SahajPath** (*सहज पाठ* — "easy lesson") is not a reader for one kind of learner. It is a single **adaptive accessibility layer** that makes any lesson learnable for *every* kind of learner.

A teacher or student feeds it a lesson — **scan a textbook page, upload a PDF, or paste text** — and SahajPath transforms it into whatever that learner needs: simpler words, their own language, spoken audio, or an answer to a question they ask out loud.

---

## Key Features

### Core
- **🧩 Adaptive simplification** — rewrites any lesson to the learner's reading level **while preserving definitions, equations, and key relationships** (Rule 02). A short comprehension check **auto-corrects the level**: wrong → drop a level and re-explain; correct → nudge up.
- **🖼️ Multi-format extraction** — OCR + a multimodal model pull text *and structure* from scans, PDFs, images, diagrams, charts, and flowcharts, with per-element **bounding boxes and confidence** (Rules 01 & 04), and spoken descriptions of diagrams for blind learners.
- **🌐 Multi-language** — translates the lesson into the learner's regional Indian language, **keeping technical terms and mathematical context intact** (Rule 03).
- **🔊 Read-aloud with word highlighting** — natural audio with each word lighting up as it's spoken; equations and technical terms read correctly.

### Signature differentiator — "Talk to Your Lesson" 🎙️ *(beyond the required rules)*
- The student **asks a question by voice** and **hears the answer spoken back in their language** — fully hands-free.
- Every answer is **grounded strictly to the scanned page** — if it's not in the lesson, SahajPath won't make it up. No hallucination, no off-syllabus content.

### Explainability & trust (Rule 04)
- **🔎 Source bounding boxes + confidence** — tap any simplified line to see exactly where it came from on the original page, with a confidence indicator; low-confidence spans are flagged for review.
- **↔️ Original ↔ Simplified** — a one-tap toggle to compare the original and simplified versions side by side.

### Built for accessibility — WCAG 2.2 AA (Rule 05)
- Screen-reader friendly (semantic HTML + ARIA), full keyboard navigation, visible focus, ≥ 4.5:1 contrast, large touch targets, and an OpenDyslexic + line-spacing toggle.

### Works anywhere (Rule 06)
- **📶 Low-bandwidth mode** — text-first lightweight payloads and offline replay of already-processed lessons; graceful fallback to the original when OCR, translation, or extraction is uncertain.

### Bonus (beyond the rules)
- **🎨 Visual Explainer** — an AI whiteboard that *draws* the concept (labelled diagram + arrows) so visual learners see how it works, not just read it.
- **🗺️ Smart Study Plan** — turns one lesson into a personalized revision path with spaced-repetition steps and progress tracking.
- **👩‍🏫 Teacher struggle-map** *(if time)* — comprehension results roll up into "which concepts the class struggled with."

---

## Six Signature Features

*The "wow" layer that makes SahajPath more than a converter — beyond the required rules.*

1. **🪔 Desi Analogy Engine** — explains concepts with rural, lived-in analogies (chloroplast → *"a chulha / solar cooker inside the leaf"*; vein → *"a pipe from the village handpump"*), not academic jargon. *"We translate foreign textbook abstractions into the child's everyday reality."*
2. **👆 Chhuo-Suno (Touch-to-Hear)** — slide a finger across a diagram and each part *speaks itself*, with a buzz on the edges — a tactile audio soundscape for blind / low-vision learners, no Braille embosser needed.
3. **🗣️ Bhasha-Setu (Bolchaal Mode)** — natural Hinglish / code-switched explanations that keep technical keywords in English. *"Sounds like a real teacher, not a legal gazette."*
4. **🧑‍🏫 Didi / Bhaiya Companion** — a warm, Socratic peer tutor that guides with questions and gently redirects off-topic chat back to the lesson.
5. **📴 Micro-Packet (Audio QR)** — one scan → a printable 3-tier worksheet + an ultra-compact audio code that works on a feature phone with zero streaming. *"Accessibility isn't accessible if it needs 5G."*
6. **🎯 Focus Flow** — Bionic-reading (bold word-starts to guide the eye) + a one-idea-at-a-time carousel, for dyslexia, ADHD and cognitive fatigue.

---

## Meeting the Constraints

The hackathon defines six hard rules. SahajPath is designed to satisfy **all six** — here's exactly how:

| # | Rule | How SahajPath meets it | Scope |
|---|---|---|---|
| **01** | Extract text + structure from PDFs, scans, images, diagrams, charts, flowcharts (OCR + multimodal) | OCR engine returns text with per-word **bounding boxes + confidence**; a multimodal model reads diagrams/charts/flowcharts and extracts their structure | Core |
| **02** | Simplify to a selected reading level, preserving definitions, equations, relationships, meaning | Level-targeted prompt with explicit guardrails to **keep equations, defined terms, and cause→effect relationships** intact | Core |
| **03** | Accurate audio + multiple languages, preserving technical terms & math | Translation + TTS that keep technical terms untouched and read equations correctly | Core |
| **04** | Explainable output: source bounding boxes, confidence scores, original-vs-simplified | Tap a simplified line → highlights its **source box on the original**; confidence shown as color; one-tap **original ↔ simplified** toggle | Core — key differentiator |
| **05** | WCAG 2.2 AA: screen reader, keyboard nav, high contrast, dyslexia-friendly | Semantic HTML + ARIA, full keyboard navigation, visible focus, ≥ 4.5:1 contrast, large targets, OpenDyslexic + spacing toggle | Core |
| **06** | Low-bandwidth + graceful OCR/translation/multimodal uncertainty | Text-first lightweight payloads, caching/offline replay; low-confidence spans **flagged and fall back to the original** | Core |

> **Engineering synergy:** one OCR-with-boxes-and-confidence engine satisfies Rules **01, 04, and 06** at once — extraction, explainability, and uncertainty handling share the same backbone.

**Bonus (beyond the rules):** voice "Talk to your lesson" Q&A, adaptive comprehension loop, **AI Visual Explainer** (whiteboard), **Smart Study Plan**, teacher struggle-map.

---

## How It's Different

The question every judge asks: *"Why not just use ChatGPT?"*

**Because our users can't use ChatGPT.** To use it you must read, type, know what to ask, in a language you can write — and then trust an answer that may be invented. A blind student, or a child who can't read the language of instruction, cannot do that.

| Capability | ChatGPT | Existing apps (BhashaMitra, VidhyaAI) | **SahajPath** |
|---|---|---|---|
| Who can operate it | Needs reading + typing + prompting | Parent-operated; child needs sight/reading | **Scan + voice, zero typing** |
| Grounded to the student's own textbook | ❌ can hallucinate / go off-syllabus | ✅ | ✅ |
| Simplify + translate + audio | ✅ English-first | ✅ limited | ✅ regional-first |
| Ask a question *by voice*, grounded | ⚠️ not grounded | ❌ passive | ✅ **hero feature** |
| Describes diagrams for blind learners | ⚠️ manual | ❌ | ✅ |
| Auto-adapts to the student's level | ❌ | ❌ | ✅ |
| Serves blind / low-literacy learners | ❌ | ❌ | ✅ by design |

We call an LLM under the hood — the model is a commodity. **The project is the accessibility, the grounding, and the integration we built around it, for the people the raw tool leaves out.**

---

## National Alignment

SahajPath strengthens — rather than duplicates — India's existing education stack:

- **NEP 2020 & NIPUN Bharat (FLN by 2026-27)** — supports foundational literacy by meeting each child at their reading level.
- **RPwD Act 2016** — operationalises the legal mandate for accessible education.
- **Complements DIKSHA & PM eVIDYA** — transforms their standard content into simplified, accessible, verifiable form.
- **Extends Sugamya Pustakalaya** — that library holds *pre-converted* books; SahajPath transforms *any* lesson, including today's worksheet, on demand.

**Why existing platforms don't already solve this:** DIKSHA / PM eVIDYA deliver standard content; Sugamya Pustakalaya is a fixed accessible-book library. None simplify arbitrary content to a child's level, make any page accessible on demand, or let users verify the output. **That gap is SahajPath.**

---

## How It Works

```
            +----------------------------------------------+
  INPUT     |   Scan page      Upload PDF      Paste text   |
            +---------------------------+------------------+
                                        |  (OCR if needed)
                                        v
            +----------------------------------------------+
  AI CORE   |  Extracted lesson text  ->  grounded context |
 (grounded  |    - Simplify to reading level               |
  to the    |    - Translate to chosen language            |
  page)     |    - Text-to-Speech (read-aloud)             |
            |    - Voice Q&A: Speech-to-Text -> answer -> TTS |
            |    - Describe figures (vision)               |
            |    - Comprehension check -> adapt level       |
            +---------------------------+------------------+
                                        v
            +----------------------------------------------+
  OUTPUT    | Simplified text . Audio . Translation .      |
            | Spoken answers . Figure descriptions         |
            +----------------------------------------------+
```

**Key principle:** every generated response is constrained to the content of the scanned lesson — SahajPath explains and simplifies *the student's own material*, it does not invent new content.

---

## Input Sources

SahajPath normalizes **every** input into the same two things the AI works on — **text and images** — so a single pipeline serves many formats. Each format only needs a small adapter to extract its content.

| Input | How it's handled | Status |
|---|---|---|
| ✍️ Typed / pasted text | Fed directly into the pipeline | ✅ Supported |
| 📷 Photo / image of a page (printed or handwritten) | A vision model reads the text *and* the diagrams directly (also powers figure description) | ✅ Supported |
| 📄 PDF | Text extracted; scanned PDFs are processed page-by-page as images | ✅ Supported |
| 📝 Word document (DOC / DOCX) | Text extracted via a document parser | ✅ Supported |
| 📊 Presentation (PPT / PPTX) | Text pulled from slides; slide images handled via vision | ⚠️ Planned |
| 🎥 Video lecture | Audio transcribed (speech-to-text), then the transcript is simplified | 🚧 Roadmap |

> **Principle:** the question is never *"does it support format X?"* — it's *"can we extract the lesson's text and images from X?"* Once extracted, simplification, translation, audio, and voice Q&A work identically for every source.

---

## Tech Stack

> Indicative stack — adjust to whatever your team ships fastest in.

- **Frontend:** React (mobile-friendly web app)
- **Backend:** Node.js / Express (thin layer to hold API keys and orchestrate calls)
- **AI / LLM:** an LLM API for simplification, translation, Q&A, and comprehension generation (all via prompts — no model training)
- **Speech:** Web Speech API (free, in-browser) for English; a TTS/ASR service (e.g., Bhashini / a cloud TTS) for Indian languages
- **OCR:** Tesseract.js or a cloud Vision API (for scan/photo input)
- **Vision:** a multimodal model for figure/diagram description

---

## Getting Started

> ⚠️ Replace the placeholders with your actual values. **Never commit API keys** — keep them in `.env` (which must be git-ignored).

### Prerequisites
- Node.js 18+ and npm
- An API key for your chosen LLM / speech provider

### Setup
```bash
# 1. Clone the repo
git clone <your-repo-url>
cd sahajpath

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
#    then edit .env and add your keys:
#    LLM_API_KEY=your_key_here
#    TTS_API_KEY=your_key_here

# 4. Run the app
npm run dev
```

The app will start at `http://localhost:3000`.

---

## Usage

1. Open the app and **choose a starting reading level** (or let the teacher set it).
2. **Scan a page, upload a PDF, or paste** a lesson.
3. Pick the **language** and whether you want **audio**.
4. Read or listen to the simplified lesson, with each word highlighting as it's spoken.
5. **Press the mic and ask a question** — hear the answer in your own language.
6. Take the short **comprehension check**; SahajPath adapts the level based on your answers.

---

## Roadmap

- [ ] **Indian Sign Language layer** — key academic terms linked to ISL video clips for Deaf learners
- [ ] **Fully offline, on-device processing** — extraction & simplification with *no* connectivity at all (deeper than the low-bandwidth mode already in the core)
- [ ] **Whole-school rollout** — teacher dashboards and class-wide analytics
- [ ] **More languages & voices** — expand regional coverage
- [ ] **Spaced-repetition practice** — long-term retention from the student's own lessons

---

## Impact

- A Class-5 student reading at a Class-2 level gets the **same lesson in words they can actually read**.
- A blind student **hears the chapter and its diagrams today**, instead of waiting for a scarce braille copy.
- A child in an English-medium school finally understands the lesson **in their own language, by voice**.
- A teacher prepares inclusive material for a mixed-ability class in **minutes instead of hours**.

**A 30-hour prototype doesn't solve inclusive education — but it is a working proof that the AI we already have can be made usable by the learners who need it most.**

---

## SDG Alignment

- **🎓 SDG 4 — Quality Education** *(primary)* — understandable learning for all; supports targets **4.1** (learning outcomes), **4.5** (persons with disabilities), **4.6** (literacy), **4.a** (inclusive environments).
- **⚖️ SDG 10 — Reduced Inequalities** — closes the gap for below-grade, non-native-language, and disabled learners (**10.2**).
- **💡 SDG 9 — Innovation & ICT Access** — AI/ICT widens access to knowledge, even on low bandwidth (**9.c**).

> *SahajPath advances **SDG 4** and **SDG 10**, powered by **SDG 9** — inclusive learning for every learner.*

---

## The Full Story

*What · Why · How · What Improves — the end-to-end narrative, ready to present.*

> 🪔 *"Kadhai kekka ellarukum aasa dhaan… aana ellarukum puriyura maadhiri sollanumla!"*
> *Everyone wants to hear the story — it just has to be told so **everyone** can understand.* That one line is our entire project.

### 1. WHAT — the problem

The brief (PS 03) asks for an app that converts educational content into **simplified text, audio, and multiple languages** for learners with diverse needs.

In a real classroom, the same lesson is handed to every child — but it reaches only *some*. It's out of reach for:
- the child who reads three grades below level,
- the blind or low-vision student who can't see the page or its diagrams,
- the child whose mother tongue isn't the language of instruction,
- and the one teacher juggling all of them, with no time to make a version for each.

**The problem isn't a lack of content — it's that the content can't *reach* the learner.**

### 2. WHY — why it must be solved

- 📉 Around **4 in 10 rural Class-5 students in India can't read a Class-2 text** (ASER).
- 🗣️ Many learn in a language that isn't their own — **NEP 2020 mandates mother-tongue teaching till Grade 5**.
- ♿ Blind, low-vision, and dyslexic learners have almost no accessible material, though the **RPwD Act 2016 legally requires it**.

**The learners who need the most support receive the least — we close that gap.** *(Verify the latest exact figures before presenting.)*

### 3. HOW — what we built

**SahajPath is one adaptive, grounded accessibility layer** that makes any lesson learnable for every learner. Give it a lesson — scan a page, snap a photo, upload a PDF or doc — and it:
1. **Understands it** — OCR + a multimodal model extract text *and structure* (diagrams, charts, flowcharts), each with **bounding boxes + confidence**.
2. **Simplifies it** — to the learner's reading level, **without losing** definitions, equations, or relationships.
3. **Translates & speaks it** — into their language, as audio with word highlighting, **keeping technical terms intact**.
4. **Proves itself** — tap a simplified line to see where it came from on the original, with confidence, and flip **original ↔ simplified**. Nothing is invented.
5. **Reaches everyone** — fully **WCAG 2.2 AA** and built for **low bandwidth**, degrading gracefully when unsure.

*Signature extra (beyond the rules):* the student can **ask a question by voice and hear the answer** in their language — hands-free.

### 4. WHAT IMPROVES — before → after

| Learner | Before | After |
|---|---|---|
| Below-grade reader | Falls behind silently | Reads the same lesson in words they understand |
| Blind / low-vision student | Waits for scarce braille; diagrams lost | **Hears** the lesson *and its diagrams* today |
| Non-native-language child | Memorises without understanding | Understands it **in their own language** |
| Teacher of a mixed class | Can't differentiate for 40 kids | Prepares inclusive material in **minutes** |

**Measurable:** readability dropping (e.g., Grade 9 → Grade 4), number of levels + languages per lesson, teacher prep-time saved, and comprehension pass rates.

### 5. In one line

> *We don't help one kind of learner read one page. We make any lesson learnable for the child who can't read it, can't see it, or doesn't speak its language — because everyone deserves to understand the story.*

---

## Team

**Grix** — Hackintym 2026

| Name | Role |
|---|---|
| _TBD_ | Frontend |
| _TBD_ | AI / Backend |
| _TBD_ | Design / Pitch |

---

## Acknowledgements

- Problem statement: Hackintym — EdTech & Social Impact track
- Reading-level data: ASER (Annual Status of Education Report)
- Policy context: NEP 2020, RPwD Act 2016
- Indian-language speech / translation: Bhashini

---

*Built with ❤️ for inclusive education.*
