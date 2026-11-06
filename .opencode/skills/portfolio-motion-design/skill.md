---
name: Portfolio Motion Design
description: >-
  Advanced motion design for Leonardo Macchiarini's portfolio using GSAP, ScrollTrigger and Lenis.
  Specialized in curved flows, infinite loops, parallax effects, and smooth scrolling animations.
triggers:
  - "motion design"
  - "GSAP animation"
  - "ScrollTrigger"
  - "smooth scroll"
  - "curved flow"
  - "infinite loop"
  - "parallax effect"
  - "scroll animation"
---

# Portfolio Motion Design

## Overview

This skill specializes in creating premium, performance-optimized animations for portfolio websites using GSAP (GreenSock Animation Platform), ScrollTrigger, and Lenis smooth scrolling. It combines best practices from Emil Kowalski's motion philosophy with portfolio-specific patterns.

## Core Principles (Inspired by Emil Kowalski)

### 1. Justified Motion
Every animation must have a clear purpose:
- **Spatial consistency**: Elements move from logical origins
- **State indication**: Visual feedback for user actions
- **Storytelling**: Guide the user through the portfolio narrative
- **Prevent jarring changes**: Smooth transitions between states

### 2. Frequency-Appropriate Motion
- **Keyboard/100+/day actions**: NO animation (instant)
- **Tens/day**: Reduced motion (100-200ms)
- **Occasional**: Standard motion (200-400ms)
- **Rare/First-time**: Can include delight (400-800ms)

### 3. Physical Correctness
- Popovers/dropdowns scale from their trigger (`transform-origin`)
- Never animate from `scale(0)` - start from `scale(0.9-0.97)` + opacity
- Modals stay centered (exception to the rule)

### 4. GPU-Accelerated Properties Only
Animate ONLY:
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (carefully, as it can be expensive)

NEVER animate:
- `width`, `height`, `margin`, `padding`, `top`, `left`
- `border`, `box-shadow` (unless absolutely necessary)

## Portfolio-Specific Patterns

### Curved Flow Animations (Bat-wing Style)
```javascript
// Parameters for curved image flow
const config = {
  startAngle: -45,    // Start from bottom-right (4 o'clock)
  endAngle: 135,      // End at top-left
  curveRadius: 0.8,   // Curve intensity (0 = straight, 1 = very curved)
  heroScale: 1.4,     // First image is 40% bigger
  baseWidth: 350,     // Base image width
  minWidth: 250,      // Minimum width on mobile
  spacing: 40,        // Spacing between images
  parallaxStrength: 0.3, // Parallax effect intensity
  rotationRange: 15,  // Max rotation in degrees
  duration: 1.2,      // Animation duration
  ease: 'power2.inOut' // Smooth easing
};

// Position calculation for curved path
function calculateCurvePosition(progress, scrollY, viewportHeight) {
  const angle = lerp(config.startAngle, config.endAngle, progress);
  const angleRad = degToRad(angle);
  const curveFactor = config.curveRadius * (1 + scrollY / viewportHeight * 0.3);
  
  const xOffset = Math.cos(angleRad) * curveFactor * viewportHeight * 0.8;
  const yOffset = Math.sin(angleRad) * curveFactor * viewportHeight * 0.8 - scrollY * config.parallaxStrength;
  
  return { x: xOffset, y: yOffset };
}
```

### Infinite Loop Animations (Andreas.vision Style)
```javascript
// Auto-scrolling loop for image galleries
function initInfiniteLoop(container, items, speed = 0.5) {
  const totalWidth = items.length * 100; // Each item takes 100% width
  
  gsap.to(items, {
    x: `-=${totalWidth}`,
    duration: totalWidth / speed,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });
}

// Seamless loop with cloned elements
function createSeamlessLoop() {
  const originalItems = document.querySelectorAll('.gallery-item');
  const container = document.querySelector('.gallery-container');
  
  // Clone items for seamless transition
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });
  
  // Animate all items
  const allItems = container.querySelectorAll('.gallery-item');
  initInfiniteLoop(container, allItems);
}
```

### Parallax Scrolling Effects (Macmillan Studio Style)
```javascript
// Multi-layer parallax with depth
function initParallaxLayers() {
  const layers = document.querySelectorAll('[data-speed]');
  
  layers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed) || 0;
    
    gsap.to(layer, {
      y: (i, target) => (window.innerHeight - target.offsetHeight) * speed,
      scrollTrigger: {
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}

// Horizontal parallax for hero sections
function initHorizontalParallax() {
  const hero = document.querySelector('.hero-section');
  const heroImages = hero.querySelectorAll('.parallax-img');
  
  heroImages.forEach((img, i) => {
    const offset = (i + 1) * 50; // Different offset for each image
    
    gsap.to(img, {
      x: (i, target) => target.offsetWidth * offset * 0.01,
      scrollTrigger: {
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}
```

