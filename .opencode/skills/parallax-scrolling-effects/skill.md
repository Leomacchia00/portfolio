---
name: Parallax Scrolling Effects
description: >-
  Create advanced parallax scrolling effects for portfolio websites. Specialized in multi-layer parallax, horizontal parallax, scroll-triggered animations, and depth effects.
triggers:
  - "parallax"
  - "parallax scrolling"
  - "scroll effects"
  - "multi-layer parallax"
  - "depth effect"
  - "scroll-triggered"
  - "horizontal parallax"
  - "mouse parallax"
---

# Parallax Scrolling Effects

## Overview

This skill specializes in creating advanced parallax scrolling effects for portfolio websites. It covers multi-layer depth effects, horizontal parallax, mouse-follow parallax, scroll-triggered animations, and performance-optimized parallax implementations.

## Parallax Principles

### 1. The Parallax Effect

Parallax is the apparent shift in position of an object when viewed from different angles. In web design, we simulate this by moving background elements at a different speed than foreground elements.

**Key Concept:**
- **Foreground**: Moves faster (or not at all)
- **Midground**: Moves at medium speed
- **Background**: Moves slower (or in opposite direction)

### 2. Depth Calculation

```javascript
// Calculate parallax offset based on depth
function calculateParallaxOffset(scrollY, depth = 0.5) {
  // depth: 0 = no parallax (moves with scroll)
  // depth: 1 = full parallax (doesn't move)
  // depth: >1 = reverse parallax (moves opposite to scroll)
  return scrollY * depth;
}

// Example usage
const bgOffset = calculateParallaxOffset(scrollY, 0.3); // Background moves at 30% speed
const fgOffset = calculateParallaxOffset(scrollY, -0.2); // Foreground moves opposite
```

### 3. Performance Considerations

**Parallax Performance Tips:**
- Use `transform: translate3d()` for GPU acceleration
- Avoid `top`, `left`, `margin`, `padding` animations
- Use `will-change: transform` to hint the browser
- Limit the number of parallax elements
- Use Intersection Observer to disable parallax when not visible
- Respect reduced motion preferences

## Parallax Patterns

### 1. Multi-Layer Parallax (Macmillan Studio Style)

**Create depth with multiple layers:**

```javascript
function initMultiLayerParallax() {
  const layers = document.querySelectorAll('[data-parallax-depth]');
  
  if (!layers.length) return;
  
  // Calculate initial positions
  layers.forEach(layer => {
    const depth = parseFloat(layer.dataset.parallaxDepth) || 0;
    const speed = 1 - depth; // Convert depth to speed (0-1)
    
    gsap.set(layer, {
      y: 0,
      willChange: 'transform'
    });
    
    // Store original position
    layer.dataset.originalY = layer.getBoundingClientRect().top;
  });
  
  // Animate on scroll
  const parallaxTl = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
  
  layers.forEach(layer => {
    const depth = parseFloat(layer.dataset.parallaxDepth) || 0;
    const speed = 1 - depth;
    const distance = window.innerHeight * 0.5; // Max parallax distance
    
    parallaxTl.to(layer, {
      y: (i, target) => {
        const scrollY = window.scrollY;
        const progress = ScrollTrigger.getById('parallax').progress;
        return -scrollY * speed * 0.5;
      },
      ease: 'none'
    }, 0);
  });
}
```

**HTML Structure:**
```html
<div class="parallax-container">
  <div class="parallax-layer bg-1" data-parallax-depth="0.1"></div>
  <div class="parallax-layer bg-2" data-parallax-depth="0.3"></div>
  <div class="parallax-layer content" data-parallax-depth="0.5"></div>
  <div class="parallax-layer fg" data-parallax-depth="0.7"></div>
</div>
```

**CSS for Multi-Layer Parallax:**
```css
.parallax-container {
  position: relative;
  height: 200vh;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.parallax-layer.bg-1 {
  background: url('assets/img/bg-1.jpg') center/cover;
  z-index: 1;
}

.parallax-layer.bg-2 {
  background: url('assets/img/bg-2.png') center/cover;
  z-index: 2;
}

.parallax-layer.content {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.parallax-layer.fg {
  background: url('assets/img/fg.png') center/cover;
  z-index: 4;
}
```

### 2. Horizontal Parallax

**Elements move horizontally on vertical scroll:**

