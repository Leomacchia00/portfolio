---
name: Infinite Loop Animations
description: >-
  Create seamless infinite loop animations for portfolio galleries and presentations. Specialized in auto-scrolling, seamless transitions, and performance-optimized loops.
triggers:
  - "infinite loop"
  - "auto scroll"
  - "seamless animation"
  - "gallery loop"
  - "endless scroll"
  - "circular animation"
  - "continuous animation"
---

# Infinite Loop Animations

## Overview

This skill specializes in creating seamless, performance-optimized infinite loop animations for portfolio websites. It covers auto-scrolling galleries, seamless transitions, circular animations, and continuous motion effects that work flawlessly on all devices.

## Infinite Loop Patterns

### 1. Auto-Scrolling Horizontal Gallery (Andreas.vision Style)

**Seamless horizontal scrolling with cloned elements:**

```javascript
function initInfiniteHorizontalGallery() {
  const gallery = document.querySelector('.auto-gallery');
  const items = gallery.querySelectorAll('.gallery-item');
  
  if (!gallery || items.length === 0) return;
  
  // Clone all items to create seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    gallery.appendChild(clone);
  });
  
  const allItems = gallery.querySelectorAll('.gallery-item');
  const totalWidth = items.length * 100; // Each original item takes 100% width
  
  // Animate all items
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: false,
    ease: 'none'
  });
  
  tl.to(allItems, {
    x: `-=${totalWidth}`,
    duration: 20,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });
  
  // Pause on hover
  const togglePause = () => tl.paused(!tl.paused());
  
  gallery.addEventListener('mouseenter', togglePause);
  gallery.addEventListener('mouseleave', togglePause);
  
  // Touch support
  let touchStartX = 0;
  let isDragging = false;
  
  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    tl.pause();
  });
  
  gallery.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;
    // Apply manual drag
    gsap.to(allItems, {
      x: `+=${deltaX}`,
      duration: 0.1,
      overwrite: true
    });
    touchStartX = touchX;
  });
  
  gallery.addEventListener('touchend', () => {
    isDragging = false;
    tl.play();
  });
}
```

**CSS for Horizontal Gallery:**
```css
.auto-gallery {
  display: flex;
  gap: var(--spacing-lg);
  overflow: hidden;
  width: 100%;
  position: relative;
}

.auto-gallery .gallery-item {
  flex: 0 0 25%; /* Each item takes 25% width */
  min-width: 300px; /* Minimum width */
  scroll-snap-align: start;
}

.auto-gallery .gallery-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius);
  will-change: transform;
}

/* Ensure seamless transition */
.auto-gallery .gallery-item:first-child {
  margin-left: 0;
}
```

### 2. Vertical Auto-Scroll

**Seamless vertical scrolling:**

```javascript
function initInfiniteVerticalScroll() {
  const container = document.querySelector('.vertical-scroll');
  const items = container.querySelectorAll('.scroll-item');
  
  if (!container || items.length === 0) return;
  
  // Clone items for seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });
  
  const allItems = container.querySelectorAll('.scroll-item');
  const itemHeight = items[0].offsetHeight;
  const totalHeight = itemHeight * items.length;
  
  // Animate
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: false,
    ease: 'none'
  });
  
  tl.to(allItems, {
    y: `-=${totalHeight}`,
    duration: 15,
    modifiers: {
      y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
    }
  });
  
  // Pause on hover
  container.addEventListener('mouseenter', () => tl.pause());
  container.addEventListener('mouseleave', () => tl.play());
}
```

**CSS for Vertical Scroll:**
```css
.vertical-scroll {
  height: 400px;
  overflow: hidden;
  position: relative;
}

.vertical-scroll .scroll-item {
  position: absolute;
  width: 100%;
  height: 100px;
  will-change: transform;
}
```

### 3. Circular Carousel (4wide.jp Style)

**Circular motion with seamless transitions:**

```javascript
function initCircularCarousel() {
  const carousel = document.querySelector('.circular-carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const radius = 200; // Radius of the circle
  const centerX = 300; // Center X position
  const centerY = 200; // Center Y position
  
  if (!carousel || items.length === 0) return;
  
  // Position items in a circle
  items.forEach((item, i) => {
    const angle = (i / items.length) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    gsap.set(item, {
      x: x - item.offsetWidth / 2,
      y: y - item.offsetHeight / 2,
      rotation: angle * (180 / Math.PI) + 90
    });
  });
  
  // Animate in a circle
  const tl = gsap.timeline({
    repeat: -1,
    duration: 20,
    ease: 'none'
  });
  
  items.forEach((item, i) => {
    const startAngle = (i / items.length) * Math.PI * 2;
    const endAngle = startAngle + Math.PI * 2;
    
    tl.to(item, {
      motionPath: {
        path: [
          { x: centerX + Math.cos(startAngle) * radius, y: centerY + Math.sin(startAngle) * radius },
          { x: centerX + Math.cos(startAngle + Math.PI * 0.5) * radius, y: centerY + Math.sin(startAngle + Math.PI * 0.5) * radius },
          { x: centerX + Math.cos(endAngle) * radius, y: centerY + Math.sin(endAngle) * radius }
        ],
        curviness: 1
      },
      rotation: `+=360`,
      duration: 20,
      repeat: -1,
      ease: 'none'
    }, 0);
  });
}
```

