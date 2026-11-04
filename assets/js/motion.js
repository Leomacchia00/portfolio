/* ============================================================
   Portfolio — premium 2026 animation layer
   Lenis smooth scroll + GSAP/ScrollTrigger pinned project deck,
   custom cursor, magnetic hover, kinetic masked titles,
   grain is CSS-only. Additive: main.js (reveals, lightbox,
   nav, progress) keeps working unchanged.
   Everything non-essential is disabled with prefers-reduced-motion
   and on touch / small screens where noted.
   ============================================================ */
(() => {
  "use strict";

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";
  const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
  const desktopMq = window.matchMedia("(min-width: 769px)");
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionOK = !reducedMq.matches;

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------------- Lenis smooth scroll (desktop, motion ok) ---------------- */

  let lenis = null;
  let dlgObserver = null;

  function initLenis() {
    if (!motionOK || !hasGsap || !hasLenis || !desktopMq.matches || lenis) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    const dlg = document.getElementById("lightbox");
    if (dlg && !dlgObserver) {
      dlgObserver = new MutationObserver(() => {
        if (!lenis) return;
        if (dlg.open) lenis.stop(); else lenis.start();
      });
      dlgObserver.observe(dlg, { attributes: true, attributeFilter: ["open"] });
    }
  }

  function destroyLenis() {
    if (dlgObserver) { dlgObserver.disconnect(); dlgObserver = null; }
    if (lenis) { lenis.destroy(); lenis = null; }
  }

  /* ---------------- custom cursor (fine pointers only) ---------------- */

  let cursorDot = null;
  let cursorRing = null;

  function initCursor() {
    if (cursorDot || !fineMq.matches || !motionOK || !hasGsap) return;
    cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    document.documentElement.classList.add("cursor-on");
    gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2, opacity: 1 });
    const dx = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const dy = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });
    const rx = gsap.quickTo(cursorRing, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(cursorRing, "y", { duration: 0.5, ease: "power3.out" });
    window.addEventListener("pointermove", (e) => {
      if (!motionOK) return;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.set([cursorDot, cursorRing], { opacity: 1 });
      const hot = e.target.closest && e.target.closest("a, button, .shot, [data-cursor]");
      gsap.to(cursorRing, { scale: hot ? 1.7 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(cursorDot, { scale: hot ? 0.5 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => {
      gsap.set([cursorDot, cursorRing], { opacity: 0 });
    });
    window.addEventListener("pointerdown", () => {
      if (motionOK) gsap.to(cursorRing, { scale: 0.75, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    });
  }

  function destroyCursor() {
    if (!cursorDot) return;
    document.documentElement.classList.remove("cursor-on");
    cursorDot.remove();
    cursorRing.remove();
    cursorDot = cursorRing = null;
  }

  /* ---------------- magnetic hover ---------------- */

  function magnetic(el, strength, max) {
    if (!el || el.__magnetic || !hasGsap) return;
    el.__magnetic = true;
    el.classList.add("magnetic");
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      if (!motionOK) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      xTo(clamp(dx, -max, max));
      yTo(clamp(dy, -max, max));
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
    });
  }

  function initMagnetic() {
    if (!fineMq.matches || !motionOK || !hasGsap) return;
    document.querySelectorAll(".landing-link").forEach((el) => magnetic(el, 0.22, 14));
    document.querySelectorAll(".site-nav a, .footer-links a, .contact-card, .doc-link").forEach((el) => magnetic(el, 0.16, 8));
  }

  /* ---------------- kinetic masked hero title (index) ---------------- */

  function splitHeroTitle(el) {
    const nodes = Array.from(el.childNodes);
    el.textContent = "";
    el.classList.add("split");
    let line = document.createElement("span");
    line.className = "lt-line";
    el.appendChild(line);
    for (const node of nodes) {
      if (node.nodeType === 3) {
        for (const ch of node.textContent) {
          if (ch === "\n" || ch === "\t") continue;
          const s = document.createElement("span");
          s.className = "lt-ch";
          s.textContent = ch === " " ? " " : ch;
          line.appendChild(s);
        }
      } else if (node.nodeType === 1 && node.tagName === "BR") {
        line = document.createElement("span");
        line.className = "lt-line";
        el.appendChild(line);
      }
    }
    // keep the original full-width gradient continuous across the letters
    const chars = Array.from(el.querySelectorAll(".lt-ch"));
    const base = el.getBoundingClientRect();
    const grad = "linear-gradient(100deg, var(--accent-2) 0%, var(--accent) 55%, #c4b5fd 100%)";
    for (const ch of chars) {
      const r = ch.getBoundingClientRect();
      ch.style.backgroundImage = grad;
      ch.style.backgroundSize = base.width + "px 100%";
      ch.style.backgroundPosition = (-(r.left - base.left)) + "px 0px";
    }
    return chars;
  }

  function initHero() {
    const title = document.querySelector(".landing-title");
    if (!title || !hasGsap || !motionOK || title.classList.contains("split")) return;
    let done = false;
    const run = () => {
      if (done || !motionOK || title.classList.contains("split")) return;
      done = true;
      const chars = splitHeroTitle(title);
      if (!chars.length) return;
      gsap.set(chars, { yPercent: 115 });
      gsap.to(chars, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.045, delay: 0.2 });
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
      window.setTimeout(run, 1600); // fallback if fonts.ready stalls
    } else {
      run();
    }
  }

  /* ---------------- accent line grows per CV/list entry ---------------- */

  function initListLines() {
    const items = Array.from(document.querySelectorAll(".edu-list li, .exp-list li"));
    if (!items.length || !motionOK) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      }
    }, { threshold: 0.4, rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => {
      const parent = el.parentElement;
      const sibs = parent ? Array.from(parent.children).filter((c) => c.tagName === "LI") : [el];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--line-delay", Math.min(i * 70, 350) + "ms");
      io.observe(el);
    });
  }

  /* ---------------- projects: pinned deck (desktop, motion ok) ---------------- */

  const projs = Array.from(document.querySelectorAll(".proj"));
  const dots = Array.from(document.querySelectorAll(".proj-dots a"));
  let deckTriggers = [];
  let deckTls = [];
  let counter = null;
  let counterCur = null;
  let activeIdx = -1;
  let refreshHandler = null;
  let dotsFallback = null;

  function splitProjTitle(title) {
    if (title.classList.contains("split")) return Array.from(title.querySelectorAll(".split-ch"));
    const text = title.textContent;
    title.textContent = "";
    title.classList.add("split");
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const s = document.createElement("span");
      s.className = "split-ch";
      s.textContent = ch === " " ? " " : ch;
      frag.appendChild(s);
    }
    title.appendChild(frag);
    return Array.from(title.querySelectorAll(".split-ch"));
  }

  function setActive(i) {
    if (i === activeIdx || !dots.length) return;
    activeIdx = i;
    dots.forEach((a, j) => {
      if (j === i) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (counterCur) counterCur.textContent = String(i + 1).padStart(2, "0");
  }

  function applyProgress(i, t) {
    const pair = deckTls[i];
    if (!pair) return;
    pair.enterTl.progress(clamp(t / 0.45, 0, 1));
    if (pair.exitTl) pair.exitTl.progress(clamp((t - 0.55) / 0.45, 0, 1));
  }

  function initDotsFallback() {
    if (dotsFallback || !dots.length || !projs.length || !("IntersectionObserver" in window)) return;
    const byId = {};
    dots.forEach((a) => { byId[a.getAttribute("href").slice(1)] = a; });
    dotsFallback = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          dots.forEach((a) => a.removeAttribute("aria-current"));
          const a = byId[en.target.id];
          if (a) a.setAttribute("aria-current", "true");
        }
      }
    }, { threshold: 0.5 });
    projs.forEach((s) => dotsFallback.observe(s));
  }

  function killDotsFallback() {
    if (dotsFallback) { dotsFallback.disconnect(); dotsFallback = null; }
  }

  function setupDeck() {
    if (!motionOK || !hasGsap || !desktopMq.matches || !projs.length) return;
    if (document.body.classList.contains("gsap-deck")) return;
    killDotsFallback();
    document.body.classList.add("gsap-deck");

    projs.forEach((sec, i) => {
      const bg = sec.querySelector(".proj-bg");
      const bgImg = bg ? bg.querySelector("img") : null;
      const title = sec.querySelector(".proj-title");
      const chars = title ? splitProjTitle(title) : [];
      const bits = sec.querySelectorAll(".proj-index, .proj-sub, .proj-desc, .proj-shots");

      const enterTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      if (bg) enterTl.fromTo(bg, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
      if (bgImg) enterTl.fromTo(bgImg, { scale: 1.05, yPercent: 4 }, { scale: 1, yPercent: 0 }, 0);
      if (chars.length) enterTl.fromTo(chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.045 }, 0.12);
      if (bits.length) enterTl.fromTo(bits, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06 }, 0.18);

      let exitTl = null;
      if (i < projs.length - 1) {
        exitTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        if (bg) exitTl.to(bg, { clipPath: "inset(0% 0% 100% 0%)" }, 0);
        if (bgImg) exitTl.to(bgImg, { scale: 1.06, yPercent: -4 }, 0);
        if (chars.length) exitTl.to(chars, { yPercent: -115, stagger: 0.035 }, 0);
        if (bits.length) exitTl.to(bits, { y: -32, opacity: 0, stagger: 0.05 }, 0);
      }
      deckTls.push({ enterTl, exitTl });

      const st = ScrollTrigger.create({
        trigger: sec,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => { applyProgress(i, self.progress); setActive(i); },
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i)
      });
      deckTriggers.push(st);
    });

    refreshHandler = () => deckTriggers.forEach((st, i) => applyProgress(i, st.progress));
    ScrollTrigger.addEventListener("refresh", refreshHandler);

    // 01 / 04 counter (fixed, bottom-right; hidden <=900px via CSS)
    counter = document.createElement("div");
    counter.className = "proj-counter";
    counter.setAttribute("aria-hidden", "true");
    counterCur = document.createElement("span");
    counterCur.className = "pc-cur";
    counterCur.textContent = "01";
    const total = document.createElement("span");
    total.className = "pc-total";
    total.textContent = "/ " + String(projs.length).padStart(2, "0");
    counter.appendChild(counterCur);
    counter.appendChild(total);
    document.body.appendChild(counter);

    // dots scroll to the matching pinned section
    dots.forEach((a) => {
      a.addEventListener("click", (e) => {
        const sec = document.getElementById(a.getAttribute("href").slice(1));
        if (!sec) return;
        const i = projs.indexOf(sec);
        if (i < 0 || !deckTriggers[i]) return;
        e.preventDefault();
        const y = deckTriggers[i].start;
        if (lenis) lenis.scrollTo(y, { duration: 1.4 });
        else window.scrollTo({ top: y, behavior: motionOK ? "smooth" : "auto" });
      });
    });

    ScrollTrigger.refresh();
    deckTriggers.forEach((st, i) => applyProgress(i, st.progress));
    setActive(clamp(Math.round((window.scrollY) / Math.max(1, window.innerHeight)), 0, projs.length - 1));
  }

  function teardownDeck() {
    if (!document.body.classList.contains("gsap-deck")) return;
    document.body.classList.remove("gsap-deck");
    if (refreshHandler) { ScrollTrigger.removeEventListener("refresh", refreshHandler); refreshHandler = null; }
    deckTriggers.forEach((st) => st.kill());
    deckTls.forEach((pair) => { pair.enterTl.kill(); if (pair.exitTl) pair.exitTl.kill(); });
    projs.forEach((sec) => {
      const bg = sec.querySelector(".proj-bg");
      const bgImg = bg ? bg.querySelector("img") : null;
      const title = sec.querySelector(".proj-title");
      const chars = title ? title.querySelectorAll(".split-ch") : [];
      const bits = sec.querySelectorAll(".proj-index, .proj-sub, .proj-desc, .proj-shots");
      if (bg) gsap.set(bg, { clearProps: "clipPath,transform,opacity" });
      if (bgImg) gsap.set(bgImg, { clearProps: "transform" });
      if (chars.length) gsap.set(chars, { clearProps: "transform" });
      if (bits.length) gsap.set(bits, { clearProps: "transform,opacity" });
    });
    deckTriggers = [];
    deckTls = [];
    activeIdx = -1;
    if (counter && counter.parentNode) counter.parentNode.removeChild(counter);
    counter = null;
    counterCur = null;
    dots.forEach((a) => a.removeAttribute("aria-current"));
    initDotsFallback();
  }

  /* ---------------- responsive / preference changes ---------------- */

  function applyPrefs() {
    motionOK = !reducedMq.matches;
    if (!motionOK) {
      destroyLenis();
      teardownDeck();
      destroyCursor();
      return;
    }
    if (desktopMq.matches) {
      initLenis();
      setupDeck();
    } else {
      destroyLenis();
      teardownDeck();
    }
    initCursor();
    initMagnetic();
  }

  if (desktopMq.addEventListener) desktopMq.addEventListener("change", applyPrefs);
  else if (desktopMq.addListener) desktopMq.addListener(applyPrefs);
  if (reducedMq.addEventListener) reducedMq.addEventListener("change", applyPrefs);
  else if (reducedMq.addListener) reducedMq.addListener(applyPrefs);

  window.addEventListener("load", () => { if (hasGsap) ScrollTrigger.refresh(); });

  /* ---------------- boot ---------------- */

  applyPrefs();
  initHero();
  initListLines();
})();
