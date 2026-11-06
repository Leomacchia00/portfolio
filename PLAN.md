# Portfolio Leonardo Macchiarini - Development Plan

## Overview

This document tracks the development plan, current status, and roadmap for Leonardo Macchiarini's portfolio website.

## Current Status (2024)

### Completed ✅

1. **Site Structure**
   - [x] 5 main pages: index.html, about.html, cv.html, projects.html, contacts.html
   - [x] Assets organized: css, js, img, fonts, docs
   - [x] Design system with tokens in `:root`
   - [x] Responsive design implemented
   - [x] Shared header and footer
   - [x] Navigation system

2. **Design System**
   - [x] Color tokens (bg, panel, accent, text, etc.)
   - [x] Typography system (Archivo, Inter Tight, Georgia)
   - [x] Spacing scale (8px based)
   - [x] Radius and border tokens
   - [x] Motion tokens (durations, easings)

3. **Core Functionality**
   - [x] Smooth scrolling with Lenis
   - [x] GSAP animations
   - [x] ScrollTrigger integration
   - [x] Lightbox for image galleries
   - [x] Reveal animations
   - [x] Custom cursor
   - [x] Progress bar
   - [x] Particle effects
   - [x] Skip links
   - [x] Mobile navigation

4. **Project Pages**
   - [x] SHOCK! project section
   - [x] ELIO project section
   - [x] Silky Skin project section
   - [x] Bat-wing project section (horizontal scroll gallery + 3D effects)
   - [x] Image galleries with lightbox
   - [x] Project descriptions
   - [x] Project metadata

5. **Skills Library** (NEW)
   - [x] portfolio-motion-design - Advanced motion design with GSAP
   - [x] portfolio-ux-polish - UX/UI polish and design audit
   - [x] token-economy-optimization - Token efficiency and development optimization
   - [x] advanced-responsive-design - Responsive design patterns and best practices
   - [x] performance-web-optimization - Performance optimization for web
   - [x] infinite-loop-animations - Seamless infinite loop animations
   - [x] parallax-scrolling-effects - Advanced parallax effects
   - [x] portfolio-site-qa - Comprehensive QA and validation

### Decision — Bat-wing layout

The curved-flow experiment (orbiting images, autonomous loop) was implemented,
rejected and rolled back (commits 203c334/3264f3e reverted in d599904).
The approved layout for Bat-wing is the **horizontal scroll gallery**
with 3D tilt, magnetic cursor and particle trail (commit 412db12).
Do NOT re-implement the curved flow unless the user explicitly re-opens the idea.

### In Progress 🚧

1. **Performance Optimization**
   - [ ] Optimize all images (WebP conversion, compression)
   - [ ] Implement lazy loading for all offscreen images
   - [ ] Minify CSS and JavaScript
   - [ ] Implement caching strategies
   - [ ] Reduce page weight below 4MB
   - [ ] Achieve Lighthouse score > 90

2. **Animation Improvements**
   - [ ] Implement infinite loop for other project galleries
   - [ ] Add parallax effects to project sections
   - [ ] Implement mouse-follow effects
   - [ ] Add scroll-triggered reveals
   - [ ] Optimize GSAP animations

### Backlog 📋

1. **Motion Design Enhancements** (Inspired by reference sites)
   - **From Macmillan Studio:**
     - ~~Implement curved flow~~ (rejected — see Decision above)
     - [ ] Add multi-layer parallax effects
     - [ ] Implement smooth scroll-triggered animations
     - [ ] Add depth to project sections
   
   - **From Andreas.vision:**
     - [ ] Add auto-scrolling image gallery
     - [ ] Implement seamless infinite loop
     - [ ] Add pause on hover
     - [ ] Add keyboard controls
   
   - **From Sobra.be:**
     - [ ] Implement horizontal parallax
     - [ ] Add project succession with parallax
     - [ ] Implement smooth transitions between projects
     - [ ] Add subtle background animations
   
   - **From Bratiiev.com:**
     - [ ] Implement tilt effects on scroll
     - [ ] Add 3D depth to elements
     - [ ] Implement mouse-follow parallax
     - [ ] Add subtle micro-interactions

