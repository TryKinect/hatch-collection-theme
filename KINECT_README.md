# Hatch Collection × Kinect — "The HATCH Hotline" custom UI

Kinect's entry points placed and styled in Hatch's theme as agreed in `#ext-kinect-hatch`.
This repo's `main` is mirrored by Shopify's GitHub integration into the unpublished
**[Kinect] Draft Theme** (`152778408113`) on `hatchcollection.myshopify.com`, so merging to
`main` updates that draft theme; publishing it is a separate, manual action.

## What was implemented

| Placement | Confirmed design | Where in the theme |
| --- | --- | --- |
| Desktop nav | Cream filled pill "ASK HATCH" with chat icon, right side beside the search icon (placement #2, per the 30 Oct mock). Shown from 1050px; below that the floating launcher remains | `sections/header.liquid` → `<li class="header__kinect-link">` (settings: `show_kinect_link`, `kinect_link_label`, `kinect_menu_label`) |
| Mobile menu | Row "The HATCH Hotline" with chat icon, below SALE and above SIGN IN | `snippets/header-sidebar.liquid` → `<li class="header-sidebar__kinect">` with `data-kinect-open="mobile_nav"`; `assets/kinect-hatch.js` closes the drawer on tap |
| PDP | Cream panel directly below Add to Cart: header row (icon · "The HATCH Hotline" · ‹ ›), subline, one sliding row of product-aware chips, no input | `templates/product.json` → Kinect `pdp-chat` block (list layout) after `buy_buttons`; restyled by `assets/kinect-hatch.css`; arrows by `assets/kinect-hatch.js` |
| First open (panel) | "The HATCH Hotline" header, cream card "Good questions deserve good answers." + body, rows "Help me find my size / Help me style an outfit / Ask a product question", square input; round black launcher bottom-right | `config/settings_data.json` → Kinect app embed `15135077829686852319` (`launcher_label`, `welcome_message`, `conversation_starters`, colours, `panel_side: right`, `mobile_chat_size: full`) + `shadow_css_overrides` (CSS Kinect injects into its shadow roots) |

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

`kinect-retarget.sh` points the Kinect block ids at Hatch's app (`hatch`, the committed
state) or at the staging app (`staging`) if the theme is ever loaded on
`test-prod-store-varun`. Never commit the `staging` state to this repo.

Store-level copy that is **not** in the theme (Kinect app → Customize Widget, or Kinect
dashboard → Widgets): greeting subtitle *"From what to wear to how it fits and what comes
next, consider this your direct line to a little HATCH expertise. Ask away!"* and, if
preferred over starter chips, capability rows for the three Hotline topics.

## Known gaps (need a small Kinect widget feature, not theme code)

- Panel header title "The HATCH Hotline" is rendered via CSS (`::after`) because the Shopify
  panel header has no text title setting. Proper fix: an "assistant name" setting.
- Input placeholder "Ask The HATCH Hotline…" is not a merchant setting (translation-driven).
- Hatch's other chat bubble (bottom-left) is a separate app; Kinect's launcher is bottom-right.
