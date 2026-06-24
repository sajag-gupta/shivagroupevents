---
name: Tailwind v4 Google Fonts
description: In Tailwind v4, placing @import url(...) for Google Fonts inside CSS causes a PostCSS warning and the font may not load.
---

When using Tailwind v4's `@import "tailwindcss"` directive, the PostCSS plugin inlines Tailwind's CSS content at that position. Any `@import url(...)` placed after it violates the CSS spec rule that `@import` must precede all other statements.

**Why:** Tailwind v4 uses a PostCSS plugin that expands `@import "tailwindcss"` inline, pushing Google Fonts `@import` to a position after real CSS rules. This triggers a PostCSS/postcss-import warning and the font import may be silently dropped.

**How to apply:** Load Google Fonts (and any external font) via `<link rel="stylesheet" href="...">` in `index.html`, NOT via `@import url(...)` in the CSS file. The `index.html` for the shiva-events artifact at `artifacts/shiva-events/index.html` already has this in the `<head>`.
