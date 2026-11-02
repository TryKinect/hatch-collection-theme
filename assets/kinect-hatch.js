/*
 * Kinect — HATCH custom UI helpers ("The HATCH Hotline").
 *
 * 1. Adds ‹ › arrows to the PDP question row and slides it one view at a time.
 *    The row itself is Kinect's pdp-chat block (list layout) restyled by
 *    kinect-hatch.css; the chips and their click behaviour are Kinect's.
 * 2. Closes HATCH's mobile menu drawer when "The HATCH Hotline" row is tapped,
 *    so the drawer does not stay over the chat panel. Kinect opens the panel.
 *
 * Idempotent: safe to run again after the theme re-renders product info
 * (variant changes re-render the block list).
 */
(function () {
  "use strict";

  var ARROW_LEFT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function enhanceRow(widget) {
    if (widget.hasAttribute("data-kinect-hatch-ready")) return;
    var header = widget.querySelector(".kinect-pdp-list-header");
    var row = widget.querySelector(".kinect-pdp-chips--list");
    if (!header || !row) return;
    widget.setAttribute("data-kinect-hatch-ready", "true");

    var nav = document.createElement("div");
    nav.className = "kinect-hatch-arrows";
    nav.setAttribute("role", "group");
    nav.setAttribute("aria-label", "Scroll questions");
    var prev = button(ARROW_LEFT, "Previous questions", -1);
    var next = button(ARROW_RIGHT, "More questions", 1);
    nav.appendChild(prev);
    nav.appendChild(next);
    header.appendChild(nav);

    function button(svg, label, dir) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "kinect-hatch-arrow";
      b.setAttribute("aria-label", label);
      b.innerHTML = svg;
      b.addEventListener("click", function () {
        row.scrollBy({ left: dir * Math.max(120, row.clientWidth * 0.7), behavior: "smooth" });
      });
      return b;
    }

    function sync() {
      var overflow = row.scrollWidth - row.clientWidth > 2;
      nav.hidden = !overflow;
      if (!overflow) return;
      prev.disabled = row.scrollLeft <= 1;
      next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1;
    }

    row.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    // Kinect replaces chip text with product-aware questions after its config
    // loads, which changes the row width.
    new MutationObserver(sync).observe(row, { childList: true, subtree: true, characterData: true });
    if (typeof ResizeObserver === "function") new ResizeObserver(sync).observe(row);
    sync();
  }

  function scan(root) {
    (root || document).querySelectorAll(".kinect-pdp-widget--list").forEach(enhanceRow);
  }

  function init() {
    scan(document);
    // Theme re-renders product info blocks (variant change, quick view);
    // Kinect's block comes back without the arrows.
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches(".kinect-pdp-widget--list")) enhanceRow(node);
          else if (node.querySelector) scan(node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  // Mobile menu: tapping the Hotline row should close HATCH's drawer. Kinect's
  // own listener (which opens the panel) runs on the same click; capture phase
  // keeps this independent of its order.
  document.addEventListener(
    "click",
    function (event) {
      var target = event.target instanceof Element ? event.target.closest('[data-kinect-open="mobile_nav"]') : null;
      if (!target) return;
      var drawer = document.getElementById("sidebar-menu");
      if (drawer && typeof drawer.hide === "function") drawer.hide();
    },
    true
  );

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
