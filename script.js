// Webnologiya — vanilla JS only. No build step, no libraries.
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     Industry demo data — each demo is small, self-contained
     inline HTML/CSS (a few KB) rendered via <iframe srcdoc>.
     Reused by: hero (restaurant, slow intro), Work tabs,
     and the Process section preview frame.
     Kept data-driven so a future /restaurant-style route can
     reuse the same entries with one pre-selected.
     ========================================================= */
  var industries = [
    {
      id: "restaurant",
      label: "Restaurant",
      accent: "#B5502E",
      soft: "#F1DFCB",
      name: "Amara Kitchen",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">Amara Kitchen</span>' +
        '<nav><a href="#">Menu</a><a href="#">About</a><a href="#">Reserve</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>Seasonal plates,<br>open nightly.</h1>' +
        '<p>Neighborhood dining room &amp; wine bar.</p></section>' +
        '<ul class="d-menu reveal d3">' +
        '<li><span>Roasted beet salad</span><em>$12</em></li>' +
        '<li><span>Herb-crusted lamb</span><em>$28</em></li>' +
        '<li><span>Wild mushroom risotto</span><em>$21</em></li>' +
        "</ul>" +
        '<div class="reveal d4"><button class="d-cta" type="button">Reserve a table</button></div>',
      css:
        ".d-menu{margin:14px 24px 0;padding:0;list-style:none;}" +
        ".d-menu li{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,0.12);font-size:0.82rem;}" +
        ".d-menu li em{font-style:normal;opacity:0;transform:translateX(4px);transition:opacity .18s ease, transform .18s ease;color:var(--accent);font-weight:600;}" +
        ".d-menu li:hover em{opacity:1;transform:none;}",
    },
    {
      id: "real-estate",
      label: "Real Estate",
      accent: "#2C3E55",
      soft: "#E4E8ED",
      name: "Harbor &amp; Stone",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">Harbor &amp; Stone</span>' +
        '<nav><a href="#">Listings</a><a href="#">Sell</a><a href="#">Contact</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>12 Bellview Terrace</h1><p>4 bed &middot; 3 bath &middot; $845,000</p></section>' +
        '<div class="d-gallery reveal d3"><div class="d-gallery__img" id="gimg"></div>' +
        '<div class="d-dots" role="group" aria-label="Photos">' +
        '<button type="button" class="active" data-i="0" aria-label="Photo 1"></button>' +
        '<button type="button" data-i="1" aria-label="Photo 2"></button>' +
        '<button type="button" data-i="2" aria-label="Photo 3"></button></div></div>' +
        '<div class="reveal d4"><button class="d-cta" type="button">Request a viewing</button></div>' +
        "<script>" +
        "var imgs=['linear-gradient(135deg,#2C3E55,#5A7291)','linear-gradient(135deg,#7A8B6F,#B7C4A6)','linear-gradient(135deg,#8C7357,#D8C6A8)'];" +
        "var gimg=document.getElementById('gimg');" +
        "document.querySelectorAll('.d-dots button').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.d-dots button').forEach(function(x){x.classList.remove('active');});b.classList.add('active');gimg.style.background=imgs[+b.dataset.i];});});" +
        "</" +
        "script>",
      css:
        ".d-gallery__img{aspect-ratio:16/8;border-radius:8px;background:linear-gradient(135deg,#2C3E55,#5A7291);transition:background .25s ease;}" +
        ".d-dots{display:flex;gap:8px;justify-content:center;margin-top:10px;}" +
        ".d-dots button{width:8px;height:8px;border-radius:50%;background:rgba(0,0,0,0.18);padding:0;}" +
        ".d-dots button.active{background:var(--accent);}",
    },
    {
      id: "architecture",
      label: "Architecture",
      accent: "#4A4A46",
      soft: "#E7E4DD",
      name: "Norr Studio",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">Norr Studio</span>' +
        '<nav><a href="#">Projects</a><a href="#">Studio</a><a href="#">Contact</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>Considered spaces,<br>built to last.</h1><p>Residential &amp; interior architecture.</p></section>' +
        '<div class="d-thumbs reveal d3">' +
        '<div class="thumb" style="background:linear-gradient(135deg,#8C8C82,#C8C6BC);"><span class="thumb__cap">Birch House</span></div>' +
        '<div class="thumb" style="background:linear-gradient(135deg,#6E6A61,#ABA79B);"><span class="thumb__cap">Fold Pavilion</span></div>' +
        '<div class="thumb" style="background:linear-gradient(135deg,#9A8E77,#D6CBB4);"><span class="thumb__cap">Quarry Loft</span></div>' +
        "</div>" +
        '<div class="reveal d4"><button class="d-cta" type="button">View portfolio</button></div>',
      css:
        ".d-thumbs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 24px 0;}" +
        ".thumb{position:relative;aspect-ratio:4/3;border-radius:6px;overflow:hidden;}" +
        ".thumb__cap{position:absolute;left:0;right:0;bottom:0;padding:6px 8px;font-size:0.66rem;color:#fff;background:rgba(0,0,0,0.45);opacity:0;transform:translateY(6px);transition:opacity .18s ease, transform .18s ease;}" +
        ".thumb:hover .thumb__cap{opacity:1;transform:none;}",
    },
    {
      id: "local-service",
      label: "Local Service",
      accent: "#2F5D45",
      soft: "#E3ECE4",
      name: "BrightFix",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">BrightFix</span>' +
        '<nav><a href="#">Services</a><a href="#">Reviews</a><a href="#">Contact</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>Plumbing &amp; electric,<br>same-day.</h1><p>Licensed. Insured. Local.</p></section>' +
        '<ul class="d-services reveal d3">' +
        "<li>Emergency plumbing</li><li>Electrical repair</li><li>Water heater install</li>" +
        "</ul>" +
        '<div class="reveal d4"><button class="d-cta" type="button">Book now</button></div>',
      css:
        ".d-services{margin:14px 24px 0;padding:0;list-style:none;font-size:0.82rem;}" +
        ".d-services li{padding:6px 0 6px 20px;position:relative;}" +
        ".d-services li::before{content:'';position:absolute;left:0;top:12px;width:8px;height:8px;border-radius:2px;background:var(--accent);}",
    },
    {
      id: "ecommerce",
      label: "Online Store",
      accent: "#6B3A52",
      soft: "#F1E3EA",
      name: "Wren &amp; Co.",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">Wren &amp; Co.</span>' +
        '<nav><a href="#">Shop</a><a href="#">About</a><a href="#">Cart (0)</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>Small-batch<br>ceramics.</h1><p>Hand-thrown, made to order.</p></section>' +
        '<div class="d-product reveal d3">' +
        '<div class="d-product__img"></div>' +
        '<div class="d-product__info"><strong>Stoneware mug</strong><span>$34</span></div>' +
        "</div>" +
        '<div class="reveal d4"><button class="d-cta" type="button">Add to cart</button></div>',
      css:
        ".d-product{display:flex;align-items:center;gap:12px;margin:14px 24px 0;}" +
        ".d-product__img{width:64px;height:64px;border-radius:8px;flex-shrink:0;background:linear-gradient(135deg,#6B3A52,#B98CA4);}" +
        ".d-product__info{display:flex;flex-direction:column;gap:2px;font-size:0.82rem;}" +
        ".d-product__info span{color:var(--accent);font-weight:600;}",
    },
    {
      id: "professional",
      label: "Professional Service",
      accent: "#24405C",
      soft: "#E4EAEF",
      name: "Calder Legal",
      body:
        '<header class="d-nav reveal d1"><span class="d-logo">Calder Legal</span>' +
        '<nav><a href="#">Practice</a><a href="#">Team</a><a href="#">Contact</a></nav></header>' +
        '<section class="d-hero reveal d2"><h1>Clear counsel,<br>plainly explained.</h1>' +
        "<p>Small business &amp; contract law.</p></section>" +
        '<p class="d-about reveal d3">Twelve years advising local businesses on contracts, leases, and formation.</p>' +
        '<div class="reveal d4"><button class="d-cta" type="button">Book a consultation</button></div>',
      css: ".d-about{margin:14px 24px 0;font-size:0.8rem;color:#5a5a5a;max-width:38ch;}",
    },
  ];

  var industryMap = {};
  industries.forEach(function (ind) {
    industryMap[ind.id] = ind;
  });

  /* ---------- Build a full HTML document for srcdoc ---------- */
  function buildSrcdoc(ind, introMs) {
    var showCursor = introMs >= 900;
    var cursor = showCursor
      ? '<span class="d-cursor" aria-hidden="true"></span>'
      : "";
    return (
      "<!doctype html><html><head><meta charset=\"utf-8\">" +
      "<style>" +
      ":root{--intro:" +
      introMs +
      "ms;--accent:" +
      ind.accent +
      ";--soft:" +
      ind.soft +
      ";}" +
      "*{box-sizing:border-box;}" +
      "html,body{margin:0;height:100%;}" +
      "body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#F4EFE6;color:#241812;position:relative;overflow:hidden;}" +
      "a{color:inherit;text-decoration:none;}" +
      "button{font:inherit;cursor:pointer;border:0;}" +
      ".d-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid rgba(0,0,0,0.08);}" +
      ".d-logo{font-weight:700;font-size:0.86rem;letter-spacing:.01em;}" +
      ".d-nav nav{display:flex;gap:16px;}" +
      ".d-nav nav a{font-size:0.74rem;color:#5a5148;padding:2px 0;border-bottom:1px solid transparent;transition:color .15s ease,border-color .15s ease;}" +
      ".d-nav nav a:hover{color:var(--accent);border-color:var(--accent);}" +
      ".d-hero{padding:22px 24px 4px;background:var(--soft);}" +
      ".d-hero h1{margin:0;font-size:1.28rem;line-height:1.22;font-family:Georgia,'Times New Roman',serif;}" +
      ".d-hero p{margin:8px 0 18px;font-size:0.8rem;color:#5a5148;}" +
      ".d-cta{display:inline-block;margin:16px 24px 20px;background:var(--accent);color:#fff;padding:9px 18px;border-radius:7px;font-size:0.76rem;font-weight:600;transition:transform .15s ease, filter .15s ease, box-shadow .15s ease;}" +
      ".d-cta:hover{transform:translateY(-2px);filter:brightness(1.12);box-shadow:0 10px 18px -8px rgba(0,0,0,0.4);}" +
      ".reveal{opacity:0;transform:translateY(8px);animation:fu var(--intro) cubic-bezier(.4,0,.2,1) both;}" +
      ".reveal.d1{animation-delay:calc(var(--intro) * 0.0);}" +
      ".reveal.d2{animation-delay:calc(var(--intro) * 0.16);}" +
      ".reveal.d3{animation-delay:calc(var(--intro) * 0.34);}" +
      ".reveal.d4{animation-delay:calc(var(--intro) * 0.52);}" +
      "@keyframes fu{to{opacity:1;transform:none;}}" +
      ".d-cursor{position:absolute;left:26px;top:24px;width:2px;height:20px;background:#241812;animation:cur calc(var(--intro) * 0.34) steps(4,end) both;}" +
      "@keyframes cur{0%,100%{opacity:0;}12%,38%{opacity:1;}55%{opacity:0;}}" +
      "@media (prefers-reduced-motion: reduce){.reveal{animation:none;opacity:1;transform:none;}.d-cursor{display:none;}}" +
      (ind.css || "") +
      "</style></head><body>" +
      cursor +
      ind.body +
      "</body></html>"
    );
  }

  /* =========================================================
     Scroll reveal — IntersectionObserver, once each
     ========================================================= */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* =========================================================
     Nav
     ========================================================= */
  var nav = document.querySelector(".site-nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("is-open", !open);
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );

  /* =========================================================
     Shared browser-frame (hero <-> Work) + tabs
     ========================================================= */
  var sharedFrame = document.getElementById("shared-frame");
  var sharedIframe = sharedFrame ? sharedFrame.querySelector("iframe") : null;

  function renderIndustry(id, introMs) {
    var ind = industryMap[id] || industries[0];
    if (sharedIframe) sharedIframe.srcdoc = buildSrcdoc(ind, introMs);
  }

  // Hero starts on the restaurant demo — same data Work uses.
  renderIndustry("restaurant", prefersReduced ? 0 : 2600);

  var heroHeadline = document.querySelector(".hero__headline");
  if (heroHeadline) {
    requestAnimationFrame(function () {
      heroHeadline.classList.add("is-live");
    });
  }

  var tabs = document.querySelectorAll(".industry-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.setAttribute("aria-selected", "false");
        t.tabIndex = -1;
      });
      tab.setAttribute("aria-selected", "true");
      tab.tabIndex = 0;
      renderIndustry(tab.getAttribute("data-industry"), prefersReduced ? 0 : 420);
    });
    tab.addEventListener("keydown", function (e) {
      var list = Array.prototype.slice.call(tabs);
      var i = list.indexOf(tab);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        (list[i + 1] || list[0]).focus();
        (list[i + 1] || list[0]).click();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        (list[i - 1] || list[list.length - 1]).focus();
        (list[i - 1] || list[list.length - 1]).click();
      }
    });
  });

  /* ---------- FLIP: move the same frame node from hero into Work ---------- */
  var heroSlot = document.getElementById("hero-frame-slot");
  var workSlot = document.getElementById("work-frame-slot");
  var dockTrigger = document.getElementById("work-dock-trigger");

  function dockFrame() {
    if (!sharedFrame || !workSlot || sharedFrame.parentElement === workSlot) return;

    if (prefersReduced) {
      workSlot.appendChild(sharedFrame);
      if (heroSlot) heroSlot.hidden = true;
      return;
    }

    var first = sharedFrame.getBoundingClientRect();
    workSlot.appendChild(sharedFrame);
    var last = sharedFrame.getBoundingClientRect();

    var dx = first.left - last.left;
    var dy = first.top - last.top;
    var sx = first.width / last.width;
    var sy = first.height / last.height;

    sharedFrame.animate(
      [
        { transform: "translate(" + dx + "px, " + dy + "px) scale(" + sx + ", " + sy + ")" },
        { transform: "none" },
      ],
      { duration: 750, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    );

    if (heroSlot) heroSlot.hidden = true;
  }

  if (dockTrigger && "IntersectionObserver" in window) {
    var dockIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            dockFrame();
            dockIO.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "-15% 0px -60% 0px" }
    );
    dockIO.observe(dockTrigger);
  } else {
    dockFrame();
  }

  /* =========================================================
     Real Work — actual live client sites, not demos.
     Same data-driven pattern as `industries`: adding a third
     or fourth client later is just appending to this array.
     ========================================================= */
  var realWork = [
    {
      name: "Al-Qalam Language Center",
      category: "Education — Language Institute",
      description:
        "A course-and-consultation site built to book free assessments for a 3,000+ student English fluency academy in Lahore.",
      url: "https://alqalamlanguagecenter.com",
      thumbnail: "https://alqalamlanguagecenter.com/images/og/og-default.png",
    },
    {
      name: "Watt & Watts",
      category: "B2B — Architectural Lighting",
      description:
        "A specification-grade product catalogue built to route architects and designers straight to WhatsApp for stock and lead-time confirmation.",
      url: "https://www.wattandwatts.com",
      thumbnail: "https://wattandwatts.com/images/og/default-og.jpg",
    },
  ];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderRealWork() {
    var grid = document.getElementById("real-work-grid");
    if (!grid) return;

    grid.innerHTML = realWork
      .map(function (item) {
        var hostname;
        try {
          hostname = new URL(item.url).hostname;
        } catch (e) {
          hostname = item.url;
        }
        return (
          '<div class="real-work-card">' +
          '<div class="browser-frame">' +
          '<div class="browser-frame__chrome"><span class="browser-frame__url">' +
          escapeHtml(hostname) +
          "</span></div>" +
          '<div class="browser-frame__body real-work-card__thumb">' +
          '<img src="' +
          escapeHtml(item.thumbnail) +
          '" alt="Screenshot of the ' +
          escapeHtml(item.name) +
          ' website homepage" loading="lazy">' +
          '<div class="real-work-card__thumb-fallback" aria-hidden="true">' +
          escapeHtml(item.name) +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="real-work-card__meta">' +
          '<p class="real-work-card__name">' +
          escapeHtml(item.name) +
          "</p>" +
          '<p class="real-work-card__category">' +
          escapeHtml(item.category) +
          "</p>" +
          '<p class="real-work-card__desc">' +
          escapeHtml(item.description) +
          "</p>" +
          '<a class="real-work-card__link" href="' +
          escapeHtml(item.url) +
          '" target="_blank" rel="noopener">Visit live site ↗</a>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    grid.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        var card = img.closest(".real-work-card");
        if (card) card.classList.add("thumb-failed");
      });
    });
  }
  renderRealWork();

  /* =========================================================
     Process — one evolving frame, scroll- and hover-driven
     ========================================================= */
  var processSteps = document.querySelectorAll(".process-step");
  var processLayers = document.querySelectorAll(".process-layer");
  var processFrame = document.querySelector(".process-frame");
  var hoverCapable = window.matchMedia("(hover: hover)").matches;

  // Static preview iframes for the "real content" / "live" stages —
  // instant render (introMs 0), this is a fidelity snapshot, not a reveal.
  document.querySelectorAll(".process-layer--live iframe").forEach(function (f) {
    f.srcdoc = buildSrcdoc(industryMap.restaurant, 0);
  });

  function setStage(stage) {
    processLayers.forEach(function (l) {
      l.classList.toggle("is-active", l.getAttribute("data-stage") === String(stage));
    });
    processSteps.forEach(function (s) {
      s.classList.toggle("is-active", s.getAttribute("data-stage") === String(stage));
    });
    if (processFrame) processFrame.classList.toggle("is-live", Number(stage) === 4);
  }
  setStage(1);

  processSteps.forEach(function (step) {
    step.addEventListener("mouseenter", function () {
      if (hoverCapable) setStage(step.getAttribute("data-stage"));
    });
    step.addEventListener("focus", function () {
      setStage(step.getAttribute("data-stage"));
    });
    step.addEventListener("click", function () {
      setStage(step.getAttribute("data-stage"));
    });
  });

  if ("IntersectionObserver" in window && processSteps.length) {
    var stepIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setStage(entry.target.getAttribute("data-stage"));
        });
      },
      { threshold: 0.6 }
    );
    processSteps.forEach(function (s) {
      stepIO.observe(s);
    });
  }

  /* =========================================================
     Contact form
     ========================================================= */
  var form = document.getElementById("lead-form");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("form-submit-btn");
  var submitLabel = submitBtn ? submitBtn.textContent : "Let's build your website →";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(form));

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      statusEl.textContent = "";

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          statusEl.style.color = "var(--gold-bright)";
          statusEl.textContent = "Thanks — we'll be in touch within a day.";
        })
        .catch(function () {
          statusEl.style.color = "#e88";
          statusEl.textContent =
            "Something went wrong. Please try again, or message us on WhatsApp.";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        });
    });
  }
})();
