---
name: Portfolio UX Polish
description: >-
  Advanced UX/UI polish for Leonardo Macchiarini's portfolio. Focuses on typography, spacing, hierarchy, accessibility, and eliminating AI-generated design patterns.
triggers:
  - "UX polish"
  - "UI design"
  - "typography"
  - "spacing"
  - "hierarchy"
  - "accessibility"
  - "design audit"
  - "anti AI"
---

# Portfolio UX Polish

## Overview

This skill provides comprehensive UX/UI polish for portfolio websites, combining best practices from Vercel's Web Interface Guidelines, anti-AI design patterns, and portfolio-specific optimizations. It focuses on creating premium, professional designs that feel intentional and hand-crafted.

## Operating Principles

### 1. Anti-AI Design Patterns

**Eliminate these AI tells immediately:**

- **Purple/blue glow gradients** with no product reason → Use the portfolio's blue accent (`#1E6EF3`) sparingly
- **Generic 3-card feature rows** → Replace with asymmetric layouts, zig-zag grids, or horizontal scroll
- **Oversized rounded cards everywhere** → Vary border-radius: tighter on inner elements (4-8px), softer on containers (12-24px)
- **Empty marketing adjectives** → Use concrete, specific language
- **Inconsistent spacing and type scale** → Use the 8px spacing scale consistently
- **Decorative effects that don't support comprehension** → Every visual element must serve a purpose

### 2. Typography Hierarchy

**Font Stack for Portfolio:**
```css
:root {
  --font-sans: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-sans-tight: 'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Palatino', 'Georgia', serif;
}
```

**Typography Scale (8px Base):**
```css
:root {
  /* Headings */
  --text-4xl: clamp(2.5rem, 6vw, 4rem);    /* H1, Project titles */
  --text-3xl: clamp(2rem, 5vw, 3rem);      /* H2, Section titles */
  --text-2xl: clamp(1.5rem, 4vw, 2rem);    /* H3, Subtitles */
  --text-xl: 1.25rem;                      /* Large text */
  
  /* Body */
  --text-base: 1rem;                       /* Default */
  --text-sm: 0.875rem;                     /* Secondary */
  --text-xs: 0.75rem;                      /* Labels, captions */
  
  /* Line heights */
  --leading-tight: 1.1;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
}
```

**Type Improvements:**
- **Headlines lack presence** → Increase size, tighten letter-spacing, reduce line-height
- **Body text too wide** → Limit to ~65 characters per line (max-width: 65ch)
- **Only Regular (400) and Bold (700)** → Introduce Medium (500) and SemiBold (600)
- **Numbers in proportional font** → Use `font-variant-numeric: tabular-nums` for data
- **Missing letter-spacing** → Negative tracking for large headers, positive for labels
- **Title Case Everywhere** → Use sentence case for more natural feel
- **Orphaned words** → Use `text-wrap: balance` or `text-wrap: pretty`

### 3. Color System

**Portfolio Color Tokens:**
```css
:root {
  /* Backgrounds */
  --bg: #000000;
  --panel: #141414;
  --panel-light: #1a1a1a;
  --line: #232323;
  
  /* Accents */
  --accent: #1E6EF3;
  --accent-strong: #1652CC;
  --link: #B0C4FF;
  
  /* Text */
  --text: #FFFFFF;
  --text-muted: #A0A0A0;
}
```

**Color Improvements:**
- **Pure `#000000` background** → Already good, but can add subtle texture/noise
- **Oversaturated accent colors** → Keep saturation below 80% (current `#1E6EF3` is good)
- **More than one accent color** → Stick to blue accent only
- **Mixing warm and cool grays** → Current grays are cool (good)
- **Generic `box-shadow`** → Tint shadows to match background (`rgba(30, 110, 243, 0.1)`)
- **Flat design with zero texture** → Add subtle noise/grain overlay
- **Perfectly even gradients** → Use radial gradients, noise overlays, or mesh gradients

### 4. Layout & Spacing

**8px Spacing Scale:**
```css
:root {
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --spacing-2xl: 64px;
  --spacing-3xl: 96px;
}
```

**Layout Improvements:**
- **Everything centered and symmetrical** → Break symmetry with offset margins, mixed aspect ratios
- **Missing max-width container** → Add container constraint (1200-1400px)
- **No overlap or depth** → Use negative margins to create layering
- **Symmetrical vertical padding** → Bottom padding often needs to be slightly larger
- **Missing whitespace** → Double the spacing. Let the design breathe.
- **Uniform border-radius** → Vary: 4px (buttons), 8px (cards), 12px (containers), 16px (modals)

### 5. Interactive States

