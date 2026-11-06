---
name: Performance Web Optimization
description: >-
  Optimize portfolio website performance. Focus on Core Web Vitals, image optimization, lazy loading, bundle splitting, and caching strategies.
triggers:
  - "performance optimization"
  - "web performance"
  - "lighthouse"
  - "core web vitals"
  - "image optimization"
  - "lazy loading"
  - "caching"
  - "loading speed"
---

# Performance Web Optimization

## Overview

This skill provides comprehensive performance optimization techniques specifically for portfolio websites. It focuses on achieving excellent Core Web Vitals scores while maintaining visual fidelity and user experience.

## Core Web Vitals

### 1. Largest Contentful Paint (LCP)
**Goal: < 2.5 seconds**

LCP measures when the largest text or image element becomes visible.

**Optimization Strategies:**
- **Above-the-fold images**: Load eagerly with high priority
- **Preload critical resources**: Fonts, hero images, CSS
- **Optimize server response time**: Fast hosting, caching
- **Render-blocking resources**: Inline critical CSS, defer non-critical JS
- **Image optimization**: Proper sizing, modern formats, compression

```html
<!-- Preload critical resources -->
<link rel="preload" href="assets/fonts/InterTight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/css/style.css" as="style">
<link rel="preload" href="assets/img/hero-web.jpg" as="image">

<!-- Above-the-fold image loads eagerly -->
<img
  src="assets/img/hero-web.jpg"
  alt="Leonardo Macchiarini - Product Designer"
  loading="eager"
  priority
  width="1200"
  height="800"
>
```

### 2. First Input Delay (FID)
**Goal: < 100 milliseconds**

FID measures the time from when a user first interacts with your site to when the browser is able to respond.

**Optimization Strategies:**
- **Reduce JavaScript execution time**: Code splitting, tree shaking
- **Defer non-critical JavaScript**: Use `defer` or `async` attributes
- **Minimize main thread work**: Optimize event handlers, avoid long tasks
- **Web Workers**: Offload heavy computations
- **Reduce third-party scripts**: Only load what's necessary

```html
<!-- Defer non-critical JavaScript -->
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/vendor/lenis.min.js" defer></script>
<script src="assets/js/main.js" defer></script>
<script src="assets/js/motion.js" defer></script>
```

### 3. Cumulative Layout Shift (CLS)
**Goal: < 0.1**

CLS measures the sum of all individual layout shift scores for every unexpected layout shift.

**Optimization Strategies:**
- **Always set dimensions**: `width` and `height` on images, videos, iframes
- **Use aspect-ratio**: For containers that will have dynamic content
- **Avoid insertBefore**: Don't insert content above existing content
- **Reserve space**: For lazy-loaded images, ads, iframes
- **Stable fonts**: Use `font-display: swap` with fallback metrics

```css
/* Reserve space for images */
.image-container {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Avoid layout shifts with font loading */
@font-face {
  font-family: 'Inter Tight';
  src: url('assets/fonts/InterTight.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  size-adjust: 100%; /* Helps with fallback metrics */
}
```

## Image Optimization

### 1. Image Formats

**Modern Image Formats (Best to Good):**

| Format | Quality | Compression | Browser Support | Best For |
|--------|---------|-------------|-----------------|----------|
| AVIF | Excellent | Excellent | Good (85%) | Photos, complex images |
| WebP | Excellent | Excellent | Excellent (95%) | All-purpose |
| JPEG XL | Excellent | Excellent | Poor (15%) | Future-proofing |
| JPEG | Good | Good | Universal | Fallback |
| PNG | Excellent | Poor | Universal | Transparency, graphics |

**Recommendation for Portfolio:**
- **Primary**: WebP (excellent balance of quality and support)
- **Fallback**: JPEG for older browsers
- **Graphics**: SVG for logos, icons, illustrations

### 2. Image Compression

**Compression Guidelines:**

