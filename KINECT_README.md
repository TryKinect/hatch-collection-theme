# Kinect — "The HATCH Hotline" custom UI

Kinect's widgets, placed and styled for Hatch as agreed in `#ext-kinect-hatch` (30 Oct 2026
mocks). The theme's own code is not modified: everything Kinect-specific is isolated in
three files, and the theme only calls them from three one-line hooks.

## Files

| File | Purpose |
| --- | --- |
| `assets/kinect-hatch.css` | All Hotline styling: desktop nav pill, mobile menu row, PDP block restyle |
| `assets/kinect-hatch.js` | PDP chip-row arrows; closes the mobile drawer when the menu row is tapped |
| `snippets/kinect-hotline.liquid` | Markup for the nav pill and menu row (labels are the two `assign`s at the top) |

Hooks in theme files (each is a single added line, no existing code changed):

| File | Hook |
| --- | --- |
| `layout/theme.liquid` | loads `kinect-hatch.css` / `kinect-hatch.js` after `common.css` |
| `sections/header.liquid` | `{% render 'kinect-hotline', placement: 'desktop' %}` before the search icon |
| `snippets/header-sidebar.liquid` | `{% render 'kinect-hotline', placement: 'mobile_nav' %}` after the last menu link |

Data (JSON, additive):

| File | Change |
| --- | --- |
| `templates/product.json` | Kinect `pdp-chat` app block `kinect_hatch_hotline` after `buy_buttons` (list layout, cream, no input) |
| `config/settings_data.json` | Hatch's existing Kinect assistant embed (`15135077829686852319`) with the Hotline settings and `shadow_css_overrides` |

## Placements

| Placement | Design | Notes |
| --- | --- | --- |
| Desktop nav | Cream filled pill "ASK HATCH" with chat icon, beside the search icon (placement #2) | Label from 1400px; icon-only 1280–1399px (Hatch's header is two rows there and the label would push the cart icon to a third row); hidden below 1280px, where the floating launcher remains |
| Mobile menu | Row "The HATCH Hotline" with chat icon, below the last category, above SIGN IN | Tapping closes the drawer and opens the assistant |
| PDP | Cream panel below Add to Cart, above Add to Wishlist: icon · "The HATCH Hotline" · ‹ ›, subline, one sliding row of product-aware chips, no input | Kinect app block, restyled by CSS; arrows added by JS |
| First open (panel) | "The HATCH Hotline" header, cream card "Good questions deserve good answers.", rows "Help me find my size / Help me style an outfit / Ask a product question", square input, round black launcher bottom-right | App embed settings + shadow CSS |

Kinect's behaviour is untouched: eligibility (Audience / traffic split / kill switch) still
decides whether the links and block appear (the links render `hidden` and Kinect reveals them),
chips open the chat with the question, and analytics record each entry point by its `source`
(`top_nav`, `mobile_nav`, `pdp_chip`).

## Preview

```bash
cd hatch-collection-theme
shopify theme dev --store hatchcollection
```

Open the preview URL on a product page. Nothing shows unless the Kinect Audience for the store
is above 0% (Kinect app → Audience, or the Kinect dashboard).

## Not in the theme

- Greeting subtitle and the panel's capability rows are store-level Kinect settings
  (Kinect app → Customize Widget, or dashboard → Widgets).
- The panel header title "The HATCH Hotline" is rendered via shadow CSS (`::after`) because
  the embed has no text-title setting; the input placeholder is translation-driven.