2. **Design Polish**
   - [ ] Standardize spacing across all pages
   - [ ] Review typography hierarchy
   - [ ] Optimize color usage
   - [ ] Improve mobile layout
   - [ ] Add subtle textures/noise
   - [ ] Improve hover states
   - [ ] Add focus states for accessibility

3. **Accessibility Improvements**
   - [ ] Audit all pages with axe DevTools
   - [ ] Fix color contrast issues
   - [ ] Add proper ARIA attributes
   - [ ] Improve keyboard navigation
   - [ ] Test with screen readers
   - [ ] Add skip links
   - [ ] Improve focus management

4. **Content Enhancements**
   - [ ] Review and improve all copy
   - [ ] Add project case studies
   - [ ] Add skills section
   - [ ] Add testimonials
   - [ ] Add blog/news section
   - [ ] Improve meta tags
   - [ ] Add structured data

5. **Performance Features**
   - [ ] Implement critical CSS inlining
   - [ ] Add preload for critical resources
   - [ ] Implement service worker
   - [ ] Add prefetch for next pages
   - [ ] Optimize font loading
   - [ ] Implement image CDN
   - [ ] Add HTTP/2 server push

6. **New Features**
   - [ ] Add dark/light mode toggle
   - [ ] Add language switcher (Italian/English)
   - [ ] Add search functionality
   - [ ] Add filter for projects
   - [ ] Add sorting for projects
   - [ ] Add share buttons
   - [ ] Add print styles

## Reference Sites Analysis

### 1. [Macmillan Studio](https://macmillan.studio/)
**Features to Consider:**
- ✅ Curved image flow with depth
- ✅ Multi-layer parallax effects
- ✅ Smooth scroll-triggered animations
- ✅ Minimal, clean design
- ✅ Excellent typography

**Implementation Notes:**
- Uses GSAP and ScrollTrigger
- Multi-layer parallax with different speeds
- Smooth transitions between sections
- Responsive design with mobile optimizations

**Portfolio Adaptation:**
- ~~Adapt curved flow for Bat-wing project~~ (rejected — see Decision above)
- Implement multi-layer parallax for hero sections
- Use smooth scroll-triggered animations

### 2. [AmberJS](https://amberjs.dev/)
**Features to Consider:**
- ⚠️ Complex animations (may be too much for portfolio)
- ✅ Smooth transitions
- ✅ Interactive elements
- ✅ Modern design

**Decision:** Not ideal for current portfolio direction

### 3. [Made by Igor](https://www.madebyigor.com/)
**Features to Consider:**
- ✅ Globe-like image viewing
- ✅ 3D effects
- ✅ Unique layout
- ⚠️ May not fit portfolio aesthetic

**Decision:** Interesting but not priority

### 4. [Sobra.be](https://sobra.be/en/)
**Features to Consider:**
- ✅ Project succession with parallax
- ✅ Horizontal scrolling
- ✅ Smooth transitions
- ✅ Clean, professional design

**Implementation Notes:**
- Horizontal parallax for project sections
- Smooth transitions between projects
- Consistent spacing and layout

**Portfolio Adaptation:**
- Implement horizontal parallax for projects
- Use smooth transitions between sections

### 5. [Serhii.website](https://serhii.website/)
**Features to Consider:**
- ⚠️ Very complex (possibly too much)
- ✅ Impressive animations
- ✅ Unique interactions
- ✅ Modern design

**Decision:** Inspiring but may be too complex

### 6. [Bratiiev.com](https://www.bratiiev.com/)
**Features to Consider:**
- ✅ Tilt effects on scroll
- ✅ 3D depth
- ✅ Mouse-follow parallax
- ✅ Subtle micro-interactions

**Implementation Notes:**
- Uses GSAP and ScrollTrigger
- Subtle 3D effects
- Smooth animations

**Portfolio Adaptation:**
- Add tilt effects to project cards
- Implement mouse-follow parallax
- Add subtle micro-interactions

### 7. [Andreas.vision](https://andreas.vision/)
**Features to Consider:**
- ✅ Auto-scrolling image gallery
- ✅ Seamless infinite loop
- ✅ Pause on hover
- ✅ Keyboard controls

**Implementation Notes:**
- Uses GSAP for animation
- Seamless cloning of elements
- Smooth, continuous motion

**Portfolio Adaptation:**
- Implement auto-scrolling for project galleries
- Add seamless infinite loop
- Add pause on hover and keyboard controls