| Image Type | Quality Setting | Format | Notes |
|------------|-----------------|--------|-------|
| Photos | 75-85 | WebP | Higher quality for hero images |
| Thumbnails | 70-80 | WebP | Balance quality and size |
| Backgrounds | 60-75 | WebP | Can be more compressed |
| Graphics | N/A | SVG | Vector format, no compression needed |
| Screenshots | 80-90 | WebP | Need to be sharp |

**Tools for Compression:**
- [Squoosh](https://squoosh.app/) (Web-based, Google)
- [ImageOptim](https://imageoptim.com/) (Mac, paid)
- [TinyPNG](https://tinypng.com/) (Web-based, free tier)
- [ShortPixel](https://shortpixel.com/) (Web-based, API)
- [FFmpeg](https://ffmpeg.org/) (Command line)

**Example FFmpeg Command:**
```bash
# Convert to WebP with quality 80
ffmpeg -i input.jpg -q 80 output.webp

# Convert to AVIF with quality 75
ffmpeg -i input.jpg -c:v libaom-av1 -crf 40 -cpu-used 4 output.avif

# Batch convert all JPEGs in a folder
for file in *.jpg; do
  ffmpeg -i "$file" -q 80 "${file%.jpg}.webp"
done
```

### 3. Responsive Images

**Use srcset for responsive images:**

```html
<img
  src="assets/img/project/hero-800w.webp"
  srcset="
    assets/img/project/hero-400w.webp 400w,
    assets/img/project/hero-800w.webp 800w,
    assets/img/project/hero-1200w.webp 1200w,
    assets/img/project/hero-1600w.webp 1600w
  "
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 60vw"
  alt="Project hero image"
  loading="lazy"
  width="1200"
  height="800"
  type="image/webp"
>

<!-- Fallback for older browsers -->
<noscript>
  <img
    src="assets/img/project/hero-800w.jpg"
    alt="Project hero image"
    loading="lazy"
    width="1200"
    height="800"
  >
</noscript>
```

**Picture element for art direction:**
```html
<picture>
  <!-- AVIF format -->
  <source
    type="image/avif"
    srcset="
      assets/img/project/hero-400w.avif 400w,
      assets/img/project/hero-800w.avif 800w,
      assets/img/project/hero-1200w.avif 1200w
    "
    sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 60vw"
  >
  
  <!-- WebP format -->
  <source
    type="image/webp"
    srcset="
      assets/img/project/hero-400w.webp 400w,
      assets/img/project/hero-800w.webp 800w,
      assets/img/project/hero-1200w.webp 1200w
    "
    sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 60vw"
  >
  
  <!-- Fallback JPEG -->
  <img
    src="assets/img/project/hero-800w.jpg"
    srcset="
      assets/img/project/hero-400w.jpg 400w,
      assets/img/project/hero-800w.jpg 800w,
      assets/img/project/hero-1200w.jpg 1200w
    "
    sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 60vw"
    alt="Project hero image"
    loading="lazy"
    width="1200"
    height="800"
  >
</picture>
```

### 4. Image Dimensions

**Optimization Guidelines:**
- **Maximum dimension**: 2200px (long edge) for portfolio images
- **Hero images**: 1600-2000px wide
- **Project images**: 1200-1600px wide
- **Thumbnails**: 400-800px wide
- **Always set width and height**: Prevents layout shifts

**Image Sizing Strategy:**
```
 Portfolio Image Sizes:
├── Hero: 1600w, 1200w, 800w, 400w
├── Project Main: 1200w, 800w, 400w
├── Project Thumbnails: 800w, 400w
└── Icons: Original size (SVG preferred)
```

### 5. Lazy Loading

**Lazy Loading Strategies:**

```html
<!-- Above-the-fold: eager loading -->
<img src="hero.jpg" loading="eager" priority>

<!-- Below-the-fold: lazy loading -->
<img src="section-image.jpg" loading="lazy">

<!-- Iframes: lazy loading -->
<iframe src="..." loading="lazy"></iframe>

<!-- Background images: use data attributes or CSS -->
<div class="lazy-bg" data-bg="assets/img/bg.jpg"></div>
```

**JavaScript Lazy Loading (for background images):**
```javascript
// Intersection Observer for background images
document.addEventListener('DOMContentLoaded', () => {
  const lazyBgs = document.querySelectorAll('.lazy-bg');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bg = entry.target.dataset.bg;
        entry.target.style.backgroundImage = `url(${bg})`;
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.1
  });
  
  lazyBgs.forEach(bg => observer.observe(bg));
});
```

## CSS Optimization

### 1. Critical CSS

**Inline critical CSS to eliminate render-blocking:**

```html
<style>
  /* Critical CSS (above-the-fold styles) */
  :root {
    --bg: #000000;
    --text: #FFFFFF;
    --container: clamp(100%, 90vw, 1400px);
  }
  
  * { box-sizing: border-box; }
  body { 
    margin: 0; 
    background: var(--bg); 
    color: var(--text);
    font-family: 'Inter Tight', sans-serif;
  }
  
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    z-index: 100;
  }
  
  .hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<!-- Load full CSS asynchronously -->
<link rel="preload" href="assets/css/style.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="assets/css/style.css"></noscript>
```

### 2. CSS Minification

**Minify CSS to reduce file size:**

```bash
# Using cssnano (Node.js)
npm install cssnano-cli -g
cssnano input.css output.min.css

# Using clean-css
npm install clean-css-cli -g
cleancss input.css -o output.min.css

# Using online tools
# https://cssminifier.com/
# https://www.cssportal.com/css-compressor/
```

**CSS Minification Savings:**
- Original: 50KB
- Minified: 35-40KB (20-30% reduction)
- Minified + Gzipped: 8-12KB (75-85% reduction)

### 3. Purge Unused CSS

**Remove unused CSS with PurgeCSS:**

```javascript
// purgecss.config.js
module.exports = {
  content: ['**/*.html', '**/*.js'],
  css: ['assets/css/style.css'],
  output: 'assets/css/style.purged.css',
  safelist: {
    standard: [
      /reveal/,
      /proj-/,
      /flow-/,
      /grecaptcha/,
      :root
    ]
  }
}
```

### 4. CSS Delivery Strategies

**Best Practices:**
1. **Critical CSS**: Inline in `<head>` (above-the-fold styles)
2. **Above-the-fold CSS**: Preload with `onload` pattern
3. **Below-the-fold CSS**: Load asynchronously or deferred
4. **Non-critical CSS**: Load after page load

```html
<!-- Option 1: Preload with onload (recommended) -->
<link rel="preload" href="assets/css/style.css" as="style" onload="this.rel='stylesheet'">

<!-- Option 2: Load CSS asynchronously -->
<link rel="stylesheet" href="assets/css/style.css" media="print" onload="this.media='all'">

<!-- Option 3: Split CSS files -->
<link rel="stylesheet" href="assets/css/critical.css">
<link rel="preload" href="assets/css/non-critical.css" as="style" onload="this.rel='stylesheet'">
```

## JavaScript Optimization

### 1. Code Splitting

**Split JavaScript into smaller chunks:**

```html
<!-- Load GSAP and plugins first (they're dependencies) -->
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/vendor/lenis.min.js" defer></script>

<!-- Load main JavaScript -->
<script src="assets/js/main.js" defer></script>

<!-- Load motion JavaScript (can be deferred further) -->
<script src="assets/js/motion.js" defer></script>
```

**Dynamic Imports (for modern browsers):**
```javascript
// Load GSAP dynamically when needed
let gsapPromise;

async function loadGSAP() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
      import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'),
      import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Lenis.min.js')
    ]);
  }
  await gsapPromise;
  return window.gsap;
}

// Only load GSAP for pages that need it
if (document.querySelector('.animation-required')) {
  loadGSAP().then(gsap => initAnimations(gsap));
}
```

### 2. Minification and Compression

**Minify JavaScript:**

```bash
# Using Terser (recommended)
npm install terser -g
terser input.js -o output.min.js --compress --mangle

# Using UglifyJS
npm install uglify-js -g
uglifyjs input.js -o output.min.js -c -m

# Using esbuild (fastest)
npm install esbuild -g
esbuild input.js --minify --outfile=output.min.js
```

**JavaScript Minification Savings:**
- Original: 50KB
- Minified: 25-35KB (30-50% reduction)
- Minified + Gzipped: 8-12KB (75-85% reduction)

### 3. Tree Shaking

**Remove unused JavaScript code:**

```javascript
// Before: Importing entire library
import * as GSAP from 'gsap';

// After: Importing only what's needed
import { gsap, ScrollTrigger, Power2 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lenis } from 'lenis';
```

**Using Rollup or Webpack for tree shaking:**
```javascript
// rollup.config.js
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.min.js',
    format: 'iife',
    name: 'Portfolio'
  },
  plugins: [
    terser()
  ]
};
```

### 4. Defer and Async

**Use defer and async appropriately:**

```html
<!-- defer: Execute after HTML parsing, in order -->
<script src="critical.js" defer></script>

<!-- async: Execute as soon as loaded, out of order -->
<script src="analytics.js" async></script>

<!-- No attribute: Blocking (avoid for non-critical) -->
<script src="blocking.js"></script>
```

**Best Practices:**
- Use `defer` for JavaScript that depends on the DOM
- Use `async` for independent scripts (analytics, ads)
- Avoid blocking scripts in `<head>`

### 5. Event Delegation

**Reduce event listeners with delegation:**

```javascript
// BAD: Adding listeners to each element
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

// GOOD: Event delegation
const container = document.querySelector('.container');
container.addEventListener('click', (e) => {
  if (e.target.closest('.button')) {
    handleClick(e);
  }
});

// EVEN BETTER: Use data attributes
document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-action]');
  if (button) {
    const action = button.dataset.action;
    actions[action](e);
  }
});
```

### 6. Debouncing and Throttling

**Optimize scroll and resize handlers:**

```javascript
// Debounce function (for resize, input)
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function (for scroll)
function throttle(func, limit = 16) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
window.addEventListener('resize', debounce(handleResize, 200));
window.addEventListener('scroll', throttle(handleScroll, 16));
```

## Font Optimization

### 1. Font Loading Strategies

**Best practices for font loading:**

```html
<!-- Preload fonts -->
<link rel="preload" href="assets/fonts/InterTight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/Archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/Georgia-subset.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font face declarations -->
<style>
  @font-face {
    font-family: 'Inter Tight';
    src: url('assets/fonts/InterTight.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Inter Tight';
    src: url('assets/fonts/InterTight-500.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  
  /* ... other weights */
</style>
```

### 2. Font Subsetting

**Use only the characters you need:**

```bash
# Using Google Webfonts Helper
# https://google-webfonts-helper.herokuapp.com/

# Or using local tools
# https://github.com/fonttools/fonttools
subset fonts/InterTight-Regular.ttf --output=fonts/InterTight-subset.woff2 --unicodes="U+000-052F,U+1E00-1EFF,U+20A0-20CF,U+2190-21FF,U+2580-259F,U+25A0-25FF,U+2700-27BF,U+2B00-2BFF,U+1F600-1F64F,U+1F680-1F6FF,U+2640-2642"
```

**Font Subsetting Strategy for Portfolio:**
- **Inter Tight**: Latin + common symbols (100KB → 30KB)
- **Archivo**: Latin only (120KB → 40KB)
- **Georgia**: Latin + serif features (80KB → 25KB)

### 3. Font Display

**Use font-display: swap for better UX:**

```css
@font-face {
  font-family: 'Inter Tight';
  src: url('assets/fonts/InterTight.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

**Font Display Options:**
- `auto`: Browser default
- `block`: Hide text until font loads
- `swap`: Show fallback, then swap when font loads (recommended)
- `fallback`: Show fallback, only swap if font loads quickly
- `optional`: Show fallback, only swap if font loads very quickly

## Caching Strategies

### 1. Browser Caching

**Leverage browser cache with Cache-Control headers:**

```nginx
# Nginx configuration
location ~* \.(css|js|jpg|jpeg|png|webp|avif|gif|ico|svg|woff2?|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
  add_header ETag "";
}

# HTML files (no cache for development)
location / {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# Production HTML (short cache)
location / {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}
```

**Apache .htaccess:**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # CSS, JS, images
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### 2. Service Worker Caching

**Implement a service worker for offline caching:**

```javascript
// sw.js
const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/cv.html',
  '/projects.html',
  '/contacts.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/fonts/InterTight.woff2',
  '/assets/fonts/Archivo.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

**Register service worker:**
```javascript
// In main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
```

### 3. CDN Caching

**Use a CDN for static assets:**

```html
<!-- Cloudflare CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Or serve your own assets from CDN -->
<link rel="stylesheet" href="https://cdn.yourdomain.com/assets/css/style.css">
```

**CDN Benefits:**
- Faster delivery (edge locations)
- Better caching
- DDoS protection
- SSL termination

## Performance Monitoring

### 1. Lighthouse

**Run Lighthouse audits regularly:**

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yourportfolio.com --output=json --output-path=./lighthouse.json

# Run audit with specific categories
lighthouse https://yourportfolio.com --chrome-flags="--headless" --output=html --output-path=./report.html
```

**Lighthouse Categories:**
- Performance (weight: 30%)
- Accessibility (weight: 15%)
- Best Practices (weight: 20%)
- SEO (weight: 15%)
- Progressive Web App (weight: 20%)

### 2. Web Vitals

**Track Core Web Vitals with JavaScript:**

```javascript
// Track LCP
const [lcp] = window.performance.getEntriesByName('LCP');
console.log('LCP:', lcp?.startTime);

// Track FID
let fid;
window.addEventListener('firstinput', (event) => {
  fid = event.processingStart - event.startTime;
  console.log('FID:', fid);
});

// Track CLS
let cls = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  }
  console.log('CLS:', cls);
}).observe({ type: 'layout-shift', buffered: true });
```

**Send to analytics:**
```javascript
// Example: Send to Google Analytics
function sendWebVitals({ name, value, id }) {
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // CLS is unitless
    eventLabel: id,
    nonInteraction: true
  });
}

// Measure and send
sendWebVitals({ name: 'LCP', value: lcp?.startTime, id: lcp?.id });
sendWebVitals({ name: 'FID', value: fid, id: 'first-input' });
sendWebVitals({ name: 'CLS', value: cls, id: 'cumulative-layout-shift' });
```

### 3. Performance Budget

**Set performance budgets for your portfolio:**

| Metric | Budget | Measurement Tool |
|--------|--------|-------------------|
| LCP | < 2.5s | Lighthouse |
| FID | < 100ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| Total Page Weight | < 4MB | DevTools |
| Time to Interactive | < 3.8s | Lighthouse |
| Speed Index | < 4.3s | Lighthouse |
| First Contentful Paint | < 1.8s | Lighthouse |

**Page Weight Breakdown:**
```
Total: 4MB (max)
├── HTML: 50-100KB
├── CSS: 50-100KB
├── JavaScript: 200-400KB
├── Images: 2-3MB
├── Fonts: 100-200KB
└── Other: 100KB
```

## Portfolio-Specific Optimizations

### 1. GSAP Optimization

**Optimize GSAP animations for performance:**

```javascript
// Use will-change for GPU acceleration
gsap.set('.animating-element', {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  perspective: 1000
});

// Use transform for animations (GPU accelerated)
gsap.to('.element', {
  x: 100,
  y: 50,
  scale: 1.1,
  rotation: 15,
  opacity: 1,
  duration: 0.5,
  ease: 'power2.out'
});

// Avoid animating layout properties
gsap.to('.element', {
  // BAD: width, height, margin, padding, top, left
  width: 100,
  
  // GOOD: transform
  scaleX: 1.5
});

// Use quickTo for performance-critical animations
const xPos = gsap.quickTo('.element', 'x', { duration: 0.1, ease: 'power3.out' });

// Reduce GSAP tick frequency
ifsap.ticker.fps(30); // Default is 60, can reduce to 30 for non-critical animations

// Pause GSAP when not visible
gsap.globalTimeline.timeScale(0); // Pause
 gsap.globalTimeline.timeScale(1); // Resume
```

### 2. ScrollTrigger Optimization

**Optimize ScrollTrigger for performance:**

```javascript
// Use markers only for debugging
ScrollTrigger.defaults({ markers: false });

// Limit the number of ScrollTriggers
// Each ScrollTrigger adds overhead
// Aim for < 50 ScrollTriggers per page

// Use simple triggers
gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
    invalidateOnRefresh: true // Only if needed
  }
});

