(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const reveals = Array.from(document.querySelectorAll(".reveal, .proj-bg"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    reveals.forEach((el) => { if (el.classList.contains("proj-bg")) el.classList.add("armed"); });
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => {
      if (!el.classList.contains("reveal")) { io.observe(el); return; }
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [el];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i * 45, 270) + "ms";
      io.observe(el);
    });
  }

  document.querySelectorAll("img").forEach((img) => { img.decoding = "async"; });

  const dlg = document.getElementById("lightbox");
  if (dlg) {
    const img = dlg.querySelector(".lb-img");
    const cap = dlg.querySelector(".lb-cap");
    const count = dlg.querySelector(".lb-count");
    const closeBtn = dlg.querySelector(".lb-close");
    const prevBtn = dlg.querySelector(".lb-prev");
    const nextBtn = dlg.querySelector(".lb-next");
    const shots = Array.from(document.querySelectorAll(".shot"));
    let current = 0;
    let lastFocus = null;

    const show = (i, dir) => {
      if (shots.length === 0) return;
      current = (i + shots.length) % shots.length;
      const src = shots[current].querySelector("img");
      if (!reduced) {
        img.classList.remove("swap", "swap-next", "swap-prev");
        img.classList.add(dir === -1 ? "swap-prev" : "swap-next");
        requestAnimationFrame(() => requestAnimationFrame(() => img.classList.remove("swap", "swap-next", "swap-prev")));
      }
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      if (src.hasAttribute("width")) img.setAttribute("width", src.getAttribute("width"));
      if (src.hasAttribute("height")) img.setAttribute("height", src.getAttribute("height"));
      cap.textContent = shots[current].dataset.caption || src.alt;
      count.textContent = (current + 1) + " / " + shots.length;
    };

    shots.forEach((shot, i) => {
      shot.addEventListener("click", () => {
        lastFocus = shot;
        show(i);
        dlg.showModal();
        closeBtn.focus();
      });
    });

    prevBtn.addEventListener("click", () => show(current - 1, -1));
    nextBtn.addEventListener("click", () => show(current + 1, 1));
    closeBtn.addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    dlg.addEventListener("close", () => {
      if (lastFocus) lastFocus.focus();
    });
    document.addEventListener("keydown", (e) => {
      if (!dlg.open) return;
      if (e.key === "ArrowLeft") show(current - 1, -1);
      if (e.key === "ArrowRight") show(current + 1, 1);
    });
  }

  const progress = document.getElementById("progress");
  const hint = document.querySelector(".scroll-hint");

  const plx = [];
  if (!reduced) {
    document.querySelectorAll(".big-num").forEach((el) => { el.classList.add("parallax"); plx.push({ el: el, f: 0.1 }); });
    const hp = document.querySelector(".hero-portrait");
    if (hp) { hp.classList.add("parallax"); plx.push({ el: hp, f: 0.045 }); }
    // .proj-bg e .proj-content sono gestiti da motion.js (GSAP/ScrollTrigger)
    // su tutte le larghezze. Non aggiungerli a plx per evitare doppio motion.

  const landing = document.querySelector(".landing");
    if (landing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const ltxt = landing.querySelector(".landing-text");
      const llinks = landing.querySelector(".landing-links");
      landing.addEventListener("pointermove", (e) => {
        const r = landing.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        if (ltxt) ltxt.style.transform = "translate3d(" + (dx * 10).toFixed(1) + "px," + (dy * 8).toFixed(1) + "px,0)";
        if (llinks) llinks.style.transform = "translate3d(" + (dx * -14).toFixed(1) + "px," + (dy * -10).toFixed(1) + "px,0)";
      });
      landing.addEventListener("pointerleave", () => {
        if (ltxt) ltxt.style.transform = "";
        if (llinks) llinks.style.transform = "";
      });
    }
  }

  const dots = Array.from(document.querySelectorAll(".proj-dots a"));
  if (dots.length && "IntersectionObserver" in window) {
    // Fallback per quando motion.js non gira (reduced motion o no GSAP)
    const byId = {};
    dots.forEach((a) => { byId[a.getAttribute("href").slice(1)] = a; });
    const dio = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          dots.forEach((a) => a.removeAttribute("aria-current"));
          const a = byId[en.target.id];
          if (a) a.setAttribute("aria-current", "true");
        }
      }
    }, { threshold: 0.5 });
    document.querySelectorAll(".proj").forEach((s) => dio.observe(s));
  }

  let lastY = window.scrollY;
  let ticking = false;
  const onFrame = () => {
    ticking = false;
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("scrolled", y > 8);
      const menuOpen = nav && nav.classList.contains("open");
      header.classList.toggle("hide", y > 140 && y > lastY && !menuOpen);
    }
    lastY = y;
    if (hint) {
      if (y > window.innerHeight * 0.5) {
        hint.classList.add("hidden");
      } else {
        hint.classList.remove("hidden");
      }
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, y / max) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }
    const vh = window.innerHeight;
    if (plx.length) {
      for (const p of plx) {
        const ref = p.ref || p.el;
        const r = ref.getBoundingClientRect();
        if (r.bottom < -240 || r.top > vh + 240) continue;
        const delta = (r.top + ref.height / 2 - vh / 2) / vh;
        p.el.style.transform = "translate3d(0," + (-delta * p.f * 120).toFixed(2) + "px,0)";
      }
    }
  };
  const requestFrame = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onFrame);
    }
  };
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });
  onFrame();

  if (!reduced) {
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      if (!/\.html?$/.test(url.pathname)) return;
      e.preventDefault();
      document.body.classList.add("page-exit");
      window.setTimeout(() => {
        window.location.href = a.href;
      }, 240);
    });
  }
})();
