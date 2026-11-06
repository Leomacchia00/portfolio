---
name: Token Economy Optimization
description: >-
  Maximize token efficiency for development tasks. Focus on targeted reads, batched operations, compact reporting, and eliminating redundant operations to minimize token usage while maintaining quality.
triggers:
  - "token efficiency"
  - "optimize tokens"
  - "token budget"
  - "cost optimization"
  - "efficient development"
---

# Token Economy Optimization

## Overview

This skill provides strategies and techniques to maximize the value of each token spent during development, auditing, and review tasks. The goal is to achieve the same (or better) results with fewer tokens by being more strategic about tool usage, reading, and output.

## Core Principles

### 1. The Token Value Equation

```
Value = (Quality of Output × Impact) / Tokens Spent
```

Maximize value by:
- Increasing output quality
- Increasing impact (focus on high-value tasks)
- Decreasing tokens spent

### 2. The 80/20 Rule for Development

80% of value comes from 20% of the work. Focus on:
- High-impact changes first
- Targeted investigation
- Eliminating waste

### 3. The Three Pillars of Token Efficiency

1. **Precision**: Get exactly what you need, nothing more
2. **Batching**: Combine operations to reduce overhead
3. **Leverage**: Use existing knowledge and patterns

## Reading Strategies

### 1. Targeted Reading (The Sniper Approach)

**Bad:** Reading entire files to find one piece of information
**Good:** Using search to locate the exact line, then reading context

```bash
# Instead of:
read_file assets/css/style.css  # 50KB = ~12,500 tokens

# Do:
grep -n "curved-flow" assets/css/style.css  # Find the line
read_file assets/css/style.css offset=456 limit=20  # Read just the relevant section
```

### 2. The Search-First Principle

Always search before reading:

```bash
# Find all occurrences of a class
Select-String -Path "*.html" -Pattern "curved-flow"

# Find in CSS files
Select-String -Path "*.css" -Pattern "\.curved-flow"

# Find in JavaScript
rg -n "curvedFlow" assets/js/
```

### 3. Batch Your Reads

**Bad:** Multiple sequential reads
```
read_file file1.html
read_file file2.html
read_file file3.html
```

**Good:** Single batched operation
```
# Read all three files in one call
batch_read = [
  read_file(file1.html),
  read_file(file2.html),
  read_file(file3.html)
]
await Promise.all(batch_read)
```

### 4. Avoid Re-Reading

**Anti-pattern:** Reading the same file multiple times in a session

**Solution:**
- Cache file contents in memory
- Track what you've already read
- Only re-read if the file has changed

```javascript
// Example tracking system
const readCache = new Map();

async function smartRead(filePath) {
  if (readCache.has(filePath)) {
    return readCache.get(filePath);
  }
  const content = await readFile(filePath);
  readCache.set(filePath, content);
  return content;
}
```

### 5. Strategic File Selection

**Read Order by Priority:**
1. **First**: Search results and line numbers
2. **Second**: Specific functions/sections (20-50 lines)
3. **Third**: Full files only if necessary (max 200 lines)
4. **Last Resort**: Entire directories (avoid if possible)

### 6. File Size Limits

| File Type | Max Lines to Read | Notes |
|-----------|-------------------|-------|
| HTML | 100 | Read head, target section, footer separately |
| CSS | 50 | Search for class, read context |
| JavaScript | 80 | Read function, not entire file |
| JSON/Config | 200 | Often need full context |
| Markdown | 150 | For documentation |

## Writing Strategies

### 1. The Diff Principle

**Bad:** Rewriting entire files
```javascript
// Rewriting entire motion.js for one change
```

**Good:** Making targeted edits
```javascript
// Edit only the specific function
edit({
  file_path: "assets/js/motion.js",
  old_string: "duration: 1.5",
  new_string: "duration: 1.2"
})
```

### 2. Compact Reporting

**Bad:** Restating entire file contents
```
The file has 500 lines with the following content: [500 lines of code]
```

**Good:** Citing specific locations
```
Changed duration in motion.js:42 from 1.5 to 1.2
```

### 3. Summary Over Details

**Bad:** Full code dumps
```
Here's the complete function:
```javascript
function initCurvedFlow() {
  // ... 50 lines of code
}
```
```

