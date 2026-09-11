# omd-lp

Landing pages for Online Marketing For Doctors, a healthcare-only digital
marketing agency (London and Sydney). Static HTML, no framework, deployed to
Vercel from `main`.

## Read these before working on a page

| File | What it governs |
|---|---|
| `research/OMD-DESIGN-SYSTEM.md` | Palette, type scale, buttons, and the editorial layout rules. **Read this before any visual change.** Section 4 lists the patterns we deliberately avoid. |
| `research/KINGKONG-VOICE-GUIDE.md` | How the copy sounds, and what cannot transfer from King Kong without regulatory risk. |
| `research/OMD-BRAND-KNOWLEDGE.md` | What is true about the agency: case study figures, testimonials, process, compliance. Claims must trace back to this file. |

Also load the `frontend-design` skill (`.claude/skills/frontend-design/`) before
visual work.

## Non-negotiables

- **Permanent no-index on every page.** Three layers, all required: the
  `X-Robots-Tag` header in `vercel.json`, a `<meta name="robots">` tag, and a
  `robots.txt` that *allows* crawling so the noindex can be read. Do not
  "tidy" the robots.txt into a `Disallow`.
- **UK English, and no em-dashes anywhere in copy.**
- **No ranking guarantees.** No honest agency can promise a position on Google,
  and the GMC and ASA constrain what a medical advertiser may claim. See the
  compliance section of the brand knowledge file.
- **Evidence must be real.** Every figure on a page traces to OMD's own
  published case studies or to the screenshot archives in `results/`. Do not
  invent a metric to fill a layout.

## Layout

```
medical-seo/          the Medical SEO landing page (reference implementation)
  index.html          page + inline <style>; the design system lives here
  results-data.js     window.OMD_RESULTS, 195 curated screenshots
images/               generated imagery, WebP
results/seo/          385 client ranking screenshots + index.csv manifests
results/ai-search/
brand/ client-logos/ client-photos/
research/             brand, voice and design references (see table above)
```

## Working method

- Serve with `python3 -m http.server 8080` from the repo root; the page is at
  `/medical-seo/`.
- Screenshot with Playwright before committing, at 1440 and 390. Chromium is
  at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Do not run
  `playwright install`.
- The sandbox proxy blocks Google Fonts, YouTube and leadconnectorhq **from the
  browser** (curl works). A script face falling back to serif, or an empty
  booking widget, is the sandbox, not the page. Verify those on the deployed
  URL.
- No PIL, cwebp or ImageMagick, and pip times out. Image conversion goes
  through headless Chromium's canvas API.
- Push to `main`; Vercel deploys it. Confirm with `curl -L` — the bare
  production host 302s before it 200s.
