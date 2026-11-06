---
name: Advanced Responsive Design
description: >-
  Advanced responsive design techniques for portfolio websites. Focuses on fluid typography, adaptive layouts, breakpoints, and mobile-first strategies.
triggers:
  - "responsive design"
  - "mobile first"
  - "breakpoints"
  - "fluid typography"
  - "adaptive layout"
  - "css grid"
  - "flexbox"
  - "media queries"
---

# Advanced Responsive Design

## Overview

This skill provides advanced responsive design techniques specifically tailored for portfolio websites. It combines modern CSS features with portfolio-specific requirements to create designs that work beautifully across all devices.

## Responsive Design Principles

### 1. Mobile-First Approach

**Always design for mobile first, then enhance for larger screens.**

```css
/* Mobile-first media queries */
/* Base styles (mobile) */
.element {
  width: 100%;
  padding: var(--spacing-sm);
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    width: 50%;
    padding: var(--spacing-md);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    width: 33.33%;
    padding: var(--spacing-lg);
  }
}
```

**Never use max-width media queries for mobile-first:**
```css
/* BAD - desktop-first thinking */
@media (max-width: 767px) { ... }

/* GOOD - mobile-first thinking */
@media (min-width: 768px) { ... }
```

### 2. Fluid Typography

**Use clamp() for fluid typography that scales between min and max:**

```css
:root {
  --text-4xl: clamp(2rem, 5vw, 4rem);
  --text-3xl: clamp(1.75rem, 4vw, 3rem);
  --text-2xl: clamp(1.5rem, 3vw, 2rem);
  --text-xl: clamp(1.25rem, 2.5vw, 1.5rem);
}

/* Example for project titles */
.proj-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
}
```

**Fluid typography scale:**
```css
/* Mobile: 16px base */
html { font-size: 16px; }

/* Adjust base size for different screens */
@media (min-width: 768px) {
  html { font-size: calc(16px + 0.5vw); }
}

@media (min-width: 1440px) {
  html { font-size: 20px; }
}
```

### 3. Relative Units

**Unit Hierarchy (most to least flexible):**

1. **rem** - Root relative (best for spacing, fonts)
2. **em** - Parent relative (good for component scaling)
3. **%** - Percentage (good for widths)
4. **vw/vh** - Viewport relative (use sparingly)
5. **px** - Fixed (only for borders, fine details)

```css
/* GOOD */
.element {
  font-size: 1.5rem;        /* Scales with root */
  padding: 1rem;             /* Scales with root */
  width: 50%;               /* Percentage */
  border: 1px solid #000;  /* Fixed for precision */
}

/* AVOID */
.element {
  font-size: 24px;  /* Doesn't scale */
  padding: 16px;    /* Doesn't scale */
}
```

## Breakpoint System

### Portfolio-Specific Breakpoints

```css
:root {
  /* Mobile: 360px and up */
  --bp-sm: 480px;
  
  /* Tablet: 768px and up */
  --bp-md: 768px;
  
  /* Desktop: 1024px and up */
  --bp-lg: 1024px;
  
  /* Large Desktop: 1440px and up */
  --bp-xl: 1440px;
  
  /* Container max-width */
  --container: clamp(100%, 90vw, 1400px);
  --container-sm: clamp(100%, 90vw, 1200px);
}
```

### Media Query Patterns

```css
/* Small mobile devices (default) */
/* No media query needed - these are base styles */

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }

/* Large desktop and up */
@media (min-width: 1440px) { }

/* Print */
@media print { }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { }

/* Dark mode */
@media (prefers-color-scheme: dark) { }

/* Hover capable devices */
@media (hover: hover) and (pointer: fine) { }

/* Touch devices */
@media (hover: none) and (pointer: coarse) { }
```

## Layout Patterns

### 1. Responsive Grid

**Auto-fit vs Auto-fill:**
- `auto-fit` - Fills available space, collapses empty tracks
- `auto-fill` - Creates as many tracks as possible, including empty ones

```css
/* Auto-fit: Flexible columns that collapse on mobile */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

/* Auto-fill: Fixed number of columns */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

/* Responsive grid with different column counts */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 2. Masonry Layout

**CSS-only masonry (modern browsers):**
```css
@supports (grid-template-rows: masonry) {
  .masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: masonry;
    gap: var(--spacing-md);
  }
}

/* Fallback for browsers without masonry support */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  align-items: start;
}

.masonry-item {
  break-inside: avoid;
}
```

**JavaScript masonry (wider support):**
```javascript
// Using Masonry library or custom implementation
import Masonry from 'masonry-layout';

const msnry = new Masonry('.masonry', {
  itemSelector: '.masonry-item',
  columnWidth: '.masonry-sizer',
  percentPosition: true,
  gutter: 24
});
```

### 3. Horizontal Scrolling

**For galleries and project displays:**
```css
.horizontal-scroll {
  display: flex;
  gap: var(--spacing-lg);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm); /* For scrollbar */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

