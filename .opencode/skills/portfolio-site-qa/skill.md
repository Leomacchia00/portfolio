---
name: Portfolio Site QA
description: >-
  Comprehensive quality assurance for Leonardo Macchiarini's portfolio. Covers links, assets, accessibility, responsive design, performance, motion, console errors, and content validation.
triggers:
  - "qa"
  - "quality assurance"
  - "audit"
  - "review"
  - "check"
  - "validate"
  - "test"
---

# Portfolio Site QA

## Overview

This skill provides comprehensive quality assurance for the portfolio website. It combines the best practices from Vercel's Web Interface Guidelines, accessibility standards, performance metrics, and portfolio-specific requirements to ensure the site is production-ready.

## QA Workflow

### 1. Pre-QA Checklist

Before starting the QA process:
- [ ] All changes are committed
- [ ] Local server is running
- [ ] Browser DevTools are open
- [ ] Lighthouse is installed
- [ ] All pages are accessible
- [ ] No known issues in development

### 2. QA Execution Order

1. **Automated Checks** (Fastest)
   - Link validation
   - Console errors
   - HTML validation
   - CSS validation
   - Performance metrics

2. **Visual Checks** (Manual)
   - Responsive design
   - Typography and spacing
   - Color consistency
   - Layout alignment
   - Animation smoothness

3. **Functional Checks** (Interactive)
   - Navigation
   - Forms
   - Lightbox
   - Scroll behavior
   - Keyboard navigation

4. **Accessibility Checks** (Specialized)
   - Screen reader
   - Keyboard only
   - Color contrast
   - Focus states
   - ARIA attributes

5. **Content Checks** (Final)
   - Copy quality
   - Image alt text
   - Meta tags
   - SEO

## Automated Checks

### 1. Link Validation

**Check all links for 404 errors:**

```javascript
// Find all links on a page
const allLinks = document.querySelectorAll('a[href], link[href], img[src], script[src], iframe[src]');

// Extract all URLs
const urls = Array.from(allLinks).map(link => {
  const href = link.href || link.src;
  if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }
  return new URL(href, window.location.origin).href;
}).filter(Boolean);

// Check for duplicates
const uniqueUrls = [...new Set(urls)];
const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);

// Check for broken links
const brokenLinks = [];
const checkLink = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      brokenLinks.push({ url, status: response.status });
    }
  } catch (error) {
    brokenLinks.push({ url, error: error.message });
  }
};

// Run checks
Promise.all(uniqueUrls.map(checkLink)).then(() => {
  console.log('Broken links:', brokenLinks);
  console.log('Duplicate links:', duplicateUrls);
});
```

**Common Issues to Check:**
- References to deleted files (`.file-versions/`, `.od-frames/`, etc.)
- Absolute local paths (`C:\...`)
- `file://` links
- Missing `rel="noopener"` on external links
- Missing `alt` attributes on images
- Missing `type` attributes on scripts

### 2. Console Error Check

**Check for JavaScript errors:**

```javascript
// Monitor console errors
const originalError = console.error;
const originalWarn = console.warn;
const errors = [];
const warnings = [];

console.error = (...args) => {
  errors.push(args);
  originalError(...args);
};

console.warn = (...args) => {
  warnings.push(args);
  originalWarn(...args);
};

// After page load
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('Errors:', errors);
    console.log('Warnings:', warnings);
    
    // Restore original functions
    console.error = originalError;
    console.warn = originalWarn;
  }, 1000);
});
```

**Common Console Errors:**
- GSAP not loaded
- ScrollTrigger not loaded
- Lenis not loaded
- Undefined variables
- 404 errors for assets
- CORS issues
- Syntax errors

### 3. HTML Validation

**Validate HTML structure:**

```bash
# Using W3C validator
curl -X POST https://validator.w3.org/nu/?out=json \
  -H "Content-Type: text/html" \
  --data-binary @index.html

# Or use online validator
# https://validator.w3.org/
```

**Common HTML Issues:**
- Multiple `<h1>` elements on a page
- Skipped heading levels (h1 → h3)
- Missing `alt` attributes
- Missing `type` on buttons
- Missing `lang` attribute
- Invalid nesting
- Unclosed tags

### 4. CSS Validation

**Validate CSS:**