**CSS for Circular Carousel:**
```css
.circular-carousel {
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
}

.circular-carousel .carousel-item {
  position: absolute;
  width: 120px;
  height: 120px;
  will-change: transform;
}

.circular-carousel .carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
```

### 4. Fade Loop (Macmillan Studio Style)

**Smooth fade transitions between items:**

```javascript
function initFadeLoop() {
  const container = document.querySelector('.fade-loop');
  const items = container.querySelectorAll('.loop-item');
  
  if (!container || items.length === 0) return;
  
  // Hide all but first item
  items.forEach((item, i) => {
    if (i > 0) gsap.set(item, { opacity: 0, display: 'none' });
  });
  
  let currentIndex = 0;
  
  // Create infinite loop
  const fadeInterval = setInterval(() => {
    const currentItem = items[currentIndex];
    const nextIndex = (currentIndex + 1) % items.length;
    const nextItem = items[nextIndex];
    
    // Fade out current
    gsap.to(currentItem, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(currentItem, { display: 'none' });
        gsap.set(nextItem, { display: 'block', opacity: 0 });
        
        // Fade in next
        gsap.to(nextItem, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        });
        
        currentIndex = nextIndex;
      }
    });
  }, 3000); // Change every 3 seconds
  
  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(fadeInterval));
  container.addEventListener('mouseleave', () => {
    // Restart interval
    currentIndex = (currentIndex + 1) % items.length;
    setInterval(() => {
      // Same fade logic as above
    }, 3000);
  });
}
```

**CSS for Fade Loop:**
```css
.fade-loop {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.fade-loop .loop-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}

.fade-loop .loop-item:first-child {
  display: block;
  opacity: 1;
}

.fade-loop .loop-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 5. Scale Loop

**Pulsing scale animation:**

```javascript
function initScaleLoop() {
  const items = document.querySelectorAll('.scale-loop-item');
  
  items.forEach((item, i) => {
    // Stagger the animations
    const delay = i * 0.2;
    
    gsap.to(item, {
      scale: 1.1,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay
    });
    
    // Add subtle rotation
    gsap.to(item, {
      rotation: 2,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay
    });
  });
}
```

**CSS for Scale Loop:**
```css
.scale-loop-item {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: var(--spacing-md);
  will-change: transform;
}

