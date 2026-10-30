---
name: HATCH Hotline
description: A scoped activation component within the existing HATCH storefront.
colors:
  blush: "#f8efe9"
  ink: "#302e2b"
  muted: "#77716c"
  pill-border: "#ddd7d2"
  white: "#fff"
typography:
  body:
    fontFamily: '"Circular Std", sans-serif'
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  title:
    fontFamily: '"Circular Std", sans-serif'
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  navigation:
    fontFamily: '"Circular Std", sans-serif'
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  pill: "999px"
spacing:
  related: "8px"
  separated: "16px"
components:
  hotline-card:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "18px"
  hotline-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  question-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 13px"
  question-pill-mobile:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px"
  hotline-navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "14px 0"
---

# Design System: HATCH Hotline

## Overview

**Creative North Star: "Your direct line to a little HATCH expertise."**

This record covers only the Hotline product card and mobile navigation entry. The user-supplied references establish the direction; the implemented theme remains authoritative everywhere else. Warm, compact surfaces and quiet outline controls carry HATCH's existing visual identity into this activation.

Evidence: `assets/hatch-hotline.css`, `assets/hatch-hotline.js`, `snippets/hatch-hotline.liquid`, and their product/navigation integrations. The supplied pass-2 mobile card capture confirms the visual treatment. This is not a theme-wide token inventory.

**Key Characteristics:**
- Flat blush surface with dark ink and white outlined pills.
- Circular Std with a compact, weight-led hierarchy.
- A single swipeable question row and restrained outline icons.

## Colors

### Primary

Blush distinguishes the help surface without competing with product imagery or Add to Cart.

### Neutral

Ink carries text and focus indicators. White and the warm pill border separate question actions from blush. Muted ink quiets the directional controls; their disabled state uses opacity rather than a new palette.

**The Inherited Palette Rule.** Apply this palette to Hotline only; preserve the surrounding theme's existing color assignments.

## Typography

Circular Std, with sans-serif fallback, supplies every local role. Body and question labels share the body role; the title gains weight, and the navigation role gains a small size step. There is no local display or mono face.

**The Compact Hierarchy Rule.** Use weight to distinguish the card title from its supporting sentence and question actions; retain sentence case.

## Layout

The card fills its product-information container. Its local top margin is 8px; the surrounding purchase layout produces the reviewed 24px separation below Add to Cart. The reported 350 × 158px card at a 390px viewport is an observed result, not a fixed width or height token.

The title and arrows share a row. The description has 12px above and 16px below; question buttons form one nonwrapping, horizontally scrollable row with 8px gaps. At widths up to 699px, pill horizontal padding reduces from 13px to 10px. Pills retain a 44px minimum height.

The navigation entry follows Sale, with the existing Sign In footer in normal flow. If Sale is absent, the integration appends Hotline to the menu list. The ready-state menu grid uses a shrinkable single column and vertical scrolling to contain long content.

## Elevation & Depth

Hotline uses no shadows. Blush against the page, white pills, and thin borders establish separation. This flat treatment is local to the activation and does not ban native theme effects elsewhere.

## Shapes

The card is rectangular; question actions have fully rounded ends. The chat mark and directional chevrons are inline outline SVGs. Preserve their light strokes and the navigation entry's top and bottom dividers.

## Components

### Product card

The title opens the existing assistant; question pills open it and submit their text. Controls remain hidden until the existing Kinect readiness gate is satisfied. This component does not establish a new assistant visual system.

### Question actions and arrows

Question borders are 1px. On hover-capable devices, pills shift to a warm white fill and darker border with a 160ms ease-out transition. Reduced-motion preference removes this transition and smooth scrolling. Keyboard focus uses a 2px ink outline with 2px offset.

Arrows have 32 × 36px targets and 16px chevrons. Disabled arrows use 0.25 opacity. They move through the single question row and update at its boundaries; they are not pagination for separate cards.

### Navigation

The full-width button has a 56px minimum height and a 21px chat icon on the right. Title and navigation hover states underline text. The menu closes before the existing assistant opens.

The sidecar contains source-derived static previews, including hover/focus styles; assistant actions and scroll state management remain in the theme's JavaScript. Circular Std requires the host's existing font asset.

## Do's and Don'ts

### Do:
- **Do** inherit HATCH typography and the existing product-information width.
- **Do** preserve one question row, touch scrolling, visible keyboard focus, and reduced-motion behavior.
- **Do** keep the mobile menu and its footer within the viewport width.

### Don't:
- **Don't** promote this local palette or card geometry into a storefront redesign.
- **Don't** convert observed card dimensions into fixed sizing or wrap question pills into multiple rows.
- **Don't** invent a separate chat interface or new visual primitives from this activation.