```bash
# Using W3C CSS validator
curl -X POST https://jigsaw.w3.org/css-validator/validator \
  -F "uploaded_file=@assets/css/style.css" \
  -F "output=json"

# Or use online validator
# https://jigsaw.w3.org/css-validator/
```

**Common CSS Issues:**
- Invalid properties
- Invalid values
- Unsupported vendor prefixes
- Duplicate rules
- Specificity issues

### 5. Performance Metrics

**Run Lighthouse audit:**

```bash
# Full Lighthouse audit
lighthouse https://localhost:3000 --output=json --output-path=./lighthouse.json

# Focus on performance
lighthouse https://localhost:3000 --chrome-flags="--headless" --output=html --output-path=./report.html --preset=desktop

# Check Core Web Vitals
lighthouse https://localhost:3000 --output=csv --output-path=./vitals.csv --chrome-flags="--headless" -- gather=performance
```

**Performance Checklist:**
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Total page weight < 4MB
- [ ] No render-blocking resources
- [ ] Images are optimized
- [ ] Fonts are preloaded
- [ ] JavaScript is deferred
- [ ] CSS is minified

## Visual Checks

### 1. Responsive Design

**Test at these breakpoints:**

| Device | Width | Notes |
|--------|-------|-------|
| Small Mobile | 360px | iPhone SE, Galaxy Fold |
| Standard Mobile | 390px | iPhone 12/13/14 |
| Large Mobile | 414px | iPhone 14 Pro Max |
| Small Tablet | 600px | Minimum for 2-column layouts |
| Standard Tablet | 768px | iPad, iPad Mini |
| Large Tablet | 820px | iPad Pro 9.7" |
| Small Desktop | 1024px | Minimum for desktop layouts |
| Standard Desktop | 1440px | Common desktop width |
| Large Desktop | 1920px | Common large monitor |
| Ultra-Wide | 2560px | Ultra-wide monitors |

**Responsive Checklist:**
- [ ] No horizontal scrolling at any width
- [ ] Layout adapts to all breakpoints
- [ ] Images maintain aspect ratio
- [ ] Text remains readable (min 16px)
- [ ] Touch targets ≥ 44×44px
- [ ] Navigation is accessible
- [ ] Content doesn't overlap
- [ ] Grids collapse cleanly
- [ ] Hover effects work on desktop
- [ ] Touch effects work on mobile

### 2. Typography

**Typography Checklist:**
- [ ] Font sizes use the 8px scale
- [ ] Headings use Georgia serif
- [ ] Body text uses Inter Tight
- [ ] Line heights are consistent
- [ ] Letter-spacing is appropriate
- [ ] No orphaned words
- [ ] No widows
- [ ] Text is left-aligned where appropriate
- [ ] Text is centered where appropriate

**Common Typography Issues:**
- Inconsistent font families
- Inconsistent font sizes
- Inconsistent line heights
- Text that's too wide (>65ch)
- Text that's too small (<16px)
- Poor contrast
- Text overflow

### 3. Spacing

**Spacing Checklist:**
- [ ] Uses the 8px spacing scale
- [ ] Consistent margins and padding
- [ ] Vertical rhythm is maintained
- [ ] No excessive whitespace
- [ ] No insufficient whitespace
- [ ] Spacing is consistent across pages

**Common Spacing Issues:**
- Inconsistent spacing between sections
- Inconsistent spacing between elements
- Missing spacing
- Excessive spacing
- Asymmetrical spacing

### 4. Colors

**Color Checklist:**
- [ ] Uses the portfolio color tokens
- [ ] Background: `#000000`
- [ ] Panels: `#141414` or `#1a1a1a`
- [ ] Lines: `#232323`
- [ ] Accent: `#1E6EF3`
- [ ] Accent strong: `#1652CC`
- [ ] Link: `#B0C4FF`
- [ ] Text: `#FFFFFF`
- [ ] Text muted: `#A0A0A0`
- [ ] Consistent color usage
- [ ] No color conflicts

