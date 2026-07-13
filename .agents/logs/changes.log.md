# Changes Log — 2026-07-13 Session
**Agent:** Multi-Agent Scan + Fix + Deploy
**Scope:** Full audit of `github-pages-export/` with applied fixes + Surge deployment

---

## 1. Performance — WebP Image Conversion

| Original | Format | Before | After | Reduction |
|----------|--------|-------:|------:|----------|
| cv.jpg | WebP | 346 KB | 148 KB | **57%** |
| Abdelmonaim_2019.jpg | WebP | 93 KB | 18 KB | **80%** |
| WhatsApp 17-06 (game) | WebP | 111 KB | 63 KB | **43%** |
| WhatsApp 19-06 (game) | WebP | 46 KB | 19 KB | **59%** |
| 0.jpeg (game) | WebP | 37 KB | 22 KB | **38%** |
| WhatsApp 20-01 (docs) | WebP | 31 KB | 25 KB | **20%** |
| **Total** | | **664 KB** | **297 KB** | **55%** |

**Backup:** Originals preserved in `D:\Computer\My CV WebSite\_originals_backup\` (outside deploy path).
**Quality:** 82% (method=6) — visually lossless for photographic content.
**OG images:** `cv.jpg` (346 KB) kept as JPG for 100% social preview compatibility.

## 2. Performance — File Minification

| File | Before | After | Saved |
|------|-------:|------:|------|
| style.css | 30.8 KB | 24.3 KB | 6.5 KB |
| script.js | 25.8 KB | 22.8 KB | 3.0 KB |
| prayer-times.js | 14.9 KB | 11.6 KB | 3.3 KB |
| **Total** | **71.5 KB** | **58.7 KB** | **9.5 KB** |

## 3. Performance — Hero Image Preload
- `<link rel="preload" as="image" href="public/images/cv.webp">` added to `<head>`

## 4. SEO — Alt Text (Bilingual)

| Image | Before | After |
|-------|--------|-------|
| brand-photo | `عبد المنعم فاروق` | `Abdelmonaim Farouq - Power & Control Engineer \| عبد المنعم فاروق - مهندس كهرباء وتحكم` |
| CV portrait | `صورة السيرة المهنية لعبد المنعم فاروق` | `Abdelmonaim Farouq CV Portrait - Power & Control Engineer \| صورة السيرة المهنية...` |
| Knight Risen | `Knight Risen` | `Knight Risen Game Screenshot \| لقطة شاشة لعبة Knight Risen` |
| Bob Jump | `Bob Jump` | `Bob Jump Game Screenshot \| لقطة شاشة لعبة Bob Jump` |
| Space Invaders | `Space Invaders` | `Space Invaders Game Screenshot \| لقطة شاشة لعبة الفضاء Space Invaders` |

## 5. SEO — hreflang Tags
- `hreflang="ar"` → `https://eng-abdelmoneim-farouq-cv.surge.sh/`
- `hreflang="en"` → `https://eng-abdelmoneim-farouq-cv.surge.sh/?lang=en`
- `hreflang="x-default"` → `https://eng-abdelmoneim-farouq-cv.surge.sh/`

## 6. SEO — Search Engine Files
- `sitemap.xml` — Created (1 URL, weekly)
- `robots.txt` — Created (Allow all, sitemap reference)

## 7. SEO — OG Image URLs
- `og:image` → restored to `.jpg` for 100% social preview compatibility
- `twitter:image` → restored to `.jpg`
- JSON-LD `image` → kept as `.webp` (Google supports WebP)
- All image tags in page → `.webp`

## 8. Responsiveness — Touch Targets
- `.menu-toggle`: 44×44px → **48×48px** (meets Apple HIG)
- `.lang-toggle`: added `min-height: 48px`
- `.floating-wa`: 56×56px — already compliant

## 9. Responsiveness — Section Head
- `.section-head`: added `width: 100%` for zero-overflow guarantee

## 10. Deferred
- `.brand` `min-width: 220px` — logged as low-priority, no visual impact at ≥320px width

## 11. Deployment — Surge (Live)
- **Successfully deployed** to `https://eng-abdelmoneim-farouq-cv.surge.sh/`
- All WebP images load correctly ✅
- All 4 certificate PDFs downloadable ✅ (`exp_cert_petro`, `hajj_cert_1446`, `sce_cert`, WhatsApp cert)
- OG image (cv.jpg) loads correctly ✅
- `robots.txt` serves correct content ✅
- `sitemap.xml` accessible ✅

## 12. Deployment — GitHub Pages (Pending)
- **git not available in this session** — user needs to run from PowerShell:
  ```powershell
  cd "D:\Computer\My CV WebSite\github-pages-export"
  git add -A
  git commit -m "auto-publish 2026-07-13"
  git push https://secularway:GH_TOKEN@github.com/secularway/abdelmoneim-farouq-cv.git main
  ```
- Alternatively, run `publish.ps1` from a full PowerShell terminal with `$env:GH_TOKEN` set.

---

**Next recommended action:** Run `publish.ps1` (`D:\Computer\My CV WebSite\publish.ps1`) from owner's PowerShell terminal after setting `$env:GH_TOKEN`.