## GSAP Best Practices for Portfolio

### ScrollTrigger Configuration
```javascript
// Standard ScrollTrigger setup
ScrollTrigger.defaults({
  markers: false, // Set to true for debugging
  scroller: 'body',
  // For Lenis smooth scroll integration:
  scroller: '#main',
  onUpdate: (self) => {
    // Sync with Lenis
    if (lenis) lenis.raf(self.scroll());
  }
});

// Common patterns:
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',      // When top of section hits 80% of viewport
    end: 'top 20%',        // When top of section hits 20% of viewport
    scrub: 1,              // 1 second smooth scrub
    // scrub: true,        // Auto scrub (faster)
    // snap: 1,            // Snap to nearest scroll position
    toggleActions: 'play none none reverse',
    // OnEnter: play, OnLeave: none, OnEnterBack: none, OnLeaveBack: reverse
    invalidateOnRefresh: true
  }
});
```

### Performance Optimizations
```javascript
// Will-change for GPU acceleration
gsap.set('.animating-element', {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  perspective: 1000
});

// Batch animations
gsap.to([element1, element2, element3], {
  x: 100,
  opacity: 1,
  duration: 0.5,
  stagger: 0.1
});

// Use quickTo for performance-critical animations
const xPos = gsap.quickTo(element, 'x', { duration: 0.1, ease: 'power3.out' });
xPos(100); // Animate to x: 100
```

## Lenis Smooth Scroll Integration

```javascript
// Basic Lenis setup
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  smooth: true,
  smoothWheel: true,
  smoothTouch: false,
  direction: 'vertical',
  gestureDirection: 'vertical',
  infinite: false
});

// Sync Lenis with GSAP
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Pause Lenis during animations
function pauseScroll() {
  lenis.stop();
}

function resumeScroll() {
  lenis.start();
}
```

## Easing Curves Reference

```javascript
// Custom cubic-bezier curves
const easings = {
  // Emil Kowalski's recommended curves
  easeOut: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Smooth scrolling
  smoothScroll: 'cubic-bezier(0.16, 1, 0.3, 1)',
  
  // Bounce effects
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Elastic
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
};

// Predefined GSAP eases
const gsapEases = {
  power1: Power1.easeOut,
  power2: Power2.easeOut,
  power3: Power3.easeOut,
  power4: Power4.easeOut,
  back: Back.easeOut.config(1.7),
  elastic: Elastic.easeOut.config(1, 0.3),
  bounce: Bounce.easeOut,
  sine: Sine.easeOut,
  expo: Expo.easeOut,
  circ: Circ.easeOut
};
```

## Duration Guidelines

| Element Type | Duration (ms) | Notes |
|-------------|---------------|-------|
| UI feedback (button press) | 100-200 | Fast, snappy |
| Micro-interactions (hover) | 200-300 | Smooth but quick |
| Scroll-triggered reveals | 400-600 | Matched to scroll speed |
| Section transitions | 600-800 | Clear but not slow |
| Hero animations | 800-1200 | Can be longer for impact |
| Infinite loops | 10000+ | Very slow for subtle motion |

## Portfolio Animation Patterns

### 1. Curved Image Flow (Bat-wing Project)
```javascript
function initCurvedFlow(containerId, images) {
  const container = document.getElementById(containerId);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const numImages = images.length;
  
  // Create image elements
  images.forEach((imgData, index) => {
    const imgContainer = document.createElement('div');
    imgContainer.className = `flow-image ${index === 0 ? 'hero' : ''}`;
    imgContainer.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = imgData.src;
    img.alt = imgData.alt;
    img.loading = 'lazy';
    
    imgContainer.appendChild(img);
    container.appendChild(imgContainer);
  });
  
  // Animate along curve
  const flowImages = container.querySelectorAll('.flow-image');
  
  flowImages.forEach((img, i) => {
    const progress = i / (numImages - 1);
    const angle = lerp(-45, 135, progress);
    const angleRad = degToRad(angle);
    
    gsap.to(img, {
      x: centerX + Math.cos(angleRad) * 0.8 * window.innerHeight,
      y: centerY + Math.sin(angleRad) * 0.8 * window.innerHeight,
      rotation: lerp(-15, 15, progress),
      scale: i === 0 ? 1.4 : lerp(0.8, 1.1, Math.random()),
      opacity: 1,
      scrollTrigger: {
        trigger: '.batwing-showcase',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  });
}
```