**Color Contrast Check:**
```javascript
// Check color contrast
function getContrastRatio(color1, color2) {
  const c1 = getLuminance(color1);
  const c2 = getLuminance(color2);
  const lighter = Math.max(c1, c2);
  const darker = Math.min(c1, c2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex) {
  const rgb = parseInt(hex.replace('#', ''), 16);
  const r = (rgb >> 16) / 255;
  const g = ((rgb >> 8) & 0xFF) / 255;
  const b = (rgb & 0xFF) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Check text contrast
const textElements = document.querySelectorAll('body, body *');
textElements.forEach(el => {
  const color = window.getComputedStyle(el).color;
  const bgColor = window.getComputedStyle(el).backgroundColor;
  
  if (color !== 'rgba(0, 0, 0, 0)' && bgColor !== 'rgba(0, 0, 0, 0)') {
    const contrast = getContrastRatio(color, bgColor);
    if (contrast < 4.5) {
      console.warn('Low contrast:', el, 'Ratio:', contrast);
    }
  }
});
```

**Minimum Contrast Ratios:**
- Normal text: 4.5:1
- Large text (18.66px+): 3:1
- UI Components: 3:1

### 5. Layout

**Layout Checklist:**
- [ ] Consistent container widths
- [ ] Consistent section spacing
- [ ] Proper alignment
- [ ] No overlapping elements
- [ ] No content cutoff
- [ ] Scroll behavior is smooth
- [ ] No unexpected scrollbars

**Common Layout Issues:**
- Container width inconsistent
- Section spacing inconsistent
- Elements misaligned
- Overlapping elements
- Content cutoff
- Unexpected scrollbars
- Jumping layout

### 6. Animations

**Animation Checklist:**
- [ ] All animations are smooth (60fps)
- [ ] Animations respect reduced motion
- [ ] Animations use GPU-accelerated properties
- [ ] No layout shifts caused by animations
- [ ] Animation timing is appropriate
- [ ] Animation easing is appropriate

**Animation Performance Check:**
```javascript
// Check animation performance
let lastTime = performance.now();
let frameCount = 0;

function checkAnimationPerformance() {
  const now = performance.now();
  const delta = now - lastTime;
  
  if (delta >= 1000) {
    const fps = Math.round(frameCount * 1000 / delta);
    if (fps < 45) {
      console.warn('Animation performance issue: FPS =', fps);
    }
    frameCount = 0;
    lastTime = now;
  }
  
  frameCount++;
  requestAnimationFrame(checkAnimationPerformance);
}

checkAnimationPerformance();
```

## Functional Checks

### 1. Navigation

**Navigation Checklist:**
- [ ] All navigation links work
- [ ] Active page is highlighted
- [ ] Hamburger menu works on mobile
- [ ] Menu closes when clicking outside
- [ ] Menu closes when clicking a link
- [ ] Skip link works
- [ ] Keyboard navigation works
- [ ] Focus states are visible

**Navigation Test Script:**
```javascript
// Test navigation links
const navLinks = document.querySelectorAll('.site-nav a, .nav-toggle');

navLinks.forEach(link => {
  // Test click
  link.click();
  
  // Check if URL changed or menu toggled
  setTimeout(() => {
    console.log('Nav link clicked:', link.href);
  }, 500);
  
  // Go back
  window.history.back();
});

// Test hamburger menu
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.click();
  setTimeout(() => {
    console.log('Menu open');
    navToggle.click();
    setTimeout(() => {
      console.log('Menu closed');
    }, 500);
  }, 500);
}
```

### 2. Lightbox

**Lightbox Checklist:**
- [ ] Opens when clicking images
- [ ] Shows correct image
- [ ] Shows correct caption
- [ ] Shows image counter (1/5)
- [ ] Prev/next buttons work
- [ ] Keyboard navigation works (arrow keys, Esc)
- [ ] Closes on Esc
- [ ] Closes on background click
- [ ] Focus is trapped while open
- [ ] Focus returns to trigger on close
- [ ] Scroll is locked while open

**Lightbox Test Script:**
```javascript
// Test lightbox
const lightboxTriggers = document.querySelectorAll('.shot, .lightbox-trigger');

lightboxTriggers.forEach((trigger, i) => {
  // Open lightbox
  trigger.click();
  
  setTimeout(() => {
    const lightbox = document.querySelector('dialog[open], .lightbox[open]');
    if (!lightbox) {
      console.error('Lightbox did not open');
      return;
    }
    
    console.log('Lightbox opened');
    
    // Check image
    const img = lightbox.querySelector('img');
    if (!img) {
      console.error('No image in lightbox');
    }
    
    // Check caption
    const caption = lightbox.querySelector('.lb-cap, .lightbox-caption');
    if (!caption) {
      console.error('No caption in lightbox');
    }
    
    // Test prev/next
    const prev = lightbox.querySelector('.lb-prev, [aria-label="Previous"]');
    const next = lightbox.querySelector('.lb-next, [aria-label="Next"]');
    
    if (prev) prev.click();
    setTimeout(() => {
      if (next) next.click();
      setTimeout(() => {
        // Test close
        const close = lightbox.querySelector('.lb-close, [aria-label="Close"]');
        if (close) close.click();
        
        setTimeout(() => {
          console.log('Lightbox test complete');
        }, 500);
      }, 500);
    }, 500);
  }, 500);
});
```

