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
  desktop-label:
    fontFamily: '"Circular Std", sans-serif'
    fontSize: "13px"
    fontWeight: 600
    lineHeight: "20px"
    letterSpacing: "0.4px"
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
  hotline-desktop:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    typography: "{typography.desktop-label}"
    padding: "10px 16px"
---

# Design System: HATCH Hotline

## Overview

**Creative North Star: "Your direct line to a little HATCH expertise."**

This record covers only the Hotline product card, mobile navigation entry, and desktop ASK HATCH button. The user-supplied references establish the direction; the implemented theme remains authoritative everywhere else. Warm, compact surfaces and quiet outline controls carry HATCH's existing visual identity into this activation.

Evidence: `assets/hatch-hotline.css`, `assets/hatch-hotline.js`, `snippets/hatch-hotline.liquid`, and their product/navigation integrations. The supplied pass-2 mobile card capture confirms the visual treatment. Desktop evidence includes `sections/header.liquid`, `.context/hatch-nav/direction.md`, and `.context/hatch-nav/pass-2/header-1440.png`. This is not a theme-wide token inventory.

**Key Characteristics:**
- Flat blush surface with dark ink and white outlined pills.
- Circular Std with a compact, weight-led hierarchy.
- A single swipeable question row and restrained outline icons.

## Colors

### Primary

Blush distinguishes the help surface without competing with product imagery or Add to Cart. The desktop ASK HATCH button reuses this fill and ink.

### Neutral

Ink carries text and focus indicators. White and the warm pill border separate question actions from blush. Muted ink quiets the directional controls; their disabled state uses opacity rather than a new palette.

**The Inherited Palette Rule.** Apply this palette to Hotline only; preserve the surrounding theme's existing color assignments.

## Typography

Circular Std, with sans-serif fallback, supplies every local role. Body and question labels share the body role; the title gains weight, and the navigation role gains a small size step. The desktop-label role keeps ASK HATCH compact and uppercase with slightly open tracking. There is no local display or mono face.

**The Compact Hierarchy Rule.** Use weight to distinguish the card title from its supporting sentence and question actions; retain sentence case within the card. The desktop ASK HATCH label uses the approved uppercase treatment.

## Layout

The card fills its product-information container. Its local top margin is 8px; the surrounding purchase layout produces the reviewed 24px separation below Add to Cart. The reported 350 × 158px card at a 390px viewport is an observed result, not a fixed width or height token.

The title and arrows share a row. The description has 12px above and 16px below; question buttons form one nonwrapping, horizontally scrollable row with 8px gaps. At widths up to 699px, pill horizontal padding reduces from 13px to 10px. Pills retain a 44px minimum height.

The navigation entry follows Sale, with the existing Sign In footer in normal flow. If Sale is absent, the integration appends Hotline to the menu list. The ready-state menu grid uses a shrinkable single column and vertical scrolling to contain long content.

The desktop entry appears from 1000px when Kinect is ready, immediately before Search, Account, and Cart. Its tool column uses max-content while the category column can shrink. Header column gaps are 24px from 1000px, 32px from 1150px, and 64px from 1400px; logo columns step from 150px to 196px at 1150px. These are activation-specific header accommodations.

When the existing assistant shifts the page at widths from 1150px, the header returns to a 150px logo column and 24px column gaps, with a 98px minimum height. Category spacing tightens to 12px horizontally, zero row gap, and 12px vertical link padding. Two compact category rows may form as available width narrows. The observed 136.75 × 40px ASK HATCH button is content-sized, not a fixed-width token.

## Elevation & Depth

Hotline uses no shadows. Blush against the page, white pills, and thin borders establish separation. This flat treatment is local to the activation and does not ban native theme effects elsewhere.

## Shapes

The card and desktop ASK HATCH button are rectangular; question actions have fully rounded ends. The chat mark and directional chevrons are inline outline SVGs. Preserve their light strokes and the navigation entry's top and bottom dividers.

## Components

### Product card

The title opens the existing assistant; question pills open it and submit their text. Controls remain hidden until the existing Kinect readiness gate is satisfied. This component does not establish a new assistant visual system.

### Question actions and arrows

Question borders are 1px. On hover-capable devices, pills shift to a warm white fill and darker border with a 160ms ease-out transition. Reduced-motion preference removes this transition and smooth scrolling. Keyboard focus uses a 2px ink outline with 2px offset.

Arrows have 32 × 36px targets and 16px chevrons. Disabled arrows use 0.25 opacity. They move through the single question row and update at its boundaries; they are not pagination for separate cards.

### Navigation

The full-width button has a 56px minimum height and a 21px chat icon on the right. Title and navigation hover states underline text. The menu closes before the existing assistant opens.

### Desktop ASK HATCH

The blush button has a 40px minimum height, an 18px outline chat icon, and an 8px icon-to-label gap. Its padding and typography use the desktop tokens above. Hover underlines the label; keyboard focus uses the shared 2px ink outline with 2px offset. It opens the existing assistant without sending a question through `data-kinect-open="top_nav"`; mobile retains its separate menu entry.

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