### 2. Auto-Scrolling Gallery (Andreas.vision Style)
```javascript
function initAutoScrollGallery() {
  const gallery = document.querySelector('.auto-gallery');
  const items = gallery.querySelectorAll('.gallery-item');
  const totalWidth = items.length * 100;
  
  // Clone items for seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    gallery.appendChild(clone);
  });
  
  const allItems = gallery.querySelectorAll('.gallery-item');
  
  // Auto-scroll
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: false
  });
  
  tl.to(allItems, {
    x: `-=${totalWidth}`,
    duration: 20,
    ease: 'none',
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });
  
  // Pause on hover
  gallery.addEventListener('mouseenter', () => tl.pause());
  gallery.addEventListener('mouseleave', () => tl.play());
}
```

### 3. Parallax Project Sections (Sobran Style)
```javascript
function initProjectParallax() {
  const projects = document.querySelectorAll('.project-section');
  
  projects.forEach((project, i) => {
    const bg = project.querySelector('.project-bg');
    const content = project.querySelector('.project-content');
    
    // Background parallax (slower)
    gsap.to(bg, {
      y: (i, target) => target.offsetHeight * 0.3,
      scrollTrigger: {
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Content parallax (faster)
    gsap.to(content, {
      y: (i, target) => target.offsetHeight * 0.1,
      scrollTrigger: {
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}
```

### 4. Magnetic Hover Effects
```javascript
function initMagneticElements() {
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}
```

## Accessibility & Performance

### Reduced Motion Support
```javascript
// Check for reduced motion preference
const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionOK = !reducedMq.matches;

// Disable animations if reduced motion is preferred
if (!motionOK) {
  gsap.globalTimeline.timeScale(0);
  // Or disable specific animations
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}

// Listen for changes
reducedMq.addEventListener('change', (e) => {
  const motionOK = !e.matches;
  if (motionOK) {
    gsap.globalTimeline.timeScale(1);
    ScrollTrigger.getAll().forEach(trigger => trigger.enable());
  } else {
    gsap.globalTimeline.timeScale(0);
    ScrollTrigger.getAll().forEach(trigger => trigger.disable());
  }
});
```

### Hover Media Queries
```javascript
// Only enable hover effects for fine pointers
const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');

function initHoverEffects() {
  if (!fineMq.matches) return;
  
  // Initialize hover-based animations
  document.querySelectorAll('.hover-effect').forEach(el => {
    // Hover animation setup
  });
}

fineMq.addEventListener('change', (e) => {
  if (e.matches) {
    initHoverEffects();
  }
});
```

## Debugging Tools

```javascript
// Enable ScrollTrigger markers for debugging
ScrollTrigger.defaults({ markers: true });

// GSAP dev tools
gsap.registerPlugin(ScrollTrigger);

// Log animation performance
gsap.ticker.add((time, deltaTime, frameTime) => {
  if (frameTime > 33) { // >30fps
    console.warn('Performance issue: frame took', frameTime, 'ms');
  }
});

// Check for dropped frames
let lastTime = performance.now();
gsap.ticker.add((time) => {
  const now = performance.now();
  const delta = now - lastTime;
  if (delta > 16.67 * 2) { // More than 2 frames at 60fps
    console.warn('Dropped frames detected');
  }
  lastTime = now;
});
```

## Workflow

1. **Plan**: Identify animation purposes and frequency
2. **Prototype**: Create basic animations in isolation
3. **Integrate**: Add to the portfolio with proper triggers
4. **Test**: Verify on multiple devices and browsers
5. **Optimize**: Ensure performance and accessibility
6. **Review**: Check with review-animations standards

## Checklist Before Committing

- [ ] All animations use GPU-accelerated properties only
- [ ] Reduced motion preference is respected
- [ ] Hover effects are gated behind pointer media queries
- [ ] No `transition: all` in CSS
- [ ] No `scale(0)` for entry animations
- [ ] No `ease-in` on UI interactions
- [ ] UI animations stay under 300ms
- [ ] Console has no GSAP/Lenis errors
- [ ] Performance is smooth on mobile devices
- [ ] Animations work correctly on resize

## References

- [Emil Kowalski - animations.dev](https://animations.dev/)
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