```javascript
function initHorizontalParallax() {
  const sections = document.querySelectorAll('.horizontal-parallax');
  
  sections.forEach(section => {
    const elements = section.querySelectorAll('[data-horizontal-speed]');
    
    if (!elements.length) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.horizontalSpeed) || 1;
      const direction = el.dataset.horizontalDirection || 'left';
      const distance = window.innerWidth * 0.3;
      
      const xValue = direction === 'left' ? `-=${distance * speed}` : `+=${distance * speed}`;
      
      tl.to(el, {
        x: xValue,
        ease: 'none'
      }, 0);
    });
  });
}
```

**HTML for Horizontal Parallax:**
```html
<section class="horizontal-parallax">
  <div class="parallax-element" data-horizontal-speed="0.5" data-horizontal-direction="left"></div>
  <div class="parallax-element" data-horizontal-speed="1" data-horizontal-direction="right"></div>
  <div class="parallax-element" data-horizontal-speed="1.5" data-horizontal-direction="left"></div>
</section>
```

**CSS for Horizontal Parallax:**
```css
.horizontal-parallax {
  position: relative;
  height: 150vh;
  overflow: hidden;
}

.horizontal-parallax .parallax-element {
  position: absolute;
  width: 30%;
  height: 50%;
  will-change: transform;
}

.horizontal-parallax .parallax-element:nth-child(1) {
  top: 20%;
  left: 5%;
}

.horizontal-parallax .parallax-element:nth-child(2) {
  top: 40%;
  right: 5%;
}

.horizontal-parallax .parallax-element:nth-child(3) {
  bottom: 20%;
  left: 10%;
}
```

### 3. Mouse-Follow Parallax (4wide.jp Style)

**Elements move based on mouse position:**

```javascript
function initMouseParallax() {
  const containers = document.querySelectorAll('.mouse-parallax');
  
  containers.forEach(container => {
    const layers = container.querySelectorAll('.parallax-layer');
    
    if (!layers.length) return;
    
    // Set initial positions
    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0;
      gsap.set(layer, {
        x: 0,
        y: 0,
        willChange: 'transform'
      });
    });
    
    // Mouse move handler
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const factor = depth * 0.02; // Adjust sensitivity
        
        gsap.to(layer, {
          x: mouseX * factor,
          y: mouseY * factor,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true
        });
      });
    };
    
    // Mouse leave handler
    const onMouseLeave = () => {
      layers.forEach(layer => {
        gsap.to(layer, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    };
    
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    
    // Touch support
    container.addEventListener('touchmove', (e) => {
      onMouseMove(e.touches[0]);
    });
    
    container.addEventListener('touchend', onMouseLeave);
  });
}
```

**HTML for Mouse Parallax:**
```html
<div class="mouse-parallax">
  <div class="parallax-layer" data-depth="0.1"></div>
  <div class="parallax-layer" data-depth="0.3"></div>
  <div class="parallax-layer" data-depth="0.5"></div>
  <div class="content">
    <!-- Your content here -->
  </div>
</div>
```

**CSS for Mouse Parallax:**
```css
.mouse-parallax {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.mouse-parallax .parallax-layer {
  position: absolute;
  width: 150%;
  height: 150%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.mouse-parallax .parallax-layer:nth-child(1) {
  background: url('assets/img/mouse-layer-1.jpg') center/cover;
  z-index: 1;
}

.mouse-parallax .parallax-layer:nth-child(2) {
  background: url('assets/img/mouse-layer-2.png') center/cover;
  z-index: 2;
}

.mouse-parallax .parallax-layer:nth-child(3) {
  background: url('assets/img/mouse-layer-3.png') center/cover;
  z-index: 3;
}

.mouse-parallax .content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 4. Scroll-Triggered Reveals (Bratiiev Style)

**Elements reveal based on scroll position:**

```javascript
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  revealElements.forEach(el => {
    const delay = el.dataset.revealDelay || 0;
    const direction = el.dataset.revealDirection || 'up';
    const distance = el.dataset.revealDistance || 50;
    
    // Set initial state
    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
    
    gsap.set(el, {
      x: x,
      y: y,
      opacity: 0,
      willChange: 'transform, opacity'
    });
    
    // Create reveal animation
    gsap.to(el, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        delay: parseFloat(delay)
      }
    });
  });
}
```

**HTML for Scroll Reveals:**
```html
<div class="reveal-on-scroll" data-reveal-direction="up" data-reveal-delay="0">
  <!-- Content -->
</div>

<div class="reveal-on-scroll" data-reveal-direction="left" data-reveal-delay="0.2">
  <!-- Content -->
