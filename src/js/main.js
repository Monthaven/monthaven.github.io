/* Monthaven Home Buyers — site JS.
   One file, deferred, no dependencies.

   Responsibilities:
     1. Mobile nav
     2. Attribution capture (UTM/click IDs persisted across internal navigation)
     3. Lead form: two-step reveal, A2P consent, spam traps, submit + status
*/
(function () {
  "use strict";

  // ---------------------------------------------------------------- nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mark the current nav item.
  var here = location.pathname;
  Array.prototype.forEach.call(document.querySelectorAll("#primary-nav a"), function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  // -------------------------------------------------------- attribution
  // Captured on the FIRST pageview and persisted, so an ad click that browses
  // to a city page before converting doesn't lose its source.
  var ATTR_KEY = "mh_attr";
  var UTM_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "gclid", "fbclid"
  ];

  function readStore(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || "null"); } catch (e) { return null; }
  }
  function writeStore(key, val) {
    try { sessionStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }

  var params = new URLSearchParams(location.search);
  var stored = readStore(ATTR_KEY);
  var hasFreshUtm = UTM_KEYS.some(function (k) { return params.get(k); });

  if (!stored || hasFreshUtm) {
    var attr = { landing_page: location.href, referrer: document.referrer || "" };
    UTM_KEYS.forEach(function (k) { attr[k] = params.get(k) || (stored ? stored[k] : "") || ""; });
    if (stored && !hasFreshUtm) {
      attr.landing_page = stored.landing_page || attr.landing_page;
      attr.referrer = stored.referrer || attr.referrer;
    }
    writeStore(ATTR_KEY, attr);
    stored = attr;
  }
  var attribution = stored || {};

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
  }

  // ---------------------------------------------------------- lead forms
  var MIN_FILL_MS = 3000; // anything faster than this is a bot

  function setVal(form, name, value) {
    var el = form.querySelector('[name="' + name + '"]');
    if (el && !el.value) el.value = value;
  }

  function status(form, message, kind) {
    var box = form.querySelector("[data-form-status]");
    if (!box) return;
    box.textContent = message;
    box.className = "form-status form-status--" + kind;
    box.hidden = false;
    if (box.focus) box.focus({ preventScroll: false });
  }

  Array.prototype.forEach.call(document.querySelectorAll("form[data-lead-form]"), function (form) {
    var loadedAt = Date.now();
    var leadId = uuid();

    setVal(form, "lead_id", leadId);
    setVal(form, "page_url", location.href);
    setVal(form, "page_title", document.title);
    setVal(form, "opt_in_url", location.href);
    setVal(form, "timestamp", new Date().toISOString());
    setVal(form, "landing_page", attribution.landing_page || location.href);
    setVal(form, "referrer", attribution.referrer || "");
    UTM_KEYS.forEach(function (k) { setVal(form, k, attribution[k] || ""); });

    // --- A2P consent: reveal when a phone number is entered.
    // Lives on step 1 with the phone field by design.
    var phone = form.querySelector('input[name="phone"]');
    var consentWrap = form.querySelector(".sms-consent");
    var consentBox = consentWrap ? consentWrap.querySelector('input[type="checkbox"]') : null;

    function syncConsent() {
      if (!phone || !consentWrap || !consentBox) return;
      var has = phone.value.trim().length > 0;
      consentWrap.hidden = !has;
      consentBox.required = has;
      if (!has) consentBox.checked = false;
    }
    if (phone) {
      syncConsent();
      phone.addEventListener("input", syncConsent);
    }

    var step1 = form.querySelector('[data-step="1"]');
    var step2 = form.querySelector('[data-step="2"]');
    var nextBtn = form.querySelector("[data-next-step]");

    function validateStep1() {
      var address = form.querySelector('[name="address"]');
      var email = form.querySelector('[name="email"]');

      if (!address || !address.value.trim()) {
        status(form, "We need the property address to look anything up.", "err");
        if (address) address.focus();
        return false;
      }
      var hasPhone = phone && phone.value.trim();
      var hasEmail = email && email.value.trim();
      if (!hasPhone && !hasEmail) {
        status(form, "Add a phone number or an email so we can send the offer.", "err");
        if (phone) phone.focus();
        return false;
      }
      if (consentBox && consentBox.required && !consentBox.checked) {
        status(form, "Please check the box to agree to receive texts, or clear the phone field and use email instead.", "err");
        consentBox.focus();
        return false;
      }
      return true;
    }

    function post(stage) {
      var data = new FormData(form);
      data.set("stage", stage);
      data.set("elapsed_ms", String(Date.now() - loadedAt));
      return fetch(form.getAttribute("action"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
    }

    if (nextBtn && step1 && step2) {
      nextBtn.addEventListener("click", function () {
        if (!validateStep1()) return;
        var box = form.querySelector("[data-form-status]");
        if (box) box.hidden = true;

        // Partial capture: fires only when enabled in site.json. Off by default
        // because it doubles submissions against the form provider's quota.
        if (form.hasAttribute("data-partial-capture")) {
          post("partial").catch(function () { /* never block the user on this */ });
        }

        step1.hidden = true;
        step2.hidden = false;
        var first = step2.querySelector("input, select, textarea");
        if (first) first.focus();
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var hp = form.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return; // bot
      if (Date.now() - loadedAt < MIN_FILL_MS) {
        status(form, "That was quick. Give it a moment and try again.", "err");
        return;
      }
      var name = form.querySelector('[name="name"]');
      if (name && !name.value.trim()) {
        status(form, "Please add your name.", "err");
        name.focus();
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      post("complete")
        .then(function (res) {
          if (!res.ok) throw new Error("bad response");
          if (step1) step1.hidden = true;
          if (step2) step2.hidden = true;
          var note = form.querySelector(".form-note");
          if (note) note.hidden = true;
          var hours = form.getAttribute("data-offer-hours") || "24";
          var tel = form.getAttribute("data-phone") || "";
          status(
            form,
            "Got it. We'll have a written offer to you within " + hours + " hours, usually sooner. " +
              (tel ? "If you need us right now, call or text " + tel + "." : ""),
            "ok"
          );
          if (window.gtag) {
            gtag("event", "generate_lead", { event_category: "lead", event_label: location.pathname });
          }
          try { history.replaceState(null, "", location.pathname + "?submitted=1"); } catch (err) {}
        })
        .catch(function () {
          status(
            form,
            "That didn't go through. Please call or text us instead — we'd rather hear from you than lose you to a form error.",
            "err"
          );
          if (btn) { btn.disabled = false; btn.textContent = "Send It — Get My Offer"; }
        });
    });
  });
})();