### 8. [4wide.jp](https://4wide.jp/)
**Features to Consider:**
- ✅ Circular carousel
- ✅ Multi-layer animations
- ✅ Smooth transitions
- ✅ Unique layout

**Implementation Notes:**
- Circular motion patterns
- Multi-layer depth effects

**Portfolio Adaptation:**
- Consider for skills section or project navigation

## Implementation Priority

### Phase 1: Core Improvements (Current Focus)
**Timeline: Week 1-2**

1. **Bat-wing layout confirmed**
   - Keep the horizontal scroll gallery layout (commit 412db12)
   - Curved flow rejected — do not revisit unless the user asks

2. **Basic Performance Optimization**
   - Compress images
   - Add lazy loading
   - Minify CSS/JS

### Phase 2: Animation Enhancements (Next)
**Timeline: Week 3-4**

1. **Implement Infinite Loop for Galleries**
   - Add auto-scrolling to project galleries
   - Implement seamless transitions
   - Add pause on hover
   - Add keyboard controls

2. **Add Parallax Effects**
   - Multi-layer parallax for hero sections
   - Horizontal parallax for project sections
   - Mouse-follow parallax for interactive elements

3. **Add Micro-interactions**
   - Tilt effects on project cards
   - Hover animations
   - Focus states

### Phase 3: Design Polish
**Timeline: Week 5-6**

1. **Standardize Design**
   - Consistent spacing
   - Consistent typography
   - Consistent colors

2. **Improve Mobile Experience**
   - Better mobile layouts
   - Optimized touch targets
   - Improved mobile navigation

3. **Accessibility Audit**
   - Fix contrast issues
   - Add ARIA attributes
   - Improve keyboard navigation
   - Test with screen readers

### Phase 4: Advanced Features
**Timeline: Week 7-8**

1. **Performance Optimization**
   - Critical CSS inlining
   - Preload critical resources
   - Service worker implementation
   - CDN for assets

2. **New Features**
   - Dark/light mode
   - Skills section
   - Search functionality
   - Filter/sort for projects

3. **Content Enhancements**
   - Improved copy
   - Better project descriptions
   - Testimonials
   - Blog/news section

## Technical Stack

### Current
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, Grid, Flexbox, Variables
- **Vanilla JavaScript** - No framework, lightweight
- **GSAP** - Advanced animations
- **ScrollTrigger** - Scroll-based animations
- **Lenis** - Smooth scrolling
- **WebP** - Image format
- **WOFF2** - Font format

### Plugins/Libraries
- GSAP (GreenSock Animation Platform)
- ScrollTrigger (GSAP plugin)
- Lenis (Smooth scroll library)
- No jQuery
- No React/Vue/Angular
- No build process
- No package manager

### Hosting
- GitHub Pages (current)
- Netlify (option)
- Vercel (option)

## File Structure

```
project-root/
├── index.html          # Landing page
├── about.html          # About me page
├── cv.html             # CV page
├── projects.html       # Projects page (MAIN FOCUS)
├── contacts.html       # Contact page
├── .opencode/
│   ├── skills/          # Skills library (NEW)
│   │   ├── portfolio-motion-design/
│   │   │   └── skill.md
│   │   ├── portfolio-ux-polish/
│   │   │   └── skill.md
│   │   ├── token-economy-optimization/
│   │   │   └── skill.md
│   │   ├── advanced-responsive-design/
│   │   │   └── skill.md
│   │   ├── performance-web-optimization/
│   │   │   └── skill.md
│   │   ├── infinite-loop-animations/
│   │   │   └── skill.md
│   │   ├── parallax-scrolling-effects/
│   │   │   └── skill.md
│   │   └── portfolio-site-qa/
│   │       └── skill.md
│   └── agents/          # Agents configuration
├── assets/
│   ├── css/
│   │   ├── fonts.css   # Font imports
│   │   ├── layout.css  # Structural rules
│   │   └── style.css   # Design system + styles
│   ├── js/
│   │   ├── main.js     # Shared UI, lightbox, nav
│   │   └── motion.js   # GSAP animations (TO BE UPDATED)
│   ├── vendor/
│   │   ├── gsap.min.js
│   │   ├── ScrollTrigger.min.js
│   │   └── lenis.min.js
│   ├── fonts/
│   │   ├── Archivo/
│   │   ├── InterTight/
│   │   └── Georgia/
│   └── img/
│       ├── bat-wing/
│       ├── elio/
│       ├── shock/
│       └── silky-skin/
├── AGENTS.md            # Project configuration
└── PLAN.md              # This file
```