### 3. Scroll Behavior

**Scroll Checklist:**
- [ ] Smooth scrolling works
- [ ] Scroll to anchor works
- [ ] Scroll to top works
- [ ] Scroll position is maintained
- [ ] Scroll behavior is consistent

**Scroll Test Script:**
```javascript
// Test scroll to anchor
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
  const targetId = anchor.getAttribute('href').substring(1);
  const target = document.getElementById(targetId);
  
  if (target) {
    anchor.click();
    setTimeout(() => {
      const targetRect = target.getBoundingClientRect();
      if (targetRect.top !== 0) {
        console.warn('Scroll to anchor not working:', targetId);
      }
      window.scrollTo(0, 0);
    }, 1000);
  }
});
```

### 4. Forms

**Form Checklist:**
- [ ] Form fields are labeled
- [ ] Form validation works
- [ ] Form submission works
- [ ] Form error messages are accessible
- [ ] Form focus states are visible

**Form Test Script:**
```javascript
// Test forms
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    // Test focus
    input.focus();
    console.log('Focused:', input);
    
    // Test blur
    input.blur();
    
    // Test validation
    if (input.required) {
      form.submit();
      setTimeout(() => {
        if (!input.checkValidity()) {
          console.log('Validation failed for:', input);
        }
      }, 100);
    }
  });
});
```

## Accessibility Checks

### 1. Keyboard Navigation

**Keyboard Navigation Checklist:**
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] No keyboard traps
- [ ] Focus states are visible
- [ ] Skip link works
- [ ] Menu can be navigated with keyboard
- [ ] Lightbox can be closed with Esc

**Keyboard Navigation Test Script:**
```javascript
// Simulate keyboard navigation
const focusableElements = document.querySelectorAll(
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

let currentIndex = 0;
const interval = setInterval(() => {
  if (currentIndex >= focusableElements.length) {
    clearInterval(interval);
    console.log('Keyboard navigation test complete');
    return;
  }
  
  const element = focusableElements[currentIndex];
  element.focus();
  console.log('Focused:', element);
  
  // Check if element is visible
  const rect = element.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) {
    console.warn('Element not visible when focused:', element);
  }
  
  currentIndex++;
}, 200);
```

### 2. Screen Reader

**Screen Reader Checklist:**
- [ ] All images have meaningful alt text
- [ ] Decorative images have empty alt text
- [ ] All form controls have labels
- [ ] Buttons have accessible names
- [ ] Links have meaningful text
- [ ] ARIA attributes are used correctly
- [ ] Language is set
- [ ] Content is logical when read linearly

**Screen Reader Test with VoiceOver (Mac):**
1. Press Cmd + F5 to start VoiceOver
2. Press Ctrl + Option + Space to read from cursor
3. Press Ctrl + Option + Cmd + H to read current item
4. Press Ctrl + Option + U to open Rotor
5. Navigate with Ctrl + Option + Arrow Keys

**Screen Reader Test with NVDA (Windows):**
1. Start NVDA
2. Press Tab to navigate
3. Press Enter to activate
4. Press H to navigate headings
5. Press L to navigate links
6. Press T to navigate tables

### 3. Color Blindness