.horizontal-scroll::-webkit-scrollbar {
  height: 4px;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  background: rgba(30, 110, 243, 0.5);
  border-radius: 2px;
}

.horizontal-scroll > * {
  flex: 0 0 80%;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .horizontal-scroll > * {
    flex: 0 0 60%;
  }
}

@media (min-width: 1024px) {
  .horizontal-scroll > * {
    flex: 0 0 40%;
  }
}
```

### 4. Asymmetric Layouts

**Break out of the grid for visual interest:**
```css
.asymmetric {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
}

.item-1 { grid-column: span 12; }
.item-2 { grid-column: span 6; }
.item-3 { grid-column: span 6; }
.item-4 { grid-column: span 4; }
.item-5 { grid-column: span 8; }

@media (min-width: 768px) {
  .item-1 { grid-column: span 8; grid-row: span 2; }
  .item-2 { grid-column: span 4; grid-row: 1; }
  .item-3 { grid-column: span 4; grid-row: 2; }
  .item-4 { grid-column: span 6; grid-row: span 2; }
  .item-5 { grid-column: span 6; grid-row: span 1; }
}
```

### 5. Full-Bleed Sections

**Sections that span the full width:**
```css
.full-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  left: 0;
}

/* For sections with background images */
.full-bleed-bg {
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
}

/* Content stays within container */
.full-bleed .content {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}
```

## Component-Specific Responsiveness

### 1. Navigation

**Mobile navigation pattern:**
```css
/* Mobile: Hamburger menu */
.nav-toggle {
  display: block;
}

.site-nav {
  display: none;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  padding: var(--spacing-lg);
  z-index: 100;
}

.site-nav.active {
  display: block;
}

