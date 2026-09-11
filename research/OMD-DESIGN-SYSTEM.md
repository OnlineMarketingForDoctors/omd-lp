# OMD landing page design system

The reference implementation is `medical-seo/index.html`. Everything below is
extracted from it. When the two disagree, the page wins and this file should be
corrected.

Read this together with `research/KINGKONG-VOICE-GUIDE.md` (how the copy
sounds) and `research/OMD-BRAND-KNOWLEDGE.md` (what is true about the agency
and what may be claimed).

---

## 1. Fixed brand elements

These came off OMD's live site and do not change without the client asking.

### Colour

```css
--omd-green:#00DB98;         /* the accent. Never a body-text colour on white */
--omd-green-bright:#00FFB3;  /* hover, and the accent on dark bands */
--ink:#2E2E2E;               /* body text */
--ink-nav:#111111;
--black:#000000;             /* true black, not a tinted near-black */
--white:#FFFFFF;
--muted:#B2B2B2;
--band:#F4F6F7;              /* grey band */
--band-soft:#F9F9F9;         /* hover fill */
--hairline:#E9ECEF;
--highlighter:#FFD0CC;       /* pale coral. Marks things that are wrong or worthless */
```

Supporting greys used inline for secondary text: `#5C6663` on white,
`#CFD7D4` / `#9AA5A2` on black.

Black is `#000000`. Do not substitute `#0B0B0B` or `#111` for it.

### Type

```css
--font-body:Montserrat;      /* 300 body, 500/600 labels, 700 headings */
--font-action:Oswald;        /* buttons, nav, tabs. Nothing else */
--font-display:"Kaushan Script";  /* margin notes only. See 3.4 */
```

Body is Montserrat **300** at 18px/27px. The light weight is part of the brand;
do not raise it to 400 to "fix" contrast.

### Buttons

Square corners, Oswald, uppercase, 2px tracking, `20px 44px`, and the house
shadow `0 10px 20px #999` (on dark surfaces `0 10px 24px rgba(0,0,0,.55)`).
Three variants: `.btn-primary` (black), `.btn-green`, `.btn-outline`.

Uppercase is correct **here and in the nav and tab bars, and nowhere else.**

### Shape

`border-radius: 0` everywhere. Images carry `--shadow-media` /
`--shadow-media-strong`, never a border.

### Layout

`--container:1190px` for text, `1440px` (`.wrap-wide`) for full-bleed and
tabular content, `--gutter:24px` falling to 18px under 640px.

---

## 2. Type scale

```css
h1 { clamp(36px,5.4vw,58px);  line-height:1.02; letter-spacing:-.025em }
h2 { clamp(32px,5.2vw,66px);  line-height:1.00; letter-spacing:-.032em; max-width:18ch }
h3 { clamp(20px,2.4vw,29px);  line-height:1.14; letter-spacing:-.018em }
```

Display type is large and tightly tracked. The `18ch` measure on `h2` is
deliberate: headlines should break across two or three lines and read as
headlines, not run as one flat sentence. Keep h2 copy short enough that it
breaks well at that measure; if it needs five lines, cut the copy rather than
widen the measure.

Body measure stays under ~62ch. `.band-head` runs to 58ch.

---

## 3. The editorial rules

This is the part that matters for future work. The page was redesigned away
from a uniform card grid because every section looked the same regardless of
what it contained. The governing idea: **the page's asset is evidence, so each
kind of evidence gets its own shape.**

### 3.1 Structure encodes information

Rules, numbers, labels and dividers are there to say something about the
content, not to decorate it.

- **Numbered markers only for real sequences.** The nine-step process is
  numbered because it is nine steps in order. The vanity-metrics list is not a
  sequence and carries metric names instead. Before adding `01 / 02 / 03`,
  check the content is actually ordered.
- **Counts belong in the margin.** The specialities index sets the screenshot
  count large at the left and the name beside it, because the quantity is the
  point.
- **Unequal data gets unequal weight.** The figure band leads with 385 at
  ~168px and drops the other three to supporting rows. Testimonials use one
  lead quote and two smaller ones. Do not flatten a set into identical tiles
  when one member carries the argument.