**Test with color blindness simulators:**
- [Color Oracle](https://colororacle.org/) (Windows, Mac, Linux)
- [Sim Daltonism](https://apps.apple.com/us/app/sim-daltonism/id693112260) (Mac)
- [Chrome DevTools](chrome://flags/#enable-color-blind-emulation)

**Color Blindness Types to Test:**
- Protanopia (red-green, 1% of males)
- Deuteranopia (red-green, 1% of males)
- Tritanopia (blue-yellow, 0.003% of population)
- Protanomaly (red-weak, 1% of males)
- Deuteranomaly (green-weak, 1% of males)
- Tritanomaly (blue-weak, 0.01% of population)
- Achromatopsia (complete color blindness, 0.003% of population)
- Achromatomaly (partial color blindness)

### 4. Focus States

**Focus State Checklist:**
- [ ] All interactive elements have visible focus states
- [ ] Focus states have sufficient contrast (3:1 minimum)
- [ ] Focus states are consistent
- [ ] Focus states don't obscure content

**Focus State Test:**
```javascript
// Test focus states
const interactiveElements = document.querySelectorAll(
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

interactiveElements.forEach(el => {
  // Get computed focus style
  el.focus();
  const focusStyle = window.getComputedStyle(el, ':focus');
  const outline = focusStyle.outline;
  const boxShadow = focusStyle.boxShadow;
  const backgroundColor = focusStyle.backgroundColor;
  
  console.log('Focus style for:', el, { outline, boxShadow, backgroundColor });
  
  // Check contrast
  const bgColor = window.getComputedStyle(el).backgroundColor;
  if (outline !== 'none' || boxShadow !== 'none' || backgroundColor !== bgColor) {
    console.log('Focus state visible for:', el);
  } else {
    console.warn('No visible focus state for:', el);
  }
  
  el.blur();
});
```

### 5. ARIA Validation

**ARIA Checklist:**
- [ ] ARIA labels are used correctly
- [ ] ARIA roles are appropriate
- [ ] ARIA properties are valid
- [ ] ARIA states are updated
- [ ] No redundant ARIA attributes

**ARIA Validation Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [ANDI](https://www.ssa.gov/accessibility/andi/help/howtouse.html)

## Content Checks

### 1. Copy Quality

**Copy Checklist:**
- [ ] Text is in English
- [ ] No spelling errors
- [ ] No grammar errors
- [ ] No generic marketing terms
- [ ] Concrete, specific language
- [ ] Consistent tone and voice
- [ ] Appropriate length
- [ ] Logical structure

**Common Copy Issues:**
- Generic terms: "innovative", "cutting-edge", "next-gen"
- Passive voice: "was designed by" → "I designed"
- Excessive use of "I" or "we"
- Inconsistent tense
- Inconsistent capitalization
- Missing punctuation

### 2. Image Alt Text

**Alt Text Checklist:**
- [ ] All images have alt text
- [ ] Alt text is meaningful and descriptive
- [ ] Decorative images have empty alt text (`alt=""`)
- [ ] Alt text is concise (under 125 characters)
- [ ] Alt text doesn't start with "Image of" or "Picture of"
- [ ] Alt text provides context

**Alt Text Examples:**
```html
<!-- Good -->
<img src="project-1.jpg" alt="Bat-wing adaptive saddle with split wing design">

<!-- Good for decorative -->
<img src="bg-pattern.png" alt="">

<!-- Bad -->
<img src="project-1.jpg" alt="">
<img src="project-1.jpg" alt="image">
<img src="project-1.jpg" alt="Image of project 1">
<img src="project-1.jpg" alt="Bat-wing project">
```

### 3. Meta Tags

**Meta Tag Checklist:**
- [ ] Each page has unique title
- [ ] Each page has unique description
- [ ] Titles are under 60 characters
- [ ] Descriptions are under 160 characters
- [ ] Titles include primary keywords
- [ ] Descriptions are compelling
- [ ] Open Graph meta tags are present
- [ ] Twitter Card meta tags are present
- [ ] Favicon is present

**Meta Tag Template:**
```html
<!-- Required -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leonardo Macchiarini | Product Designer</title>
<meta name="description" content="Product designer specializing in meaningful experiences. Portfolio includes SHOCK!, ELIO, Silky Skin, and Bat-wing projects.">

<!-- Open Graph -->
<meta property="og:title" content="Leonardo Macchiarini | Product Designer">
<meta property="og:description" content="Product designer specializing in meaningful experiences.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://leonardomacchiarini.com/">
<meta property="og:image" content="https://leonardomacchiarini.com/assets/img/og-image.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Leonardo Macchiarini | Product Designer">
<meta name="twitter:description" content="Product designer specializing in meaningful experiences.">
<meta name="twitter:image" content="https://leonardomacchiarini.com/assets/img/twitter-image.jpg">

<!-- Favicon -->
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23000'/%3E%3Ctext x='32' y='45' font-family='Georgia,serif' font-size='38' fill='%231E6EF3' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E">
```

### 4. SEO

**SEO Checklist:**
- [ ] Semantic HTML structure
- [ ] Unique, descriptive page titles
- [ ] Unique, descriptive meta descriptions
- [ ] Logical heading hierarchy (h1 > h2 > h3)
- [ ] Descriptive link text
- [ ] Image alt text
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt

**SEO Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Screaming Frog](https://www.screamingfrog.com/seo-spider/)
- [Ahrefs](https://ahrefs.com/)
- [SEMrush](https://www.semrush.com/)

## QA Report Format

### 1. Findings Table

```markdown
| Severity | File | Line | Issue | Notes |
|----------|------|------|-------|-------|
| HIGH | projects.html | 45 | Missing alt text on project image | Add descriptive alt text |
| MED | index.html | 22 | h2 follows h1 without h2 | Fix heading hierarchy |
| LOW | about.html | 15 | Inconsistent spacing | Use 8px scale |
| INFO | cv.html | - | Consider adding schema.org markup | Improve SEO |
```

### 2. Summary

```markdown
## QA Summary

**Date:** 2024-01-15
**Pages Checked:** index.html, about.html, cv.html, projects.html, contacts.html
**Issues Found:** 24 (4 HIGH, 12 MED, 8 LOW)
**Issues Fixed:** 0
**Issues Remaining:** 24

### By Category
- Links: 5 (2 HIGH, 3 MED)
- HTML: 3 (1 HIGH, 2 MED)
- CSS: 4 (1 HIGH, 3 MED)
- Accessibility: 8 (2 HIGH, 4 MED, 2 LOW)
- Performance: 4 (2 HIGH, 2 MED)

### Pass/Fail
- ✅ Links and assets: PASS
- ✅ HTML validation: PASS
- ⚠️ CSS validation: 3 warnings
- ❌ Accessibility: FAIL (8 issues)
- ❌ Performance: FAIL (4 issues)
- ✅ Responsive: PASS
- ⚠️ Content: 2 minor issues
```

### 3. Recommendations

```markdown
## Recommendations

### High Priority
1. Fix missing alt text on all project images in projects.html
2. Fix heading hierarchy in index.html
3. Improve color contrast in about.html
4. Reduce page weight in projects.html

### Medium Priority
1. Optimize images for better performance
2. Add missing ARIA attributes
3. Fix CSS validation warnings
4. Improve meta descriptions

### Low Priority
1. Standardize spacing across all pages
2. Add structured data markup
3. Improve copy in about.html
```

## QA Tools and Resources

### Automated Tools
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) - Performance, accessibility, SEO
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibility
- [WAVE](https://wave.webaim.org/) - Accessibility
- [W3C Validator](https://validator.w3.org/) - HTML validation
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) - CSS validation
- [WebPageTest](https://www.webpagetest.org/) - Performance testing
- [Screaming Frog](https://www.screamingfrog.com/seo-spider/) - SEO auditing

### Manual Testing
- **Browser Testing:** Chrome, Firefox, Safari, Edge
- **Device Testing:** Desktop, Tablet, Mobile
- **Screen Reader Testing:** VoiceOver, NVDA, JAWS
- **Keyboard Testing:** Tab, Shift+Tab, Enter, Space, Arrow Keys
- **Color Contrast Testing:** Color Oracle, Sim Daltonism

### Checklists
- [W3C Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [MDN Web Docs](https://developer.mozilla.org/)

## Final Approval Checklist

Before deploying to production:

- [ ] All HIGH severity issues are fixed
- [ ] All MED severity issues are fixed or acknowledged
- [ ] All LOW severity issues are documented
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] No console errors
- [ ] No 404 errors
- [ ] All links work
- [ ] All images have alt text
- [ ] All pages are responsive
- [ ] All animations respect reduced motion
- [ ] All forms work
- [ ] Lightbox works correctly
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Meta tags are present
- [ ] SEO is optimized
- [ ] Performance is acceptable
- [ ] Content is proofread
- [ ] Design is consistent
- [ ] Branding is consistent

## Maintenance Schedule

**Regular QA Schedule:**
- **Daily:** Check for console errors, broken links
- **Weekly:** Run Lighthouse audit, check performance
- **Monthly:** Full QA review, accessibility audit
- **Quarterly:** Content review, SEO audit, design consistency check

**After Major Changes:**
- Run full QA review
- Test all affected pages
- Test all related functionality
- Check for regressions