</div>

<div class="reveal-on-scroll" data-reveal-direction="right" data-reveal-delay="0.4">
  <!-- Content -->
</div>
```

### 5. Parallax with GSAP ScrollTrigger

**Advanced parallax with ScrollTrigger:**

```javascript
function initScrollTriggerParallax() {
  const sections = document.querySelectorAll('.parallax-section');
  
  sections.forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    const content = section.querySelector('.parallax-content');
    
    if (!bg || !content) return;
    
    // Background parallax (slower)
    gsap.to(bg, {
      y: (i, target) => target.offsetHeight * 0.3,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    
    // Content parallax (faster)
    gsap.to(content, {
      y: (i, target) => target.offsetHeight * 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    
    // Scale effect
    gsap.to(bg, {
      scale: 1.1,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}
```

**HTML for ScrollTrigger Parallax:**
```html
<section class="parallax-section">
  <div class="parallax-bg">
    <img src="assets/img/bg.jpg" alt="Background" loading="lazy">
  </div>
  <div class="parallax-content">
    <h2>Section Title</h2>
    <p>Content goes here</p>
  </div>
</section>
```

### 6. Tilt Parallax on Scroll

**Elements tilt based on scroll position:**

```javascript
function initTiltParallax() {
  const tiltElements = document.querySelectorAll('.tilt-on-scroll');
  
  tiltElements.forEach(el => {
    const maxRotation = parseFloat(el.dataset.tilt) || 15;
    const direction = el.dataset.tiltDirection || 'both';
    
    gsap.to(el, {
      rotationY: (i, target) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const mouseX = window.innerWidth / 2;
        const rotation = ((mouseX - centerX) / window.innerWidth) * maxRotation;
        return direction.includes('y') ? rotation : 0;
      },
      rotationX: (i, target) => {
        const rect = target.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const scrollY = window.scrollY + window.innerHeight / 2;
        const rotation = ((scrollY - centerY) / window.innerHeight) * maxRotation;
        return direction.includes('x') ? rotation : 0;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }
    });
  });
}
```

### 7. Sticky Parallax Sections

**Sections that stick while scrolling with parallax content:**

```javascript
function initStickyParallax() {
  const stickySections = document.querySelectorAll('.sticky-parallax');
  
  stickySections.forEach(section => {
    const bg = section.querySelector('.sticky-bg');
    const content = section.querySelector('.sticky-content');
    
    if (!bg || !content) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${section.offsetHeight * 2}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
    
    // Animate background
    tl.to(bg, {
      y: -100,
      scale: 1.2,
      duration: 1
    }, 0);
    
    // Animate content
    tl.to(content, {
      y: 50,
      opacity: 0.5,
      duration: 1
    }, 0);
  });
}
```

## Performance Optimization

### 1. Conditional Loading

**Only load parallax on capable devices:**

```javascript
function supportsParallax() {
  // Check for touch devices (parallax can be expensive)
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check for reduced motion
  const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  // Check for small screens
  const isSmallScreen = window.innerWidth < 768;
  
  return !isTouch && !reducedMq.matches && !isSmallScreen;
}

function initConditionalParallax() {
  if (!supportsParallax()) {
    // Add static fallback classes
    document.querySelectorAll('.parallax-layer').forEach(layer => {
      layer.style.willChange = 'auto';
    });
    return;
  }
  
  // Initialize parallax
  initMultiLayerParallax();
  initHorizontalParallax();
}
```

### 2. Intersection Observer Optimization

**Only animate visible elements:**

```javascript
function initVisibleParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Initialize parallax for this element
        const depth = parseFloat(entry.target.dataset.parallax) || 0;
        
        gsap.to(entry.target, {
          y: (i, target) => {
            const scrollY = window.scrollY;
            const rect = target.getBoundingClientRect();
            const offset = rect.top + scrollY;
            return (window.scrollY - offset) * (1 - depth) * 0.5;
          },
          scrollTrigger: {
            trigger: entry.target,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.1
  });
  
  parallaxElements.forEach(el => observer.observe(el));
}
```

### 3. Reduced Motion Support

**Respect user preferences:**

```javascript
function initAccessibleParallax() {
  const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (reducedMq.matches) {
    // Disable all parallax effects
    document.querySelectorAll('.parallax-layer').forEach(layer => {
      gsap.set(layer, { y: 0, x: 0, scale: 1, rotation: 0 });
    });
    
    // Remove scroll triggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars && trigger.vars.parallax) {
        trigger.kill();
      }
    });
    
    return;
  }
  
  // Initialize parallax
  initMultiLayerParallax();
  
  // Listen for changes
  reducedMq.addEventListener('change', (e) => {
    if (e.matches) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    } else {
      initMultiLayerParallax();
    }
  });
}
```

### 4. Mobile Optimization

**Reduce parallax complexity on mobile:**

```javascript
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function initMobileOptimizedParallax() {
  if (isMobileDevice()) {
    // Simplified parallax for mobile
    const layers = document.querySelectorAll('.parallax-layer');
    
    layers.forEach((layer, i) => {
      const depth = parseFloat(layer.dataset.parallaxDepth) || 0;
      const speed = 1 - (depth * 0.5); // Reduce effect on mobile
      
      gsap.to(layer, {
        y: (i, target) => window.scrollY * speed * 0.2,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    });
  } else {
    // Full parallax for desktop
    initMultiLayerParallax();
  }
}
```

## Accessibility

### 1. ARIA Attributes

**Add proper ARIA attributes:**

```html
<div 
  class="parallax-section"
  role="region"
  aria-label="Parallax section with depth effect"
  aria-live="polite"
>
  <div 
    class="parallax-bg" 
    aria-hidden="true"
    role="presentation"
  ></div>
  <div 
    class="parallax-content"
    role="main"
  >
    <h2>Section Title</h2>
    <p>Content</p>
  </div>
</div>
```

### 2. Keyboard Navigation

**Ensure parallax sections are navigable:**

```javascript
function initParallaxAccessibility() {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  parallaxSections.forEach((section, i) => {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = `#skip-parallax-${i}`;
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip parallax section';
    skipLink.style.cssText = '
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
    ';
    
    section.before(skipLink);
    
    // Add target
    const target = document.createElement('div');
    target.id = `skip-parallax-${i}`;
    target.setAttribute('tabindex', '-1');
    section.after(target);
  });
}
```

### 3. Reduced Motion Fallback

**Provide static fallback for reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .parallax-layer {
    transform: none !important;
    will-change: auto !important;
  }
  
  .parallax-section {
    min-height: auto;
    height: auto;
  }
  
  .parallax-bg {
    position: static !important;
    transform: none !important;
  }
}
```

## Testing

### 1. Performance Testing

**Check for performance issues:**

```javascript
// Monitor animation performance
let lastTime = performance.now();
let frameCount = 0;

function monitorPerformance() {
  const now = performance.now();
  const delta = now - lastTime;
  
  if (delta >= 1000) {
    const fps = Math.round(frameCount * 1000 / delta);
    console.log(`Parallax FPS: ${fps}`);
    
    if (fps < 45) {
      console.warn('Parallax performance issue: FPS below 45');
    }
    
    frameCount = 0;
    lastTime = now;
  }
  
  frameCount++;
  requestAnimationFrame(monitorPerformance);
}

// Start monitoring
monitorPerformance();
```

### 2. Visual Testing

**Test on multiple devices:**
- Desktop (1920px, 1440px, 1024px)
- Tablet (768px, 820px)
- Mobile (414px, 390px, 360px)

**Test with different preferences:**
- Reduced motion
- Dark mode
- High contrast
- Different color schemes

### 3. Browser Testing

**Test on multiple browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest on Mac and iOS)
- Edge (latest)

**Test specific features:**
- CSS transform
- CSS will-change
- Intersection Observer
- ScrollTrigger compatibility
- GSAP compatibility

## Checklist Before Committing

- [ ] Parallax effect is visible and smooth
- [ ] Parallax respects reduced motion preference
- [ ] Parallax has proper accessibility attributes
- [ ] Parallax works on all supported browsers
- [ ] Parallax is optimized for mobile
- [ ] Parallax uses GPU acceleration
- [ ] Parallax doesn't cause layout shifts
- [ ] Parallax performance is acceptable (>45fps)
- [ ] Parallax sections are keyboard navigable
- [ ] Parallax has proper fallbacks
- [ ] Parallax doesn't interfere with other animations
- [ ] Parallax works correctly on resize

## References

- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger/)
- [MDN: CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [Web.dev: Animations](https://web.dev/animations-guide/)
- [A11Y: Animation Accessibility](https://www.a11yproject.com/posts/prefers-reduced-motion/)
- [CSS Tricks: Parallax](https://css-tricks.com/parallax/)
- [Macmillan Studio](https://macmillan.studio/) (Reference)