**Good:** Key changes only
```
Updated curved flow easing to 'power2.inOut' for smoother motion
```

### 4. Bulleted Findings

**Bad:** Paragraphs of text
```
I found several issues in the animation code. The first issue was with the duration which was too long. The second issue was with the easing curve which wasn't optimal. The third...
```

**Good:** Concise bullet points
```
- motion.js:42 - duration too long (1.5s → 1.2s)
- motion.js:45 - easing curve optimized
- motion.js:50 - parallax strength adjusted
```

### 5. Avoid Redundancy

**Don't repeat:**
- The user's request
- The full plan
- Code that hasn't changed
- Information already in context

## Tool Call Strategies

### 1. Batch Independent Operations

**Bad:** Sequential calls
```
read_file(file1)
await result1
read_file(file2)
await result2
read_file(file3)
await result3
```

**Good:** Parallel calls
```
Promise.all([
  read_file(file1),
  read_file(file2),
  read_file(file3)
])
```

### 2. Use Efficient Tools

**Tool Efficiency Ranking (Best to Worst):**
1. **grep/Select-String** - Fastest for searching
2. **read_file with offset/limit** - For targeted reading
3. **read_file full** - Only when necessary
4. **bash commands** - For complex operations
5. **Full directory listings** - Avoid

### 3. Limit Search Scope

**Bad:** Searching entire repository
```
Select-String -Path "*" -Pattern "function"
```

**Good:** Searching specific directories
```
Select-String -Path "assets/js/*.js" -Pattern "initCurvedFlow"
```

### 4. Use Negative Search

Find files that DON'T match a pattern:
```bash
# Find files without loading="lazy"
grep -L "loading=\"lazy\"" *.html
```

### 5. Count First

Before listing all matches, count them:
```bash
# Check if a pattern exists first
Select-String -Path "*.html" -Pattern "class=\"reveal\"" -List | Select-Object -First 1

# Then count
(Select-String -Path "*.html" -Pattern "class=\"reveal\"" -AllMatches).Matches.Count
```

## Development Workflow Optimization

### 1. Pre-Development Checklist

Before starting any task:
- [ ] Identify the exact file(s) to change
- [ ] Determine the exact lines to read
- [ ] Plan the minimal edit needed
- [ ] Check for similar patterns in codebase

### 2. The 8-Step Efficient Edit

1. **Locate**: Find the target file using search
2. **Inspect**: Read only the relevant section (20-50 lines)
3. **Understand**: Identify the pattern and dependencies
4. **Plan**: Determine the minimal change
5. **Execute**: Make the targeted edit
6. **Verify**: Check the immediate context
7. **Test**: Validate the change works
8. **Document**: Note what changed and why

### 3. Common Task Patterns

**Adding a new feature:**
1. Search for similar features
2. Read the pattern
3. Replicate with modifications
4. Test

**Fixing a bug:**
1. Search for error message
2. Read the relevant code
3. Identify the issue
4. Make minimal fix
5. Verify

**Reviewing code:**
1. Search for specific patterns
2. Read only flagged sections
3. Report findings by file:line
4. Summarize issues

### 4. Token Budgets by Task

| Task Type | Target Token Range | Max Token Limit |
|-----------|---------------------|-----------------|
| Simple edit (1 file) | 500-1,000 | 2,000 |
| Medium edit (3-5 files) | 1,000-3,000 | 5,000 |
| Complex feature | 3,000-5,000 | 8,000 |
| Full audit (1 page) | 5,000-8,000 | 12,000 |
| Full project review | 15,000-20,000 | 30,000 |

### 5. Token Tracking Template

```
Task: Add curved flow animation to projects.html

Estimated Budget: 3,000 tokens
Actual Spent: 2,450 tokens

Breakdown:
- Search for existing patterns: 200 tokens
- Read motion.js: 500 tokens
- Read projects.html section: 300 tokens
- Implement animation: 1,200 tokens
- Test and verify: 250 tokens

Efficiency Score: 82% (2,450 / 3,000)
```

## Skill Usage Optimization

### 1. When to Load a Skill