- **Record data gets labelled fields.** Case-study metadata is a `<dl>` with
  Speciality / Location / Campaign, not a dot-joined string.

### 3.2 Labels above headings

`.eyebrow` is a sentence-case label in Montserrat 500 with a 34px green rule
before it. It is **not** a tracked-out all-caps kicker.

Use one only when it adds information the heading does not carry. "Who we work
with" above "Nineteen specialities, one discipline" adds nothing and was
deleted. "The part most agencies skip" earns its place. The page currently
runs 7 across ~16 sections; treat that as the ceiling.

The one exception is `.hero-kicker`, which is Oswald uppercase. That is the
approved hero treatment and stays.

### 3.3 The highlighter has a job

`#FFD0CC` marks the thing being criticised. In the vanity-metrics ledger it
colours the metric your last agency reported; the honest column beside it is
plain. Do not use it as a general tint or a decorative wash.

### 3.4 Kaushan Script is Huyen's handwriting

`.note` is the founder speaking in the margin: display face, ~21-30px,
rotated -1.4deg, capped at 22ch, with a short green rule above it. Used three
times across the page. It is an aside in her voice, not a heading style and
not a pull quote. Four or five instances would be too many.

### 3.5 Motion

One reveal (`.rv`) on scroll, hover only on genuinely interactive things.
`prefers-reduced-motion` is respected and must stay respected.

---

## 4. What we deliberately do not do

These are the patterns that make a page look machine-generated. They were all
removed from `medical-seo/index.html` and should not come back.

| Don't | Do instead |
|---|---|
| Tracked-out ALL-CAPS eyebrow above every heading | Sentence-case label with a green rule, only where it adds something |
| Meta strings joined with middle dots (`A · B · C`) | Labelled fields, or plain punctuation |
| `01 / 02 / 03` markers on content that is not a sequence | Name the items, or drop the markers |
| Every section chopped into identical rounded cards | Give each section the shape its content has |
| One border-radius and one soft grey shadow on everything | Square corners; the house media shadow on images only |
| Tinted near-black (`#0B0B0B`, `#111`) standing in for black | `#000000` |
| Monospace for small data labels | Montserrat |
| `→` appended to link and button text | Let the words do it |
| Accenting a single word in a headline in green | Write a headline that does not need it |
| Warm cream + serif display + terracotta accent | The OMD palette above |
| Fade-and-slide-up on every section, hover transitions on every card | One reveal, hover on interactive things only |

---

## 5. Working method

1. Load the `frontend-design` skill (`.claude/skills/frontend-design/`) before
   any visual work.
2. Serve locally (`python3 -m http.server 8080` from the repo root) and
   screenshot with Playwright at 1440 and 390 before committing. Chromium is at
   `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
3. Check horizontal overflow at 390px (`scrollWidth === clientWidth`).
4. Watch CSS specificity. `.proc-item p` silently beat `.proc-num` and shrank
   the step numerals to 16px; element selectors inside a component will
   override single-class selectors.
5. In the sandbox, Google Fonts, YouTube and leadconnectorhq are blocked from
   the browser. Kaushan Script falling back to a serif locally is not a bug;
   verify those on the deployed URL.

## 6. Copy rules

UK English. **No em-dashes.** King Kong register at about 70%, calibrated for a
regulated medical audience — see `KINGKONG-VOICE-GUIDE.md` for what cannot
transfer (no profanity, no ranking guarantees, no naming competitors). Sentence
case in labels and CTAs. The button that says "Book a free strategy call"
leads to something that calls itself a free strategy call.

## 7. Deployment

`main` auto-deploys to production at https://omd-lp.vercel.app. The whole
project is permanently no-indexed by three layers, and all three must stay:

- `X-Robots-Tag` header in `vercel.json`
- `<meta name="robots">` in each page
- `robots.txt` that **allows** crawling, so crawlers can read the noindex. A
  `Disallow` here would break it, because a blocked URL can still be indexed
  from external links. Do not "tidy" that rule.