/* Desktop: Regular navigation */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
  
  .site-nav {
    display: flex;
    position: static;
    background: none;
    padding: 0;
    z-index: auto;
  }
}
```

**Navigation touch targets:**
```css
.nav-link,
.button {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Larger touch targets for mobile */
@media (max-width: 767px) {
  .nav-link {
    padding: var(--spacing-md) var(--spacing-lg);
  }
}
```

### 2. Hero Sections

**Responsive hero layout:**
```css
.hero {
  min-height: 100dvh; /* Use dynamic viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.hero-content {
  max-width: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

@media (min-width: 768px) {
  .hero {
    text-align: left;
    padding-left: 10%;
  }
  
  .hero-content {
    max-width: 50%;
  }
}
```

### 3. Project Cards

**Responsive project card:**
```css
.proj-card {
  display: flex;
  flex-direction: column;
  background: var(--panel);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
}

.proj-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.proj-content {
  padding: var(--spacing-lg);
}

.proj-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-family: Georgia, serif;
  margin-bottom: var(--spacing-sm);
}

.proj-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-relaxed);
}

@media (min-width: 768px) {
  .proj-card {
    flex-direction: row;
  }
  
  .proj-image {
    flex: 0 0 40%;
    aspect-ratio: auto;
    height: 100%;
  }
  
  .proj-content {
    flex: 1;
    padding: var(--spacing-xl);
  }
}
```

### 4. Gallery Layouts

**Responsive gallery:**
```css
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
}

.gallery-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .gallery-item:nth-child(3n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }
}
```

### 5. Forms

**Responsive form layout:**
```css
.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-muted);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--panel-light);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--text);
  font-family: inherit;
  font-size: inherit;
  transition: border-color var(--dur) var(--ease);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
}

.form-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  align-self: flex-start;
}

@media (min-width: 768px) {
  .form {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-group.full-width {
    grid-column: span 2;
  }
}
```

### 6. Footer

**Responsive footer:**
```css
.site-footer {
  background: var(--panel);
  border-top: 1px solid var(--line);
  padding: var(--spacing-xl) 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-section h4 {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-links a {
  color: var(--text-muted);
  transition: color var(--dur) var(--ease);
}

.footer-links a:hover {
  color: var(--accent);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  border-top: 1px solid var(--line);
  color: var(--text-muted);
  font-size: var(--text-sm);
}
```

## Image Handling

### Responsive Images

**Use srcset for responsive images:**
```html
<img
  src="assets/img/project/hero-800w.jpg"
  srcset="
    assets/img/project/hero-400w.jpg 400w,
    assets/img/project/hero-800w.jpg 800w,
    assets/img/project/hero-1200w.jpg 1200w,
    assets/img/project/hero-1600w.jpg 1600w
  "
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 60vw"
  alt="Project hero image"
  loading="lazy"
  width="800"
  height="600"
>
```

**Art direction with picture:**
```html
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="assets/img/project/hero-desktop.jpg"
  >
  <source
    media="(min-width: 768px)"
    srcset="assets/img/project/hero-tablet.jpg"
  >
  <img
    src="assets/img/project/hero-mobile.jpg"
    alt="Project hero"
    loading="lazy"
    width="800"
    height="600"
  >
</picture>
```

### Background Images

**Responsive background images:**
```css
.hero-bg {
  background-image: url('assets/img/hero-bg-mobile.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .hero-bg {
    background-image: url('assets/img/hero-bg-tablet.jpg');
  }
}

@media (min-width: 1024px) {
  .hero-bg {
    background-image: url('assets/img/hero-bg-desktop.jpg');
  }
}
```

**Modern background with image-set:**
```css
@supports (background-image: image-set()) {
  .hero-bg {
    background-image: image-set(
      url('assets/img/hero-bg-800w.jpg') 800w,
      url('assets/img/hero-bg-1600w.jpg') 1600w
    );
  }
}
```

## Touch and Pointer Considerations

### Touch Targets

**Minimum touch target size: 44×44px**

```css
/* Ensure all interactive elements have minimum size */
button,
[role="button"],
a,
[tabindex]:focus {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-sm);
}

/* For icons-only buttons */
.icon-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Pointer Media Queries

**Apply hover effects only on hover-capable devices:**
```css
/* Hover effects */
.hover-effect {
  transition: all 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .hover-effect:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(30, 110, 243, 0.3);
  }
}

/* Touch-specific styles */
@media (hover: none) and (pointer: coarse) {
  .touch-target {
    padding: var(--spacing-md);
  }
}
```

## Performance Considerations

### Viewport Units

**Use dynamic viewport units for mobile:**
```css
/* Use dvh instead of vh to account for mobile browser UI */
.hero {
  min-height: 100dvh;
}

/* Use svh for smallest viewport height */
.modal {
  max-height: 100svh;
}

/* Use lvh for largest viewport height */
.fullscreen {
  height: 100lvh;
}
```

### Container Queries

**Style components based on their container size:**
```css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-image {
    float: left;
    width: 40%;
    margin-right: var(--spacing-md);
  }
}
```

### Avoid Layout Shifts

**Prevent CLS (Cumulative Layout Shift):**
```css
/* Always set aspect-ratio for images and containers */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Set height on containers that might shift */
.skeleton {
  min-height: 200px;
}
```

## Testing Strategies

### 1. Device Testing

**Test on these viewport sizes (minimum):**
- 360px (Small mobile)
- 390px (iPhone SE)
- 414px (iPhone 12/13/14)
- 768px (iPad, Tablet)
- 820px (iPad Pro 9.7")
- 1024px (Desktop, iPad Pro)
- 1440px (Desktop)
- 1920px (Large desktop)

### 2. Browser Testing

**Test on these browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest on Mac and iOS)
- Edge (latest)
- Mobile browsers (Chrome for Android, Safari for iOS)

### 3. Responsive Testing Tools

**Chrome DevTools:**
- Device Toolbar (Ctrl+Shift+M)
- Responsive mode
- Custom device presets

**Online Tools:**
- [Responsively App](https://responsively.app/)
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)

### 4. Manual Testing Checklist

**For each breakpoint:**
- [ ] No horizontal scrolling
- [ ] Content is readable (font sizes ≥ 16px)
- [ ] Touch targets ≥ 44×44px
- [ ] Images maintain aspect ratio
- [ ] Layout doesn't break
- [ ] Navigation is accessible
- [ ] Forms are usable
- [ ] Animations work correctly

**For mobile:**
- [ ] Viewport meta tag is correct
- [ ] Touch scrolling is smooth
- [ ] Hover states don't interfere
- [ ] Virtual keyboard doesn't break layout
- [ ] Focus states are visible

**For desktop:**
- [ ] Hover effects work
- [ ] Mouse interactions are smooth
- [ ] Scrolling is performant
- [ ] Keyboard navigation works

## Checklist Before Committing

- [ ] Mobile-first approach used
- [ ] All media queries use min-width
- [ ] Fluid typography implemented
- [ ] Relative units used where appropriate
- [ ] Touch targets ≥ 44×44px
- [ ] No horizontal scrolling at any breakpoint
- [ ] Images have proper srcset/sizes
- [ ] Background images are responsive
- [ ] Container queries used where appropriate
- [ ] Viewport units use dynamic variants (dvh, svh, lvh)
- [ ] Aspect ratios set on images and containers
- [ ] Tested on 360px, 768px, 1024px, 1440px
- [ ] Tested on Chrome, Firefox, Safari
- [ ] No layout shifts on load
- [ ] Performance is acceptable

## References

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/responsive_design)
- [CSS Tricks: Fluid Type](https://css-tricks.com/books/fundamental-css/fluid-typography/)
- [A List Apart: Responsive Design](https://alistapart.com/topic/responsive-design/)
- [Can I Use: CSS Features](https://caniuse.com/)
- [Viewports Explained](https://web.dev/articles/viewport-units)