**Load a skill ONLY when:**
- The skill's description directly matches the task
- You need specific expertise not in your base knowledge
- The task is complex and the skill has proven patterns

**Don't load a skill when:**
- The task is simple and straightforward
- You already have the necessary knowledge
- The skill would provide redundant information

### 2. Skill Selection Matrix

| Task | Best Skill | Alternative | When to Avoid |
|------|------------|-------------|---------------|
| Animation review | review-animations | - | Already familiar with standards |
| Page editing | page-edit | - | Simple HTML changes |
| Image prep | image-prep | - | Just moving files |
| Design polish | portfolio-ux-polish | - | Minor tweaks |
| Token efficiency | token-economy-optimization | - | Always useful |

### 3. Skill Loading Order

If multiple skills are needed:
1. **First**: Load the most specific skill
2. **Second**: Load complementary skills
3. **Last**: Load general skills

**Example:**
```
# For a motion design task:
1. portfolio-motion-design (specific)
2. token-economy-optimization (complementary)
3. review-animations (general)
```

## Caching and Memory Strategies

### 1. Session Caching

Maintain a cache of:
- File contents already read
- Search results
- Tool outputs
- Skill contents

```javascript
// Example cache structure
const sessionCache = {
  files: new Map(),      // filePath -> content
  searches: new Map(),   // searchQuery -> results
  tools: new Map(),      // toolName -> output
  skills: new Map()      // skillName -> content
};
```

### 2. Working Memory

Keep in working memory:
- Current task context
- Files being edited
- Recent tool outputs
- User preferences

**Limit:** ~4,000 tokens of working memory

### 3. Context Windows

Use context windows strategically:
- **Active window**: Current file/section being worked on
- **Reference window**: Related code/patterns
- **History window**: Recent changes and their context

## Error Recovery

### 1. Failed Tool Calls

If a tool call fails:
1. Check the error message
2. Retry with adjusted parameters
3. Try an alternative approach
4. Fall back to manual operation

**Don't:** Retry the same call multiple times without changes

### 2. Partial Results

If you get partial results:
1. Check if you have enough information
2. Request only the missing pieces
3. Work with what you have if possible

**Don't:** Re-request everything from scratch

### 3. Timeout Handling

For long-running operations:
1. Set appropriate timeouts
2. Break large operations into smaller chunks
3. Provide progress updates
4. Allow interruption

## Portfolio-Specific Optimizations

### 1. Common Patterns to Cache

**CSS Patterns:**
- Design tokens in `:root`
- Common utility classes
- Component patterns
- Responsive breakpoints

**JavaScript Patterns:**
- GSAP animation patterns
- ScrollTrigger configurations
- Lenis setup
- Lightbox implementation

**HTML Patterns:**
- Page structure (head, header, footer)
- Project card markup
- Gallery layouts
- Navigation structure

### 2. Portfolio File Map

```
Portfolio Structure:
├── index.html          (Landing page)
├── about.html          (About me)
├── cv.html             (Curriculum Vitae)
├── projects.html       (Project showcase - priority)
├── contacts.html       (Contact page)
└── assets/
    ├── css/
    │   ├── fonts.css   (Font imports)
    │   ├── layout.css  (Structural rules)
    │   └── style.css   (Design tokens + styles - 50KB)
    ├── js/
    │   ├── main.js     (Shared UI, lightbox, nav)
    │   └── motion.js   (GSAP animations)
    ├── vendor/
    │   ├── gsap.min.js
    │   ├── ScrollTrigger.min.js
    │   └── lenis.min.js
    └── img/
        └── <project>/
```

### 3. High-Impact Files

**Focus token budget on these files (in order):**
1. `assets/js/motion.js` - Core animations
2. `projects.html` - Main showcase
3. `assets/css/style.css` - Design system (read selectively!)
4. `assets/js/main.js` - Shared functionality
5. `index.html` - Landing page

