/* SAANVIKA TECHNOLOGIES — site behaviour (no dependencies) */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var contact = cfg.contact || {};
  var waNumber = contact.whatsapp && contact.whatsapp.enabled ? contact.whatsapp.number : null;

  function waLink(message) {
    if (!waNumber) return "#contact";
    var base = "https://wa.me/" + waNumber;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  function icon(name) {
    return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Contact links from config ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    if (waNumber) {
      a.href = waLink(cfg.defaultMessage);
    } else {
      a.hidden = true;
    }
  });
  document.querySelectorAll("[data-tel]").forEach(function (a) {
    if (contact.phone && contact.phone.enabled) {
      a.href = "tel:" + contact.phone.tel;
    } else {
      a.hidden = true;
    }
  });
  if (cfg.business && cfg.business.mapsUrl) {
    document.querySelectorAll("[data-maps]").forEach(function (a) { a.href = cfg.business.mapsUrl; });
  }

  // Optional fields — only shown once verified & enabled in config.js
  if (contact.email && contact.email.enabled && contact.email.address) {
    var li = document.getElementById("contact-email");
    var a = li.querySelector("a");
    a.href = "mailto:" + contact.email.address;
    a.textContent = contact.email.address;
    li.hidden = false;
  }
  if (contact.hours && contact.hours.enabled && contact.hours.lines && contact.hours.lines.length) {
    var hl = document.getElementById("contact-hours");
    hl.querySelector(".c-hours").innerHTML = contact.hours.lines.map(esc).join("<br>");
    hl.hidden = false;
  }

  /* ============================================================
     Hero Full-Screen Image Slider
     ============================================================ */
  var hsTrack   = document.getElementById("hs-track");
  var hsPrev    = document.getElementById("hs-prev");
  var hsNext    = document.getElementById("hs-next");
  var hsDotsEl  = document.getElementById("hs-dots");
  var hsBar     = document.getElementById("hs-progress-bar");

  if (hsTrack) {
    var hsSlides   = Array.prototype.slice.call(hsTrack.querySelectorAll(".hs-slide"));
    var hsTotal    = hsSlides.length;
    var hsCurrent  = 0;
    var hsTimer    = null;
    var hsPaused   = false;
    var hsInterval = 2000; // ms per slide

    /* ---- Build dots ---- */
    if (hsDotsEl && hsTotal > 0) {
      hsDotsEl.innerHTML = hsSlides.map(function (_, i) {
        return '<button class="hs-dot' + (i === 0 ? " active" : "") +
               '" type="button" role="tab" aria-label="Go to slide ' + (i + 1) + '"></button>';
      }).join("");
      hsDotsEl.addEventListener("click", function (e) {
        var dot = e.target.closest(".hs-dot");
        if (!dot) return;
        var idx = Array.prototype.indexOf.call(hsDotsEl.children, dot);
        if (idx >= 0) { goTo(idx); resetTimer(); }
      });
    }

    /* ---- Add slide counter badge ---- */
    var sliderEl = document.querySelector(".hero-slider");
    if (sliderEl) {
      var counter = document.createElement("div");
      counter.className = "hs-counter";
      counter.id = "hs-counter";
      counter.textContent = "1 / " + hsTotal;
      sliderEl.appendChild(counter);
    }

    /* ---- Core goTo ---- */
    function goTo(n) {
      /* deactivate old */
      hsSlides[hsCurrent].classList.remove("is-active");

      hsCurrent = (n + hsTotal) % hsTotal;

      /* activate new */
      hsSlides[hsCurrent].classList.add("is-active");

      /* move track */
      hsTrack.style.transform = "translateX(-" + (hsCurrent * 100) + "%)";

      /* dots */
      if (hsDotsEl) {
        Array.prototype.forEach.call(hsDotsEl.children, function (dot, i) {
          dot.classList.toggle("active", i === hsCurrent);
          dot.setAttribute("aria-selected", i === hsCurrent ? "true" : "false");
        });
      }

      /* counter */
      var cnt = document.getElementById("hs-counter");
      if (cnt) cnt.textContent = (hsCurrent + 1) + " / " + hsTotal;

      /* progress bar reset */
      startProgressBar();
    }

    /* ---- Progress bar animation ---- */
    function startProgressBar() {
      if (!hsBar) return;
      hsBar.style.transition = "none";
      hsBar.style.width = "0%";
      /* force reflow */
      hsBar.offsetWidth; // eslint-disable-line
      hsBar.style.transition = "width " + hsInterval + "ms linear";
      hsBar.style.width = "100%";
    }

    /* ---- Auto-advance timer ---- */
    function startTimer() {
      clearInterval(hsTimer);
      hsTimer = setInterval(function () {
        if (!hsPaused) goTo(hsCurrent + 1);
      }, hsInterval);
    }

    function resetTimer() {
      startTimer();
    }

    /* ---- Nav buttons ---- */
    if (hsPrev) {
      hsPrev.addEventListener("click", function () {
        goTo(hsCurrent - 1);
        resetTimer();
      });
    }
    if (hsNext) {
      hsNext.addEventListener("click", function () {
        goTo(hsCurrent + 1);
        resetTimer();
      });
    }

    /* ---- Keyboard support ---- */
    if (sliderEl) {
      sliderEl.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft")  { goTo(hsCurrent - 1); resetTimer(); }
        if (e.key === "ArrowRight") { goTo(hsCurrent + 1); resetTimer(); }
      });
    }

    /* ---- Touch / swipe support ---- */
    var touchStartX = 0;
    hsTrack.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      hsPaused = true;
    }, { passive: true });
    hsTrack.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(hsCurrent + 1);
        else          goTo(hsCurrent - 1);
        resetTimer();
      }
      setTimeout(function () { hsPaused = false; }, 800);
    }, { passive: true });

    /* ---- Pause on hover ---- */
    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", function () {
        hsPaused = true;
        if (hsBar) hsBar.style.animationPlayState = "paused";
      });
      sliderEl.addEventListener("mouseleave", function () {
        hsPaused = false;
        if (hsBar) hsBar.style.animationPlayState = "running";
      });
    }

    /* ---- Init first slide ---- */
    goTo(0);
    startTimer();
  }

  /* ---------- Services ---------- */
  var sg = document.getElementById("services-grid");
  var filterContainer = document.getElementById("category-filters");
  if (sg && Array.isArray(cfg.services)) {
    var activeCategory = "all";

    function renderServices() {
      var filtered = cfg.services.filter(function (s) {
        if (!s.enabled) return false;
        if (activeCategory === "all") return true;
        return s.category === activeCategory;
      });

      sg.innerHTML = filtered.map(function (s) {
        var msg = s.message || ("Hello " + (cfg.business ? cfg.business.name : "") + ", I would like to enquire about " + s.title + ".");
        var badgesHtml = (s.badges || ["Sales", "Service", "AMC"]).map(function (b) {
          var cls = "badge-tag ";
          if (b.toLowerCase().indexOf("sales") !== -1) cls += "badge-sales";
          else if (b.toLowerCase().indexOf("service") !== -1) cls += "badge-service";
          else if (b.toLowerCase().indexOf("amc") !== -1) cls += "badge-amc";
          return '<span class="' + cls + '">' + esc(b) + '</span>';
        }).join("");

        var highlightsHtml = s.highlights && s.highlights.length ? (
          '<ul class="s-highlights">' +
            s.highlights.slice(0, 3).map(function (h) {
              return '<li>' + icon("check") + '<span>' + esc(h) + '</span></li>';
            }).join("") +
          '</ul>'
        ) : '';

        var mediaHtml = s.image ? (
          '<div class="s-card-media">' +
            '<span class="s-card-tag">' + esc(s.categoryName || "Service") + '</span>' +
            '<img src="' + esc(s.image) + '" alt="' + esc(s.title) + '" loading="lazy" width="400" height="250">' +
          '</div>'
        ) : '';

        var pageLink = s.pageUrl ? (
          '<a class="btn-page" href="' + esc(s.pageUrl) + '">Explore Details ' + icon("arrow") + '</a>'
        ) : '<span class="btn-page">Verified Solution</span>';

        return (
          '<article class="service-card-enhanced reveal" data-category="' + esc(s.category || "") + '">' +
            mediaHtml +
            '<div class="s-card-body">' +
              '<div class="s-badges">' + badgesHtml + '</div>' +
              '<h3><a href="' + esc(s.pageUrl || "#contact") + '">' + esc(s.title) + '</a></h3>' +
              (s.tagline ? '<p class="s-tagline">' + esc(s.tagline) + '</p>' : '') +
              '<p class="s-desc">' + esc(s.text) + '</p>' +
              highlightsHtml +
              '<div class="s-actions">' +
                pageLink +
                '<a class="btn-wa" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">' +
                  icon("whatsapp") + ' Enquire' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join("");

      // Trigger scroll observer for new items
      if (window.refreshReveal) window.refreshReveal();
    }

    // Category Filter Event Listeners
    if (filterContainer) {
      filterContainer.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterContainer.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-filter") || "all";
        renderServices();
      });
    }

    renderServices();
  }

  /* ---------- Coverage Areas (GEO) ---------- */
  if (cfg.coverage) {
    var vzContainer = document.getElementById("vizag-areas-list");
    if (vzContainer && Array.isArray(cfg.coverage.vizagAreas)) {
      vzContainer.innerHTML = cfg.coverage.vizagAreas.map(function (area) {
        var isFeatured = area.indexOf("Madhurawada") !== -1 || area.indexOf("IT SEZ") !== -1 || area.indexOf("Brandix") !== -1;
        return '<li class="area-pill' + (isFeatured ? ' featured' : '') + '">' + icon("pin") + ' ' + esc(area) + '</li>';
      }).join("");
    }
    var apContainer = document.getElementById("ap-cities-list");
    if (apContainer && Array.isArray(cfg.coverage.andhraPradeshCities)) {
      apContainer.innerHTML = cfg.coverage.andhraPradeshCities.map(function (city) {
        return '<li class="area-pill">' + icon("map") + ' ' + esc(city) + '</li>';
      }).join("");
    }
  }

  /* ---------- Problems ---------- */
  var pg = document.getElementById("problems-grid");
  if (pg && Array.isArray(cfg.problems)) {
    var greet = "Hello " + (cfg.business ? cfg.business.name : "") + ", ";
    pg.innerHTML = cfg.problems.map(function (p) {
      return (
        '<li class="reveal"><a class="problem" href="' + esc(waLink(greet + p.message + " Can you help?")) + '" target="_blank" rel="noopener">' +
          '<span class="p-ic">' + icon(p.icon || "help") + "</span>" +
          '<span class="p-label">' + esc(p.label) + '<span class="sr-only"> — enquire on WhatsApp</span></span>' +
          '<span class="p-go">' + icon("arrow") + "</span>" +
        "</a></li>"
      );
    }).join("");
  }

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name, problem = form.elements.problem, device = form.elements.device;
      var err = document.getElementById("form-error");
      var bad = false;
      [name, problem].forEach(function (f) {
        var invalid = !f.value.trim();
        f.setAttribute("aria-invalid", invalid ? "true" : "false");
        if (invalid) bad = true;
      });
      err.hidden = !bad;
      if (bad) { (name.value.trim() ? problem : name).focus(); return; }

      var msg =
        "Hello " + (cfg.business ? cfg.business.name : "") + ",\n" +
        "Name: " + name.value.trim() + "\n" +
        "Device: " + device.value + "\n" +
        "Problem: " + problem.value.trim();
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  /* ---------- Header: scrolled state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open, returnFocus) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (menu.hidden) return;
    if (e.key === "Escape") { setMenu(false, true); return; }
    if (e.key === "Tab") {
      var items = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll("a")));
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));
  if ("IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
          map[en.target.id].classList.add("active");
          map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });

    /* ---------- Reveal on scroll ---------- */
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    function observeElements() {
      document.querySelectorAll(".reveal:not(.in), .step, .section-head").forEach(function (el) {
        el.classList.add("reveal");
        rv.observe(el);
      });
    }
    window.refreshReveal = observeElements;
    observeElements();
  } else {
    window.refreshReveal = function () {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    };
    window.refreshReveal();
  }

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
