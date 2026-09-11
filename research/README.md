# OMD Research

Reference material gathered from a full crawl of https://onlinemarketingfordoctors.com (September 2026),
to support landing page work.

## Contents

- **`OMD-BRAND-KNOWLEDGE.md`** — the distilled brand, positioning, proof and voice guide. Start here.
- **`site-content/`** — plain-text extract of all 258 crawled pages, one file per page.
  Filenames mirror URL slugs (`/` becomes `__`, homepage is `HOME.txt`).
  Each file starts with TITLE / META / URL. Shared nav and footer boilerplate has been stripped.
- **`site-content-urls.txt`** — the full list of crawled URLs.

## Scope

Crawled from the Yoast sitemap index: all pages (197), case studies (25), portfolio/work (28)
and AI vertical pages (9). Blog posts (102) and podcast episodes (164) were deliberately excluded.

## Searching

```bash
grep -ril "deep plane facelift" research/site-content/
grep -h "%" research/site-content/case-study*.txt
```