**Low-priority files:**
- Individual project image folders (only metadata, not content)
- `assets/vendor/` (vendor code, don't read)
- `.git/` (never touch)

### 4. Portfolio-Specific Searches

**Common search patterns:**
```bash
# Find all GSAP animations
Select-String -Path "assets/js/*.js" -Pattern "gsap\."

# Find all ScrollTrigger instances
Select-String -Path "assets/js/*.js" -Pattern "ScrollTrigger"

# Find reveal animations
Select-String -Path "*.html" -Pattern "class=\"reveal\""

# Find lightbox references
Select-String -Path "*.html" -Pattern "lightbox"

# Find project sections
Select-String -Path "projects.html" -Pattern "class=\"proj"
```

## Advanced Techniques

### 1. Predictive Reading

Based on the task, predict what you'll need and pre-load:

**Task: Add parallax effect to project cards**
```
Predicted needs:
1. Current project card HTML structure
2. Existing parallax patterns in CSS/JS
3. GSAP/ScrollTrigger usage patterns
4. Design tokens for motion

Pre-load:
- projects.html (lines 100-150 for project cards)
- motion.js (search for parallax)
- style.css (search for .proj)
```

### 2. Pattern Matching

Identify and reuse patterns rather than re-inventing:

```javascript
// Pattern: Scroll-triggered reveal
// Matched in: motion.js, main.js
// Reuse: Apply same pattern to new element

// Instead of writing new animation:
gsap.from(newElement, {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: newElement,
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
})
```

### 3. Incremental Verification

Verify changes incrementally rather than all at once:

```javascript
// After each edit:
1. Check syntax (quick)
2. Check immediate context (fast)
3. Check file-level impact (moderate)
4. Check project-level impact (slow - only when necessary)
```

### 4. Lazy Loading of Context

Only load context when you need it:

```
// Don't load full context upfront
// Load only when a specific question arises

// Example:
// Question: "What's the easing curve for hero animations?"
// Action: Search motion.js for "ease:" and read context
```

## Monitoring and Metrics

### 1. Token Usage Tracking

Track token usage per session:

```
Session Tokens: 12,450
- Input tokens: 2,450
- Output tokens: 10,000
- Tool call tokens: 4,500
- Skill tokens: 3,000
- Cache hits: 15 (saved ~3,000 tokens)
```

### 2. Efficiency Metrics

Calculate efficiency scores:

```
Tokens per Task: 2,450 / 3 tasks = 817 tokens/task
Tokens per Edit: 2,450 / 12 edits = 204 tokens/edit
Cache Hit Rate: 15 / 30 potential = 50%
```

### 3. Improvement Areas

Identify areas for improvement:
- High token-per-task ratios
- Low cache hit rates
- Repeated reads
- Inefficient searches

## Checklist for Maximum Efficiency

### Before Starting
- [ ] Clearly define the task
- [ ] Identify required files
- [ ] Check cache for existing information
- [ ] Set token budget
- [ ] Plan execution steps

### During Execution
- [ ] Use most efficient tools first
- [ ] Batch operations when possible
- [ ] Read only what's necessary
- [ ] Cache all results
- [ ] Avoid re-work

### After Completion
- [ ] Verify changes are minimal
- [ ] Check token usage against budget
- [ ] Review for redundancy
- [ ] Cache new patterns learned
- [ ] Document efficiency wins

## Quick Reference: Token-Saving Commands

| Task | Efficient Command | Tokens Saved |
|------|-------------------|--------------|
| Find class usage | `grep -r "class-name" .` | 500+ |
| Read specific lines | `sed -n '45,60p' file` | 1,000+ |
| Count occurrences | `grep -c "pattern" file` | 200+ |
| Search in files | `Select-String -Path "*.js" -Pattern "x"` | 300+ |
| Batch reads | `Promise.all([read1, read2, read3])` | 500+ |

## Final Tips

1. **Think before acting** - 30 seconds of planning saves 1,000 tokens
2. **Search first, read second** - Always
3. **Read less, understand more** - Focus on patterns, not details
4. **Cache everything** - Your future self will thank you
5. **Batch operations** - Parallel > sequential
6. **Reuse patterns** - Don't reinvent the wheel
7. **Verify incrementally** - Catch errors early
8. **Stay focused** - One task at a time

## References

- [GSAP Best Practices](https://greensock.com/best-practices/)
- [Web Performance Optimization](https://web.dev/learn-performance/)
- [Token Efficiency in LLM Development](https://www.promptingguide.ai/)