.scale-loop-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
}
```

### 6. Parallax Loop

**Infinite parallax scrolling:**

```javascript
function initParallaxLoop() {
  const container = document.querySelector('.parallax-loop');
  const layers = container.querySelectorAll('.parallax-layer');
  
  if (!container || layers.length === 0) return;
  
  // Clone layers for seamless loop
  layers.forEach(layer => {
    const clone = layer.cloneNode(true);
    container.appendChild(clone);
  });
  
  const allLayers = container.querySelectorAll('.parallax-layer');
  const containerWidth = container.offsetWidth;
  
  // Animate each layer at different speeds
  allLayers.forEach((layer, i) => {
    const speed = (i + 1) * 0.2; // Different speed for each layer
    const duration = 40 / speed;
    
    gsap.to(layer, {
      x: `-=${containerWidth}`,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % containerWidth)
      }
    });
  });
}
```

**CSS for Parallax Loop:**
```css
.parallax-loop {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.parallax-loop .parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.parallax-loop .parallax-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Performance Optimization

### 1. GPU Acceleration

**Use will-change and transform for GPU acceleration:**

```javascript
// Apply to all loop elements
document.querySelectorAll('.loop-item').forEach(item => {
  gsap.set(item, {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000
  });
});
```

### 2. Reduce Animations on Reduced Motion

**Respect user preferences:**

```javascript
const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');

function initResponsiveLoop() {
  if (reducedMq.matches) {
    // Show first item statically
    const items = document.querySelectorAll('.loop-item');
    items.forEach((item, i) => {
      if (i > 0) gsap.set(item, { display: 'none' });
    });
    return;
  }
  
  // Initialize loop animation
  initInfiniteHorizontalGallery();
}

// Listen for changes
reducedMq.addEventListener('change', initResponsiveLoop);
```

### 3. Optimize for Mobile

**Reduce complexity on mobile devices:**

```javascript
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function initOptimizedLoop() {
  if (isMobile()) {
    // Simplified animation for mobile
    const gallery = document.querySelector('.auto-gallery');
    const items = gallery.querySelectorAll('.gallery-item');
    
    // Only animate visible items
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            x: '-=100',
            duration: 5,
            ease: 'none',
            repeat: -1
          });
        }
      });
    });
    
    items.forEach(item => observer.observe(item));
  } else {
    // Full animation for desktop
    initInfiniteHorizontalGallery();
  }
}
```

### 4. Use RequestAnimationFrame

**Optimize animation performance:**

```javascript
function initEfficientLoop() {
  const gallery = document.querySelector('.auto-gallery');
  const items = gallery.querySelectorAll('.gallery-item');
  
  let positions = [];
  let lastTime = 0;
  let speed = 0.5; // pixels per second
  
  // Initialize positions
  items.forEach((item, i) => {
    positions[i] = 0;
  });
  
  function animate(time) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    const distance = speed * (deltaTime / 16); // 16ms = ~60fps
    
    items.forEach((item, i) => {
      positions[i] -= distance;
      
      // Wrap around
      const width = item.offsetWidth + parseInt(getComputedStyle(gallery).gap);
      if (positions[i] < -width * items.length) {
        positions[i] += width * items.length;
      }
      
      item.style.transform = `translateX(${positions[i]}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}
```

## Accessibility

### 1. ARIA Attributes

**Add proper ARIA attributes for screen readers:**

```html
<div 
  class="auto-gallery" 
  role="region" 
  aria-label="Auto-scrolling project gallery"
  aria-live="polite"
>
  <div class="gallery-item" role="article" aria-label="Project 1"></div>
  <div class="gallery-item" role="article" aria-label="Project 2"></div>
</div>
```

### 2. Keyboard Navigation

**Add keyboard controls:**

```javascript
function addKeyboardControls() {
  const gallery = document.querySelector('.auto-gallery');
  const items = gallery.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  
  // Focus first item
  items[0].setAttribute('tabindex', '0');
  items[0].focus();
  
  // Keyboard event
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].focus();
      // Scroll to item
      items[currentIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      items[currentIndex].focus();
      items[currentIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'Home') {
      e.preventDefault();
      currentIndex = 0;
      items[currentIndex].focus();
      items[currentIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      currentIndex = items.length - 1;
      items[currentIndex].focus();
      items[currentIndex].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === ' ') {
      e.preventDefault();
      // Pause/resume animation
      const tl = gsap.globalTimeline;
      tl.paused(!tl.paused());
    }
  });
}
```

### 3. Focus Management

**Manage focus during animations:**

```javascript
function initAccessibleLoop() {
  const gallery = document.querySelector('.fade-loop');
  const items = gallery.querySelectorAll('.loop-item');
  
  let currentIndex = 0;
  let animationPaused = false;
  
  // Set up keyboard navigation
  items.forEach((item, i) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'article');
    item.setAttribute('aria-label', `Project ${i + 1}`);
    
    item.addEventListener('focus', () => {
      currentIndex = i;
      animationPaused = true;
    });
    
    item.addEventListener('blur', () => {
      animationPaused = false;
    });
  });
  
  // Start animation
  function startAnimation() {
    if (animationPaused) return;
    
    const interval = setInterval(() => {
      if (!animationPaused) {
        currentIndex = (currentIndex + 1) % items.length;
        // Fade logic here
      }
    }, 3000);
    
    return interval;
  }
  
  let animationInterval = startAnimation();
  
  // Pause animation when focused
  gallery.addEventListener('focusin', () => {
    clearInterval(animationInterval);
  });
  
  gallery.addEventListener('focusout', () => {
    animationInterval = startAnimation();
  });
}
```

## Testing

### 1. Performance Testing

**Check animation performance:**

```javascript
// Check for dropped frames
let lastTime = performance.now();
let frameCount = 0;
let lastFps = 0;

function checkPerformance() {
  const now = performance.now();
  const delta = now - lastTime;
  
  if (delta >= 1000) {
    lastFps = Math.round(frameCount * 1000 / delta);
    frameCount = 0;
    lastTime = now;
    
    if (lastFps < 30) {
      console.warn('Performance issue: FPS dropped to', lastFps);
    }
  }
  
  frameCount++;
  requestAnimationFrame(checkPerformance);
}

checkPerformance();
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

## Checklist Before Committing

- [ ] Animation is seamless (no visible breaks)
- [ ] Animation is smooth (60fps on desktop, 30fps on mobile)
- [ ] Animation respects reduced motion preference
- [ ] Animation has proper pause/play controls
- [ ] Animation has keyboard navigation
- [ ] Animation has proper ARIA attributes
- [ ] Animation is optimized for mobile
- [ ] Animation uses GPU acceleration
- [ ] Animation doesn't cause layout shifts
- [ ] Animation works in all supported browsers
- [ ] Animation is accessible to screen readers
- [ ] Animation performance is acceptable

## References

- [GSAP Infinite Loop Patterns](https://greensock.com/forums/topic/18221-infinite-loop-with-seamless-transition/)
- [CSS Tricks: Infinite Loop](https://css-tricks.com/infinite-all-css-page-scrolling/)
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Web.dev: Animations](https://web.dev/animations-guide/)
- [A11Y: Animation Accessibility](https://www.a11yproject.com/posts/prefers-reduced-motion/)