## Next Steps

### Immediate (Today)
1. ✅ Created new skills library
2. ✅ Curved flow implemented, then rejected and rolled back (d599904)
3. ✅ Bat-wing back on the approved horizontal-gallery layout
4. ⏳ Verify the restored site on all devices and browsers
5. ⏳ Verify no regressions in existing functionality

### Short-term (This Week)
1. Implement infinite loop for other project galleries (SHOCK!, ELIO, Silky Skin)
2. Add parallax effects to project sections
3. Optimize images and performance
4. Run full QA audit
5. Test on mobile devices

### Medium-term (Next 2 Weeks)
1. Implement all animation improvements from reference sites
2. Complete design polish (typography, spacing, colors)
3. Conduct accessibility audit
4. Test on all devices and browsers
5. Implement performance optimizations

### Long-term (Next Month)
1. Add new features (skills section, dark/light mode, etc.)
2. Implement advanced performance optimizations
3. Add content enhancements
4. Deploy to production

## Success Metrics

### Performance
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Total page weight < 4MB
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)

### Design
- [ ] Consistent spacing (8px scale)
- [ ] Consistent typography
- [ ] Consistent colors
- [ ] Responsive on all devices
- [ ] Smooth animations (60fps)

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Color contrast > 4.5:1
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] Reduced motion support

### Content
- [ ] All copy is proofread
- [ ] All images have alt text
- [ ] All links work
- [ ] All meta tags are present
- [ ] SEO is optimized

## Risks and Mitigations

### Technical Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Performance issues with complex animations | Medium | High | Optimize animations, test on mobile |
| Browser compatibility issues | Medium | Medium | Test on multiple browsers, use polyfills |
| Breaking changes when updating GSAP | Low | Medium | Lock GSAP version, test thoroughly |
| Image optimization challenges | High | Low | Use automated tools, set quality limits |

### Design Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Design inconsistency | Medium | Medium | Use design tokens, style guide |
| Animation overload | Medium | Medium | Limit number of animations, prioritize |
| Mobile experience degradation | Medium | High | Mobile-first design, test on devices |

### Content Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Copy quality issues | Medium | Medium | Professional review, proofreading |
| Alt text quality issues | Medium | Medium | Content review, accessibility audit |
| SEO issues | Low | Medium | SEO audit, structured data |

## Resources

### Tools
- **Design:** Figma, Adobe XD, Sketch
- **Development:** VS Code, Git, GitHub
- **Testing:** Chrome DevTools, Lighthouse, axe DevTools, WAVE
- **Performance:** WebPageTest, GTmetrix
- **Accessibility:** VoiceOver, NVDA, Color Oracle

### References
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Google Design Guidelines](https://design.google/)

### Inspiration
- [Macmillan Studio](https://macmillan.studio/)
- [Andreas.vision](https://andreas.vision/)
- [Sobra.be](https://sobra.be/en/)
- [Bratiiev.com](https://www.bratiiev.com/)
- [Made by Igor](https://www.madebyigor.com/)

## Changelog

### Latest Changes
- **d599904**: Rolled back the curved-flow experiment — restored projects.html (303 lines)
  and style.css (1900 lines) to the approved state of 412db12 (horizontal gallery,
  3D tilt, magnetic cursor, particle trail). Root causes: duplicated CSS rules,
  inline script duplicating Lenis/lightbox already in main.js/motion.js, and a
  concept (orbiting images) that did not match the Macmillan reference.
- Created new skills library with 8 specialized skills
- Created PLAN.md to track development

### Upcoming Changes
- Verify the restored site on all devices and browsers
- Implement infinite loop animations for other projects
- Add parallax scrolling effects
- Optimize images (WebP conversion)
- Performance optimizations
- Full QA audit

## Contact

**For questions or updates:**
- Leonardo Macchiarini (portfolio owner)
- Mistral Vibe (development assistant)

---

*This document is a living document and will be updated as development progresses.*
