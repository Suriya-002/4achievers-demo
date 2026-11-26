/* =====================================================================
   layout.js — injects the shared topbar+header and footer into every
   page via #site-header and #site-footer, sets the active nav item,
   and wires header interactions (mobile menu, mobile mega-menu toggles).
   Flat file structure: every page lives in the project root, so links
   are plain filenames and work from any page.
   ===================================================================== */
(function () {
  "use strict";

  var PHONE = "+91-93117-65521";
  var PHONE2 = "+91-80108-05667";
  var WA = "https://wa.me/919311765521";
  var EMAIL = "info@4achievers.co.in";

  var MARK =
    '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<rect width="48" height="48" rx="12" fill="#1b4dc1"/>' +
      '<path d="M24 11 9 18l15 7 12-5.6V29h3V18L24 11Z" fill="#fff"/>' +
      '<path d="M15 24v6c0 2.8 4 5 9 5s9-2.2 9-5v-6l-9 4.2L15 24Z" fill="#f59e0b"/>' +
    '</svg>';

  // Courses mega-menu. Links that map to a built detail page go there;
  // everything else routes to the courses listing to avoid dead links.
  var MENU = [
    { h: "Data & AI", items: [
      ["Data Science Master Program", "course-data-science.html"],
      ["Data Analytics Course", "course-data-analytics.html"],
      ["Business Analytics", "courses.html"],
      ["Power BI & GenAI", "courses.html"]
    ]},
    { h: "Development", items: [
      ["Python Full Stack", "course-python-full-stack.html"],
      ["Java Full Stack", "course-java-full-stack.html"],
      ["MERN / MEAN Stack", "courses.html"],
      ["React Development", "courses.html"]
    ]},
    { h: "Cloud & DevOps", items: [
      ["AWS Cloud Architect", "course-aws-cloud.html"],
      ["Microsoft Azure", "courses.html"],
      ["DevOps Engineering", "courses.html"],
      ["Docker & Kubernetes", "courses.html"]
    ]},
    { h: "Testing / Design / Security", items: [
      ["Software Testing", "course-software-testing.html"],
      ["Automation Testing", "courses.html"],
      ["UI/UX & Graphic Design", "courses.html"],
      ["Cyber Security & Ethical Hacking", "courses.html"]
    ]}
  ];

  var NAV = [
    ["Home", "index.html"],
    ["Courses", "courses.html", true],
    ["Placement Support", "placement.html"],
    ["Campuses", "campuses.html"],
    ["Journal", "journal.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
  ];

  function current() {
    var p = location.pathname.split("/").pop();
    return p && p.length ? p : "index.html";
  }

  function megamenu() {
    return '<div class="megamenu">' + MENU.map(function (c) {
      return '<div class="megamenu__col"><h4>' + c.h + "</h4>" +
        c.items.map(function (it) { return '<a href="' + it[1] + '">' + it[0] + "</a>"; }).join("") +
        "</div>";
    }).join("") + "</div>";
  }

  function navItems() {
    var cur = current();
    return NAV.map(function (n) {
      var active = n[1] === cur ? ' style="color:var(--brand);background:var(--brand-light)"' : "";
      if (n[2]) {
        return '<li class="nav__item nav__item--has-menu">' +
          '<a class="nav__link" href="' + n[1] + '"' + active + ">" + n[0] + "</a>" +
          megamenu() + "</li>";
      }
      return '<li class="nav__item"><a class="nav__link" href="' + n[1] + '"' + active + ">" + n[0] + "</a></li>";
    }).join("");
  }

  function header() {
    return '' +
    '<div class="topbar"><div class="container topbar__inner">' +
      '<div class="topbar__group">' +
        '<span class="topbar__item">📞 <a href="tel:' + PHONE.replace(/-/g,"") + '">' + PHONE + '</a> (Noida)</span>' +
        '<span class="topbar__item">📞 <a href="tel:' + PHONE2.replace(/-/g,"") + '">' + PHONE2 + '</a> (Mumbai)</span>' +
      '</div>' +
      '<div class="topbar__group">' +
        '<span class="topbar__badge">ISO 9001:2015 Certified</span>' +
        '<span class="topbar__badge" style="background:var(--accent);color:#1a1203">🎓 Admissions Open 2026</span>' +
        '<a class="topbar__item" href="' + WA + '" target="_blank" rel="noopener">💬 WhatsApp</a>' +
      '</div>' +
    '</div></div>' +
    '<header class="header"><div class="container header__inner">' +
      '<a class="logo" href="index.html">' + MARK + '<span>4<b>Achievers</b></span></a>' +
      '<nav class="nav" id="nav"><ul class="nav__list">' + navItems() + '</ul>' +
        '<a class="btn btn--primary btn--sm" href="contact.html">Book Free Counselling</a>' +
      '</nav>' +
      '<div class="header__cta">' +
        '<a class="btn btn--primary" href="contact.html">Book Free Counselling</a>' +
        '<button class="menu-toggle" id="menuToggle" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</div></header>';
  }

  function footer() {
    return '' +
    '<footer class="footer"><div class="container">' +
      '<div class="footer__grid">' +
        '<div class="footer__brand">' +
          '<a class="logo" href="index.html">' + MARK + '<span>4<b style="color:#fff">Achievers</b></span></a>' +
          '<p>Build job-ready tech skills with industry-focused training. Accredited modern IT training across Noida, Mumbai, Varanasi and 12+ cities in India.</p>' +
          '<div class="social">' +
            '<a class="social__link" href="#" aria-label="Facebook">f</a>' +
            '<a class="social__link" href="#" aria-label="Instagram">◎</a>' +
            '<a class="social__link" href="#" aria-label="YouTube">▶</a>' +
            '<a class="social__link" href="#" aria-label="LinkedIn">in</a>' +
            '<a class="social__link" href="#" aria-label="Twitter">𝕏</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer__col"><h4 class="footer__title">Quick Links</h4><ul class="footer__links">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="about.html">About Us</a></li>' +
          '<li><a href="courses.html">All Courses</a></li>' +
          '<li><a href="placement.html">Placement Support</a></li>' +
          '<li><a href="campuses.html">Campuses & Locations</a></li>' +
          '<li><a href="journal.html">Blog & Resources</a></li>' +
          '<li><a href="contact.html">Contact Us</a></li>' +
        '</ul></div>' +
        '<div class="footer__col"><h4 class="footer__title">Popular Courses</h4><ul class="footer__links">' +
          '<li><a href="course-data-science.html">Data Science Master Program</a></li>' +
          '<li><a href="course-data-analytics.html">Data Analytics Course</a></li>' +
          '<li><a href="course-python-full-stack.html">Python Full Stack</a></li>' +
          '<li><a href="course-java-full-stack.html">Java Full Stack</a></li>' +
          '<li><a href="course-software-testing.html">Software Testing</a></li>' +
          '<li><a href="course-aws-cloud.html">AWS Cloud Architect</a></li>' +
        '</ul></div>' +
        '<div class="footer__col footer__news"><h4 class="footer__title">Stay Updated</h4>' +
          '<p style="font-size:.9rem">Get latest courses, placement news & free resources. Join 48,500+ learners.</p>' +
          '<form onsubmit="return window.FA.fakeSubmit(event,\'Subscribed! Check your inbox.\')">' +
            '<input type="email" placeholder="Your email address" required>' +
            '<button class="btn btn--accent btn--block" type="submit">Subscribe Now</button>' +
          '</form>' +
          '<ul class="footer__contact" style="margin-top:18px">' +
            '<li>📞 <a href="tel:' + PHONE.replace(/-/g,"") + '">' + PHONE + '</a> (9 AM – 7 PM)</li>' +
            '<li>✉️ <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer__bottom">' +
        '<span>© 2026 4Achievers (Clone). All Rights Reserved. Powered by Education. Driven by Success.</span>' +
        '<span style="display:flex;gap:16px;flex-wrap:wrap">' +
          '<a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a><a href="#">Refund Policy</a><a href="campuses.html">All Campuses</a>' +
        '</span>' +
      '</div>' +
    '</div></footer>' +
    '<div class="fab">' +
      '<a class="fab__btn fab__btn--wa" href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6a9 9 0 0 1-3.6-3.2c-.3-.4-.9-1.3-.9-2.5 0-1.2.6-1.8.8-2 .2-.2.5-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.6c.1.1.1.3 0 .5l-.3.5-.3.3c-.1.1-.2.3-.1.5.2.4.7 1.2 1.4 1.8.9.8 1.6 1 1.9 1.2.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.4-.1.9Z"/></svg>' +
      '</a>' +
      '<a class="fab__btn fab__btn--call" href="tel:' + PHONE.replace(/-/g,"") + '" aria-label="Call">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z"/></svg>' +
      '</a>' +
    '</div>';
  }

  function inject() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header();
    if (f) f.innerHTML = footer();

    // Mobile menu toggle
    var nav = document.getElementById("nav");
    var tog = document.getElementById("menuToggle");
    if (tog && nav) {
      tog.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        document.body.classList.toggle("nav-open", nav.classList.contains("is-open"));
      });
      // close when clicking a real link (not a dropdown parent)
      nav.addEventListener("click", function (e) {
        var a = e.target.closest("a.nav__link");
        if (a && !a.parentElement.classList.contains("nav__item--has-menu")) {
          nav.classList.remove("is-open");
          document.body.classList.remove("nav-open");
        }
      });
    }

    // Mobile mega-menu accordion behaviour
    document.querySelectorAll(".nav__item--has-menu > .nav__link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          link.parentElement.classList.toggle("is-open");
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
