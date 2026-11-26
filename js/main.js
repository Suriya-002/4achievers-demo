/* =====================================================================
   main.js — page interactions shared across the site.
   Exposes window.FA for inline handlers (tabs, form submit).
   Features: animated stat counters, tabbed course catalog, FAQ
   accordion, scroll reveal, and demo (non-networked) form handling.
   ===================================================================== */
(function () {
  "use strict";
  var FA = window.FA = window.FA || {};

  /* ---- Animated counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (target % 1 !== 0) ? 1 : 0;
    var dur = 1600, start = 0, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = start + (target - start) * eased;
      el.textContent = prefix + val.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---- Intersection observer: reveal + count triggers ---- */
  function initObserver() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        if (el.hasAttribute("data-reveal")) el.classList.add("is-in");
        if (el.hasAttribute("data-count")) animateCount(el);
        io.unobserve(el);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll("[data-reveal],[data-count]").forEach(function (el) { io.observe(el); });
  }

  /* ---- Tabs (course catalog & others) ---- */
  FA.switchTab = function (btn, group) {
    var scope = document.querySelector('[data-tabs="' + group + '"]') || document;
    scope.querySelectorAll('[data-tab-btn="' + group + '"]').forEach(function (b) { b.classList.remove("is-active"); });
    scope.querySelectorAll('[data-tab-panel="' + group + '"]').forEach(function (p) { p.classList.remove("is-active"); });
    btn.classList.add("is-active");
    var panel = scope.querySelector('[data-tab-panel="' + group + '"][data-key="' + btn.getAttribute("data-key") + '"]');
    if (panel) panel.classList.add("is-active");
  };

  /* ---- Accordion (FAQ) ---- */
  function initAccordion() {
    document.querySelectorAll(".accordion__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion__item");
        var panel = item.querySelector(".accordion__panel");
        var open = item.classList.contains("is-open");
        // optional single-open per accordion
        var acc = btn.closest(".accordion");
        if (acc && acc.hasAttribute("data-single")) {
          acc.querySelectorAll(".accordion__item.is-open").forEach(function (i) {
            if (i !== item) { i.classList.remove("is-open"); i.querySelector(".accordion__panel").style.maxHeight = null; }
          });
        }
        item.classList.toggle("is-open", !open);
        panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
      });
    });
  }

  /* ---- Demo form submit (no backend) ---- */
  FA.fakeSubmit = function (e, msg) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('[type="submit"]');
    var original = btn ? btn.textContent : "";
    if (btn) { btn.textContent = "Submitting…"; btn.disabled = true; }
    setTimeout(function () {
      if (btn) { btn.textContent = "✓ Submitted"; }
      var note = form.querySelector(".form-feedback");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-feedback form__hint";
        note.style.color = "var(--accent-2)";
        form.appendChild(note);
      }
      note.textContent = msg || "Thank you! Our team will reach out to you shortly.";
      form.reset();
      setTimeout(function () { if (btn) { btn.textContent = original; btn.disabled = false; } }, 2500);
    }, 700);
    return false;
  };

  /* ---- Header shadow on scroll ---- */
  function initHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) return;
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 10
        ? "0 6px 24px rgba(15,23,42,.12)" : "var(--shadow-sm)";
    }, { passive: true });
  }

  function init() {
    initObserver();
    initAccordion();
    initHeaderScroll();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
