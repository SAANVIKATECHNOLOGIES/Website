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

  /* ---------- Services ---------- */
  var sg = document.getElementById("services-grid");
  if (sg && Array.isArray(cfg.services)) {
    sg.innerHTML = cfg.services.filter(function (s) { return s.enabled; }).map(function (s) {
      var msg = s.message || ("Hello " + (cfg.business ? cfg.business.name : "") + ", I would like to enquire about " + s.title + ".");
      return (
        '<article class="service-card reveal">' +
          '<span class="s-ic">' + icon(s.icon || "repair") + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          '<a class="link-cta" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">Enquire about this service ' + icon("arrow") + "</a>" +
        "</article>"
      );
    }).join("");
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
    document.querySelectorAll(".reveal, .step, .section-head").forEach(function (el) {
      el.classList.add("reveal");
      rv.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