**Hover & Active States:**
```css
/* Buttons */
.button {
  transition: all 200ms var(--ease);
}

.button:hover {
  background: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 110, 243, 0.3);
}

.button:active {
  transform: translateY(0);
  scale: 0.98;
}

/* Cards */
.card {
  transition: all 300ms var(--ease);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

/* Links */
a {
  transition: color 200ms var(--ease);
}

a:hover {
  color: var(--accent);
}
```

**State Requirements:**
- [ ] Every interactive element has hover state
- [ ] Every interactive element has active/pressed state
- [ ] Every interactive element has focus state (accessibility)
- [ ] Transitions are smooth but not slow (200-300ms)
- [ ] No instant transitions (duration > 0)

### 6. Focus States (Accessibility)

```css
/* Global focus styles */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Skip link */
.skip:focus {
  outline: 3px solid var(--accent);
  background: var(--accent);
  color: var(--bg);
}

/* Button focus */
.button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(30, 110, 243, 0.3);
}

/* Input focus */
.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(30, 110, 243, 0.1);
}
```

## Portfolio-Specific Patterns

### 1. Project Card Design

**Best Practices:**
- Use variable heights (don't force equal height)
- Background images should be decorative but not distracting
- Content should be readable against any background
- Buttons should be bottom-aligned in card groups

```html
<div class="project-card">
  <div class="project-bg" aria-hidden="true">
    <img src="..." alt="" loading="lazy">
  </div>
  <div class="project-content">
    <span class="project-index">01</span>
    <h3 class="project-title">Project Name</h3>
    <p class="project-subtitle">Subtitle</p>
    <p class="project-description">Brief description...</p>
    <div class="project-actions">
      <button class="button">View Details</button>
    </div>
  </div>
</div>
```

### 2. Gallery Layouts

**Masonry Grid:**
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  align-items: start;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: var(--spacing-lg);
}
```

**Horizontal Scroll:**
```css
.horizontal-gallery {
  display: flex;
  gap: var(--spacing-lg);
  overflow-x: auto;
  padding-bottom: var(--spacing-md);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.gallery-item {
  flex: 0 0 80%;
  scroll-snap-align: start;
}
```

**Asymmetric Grid:**
```css
.asymmetric-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
}

.item-1 { grid-column: span 8; }
.item-2 { grid-column: span 4; }
.item-3 { grid-column: span 6; grid-row: span 2; }
.item-4 { grid-column: span 6; }
```

### 3. Hero Sections

**Design Guidelines:**
- Primary headline: Georgia serif, large size (3-4rem)
- Subheadline: Inter Tight, medium size (1.25-1.5rem)
- CTA button: Accent color, prominent placement
- Background: Subtle gradient or high-quality image
- Vertical spacing: Generous (96px+ above and below)

```html
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-content container">
    <h1 class="hero-title">Leonardo Macchiarini</h1>
    <p class="hero-subtitle">Product Designer</p>
    <p class="hero-description">Creating meaningful experiences through design</p>
    <button class="button button-primary">View Work</button>
  </div>
</section>
```

### 4. Navigation Design

**Header Requirements:**
- Fixed position (sticky on scroll)
- Background with blur effect
- Logo on left, navigation on right
- Mobile: Hamburger menu
- Active state for current page

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  z-index: 100;
  border-bottom: 1px solid rgba(30, 110, 243, 0.2);
}

.site-nav a {
  color: var(--text-muted);
  transition: color var(--dur) var(--ease);
}

.site-nav a:hover,
.site-nav a[aria-current="page"] {
  color: var(--accent);
}
```

### 5. Footer Design

**Footer Requirements:**
- Consistent with header design
- Contact information
- Social links
- Copyright notice
- Optional: Back to top button

```html
<footer class="site-footer">
  <div class="footer-content container">
    <div class="footer-section">
      <h3>Leonardo Macchiarini</h3>
      <p>Product Designer</p>
    </div>
    <div class="footer-section">
      <h4>Contact</h4>
      <a href="mailto:...">Email</a>
      <a href="tel:...">Phone</a>
    </div>
    <div class="footer-section">
      <h4>Social</h4>
      <a href="...">LinkedIn</a>
      <a href="...">GitHub</a>
      <a href="...">Instagram</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Leonardo Macchiarini. All rights reserved.</p>
  </div>
</footer>
```

## Accessibility Checklist

### Semantic HTML
- [ ] Use `<main>` for primary content
- [ ] Use `<nav>` for navigation
- [ ] Use `<article>` for self-contained content
- [ ] Use `<section>` for thematic grouping
- [ ] Use `<header>` and `<footer>` appropriately
- [ ] Use proper heading hierarchy (h1 > h2 > h3 > h4)

### Images & Media
- [ ] Every `<img>` has meaningful `alt` text
- [ ] Decorative images use `alt=""`
- [ ] Background images use `aria-hidden="true"` on wrapper
- [ ] Videos have captions and transcripts
- [ ] Audio has transcripts

