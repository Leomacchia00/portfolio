(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  const reveals = Array.from(document.querySelectorAll(".reveal, .big-num"));
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = mq.matches;
  mq.addEventListener("change", (e) => { reduced = e.matches; });
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
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
      if (i > 0) el.style.transitionDelay = Math.min(i * 40, 320) + "ms";
      io.observe(el);
    });
  }

  document.querySelectorAll("img").forEach((img) => { img.decoding = "async"; });

  /* ---------- Image reveal (transitions.dev "Skeleton loader and reveal") ----------
     Le foto non "pop-up": appaiono con un leggero blur + scala che si assesta.
     L'attributo e' aggiunto qui (non nell'HTML) cosi' senza JS le immagini
     restano perfettamente visibili. */
  const REVEAL_SEL = ".infinite-loop-gallery img, .pd-grid img, .idx-thumb img, .work-thumb img, .about-photo img";
  const markReveal = (img) => {
    if (!img || img.hasAttribute("data-reveal")) return;
    img.setAttribute("data-reveal", "");
    if (img.complete && img.naturalWidth > 0) img.classList.add("is-loaded");
  };
  document.querySelectorAll(REVEAL_SEL).forEach(markReveal);
  // load non fa bubbling, ma la fase di capture intercetta anche i cloni
  // creati dopo (strip a loop infinito)
  document.addEventListener("load", (e) => {
    if (e.target && e.target.tagName === "IMG" && e.target.hasAttribute("data-reveal")) {
      e.target.classList.add("is-loaded");
    }
  }, true);
  // un'immagine che non carica non deve restare invisibile: si mostra comunque
  document.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG" && e.target.hasAttribute("data-reveal")) {
      e.target.classList.add("is-loaded");
    }
  }, true);

  const dlg = document.getElementById("lightbox");
  if (dlg) {
    const img = dlg.querySelector(".lb-img");
    const cap = dlg.querySelector(".lb-cap");
    const count = dlg.querySelector(".lb-count");
    const closeBtn = dlg.querySelector(".lb-close");
    const prevBtn = dlg.querySelector(".lb-prev");
    const nextBtn = dlg.querySelector(".lb-next");
    let current = 0;
    let lastFocus = null;    // element focus returns to (always an original)
    let returnTarget = null; // element the return flight lands on (may be a clone)

    const imgOf = (el) => (el && el.tagName === "IMG") ? el : (el ? el.querySelector("img") : null);

    // Triggers: original (non-clone) infinite-loop gallery images.
    // Se un pannello progetto è aperto, lo scope è il pannello (solo le sue
    // foto); altrimenti lo scope resta globale (tutte le strip, come prima).
    const scopeEl = () => document.querySelector(".project-detail.open") || document;
    const collectShots = () => Array.from(
      scopeEl().querySelectorAll(".infinite-loop-gallery img, .pd-grid img, .pd-head .pd-cover")
    ).filter((el) => !el.closest('[aria-hidden="true"]'));

    const closeModal = () => {
      if (reduced || dlg.classList.contains("is-closing") || dlg.classList.contains("is-returning")) {
        dlg.close();
        return;
      }
      // Shared-element return flight: the image flies back to where the user
      // clicked while the chrome and the backdrop fade (CSS .is-returning).
      const thumb = imgOf(returnTarget);
      if (thumb) {
        const from = img.getBoundingClientRect();
        const to = thumb.getBoundingClientRect();
        const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
        const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
        const s = to.width / Math.max(1, from.width);
        dlg.classList.add("is-returning");
        gsap.killTweensOf(img);
        gsap.to(img, {
          x: dx, y: dy, scale: s,
          duration: 0.38, ease: "power3.in", overwrite: "auto",
          onComplete: () => dlg.close()
        });
      } else {
        dlg.classList.add("is-closing");
        window.setTimeout(() => dlg.close(), 200);
      }
    };

    const show = (i, dir) => {
      const shots = collectShots();
      if (shots.length === 0) return;
      current = (i + shots.length) % shots.length;
      const src = imgOf(shots[current]);
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

    const openAt = (i, trigger, visual) => {
      lastFocus = trigger;
      returnTarget = visual || trigger;
      show(i);
      dlg.showModal();
      closeBtn.focus();
      // Shared-element flight: the image grows from the clicked thumbnail.
      // GSAP: interrompibile (riparte dalla posizione corrente) + easing morbido.
      if (!reduced) {
        const thumb = imgOf(returnTarget);
        if (thumb) {
          const from = thumb.getBoundingClientRect();
          const to = img.getBoundingClientRect();
          const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
          const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
          const s = from.width / Math.max(1, to.width);
          gsap.killTweensOf(img);
          gsap.fromTo(img,
            { x: dx, y: dy, scale: s },
            { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" }
          );
        }
      }
    };

    // Delegated open: infinite-loop images. Clicks on loop
    // clones (aria-hidden) map back to their original for focus and navigation.
    document.addEventListener("click", (e) => {
      const hit = e.target.closest(".infinite-loop-gallery img, .pd-grid img, .pd-head .pd-cover");
      if (!hit) return;
      const shots = collectShots();
      if (!shots.length) return;
      let trigger = hit;
      if (hit.closest(".infinite-loop-gallery") && hit.closest('[aria-hidden="true"]')) {
        const gallery = hit.closest(".infinite-loop-gallery");
        const kids = Array.from(gallery.children);
        trigger = kids[kids.indexOf(hit) % (kids.length / 2)];
      }
      const i = shots.indexOf(trigger);
      if (i < 0) return;
      openAt(i, trigger, hit);
    });

    // Le stesse immagini si aprono da tastiera (Enter/Space)
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const hit = e.target.closest && e.target.closest(".infinite-loop-gallery img, .pd-grid img, .pd-head .pd-cover");
      if (!hit) return;
      e.preventDefault();
      hit.click();
    });

    prevBtn.addEventListener("click", () => show(current - 1, -1));
    nextBtn.addEventListener("click", () => show(current + 1, 1));
    closeBtn.addEventListener("click", closeModal);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) closeModal();
    });
    dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal();
    });
    dlg.addEventListener("close", () => {
      dlg.classList.remove("is-returning");
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    });
    document.addEventListener("keydown", (e) => {
      if (!dlg.open) return;
      if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
      if (e.key === "ArrowLeft") show(current - 1, -1);
      if (e.key === "ArrowRight") show(current + 1, 1);
    });
  }

  /* ---------- Project detail panel (entra da destra) ---------- */

  const panels = Array.from(document.querySelectorAll(".project-detail"));
  let openPanel = null;
  let panelReturnFocus = null;
  let panelFlight = null;   // proxy del prodotto in volo (scena -> pannello)

  const lockScroll = (on) => {
    document.documentElement.classList.toggle("pd-lock", on);
    const lenis = window.portfolioLenis;
    if (!lenis) return;
    if (on) lenis.stop(); else lenis.start();
  };

  /* Morph del prodotto: il cutout che sta nella scena vola dentro il
     pannello e atterra sulla cover, che subentra con una dissolvenza.
     Stessa tecnica del lightbox (elemento condiviso), ma dal basso. */
  const planFlight = (scene, panel) => {
    if (!scene || !panel) return null;
    // se un volo era in corso, lo interrompe (GSAP riparte dalla posizione corrente)
    if (panelFlight) {
      gsap.killTweensOf(panelFlight.proxy);
      panelFlight.proxy.remove();
      if (panelFlight.scene) panelFlight.scene.classList.remove("pd-source-hidden");
      panelFlight = null;
    }
    const bg = scene.querySelector(".bg-a");
    const cover = panel.querySelector(".pd-cover");
    if (!bg || !cover) return null;
    const f = String(bg.dataset.product || "").split(",").map(Number);
    if (f.length !== 4 || f.some(Number.isNaN)) return null;

    const br = bg.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const cr = cover.getBoundingClientRect();
    if (!br.width || !br.height || !cr.width || !cr.height) return null;

    // bbox del prodotto dentro il cutout (frazioni) -> rettangolo a schermo
    const src = {
      l: br.left + br.width * f[0], t: br.top + br.height * f[1],
      w: br.width * f[2], h: br.height * f[3],
    };
    // la cover e' ancora fuori schermo: il pannello e' traslato di pr.left
    const dst = { l: cr.left - pr.left, t: cr.top, w: cr.width, h: cr.height };

    const proxy = document.createElement("div");
    proxy.className = "pd-fly";
    const img = document.createElement("img");
    img.src = bg.currentSrc || bg.src;
    img.alt = "";
    img.decoding = "async";
    proxy.appendChild(img);
    proxy.style.left = src.l + "px";
    proxy.style.top = src.t + "px";
    proxy.style.width = src.w + "px";
    proxy.style.height = src.h + "px";
    // dentro il proxy c'e' l'intero cutout: si vede cosi' solo il prodotto
    img.style.width = br.width + "px";
    img.style.height = br.height + "px";
    img.style.left = -br.width * f[0] + "px";
    img.style.top = -br.height * f[1] + "px";
    document.body.appendChild(proxy);

    // scala uniforme (mai deformare il prodotto) + traslazione dei centri
    const scale = dst.h / src.h;
    const dx = (dst.l + dst.w / 2) - (src.l + src.w / 2);
    const dy = (dst.t + dst.h / 2) - (src.t + src.h / 2);
    return { proxy, cover, panel, scene, dx, dy, scale };
  };

  /* entrata coreografica del pannello: slide + stagger dei testi.
     Separiamo la slide del contenitore dal volo del prodotto: il pannello
     parte subito, il prodotto lo raggiunge e atterra sul suo settle. */
  const slideInPanel = (panel) => {
    panel.style.visibility = "visible";
    gsap.killTweensOf(panel);
    gsap.fromTo(panel,
      { x: "100%" },
      { x: "0%", duration: 0.72, ease: "expo.out", overwrite: "auto" }
    );
  };
  const revealPanelContent = (panel) => {
    if (reduced) return;
    const items = panel.querySelectorAll(".pd-kicker, .pd-title, .pd-text");
    if (!items.length) return;
    gsap.fromTo(items,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07, delay: 0.35,
        overwrite: "auto", clearProps: "transform,opacity" }
    );
  };

  const startFlight = (plan) => {
    if (!plan) return;
    const { proxy, panel, scene, cover } = plan;
    panelFlight = plan;
    // il prodotto originale esce di scena: il proxy prende il suo posto
    if (scene) scene.classList.add("pd-source-hidden");
    gsap.killTweensOf(proxy);
    gsap.set(cover, { opacity: 0 });   // cover nascosta all'inizio, appare durante il volo
    // zoom della scena: l'immagine di fondo si ingrandisce, dando l'effetto
    // di uno "zoom dentro il progetto" piuttosto che un pannello che si apre
    const bgImg = scene ? scene.querySelector(".scene-bg img") : null;
    if (bgImg) {
      gsap.to(bgImg, { scale: 1.12, duration: 0.7, ease: "power3.out", overwrite: "auto" });
    }
    // il pannello scivola; il prodotto lo raggiunge in volo
    slideInPanel(panel);
    revealPanelContent(panel);
    // cross-fade: la cover appare mentre il prodotto è ancora in volo,
    // così non c'è stop brusco quando atterra (nessun "scatto")
    gsap.to(cover, { opacity: 1, duration: 0.25, delay: 0.15, ease: "power2.out", overwrite: "auto" });
    gsap.to(proxy, {
      x: plan.dx, y: plan.dy, scale: plan.scale,
      duration: 0.5, delay: 0.05, ease: "power3.out", overwrite: "auto",
      onComplete: () => {
        gsap.to(proxy, { opacity: 0, duration: 0.2, ease: "power2.out",
          onComplete: () => { proxy.remove(); panelFlight = null; } });
      }
    });
  };

  const openDetail = (id, trigger) => {
    const key = String(id).replace(/^#/, "");
    const panel = document.getElementById(key);
    if (!panel) return;
    if (openPanel && openPanel !== panel) closeDetail(false);
    const projKey = key.replace(/^p-/, "");
    const scene = document.querySelector('[data-project="' + projKey + '"]');
    // misura PRIMA di aprire: il pannello e' ancora fuori schermo
    // il volo parte solo da un click reale (deep link/popstate: nessun volo)
    const plan = (reduced || !trigger) ? null : planFlight(scene, panel);
    openPanel = panel;
    panelReturnFocus = trigger || null;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    // il resto della pagina esce dal tree di accessibilità mentre il pannello è aperto
    const page = document.querySelector("main");
    const header = document.querySelector(".site-header");
    const footer = document.querySelector(".site-footer");
    [page, header, footer].forEach((el) => { if (el) el.setAttribute("inert", ""); });
    // il colore del pannello segue il progetto
    const accent = scene ? getComputedStyle(scene).getPropertyValue("--accent").trim() : "";
    if (accent) panel.style.setProperty("--accent", accent);
    lockScroll(true);
    const close = panel.querySelector(".pd-close");
    if (close) close.focus({ preventScroll: true });
    if (history.replaceState) history.pushState({ project: id }, "", "#" + String(id).replace(/^#/, ""));
    if (plan) {
      startFlight(plan);
    } else if (!reduced) {
      // nessun volo (deep link): stessa slide coreografica, senza prodotto
      slideInPanel(panel);
      revealPanelContent(panel);
    }
  };

  const closeDetail = (pushBack) => {
    if (!openPanel) return;
    const panel = openPanel;
    openPanel = null;
    // se il prodotto era in volo, cancella il volo e il proxy
    if (panelFlight) {
      gsap.killTweensOf(panelFlight.proxy);
      panelFlight.proxy.remove();
      panelFlight = null;
    }
    // ripristina zoom scena prima che il prodotto torni visibile
    document.querySelectorAll(".scene.pd-source-hidden").forEach((s) => {
      const bgImg = s.querySelector(".scene-bg img");
      if (bgImg) gsap.to(bgImg, { scale: 1, duration: 0.5, ease: "power3.in", overwrite: "auto" });
    });
    // il prodotto originale torna in scena (fade via transition CSS
    // di .scene-bg img: riappare mentre il pannello esce)
    document.querySelectorAll(".scene.pd-source-hidden").forEach((s) => s.classList.remove("pd-source-hidden"));
    panel.setAttribute("aria-hidden", "true");
    [document.querySelector("main"), document.querySelector(".site-header"), document.querySelector(".site-footer")]
      .forEach((el) => { if (el) el.removeAttribute("inert"); });
    if (pushBack && history.replaceState) history.replaceState({}, "", location.pathname + location.search);
    if (panelReturnFocus) panelReturnFocus.focus({ preventScroll: true });
    panelReturnFocus = null;

    const finish = () => {
      panel.classList.remove("open");
      panel.style.visibility = "";
      lockScroll(false);
    };
    if (reduced) { finish(); return; }
    // uscita coreografica: il pannello scivola via mentre la scena
    // dietro riprende il prodotto (niente sparizione a scatto)
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      x: "100%", duration: 0.5, ease: "power3.in", overwrite: "auto",
      onComplete: finish
    });
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".open-project");
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute("href") || ("#p-" + (trigger.dataset.project || ""));
      openDetail(id, trigger);
      return;
    }
    if (e.target.closest(".pd-close")) { closeDetail(true); return; }
  });

  document.addEventListener("keydown", (e) => {
    if (!openPanel) return;
    if (e.key === "Escape") { e.preventDefault(); closeDetail(true); return; }
    if (e.key !== "Tab") return;
    // focus trap: il pannello è l'unico contenuto raggiungibile
    const focusables = openPanel.querySelectorAll("button, [href], img[tabindex], [tabindex]:not([tabindex='-1'])");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Il pannello è scrollabile: con Lenis attivo la rotella finirebbe
  // per scrollare la pagina sotto, quindi la intercettiamo e scrolliamo
  // il pannello (touch e tastiera funzionano nativamente).
  panels.forEach((panel) => {
    panel.addEventListener("wheel", (e) => {
      if (!panel.classList.contains("open")) return;
      const max = panel.scrollHeight - panel.clientHeight;
      if (max <= 0) return;
      e.preventDefault();
      const next = panel.scrollTop + e.deltaY;
      panel.scrollTop = Math.max(0, Math.min(max, next));
      // ai bordi, lascia scorrere la pagina sotto
      if ((next <= 0 && e.deltaY < 0) || (next >= max && e.deltaY > 0)) {
        const lenis = window.portfolioLenis;
        if (lenis) lenis.scrollTo(lenis.scroll + e.deltaY, { immediate: true });
      }
    }, { passive: false });
  });

  window.addEventListener("popstate", () => {
    const m = /^#p-(.+)$/.exec(location.hash || "");
    if (m) openDetail("p-" + m[1], null);
    else closeDetail(false);
  });

  // deep link: projects.html#p-shock apre il pannello
  const initial = /^#p-(.+)$/.exec(location.hash || "");
  if (initial) {
    const panel = document.getElementById("p-" + initial[1]);
    if (panel) setTimeout(() => openDetail("p-" + initial[1], null), 400);
  }

  const progress = document.getElementById("progress");

  // Parallax unificato su GSAP/ScrollTrigger (motion.js, [data-speed]):
  // niente più getBoundingClientRect nel loop rAF — solo transform, GPU.
  if (!reduced) {
    document.querySelectorAll(".big-num").forEach((el) => { el.classList.add("parallax"); el.dataset.speed = "0.88"; });
    const hp = document.querySelector(".hero-portrait");
    if (hp) { hp.classList.add("parallax"); hp.dataset.speed = "0.95"; }
  }

  const landing = document.querySelector(".landing");
  if (landing && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduced) {
    const ltxt = landing.querySelector(".landing-text");
    const llinks = landing.querySelector(".landing-links");
    // promuovi a layer solo mentre il parallax e' attivo (niente
    // will-change permanente su mobile)
    if (ltxt) ltxt.style.willChange = "transform";
    if (llinks) llinks.style.willChange = "transform";
    let rect = null, raf = 0, ev = null;
    const measure = () => { rect = landing.getBoundingClientRect(); };
    const apply = () => {
      raf = 0;
      if (!ev || !rect) return;
      const dx = (ev.clientX - rect.left) / rect.width - 0.5;
      const dy = (ev.clientY - rect.top) / rect.height - 0.5;
      if (ltxt) ltxt.style.transform = "translate3d(" + (dx * 10).toFixed(1) + "px," + (dy * 8).toFixed(1) + "px,0)";
      if (llinks) llinks.style.transform = "translate3d(" + (dx * -14).toFixed(1) + "px," + (dy * -10).toFixed(1) + "px,0)";
    };
    landing.addEventListener("pointerenter", measure);
    landing.addEventListener("pointermove", (e) => {
      ev = e;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    landing.addEventListener("pointerleave", () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      ev = null;
      if (ltxt) ltxt.style.transform = "";
      if (llinks) llinks.style.transform = "";
    });
    window.addEventListener("resize", measure);
    measure();
  }

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduced && finePointer) {
    // Solo il CTA principale e' magnetico: sulle link landing la magnetica
    // era un no-op (il transform di .landing-link vince per specificita') e
    // sulle card contatto si sommava al tilt 3D (due moti sullo stesso
    // elemento). "Un momento animato per pagina".
    document.querySelectorAll(".btn.primary").forEach((el) => {
      el.classList.add("magnetic");
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
        el.style.setProperty("--mx", dx.toFixed(1) + "px");
        el.style.setProperty("--my", dy.toFixed(1) + "px");
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      });
    });
    document.querySelectorAll(".contact-card, .p-index-row, .scene .bg-tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", (-py * 4).toFixed(2) + "deg");
        el.style.setProperty("--ry", (px * 4).toFixed(2) + "deg");
        el.style.setProperty("--tilt-dur", "var(--dur-md)");
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--tilt-dur", "var(--dur-lg)");
      });
    });
  }

  /* Parallax del mouse sulle scene: l'immagine di background si muove
     leggermente nella direzione opposta al cursore, dando profondità. */
  if (!reduced && finePointer) {
    document.querySelectorAll(".scene").forEach((scene) => {
      const img = scene.querySelector(".scene-bg img");
      if (!img) return;
      scene.classList.add("scene-parallax");
      let raf = 0, ev = null, rect = null;
      const measure = () => { rect = scene.getBoundingClientRect(); };
      const apply = () => {
        raf = 0;
        if (!ev || !rect) return;
        const dx = (ev.clientX - rect.left) / rect.width - 0.5;
        const dy = (ev.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = "translate3d(" + (dx * -6).toFixed(1) + "px," + (dy * -4).toFixed(1) + "px,0)";
      };
      scene.addEventListener("pointerenter", measure);
      scene.addEventListener("pointermove", (e) => { ev = e; if (!raf) raf = requestAnimationFrame(apply); }, { passive: true });
      scene.addEventListener("pointerleave", () => {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        ev = null;
        img.style.transform = "";
      });
      window.addEventListener("resize", measure);
      measure();
    });
  }

  let lastY = window.scrollY;
  let ticking = false;
  const onFrame = () => {
    ticking = false;
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("scrolled", y > 40);
      const menuOpen = nav && nav.classList.contains("open");
      header.classList.toggle("hide", y > 140 && y > lastY && !menuOpen);
    }
    lastY = y;
    if (progress) {
      progress.style.transform = "scaleX(" + maxRatio(y) + ")";
    }
  };
  let maxScroll = 1;
  const maxRatio = (y) => (maxScroll > 0 ? Math.min(1, y / maxScroll) : 0);
  const measure = () => {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };
  const requestFrame = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onFrame);
    }
  };
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", () => { measure(); requestFrame(); });
  measure();
  onFrame();

  /* ---------------- Page transitions (fade between pages) ---------------- */
  const pt = document.createElement("div");
  pt.className = "page-transition";
  document.body.appendChild(pt);
  // fade-in all'apertura della pagina (overlay parte visibile, poi sparisce)
  requestAnimationFrame(() => {
    pt.classList.add("is-hidden");
  });

  // intercetta i click sui link interni (stessa origine, non âncora, non mailto/tel)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    // escludi âncora, link esterni, mailto, tel, javascript, download
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") ||
        href.startsWith("javascript:") || link.target === "_blank" || link.download) return;
    try {
      const url = new URL(href, location.origin);
      if (url.origin !== location.origin) return;
    } catch { return; }
    // non intercettare i link che aprono i pannello progetto (già gestiti altrove)
    if (link.classList.contains("open-project")) return;
    e.preventDefault();
    pt.classList.remove("is-hidden");
    setTimeout(() => { location.href = href; }, 450);
  }, { capture: true });
})();
