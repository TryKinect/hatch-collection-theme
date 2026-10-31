# Hatch Collection × Kinect — "The HATCH Hotline" custom UI

Kinect's entry points placed and styled in Hatch's theme as agreed in `#ext-kinect-hatch`.
This repo's `main` is mirrored by Shopify's GitHub integration into the unpublished
**[Kinect] Draft Theme** (`152778408113`) on `hatchcollection.myshopify.com`, so merging to
`main` updates that draft theme; publishing it is a separate, manual action.

## What was implemented

| Placement | Confirmed design | Where in the theme |
| --- | --- | --- |
| Desktop nav | "ASK HATCH" button beside the search icon, styled identically to the button Hatch approved on `main` (cream #f8efe9, square corners, 40px tall, 13px/600 Circular Std, 18px outlined chat icon, underline on hover). Shown from 1050px; below that the floating launcher remains | `sections/header.liquid` → `{% render 'kinect-hotline', placement: 'desktop' %}` → `<li class="header__kinect-link">` (labels live in `snippets/kinect-hotline.liquid`) |
| Mobile menu | Row "The HATCH Hotline" with chat icon, below SALE and above SIGN IN | `snippets/header-sidebar.liquid` → `{% render 'kinect-hotline', placement: 'mobile_nav' %}` → `<li class="header-sidebar__kinect">` with `data-kinect-open="mobile_nav"`; `assets/kinect-hatch.js` closes the drawer on tap |
| PDP | Cream panel directly below Add to Cart: header row (icon · "The HATCH Hotline" · ‹ ›), subline, one sliding row of product-aware chips, no input | `templates/product.json` → Kinect `pdp-chat` block (list layout) after `buy_buttons`; restyled by `assets/kinect-hatch.css`; arrows by `assets/kinect-hatch.js` |
| Shopping Assistant (launcher + panel) | **Unchanged from `main`**: launcher on the left edge at mid-height, panel opens from the left, "Hatch AI" wordmark. The Hotline work is the three entry points above only | `config/settings_data.json` → Kinect app embed `15135077829686852319` is byte-identical to `main` |
| Klaviyo "Get 15% Off" teaser | Desktop only (≥768px): the side tab moves from the left edge to the right edge, vertically centred, close button toward the page. Mobile teaser untouched | `assets/kinect-hatch.css` section 4 (Klaviyo positions the tab with inline styles, so the overrides are `!important`); no other theme CSS touched |

Kinect's behaviour is untouched: eligibility (traffic split / audience / kill switch) still
decides whether the links and block appear — the nav link and menu row are rendered `hidden`
and Kinect reveals them — chips open the chat with the question, and analytics record each
entry point by its `source` label (`top_nav`, `mobile_nav`, `pdp_chip`).

### Header accommodation (why `kinect-hatch.css` touches the header grid)

Hatch's header (`common.css` "Navigation Updates") is a fixed grid: logo column |
categories | **120px** icon column. Only search, account and cart fit in that column, so
while the pill is visible the stylesheet switches the icon column to `max-content` and
tightens the logo/category gaps (150px/24px from 1050px, 196px/32px from 1150px, 64px gaps
from 1400px). While the assistant is open in page-shift mode the page is ~380px narrower,
so the header is tightened further (150px logo, 12px category gaps, 28px link padding,
98px min-height) — it never takes more rows than the theme already does without the pill.
Every rule is scoped to `.header:has(.header__kinect-link > a:not([hidden]))`, so
ineligible shoppers get the stock header. Measured on the draft theme on 31 Oct 2026.

## Preview

Run a dev theme from this folder (never `theme push` to the store):

```bash
cd "/Users/ajaymalasha/Documents/Kinect AI/hatch-collection-theme"
shopify theme dev --store hatchcollection
```

Then open a product page with `?preview_theme_id=<dev theme id>`. The widgets only appear
when the Kinect audience includes you (Kinect app → Audience / traffic split).

The PDP block id in `templates/product.json` targets Hatch's Kinect app
(`kinect-hatch-collection`). Never commit a staging-app block id to this repo.

Store-level copy that is **not** in the theme (Kinect app → Customize Widget, or Kinect
dashboard → Widgets): greeting subtitle *"From what to wear to how it fits and what comes
next, consider this your direct line to a little HATCH expertise. Ask away!"* and, if
preferred over starter chips, capability rows for the three Hotline topics.

## Known gaps (need a small Kinect widget feature, not theme code)

- Branding the assistant panel itself as "The HATCH Hotline" (header title, placeholder
  "Ask The HATCH Hotline…") is an embed-settings / widget-feature change, deliberately not
  part of this branch — the embed stays exactly as `main`.
- The Klaviyo teaser override matches Klaviyo's current inline geometry (184px tab, rotated
  −90° from `left top`). If Klaviyo changes how it renders the teaser, re-check section 4 of
  `assets/kinect-hatch.css`.
