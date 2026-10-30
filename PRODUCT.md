# HATCH Collection theme

This repository contains HATCH Collection's Shopify theme. Preserve its existing storefront, product information, cart, and merchandising behavior.

## HATCH Hotline activation

Help shoppers ask product questions through the existing Kinect shopping assistant:

- Place the Hotline card directly below Add to Cart on full product pages.
- Show a single horizontally scrolling row of suggested questions, with previous/next controls.
- Clicking a question opens the existing sidebar and sends that question immediately.
- Clicking the Hotline title opens the sidebar without sending a question.
- Place a blush "ASK HATCH" button before the desktop header's search icon. It opens the same sidebar without sending a question.
- Place the mobile navigation entry after Sale and before Sign In. Close navigation before opening the assistant.
- Preserve Kinect's existing consent, eligibility, product context, and conversation handling.

The user-supplied desktop, mobile product, and mobile navigation screenshots define the activation design. Inherit the existing HATCH typography and page layout; this feature does not replace the assistant or redesign the storefront.

## Development target

Use the existing unpublished **[Kinect] Draft Theme**, ID `152778408113`, on `hatchcollection.myshopify.com`. Sync only the changed theme files; retain its existing app embeds and settings. Push implementation work to a feature branch. This draft's Shopify GitHub integration automatically mirrors direct theme updates into `main`. Publishing the theme is a separate action.
