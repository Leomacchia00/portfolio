/* ============================================================
   Portfolio — Leonardo Macchiarini — Motion Layer 2026
   Lenis smooth scroll + GSAP/ScrollTrigger parallax deck
   Custom cursor, magnetic hover, scroll-driven animations
   
   FIX: Parallax continuo su TUTTI i breakpoint (desktop, tablet, mobile)
   FIX: Nessun pin, nessuna pausa, nessuna incoerenza
   FIX: Lenis attivo anche su mobile (con parametri ottimizzati)
   FIX: Gestione touch/pointer coerente
   ============================================================ */
(() => {
  "use strict";

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";
  const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionOK = !reducedMq.matches;

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    // Lag smoothing per recuperare frame su hardware debole
    gsap.ticker.lagSmoothing(500, 33);
  }

  /* ============================================================
     Lenis — Smooth scroll su TUTTI i device
     ============================================================ */

  let lenis = null;
  let lenisTicker = null;
  let dlgObserver = null;

  function initLenis() {
    if (!motionOK || !hasGsap || !hasLenis || lenis) return;
    
    // Lenis gestisce solo la rotella; touch usa lo scroll nativo (momentum di sistema)
    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true
    });
    
    lenis.on("scroll", ScrollTrigger.update);
    lenisTicker = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(lenisTicker);
    
    // Pausa lenis quando lightbox è aperta
    const dlg = document.getElementById("lightbox");
    if (dlg && !dlgObserver) {
      dlgObserver = new MutationObserver(() => {
        if (!lenis) return;
        if (dlg.open) lenis.stop();
        else lenis.start();
      });
      dlgObserver.observe(dlg, { attributes: true, attributeFilter: ["open"] });
    }
    
    document.documentElement.classList.add("lenis");
  }

  function destroyLenis() {
    if (dlgObserver) { dlgObserver.disconnect(); dlgObserver = null; }
    if (lenisTicker) { gsap.ticker.remove(lenisTicker); lenisTicker = null; }
    if (lenis) { lenis.destroy(); lenis = null; }
    document.documentElement.classList.remove("lenis");
  }

  /* ============================================================
     Custom Cursor — Solo su fine pointer
     ============================================================ */

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
    
    gsap.set([cursorDot, cursorRing], { 
      xPercent: -50, 
      yPercent: -50, 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2, 
      opacity: 1 
    });
    
    const dx = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const dy = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });
    const rx = gsap.quickTo(cursorRing, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(cursorRing, "y", { duration: 0.5, ease: "power3.out" });
    
    window.addEventListener("pointermove", (e) => {
      if (!motionOK) return;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.set([cursorDot, cursorRing], { opacity: 1 });
      
      const hot = e.target.closest && e.target.closest("a, button, .shot, [data-cursor]");
      gsap.to(cursorRing, { 
        scale: hot ? 1.7 : 1, 
        duration: 0.35, 
        ease: "power3.out", 
        overwrite: "auto" 
      });
      gsap.to(cursorDot, { 
        scale: hot ? 0.5 : 1, 
        duration: 0.35, 
        ease: "power3.out", 
        overwrite: "auto" 
      });
    }, { passive: true });
    
    document.documentElement.addEventListener("pointerleave", () => {
      gsap.set([cursorDot, cursorRing], { opacity: 0 });
    });
    
    window.addEventListener("pointerdown", () => {
      if (motionOK) gsap.to(cursorRing, { 
        scale: 0.75, 
        duration: 0.2, 
        ease: "power2.out", 
        overwrite: "auto" 
      });
    });
  }

  function destroyCursor() {
    if (!cursorDot) return;
    document.documentElement.classList.remove("cursor-on");
    cursorDot.remove();
    cursorRing.remove();
    cursorDot = cursorRing = null;
  }

  /* ============================================================
     Magnetic Hover — Solo su fine pointer
     ============================================================ */

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

  /* ============================================================
     Hero Title Animation (Landing)
     ============================================================ */

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
          s.textContent = ch === " " ? "\u00A0" : ch;
          line.appendChild(s);
        }
      } else if (node.nodeType === 1 && node.tagName === "BR") {
        line = document.createElement("span");
        line.className = "lt-line";
        el.appendChild(line);
      }
    }
    const chars = Array.from(el.querySelectorAll(".lt-ch"));
    const base = el.getBoundingClientRect();
    const grad = "linear-gradient(135deg, #ffffff 0%, var(--link) 40%, var(--accent) 100%)";
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
      gsap.to(chars, { 
        yPercent: 0, 
        duration: 1.05, 
        ease: "power4.out", 
        stagger: 0.045, 
        delay: 0.2 
      });
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
      window.setTimeout(run, 1600);
    } else {
      run();
    }
  }

  /* ============================================================
     List Lines Animation (CV)
     ============================================================ */

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

  /* ============================================================
     Projects — Parallax Continuo su TUTTI i breakpoint
     ============================================================ */

  const projs = Array.from(document.querySelectorAll(".proj"));
  const dots = Array.from(document.querySelectorAll(".proj-dots a"));
  let counter = null;
  let counterCur = null;
  let activeIdx = -1;
  let onScroll = null;

  function splitProjTitle(title) {
    if (title.classList.contains("split")) return Array.from(title.querySelectorAll(".split-ch"));
    const text = title.textContent;
    title.textContent = "";
    title.classList.add("split");
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const s = document.createElement("span");
      s.className = "split-ch";
      s.textContent = ch === " " ? "\u00A0" : ch;
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

  function setupDeck() {
    if (!motionOK || !hasGsap || !projs.length) return;
    if (document.body.classList.contains("gsap-deck")) return;
    document.body.classList.add("gsap-deck");

    // ==========================================================
    // PARALLAX CONTINUO SU OGNI SEZIONE (funziona su TUTTI i device)
    // ==========================================================
    projs.forEach((sec, i) => {
      const bg = sec.querySelector(".proj-bg");
      const bgImg = bg ? bg.querySelector("img") : null;
      const title = sec.querySelector(".proj-title");
      const chars = title ? splitProjTitle(title) : [];
      const isBatwing = sec.classList.contains("proj-batwing");
      const bits = sec.querySelectorAll(".proj-index, .proj-sub, .proj-desc");
      
      // For Bat-wing, handle horizontal gallery separately
      if (isBatwing) {
        setupBatwingGallery(sec);
      }

      // 1. Parallax dello sfondo (yPercent: -12 a 12 per effetto più visibile)
      if (bgImg) {
        gsap.fromTo(bgImg, { yPercent: -12 }, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,  // Menos aggressivo per fluidità
            invalidateOnRefresh: true
          }
        });
      }

      // 2. Scale subtile dello sfondo per profondità
      if (bgImg) {
        gsap.fromTo(bgImg, { scale: 1.02 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      }

      // 3. Reveal del titolo (stagger per carattere)
      if (chars.length) {
        gsap.fromTo(chars, { yPercent: 120, opacity: 0 }, {
          yPercent: 0, 
          opacity: 1, 
          stagger: 0.03, 
          duration: 0.9, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            markers: false
          }
        });
      }

      // 4. Reveal degli altri elementi (index, sub, desc, shots)
      if (bits.length) {
        gsap.fromTo(bits, { y: 40, opacity: 0 }, {
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 5. Fade in del background
      if (bg) {
        gsap.fromTo(bg, { opacity: 0 }, {
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // ==========================================================
    // COUNTER (01/04) — Aggiornato durante lo scroll
    // ==========================================================
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

    // Aggiorna counter e dots durante lo scroll
    let activeIdxLocal = 0;
    let ticking = false;
    const updateActive = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      projs.forEach((sec, i) => {
        if (mid >= sec.offsetTop) idx = i;
      });
      if (idx !== activeIdxLocal) {
        activeIdxLocal = idx;
        setActive(idx);
      }
      ticking = false;
    };
    
    // Throttle via requestAnimationFrame per evitare loop infinito
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Dots navigation — scroll to section
    dots.forEach((a) => {
      a.addEventListener("click", (e) => {
        const sec = document.getElementById(a.getAttribute("href").slice(1));
        if (!sec) return;
        e.preventDefault();
        const y = sec.getBoundingClientRect().top + window.scrollY - 80;
        if (lenis) {
          lenis.scrollTo(y, { duration: 1.2 });
        } else {
          window.scrollTo({ top: y, behavior: motionOK ? "smooth" : "auto" });
        }
      });
    });

    ScrollTrigger.refresh();
  }

  /* ============================================================
     Bat-wing Horizontal Gallery Animation
     ============================================================ */
  function setupBatwingGallery(sec) {
    if (!motionOK || !hasGsap) return;
    
    const gallery = sec.querySelector(".proj-gallery-horiz");
    const track = gallery ? gallery.querySelector(".gallery-track-horiz") : null;
    const shots = track ? Array.from(track.children) : [];
    
    if (!gallery || !track || !shots.length) return;
    
    // Calculate total width of all shots
    const totalWidth = shots.reduce((sum, shot) => {
      return sum + shot.offsetWidth + (parseFloat(getComputedStyle(shot).marginRight) || 0);
    }, 0);
    
    // Horizontal scroll animation with snap
    gsap.to(track, {
      x: () => -(totalWidth - window.innerWidth * 0.8),
      ease: "none",
      scrollTrigger: {
        trigger: gallery,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: shots.map((_, i) => i / (shots.length - 1)),
          duration: 0.3,
          delay: 0
        },
        end: () => '+=' + (totalWidth - window.innerWidth * 0.7),
        invalidateOnRefresh: true
      }
    });
    
    // Add active class when shot is in center for visual feedback
    shots.forEach((shot, i) => {
      ScrollTrigger.create({
        trigger: shot,
        start: 'left center',
        end: 'right center',
        onToggle: self => {
          shot.classList.toggle('active', self.isActive);
        }
      });
    });
    
    // 3D Tilt effect on hover for Bat-wing shots
    if (fineMq.matches) {
      shots.forEach(shot => {
        const img = shot.querySelector('img');
        if (!img) return;
        
        shot.addEventListener('mousemove', (e) => {
          if (!motionOK) return;
          const rect = shot.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 2 - 1;
          const y = (e.clientY - rect.top) / rect.height * 2 - 1;
          
          gsap.to(img, {
            rotateX: y * 15,
            rotateY: x * 15,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        shot.addEventListener('mouseleave', () => {
          if (!motionOK) return;
          gsap.to(img, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    }
    
    // Magnetic effect on hover for Bat-wing shots
    if (fineMq.matches) {
      shots.forEach(shot => {
        const xTo = gsap.quickTo(shot, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(shot, "y", { duration: 0.35, ease: "power3.out" });
        
        shot.addEventListener("pointermove", (e) => {
          if (!motionOK) return;
          const rect = shot.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
          
          const pullFactor = Math.max(0, 1 - dist / 200) * 40;
          xTo((e.clientX - centerX) * pullFactor * 0.01);
          yTo((e.clientY - centerY) * pullFactor * 0.01);
        });
        
        shot.addEventListener("pointerleave", () => {
          if (!motionOK) return;
          gsap.to(shot, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
          });
        });
      });
    }
  }

  function teardownDeck() {
    if (!document.body.classList.contains("gsap-deck")) return;
    document.body.classList.remove("gsap-deck");
    
    // Rimuovi tutti i ScrollTrigger
    ScrollTrigger.getAll().forEach((st) => st.kill());
    
    // Rimuovi counter
    if (counter && counter.parentNode) {
      counter.parentNode.removeChild(counter);
    }
    counter = null;
    counterCur = null;
    
    // Rimuovi scroll handler
    if (onScroll) {
      window.removeEventListener("scroll", onScroll);
      onScroll = null;
    }

    // Resetta dots
    dots.forEach((a) => a.removeAttribute("aria-current"));
  }

  /* ============================================================
     Responsive / Preference Changes
     ============================================================ */

  function applyPrefs() {
    motionOK = !reducedMq.matches;
    
    // Distruggi tutto se reduced motion
    if (!motionOK) {
      destroyLenis();
      teardownDeck();
      destroyCursor();
      return;
    }
    
    // Lenis funziona su TUTTI i device
    initLenis();
    
    // Deck funziona su TUTTI i device
    setupDeck();
    
    // Cursor e magnetic solo su fine pointer
    initCursor();
    initMagnetic();
  }

  // Listener per cambi di preferenze
  if (reducedMq.addEventListener) {
    reducedMq.addEventListener("change", applyPrefs);
  } else if (reducedMq.addListener) {
    reducedMq.addListener(applyPrefs);
  }

  // Listener per cambi di pointer type (opzionale)
  if (fineMq.addEventListener) {
    fineMq.addEventListener("change", () => {
      destroyCursor();
      initCursor();
      initMagnetic();
    });
  }

  window.addEventListener("load", () => { 
    if (hasGsap) ScrollTrigger.refresh(); 
  });

  /* ============================================================
     Boot
     ============================================================ */

  applyPrefs();
  initHero();
  initListLines();
})();