// Batch ScrollTrigger updates
ScrollTrigger.config({ limitCallbacks: true });

// Refresh ScrollTrigger only when needed
ScrollTrigger.refresh();

// Disable ScrollTrigger on reduced motion
const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMq.matches) {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}
```

### 3. Lenis Optimization

**Optimize Lenis smooth scrolling:**

```javascript
// Use efficient Lenis configuration
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothWheel: true,
  smoothTouch: false, // Disable for better performance on touch devices
  direction: 'vertical',
  gestureDirection: 'vertical',
  infinite: false,
  autoResize: true
});

// Sync with GSAP efficiently
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Stop Lenis when not needed
lenis.stop(); // Pause
lenis.start(); // Resume

// Use smoothTouch: false on mobile for better performance
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const lenis = new Lenis({
  smoothTouch: !isMobile
});
```

### 4. Image Gallery Optimization

**Optimize image galleries for performance:**

```javascript
// Lazy load images in gallery
function initLazyGallery() {
  const images = document.querySelectorAll('.gallery img[data-src]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.1
  });
  
  images.forEach(img => observer.observe(img));
}

// Preload next image in gallery
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const nextImg = img.nextElementSibling;
        if (nextImg && nextImg.tagName === 'IMG') {
          nextImg.loading = 'eager';
        }
      }
    });
  });
  
  galleryImages.forEach(img => observer.observe(img));
});
```

## Checklist Before Deployment

### Performance Checklist
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Total page weight < 4MB
- [ ] Images are optimized (WebP, proper sizes)
- [ ] Images have srcset and sizes
- [ ] Images use loading="lazy" where appropriate
- [ ] CSS is minified and purged
- [ ] JavaScript is minified
- [ ] Fonts are preloaded
- [ ] Critical CSS is inlined
- [ ] Non-critical resources are deferred
- [ ] Cache headers are configured
- [ ] Service worker is registered
- [ ] No render-blocking resources
- [ ] No unused CSS/JS
- [ ] GSAP animations are optimized
- [ ] ScrollTrigger is optimized
- [ ] Lenis is optimized

### Testing Checklist
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test on slow networks (3G)
- [ ] Test with reduced motion
- [ ] Test without JavaScript
- [ ] Test with images disabled
- [ ] Test on different viewport sizes
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

## References

- [Web.dev Performance](https://web.dev/learn-performance/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization Guide](https://images.guide/)
- [CSS Tricks Performance](https://css-tricks.com/tag/performance/)
- [GSAP Performance Tips](https://greensock.com/docs/v3/Performance)