### Forms & Interactions
- [ ] Every form control has a label
- [ ] Buttons have `type="button"` (unless submit)
- [ ] Buttons have accessible names
- [ ] Form validation is accessible
- [ ] Focus states are visible

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] No keyboard traps
- [ ] Skip link works and receives focus first
- [ ] Modal dialogs trap focus and return it on close

### Screen Readers
- [ ] Language is set (`lang="en"`)
- [ ] ARIA labels are used appropriately
- [ ] Hidden content uses `aria-hidden="true"`
- [ ] State changes are announced
- [ ] Error messages are associated with inputs

## Responsive Design Checklist

### Breakpoints
```css
/* Mobile: 360px */
@media (max-width: 480px) { ... }

/* Tablet: 768px */
@media (max-width: 768px) { ... }

/* Desktop: 1024px */
@media (max-width: 1024px) { ... }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { ... }
```

### Mobile Requirements
- [ ] No horizontal scroll
- [ ] Navigation collapses to hamburger menu
- [ ] Text remains readable (min 16px)
- [ ] Touch targets ≥ 44×44px
- [ ] Images keep aspect ratio
- [ ] Content stacks vertically

### Tablet Requirements
- [ ] Grids collapse cleanly
- [ ] Images scale appropriately
- [ ] Navigation is accessible
- [ ] Touch and mouse both work

### Desktop Requirements
- [ ] Container max-width respected
- [ ] Hero doesn't overflow
- [ ] Hover effects work
- [ ] Scrolling is smooth

## Performance Checklist

### Images
- [ ] Above-the-fold images load eagerly
- [ ] Offscreen images use `loading="lazy"`
- [ ] Images are properly sized (no larger than necessary)
- [ ] Images have `width` and `height` attributes
- [ ] Images are optimized (quality ~82, max dimension 2200px)

### Assets
- [ ] CSS is minified
- [ ] JavaScript is minified
- [ ] Fonts are subsetted and in WOFF2 format
- [ ] No unused assets are loaded
- [ ] CDN is used for static assets

### Loading
- [ ] Critical CSS is inlined
- [ ] JavaScript is deferred or async
- [ ] Fonts load with `font-display: swap`
- [ ] Total page weight < 4MB
- [ ] Largest Contentful Paint < 2.5s

## Content Guidelines

### Copywriting
- **Be specific** - Avoid generic terms like "innovative", "cutting-edge", "next-gen"
- **Use active voice** - "I designed" not "Was designed by me"
- **Be concise** - Remove unnecessary words
- **Use sentence case** - Not Title Case
- **Avoid exclamation marks** - Be confident, not loud

### Project Descriptions
- Start with the problem
- Describe the solution
- Mention the result/impact
- Include tools/technologies used
- Keep it to 2-4 sentences

**Example:**
```
<strong>Problem:</strong> E-bike users face discomfort from micro-impacts and limited battery range.

<strong>Solution:</strong> Designed an adaptive saddle with split "wing" design and kinetic energy recovery.

<strong>Result:</strong> 70% reduction in vibrations, 10% battery range extension.
```

### Image Captions
- Describe what's shown
- Include context if needed
- Keep it brief (1 line)
- Use sentence case

**Example:**
```
Main view with adaptive wing design
Technical diagram showing shock absorber mechanism
Prototype testing phase 1
```

## Workflow

### 1. Audit Phase
1. Scan the current design for issues
2. Identify AI-generated patterns
3. Note inconsistent spacing/typography
4. Check accessibility violations
5. Review responsive behavior

### 2. Design Phase
1. Create typography scale
2. Define spacing system
3. Design color palette
4. Create component patterns
5. Plan layout variations

### 3. Implementation Phase
1. Apply typography improvements
2. Fix spacing inconsistencies
3. Enhance color usage
4. Add interactive states
5. Improve accessibility

### 4. Testing Phase
1. Verify on mobile, tablet, desktop
2. Test keyboard navigation
3. Check screen reader compatibility
4. Test performance
5. Validate all links

### 5. Polish Phase
1. Add subtle animations
2. Enhance hover states
3. Add focus states
4. Fine-tune spacing
5. Final visual QA

## Checklist Before Committing

- [ ] Typography is consistent and readable
- [ ] Spacing uses the 8px scale
- [ ] Colors match the design system
- [ ] All interactive elements have states
- [ ] Accessibility requirements are met
- [ ] Responsive design works on all breakpoints
- [ ] Performance is optimized
- [ ] Content is well-written and specific
- [ ] No AI-generated patterns remain
- [ ] Console has no errors

## References

- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- [Impeccable Design Polish](https://impeccable.app/)
- [A11Y Project](https://www.a11yproject.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
