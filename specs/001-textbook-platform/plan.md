# Implementation Plan: Physical AI & Humanoid Robotics Textbook Platform

**Branch**: `001-textbook-platform` | **Date**: 2025-12-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-textbook-platform/spec.md`

## Summary

Build a production-ready academic textbook platform using Docusaurus 3.x with custom React/Tailwind theming to deliver 13 weeks of Physical AI and Humanoid Robotics curriculum across 4 modules. The platform will feature complete pedagogical structure (learning objectives → exercises → quizzes), offline PWA support, and automated GitHub Pages deployment.

**Core Requirements**:
- 4 chapters (modules) containing 13 lessons (weeks) with complete content structure
- Custom Docusaurus theme replacing defaults with React + Tailwind CSS components
- 9 custom components (Header, Sidebar, ChapterCard, LessonLayout, DiagramContainer, CodeBlock, ExerciseSection, QuizComponent, GlossaryTerm)
- 52+ executable ROS 2 Python code examples with version compatibility
- <3s desktop load, >90 Lighthouse score, WCAG 2.1 AA accessibility
- AI-assisted content generation workflow with prompt templates

## Technical Context

**Language/Version**: JavaScript/TypeScript ES2022, Node.js 20.x LTS
**Primary Dependencies**:
- Docusaurus 3.6.0+ (static site generator)
- React 18.2.0 (UI framework, Docusaurus dependency)
- Tailwind CSS 3.4.0 (utility-first styling)
- Prism React Renderer 2.3.0 (syntax highlighting)
- MDX 3.x (Markdown with JSX support)

**Storage**: Static Markdown files (no database), Git for version control
**Testing**: Jest 29.x (component tests), Lighthouse CI (performance/accessibility), markdownlint (content validation)
**Target Platform**: Web (static HTML/CSS/JS), GitHub Pages hosting, modern browsers (Chrome/Firefox/Safari last 2 versions)
**Project Type**: Web application (static site) - Docusaurus monorepo structure
**Performance Goals**:
- Initial load <3s (desktop), <5s (mobile) on 3G
- Time to interactive <2s
- Lighthouse scores >90 (all categories)
- Bundle size <500KB gzipped

**Constraints**:
- Offline-capable (PWA with service worker)
- No backend/database (static site only)
- WCAG 2.1 AA accessibility compliance
- GitHub Pages deployment requirements (static assets, base URL handling)

**Scale/Scope**:
- 13 Markdown lesson files (~2000-3000 words each)
- 4 chapter overview files
- 9 custom React components
- 52+ code examples
- Target: academic course (100-1000 students), instructor resource library

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Academic Excellence & Pedagogical Rigor
- ✅ **PASS**: 12-section lesson structure enforces progressive learning
- ✅ **PASS**: Content validation gates (code execution, citation verification)
- ✅ **PASS**: AI generation with manual expert review workflow

### Principle II: Production-Ready Code & Deployment
- ✅ **PASS**: Exact dependency versions specified (Docusaurus 3.6.0+, React 18.2.0, Tailwind 3.4.0)
- ✅ **PASS**: Automated GitHub Actions deployment workflow
- ✅ **PASS**: Build validation gates (zero errors/warnings required)

### Principle III: Modular Architecture & Component Reusability
- ✅ **PASS**: Content (Markdown docs/) separated from presentation (src/components/, src/theme/)
- ✅ **PASS**: 9 reusable React components with clear responsibilities
- ✅ **PASS**: Docusaurus plugin system for modularity

### Principle IV: Accessibility & User Experience
- ✅ **PASS**: WCAG 2.1 AA compliance requirements documented
- ✅ **PASS**: Performance budgets enforced (<3s load, >90 Lighthouse)
- ✅ **PASS**: Responsive design (375px mobile → 1920px desktop)

### Principle V: Content Completeness & Scope Coverage
- ✅ **PASS**: All 13 weeks mapped to specific lesson topics
- ✅ **PASS**: 4 modules cover complete curriculum (Physical AI, ROS 2, Simulation, Advanced)
- ✅ **PASS**: Every lesson follows 12-section pedagogical template

### Principle VI: Versioning, Maintenance & Evolution
- ✅ **PASS**: Semantic versioning for content releases
- ✅ **PASS**: ROS 2 version badges on code examples
- ✅ **PASS**: Changelog and deprecation notice requirements

### Principle VII: Testing & Quality Assurance
- ✅ **PASS**: Multi-layer validation (Markdown lint, link check, code execution, accessibility audit, performance test)
- ✅ **PASS**: CI/CD quality gates before deployment

**Gate Result**: ✅ **ALL GATES PASS** - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-textbook-platform/
├── plan.md              # This file (/sp.plan command output)
├── spec.md              # Feature specification (complete)
├── research.md          # Phase 0 output (Docusaurus theming, Tailwind integration, AI prompts)
├── data-model.md        # Phase 1 output (Content entities: Chapter, Lesson, Exercise, Quiz)
├── quickstart.md        # Phase 1 output (Developer setup and content authoring guide)
├── contracts/           # Phase 1 output (AI prompt templates, sidebar config schema)
│   ├── lesson-prompt-template.md
│   ├── chapter-prompt-template.md
│   └── sidebar-schema.json
├── checklists/
│   └── requirements.md  # Spec quality checklist (complete, validated)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Docusaurus Project Structure (Web Application - Static Site)

# Configuration
docusaurus.config.js           # Main Docusaurus configuration
sidebars.js                    # Sidebar navigation definition
package.json                   # Dependencies and scripts
tailwind.config.js             # Tailwind CSS customization
postcss.config.js              # PostCSS for Tailwind processing

# Content (Markdown)
docs/
├── index.md                   # Homepage
├── about.md                   # About page
└── book/
    └── chapters/
        ├── module-1-physical-ai/
        │   ├── index.md       # Chapter 1 overview
        │   ├── week-01-intro-physical-ai.md
        │   ├── week-02-humanoid-fundamentals.md
        │   └── week-03-ros2-architecture.md
        ├── module-2-robotics-control/
        │   ├── index.md       # Chapter 2 overview
        │   ├── week-04-ros2-advanced.md
        │   └── week-05-gazebo-simulation.md
        ├── module-3-simulation/
        │   ├── index.md       # Chapter 3 overview
        │   ├── week-06-unity-robotics.md
        │   ├── week-07-isaac-sim.md
        │   └── week-08-sensor-integration.md
        └── module-4-advanced/
            ├── index.md       # Chapter 4 overview
            ├── week-09-vla-models.md
            ├── week-10-conversational-ai.md
            ├── week-11-locomotion.md
            ├── week-12-kinematics-dynamics.md
            └── week-13-capstone.md

# Custom Theme & Components
src/
├── components/
│   ├── Header/
│   │   ├── index.tsx          # Custom header with logo, nav, search, dark mode
│   │   └── styles.module.css
│   ├── Sidebar/
│   │   ├── index.tsx          # Hierarchical chapter/lesson navigation
│   │   └── styles.module.css
│   ├── ChapterCard/
│   │   ├── index.tsx          # Visual chapter overview card
│   │   └── styles.module.css
│   ├── LessonLayout/
│   │   ├── index.tsx          # Structured lesson layout with TOC
│   │   └── styles.module.css
│   ├── DiagramContainer/
│   │   ├── index.tsx          # ASCII diagram wrapper with zoom/pan
│   │   └── styles.module.css
│   ├── CodeBlock/
│   │   ├── index.tsx          # Enhanced code display with copy button
│   │   └── styles.module.css
│   ├── ExerciseSection/
│   │   ├── index.tsx          # Expandable exercise with difficulty badges
│   │   └── styles.module.css
│   ├── QuizComponent/
│   │   ├── index.tsx          # Interactive quiz with feedback
│   │   └── styles.module.css
│   └── GlossaryTerm/
│       ├── index.tsx          # Inline term with hover tooltip
│       └── styles.module.css
├── theme/
│   ├── Root.tsx               # Theme root wrapper
│   ├── Layout.tsx             # Main layout override
│   ├── Navbar/
│   │   └── index.tsx          # Navbar customization
│   └── Footer/
│       └── index.tsx          # Footer customization
├── css/
│   ├── custom.css             # Global styles
│   └── typography.css         # Typography system (Inter, Georgia, Fira Code)
└── pages/
    └── index.tsx              # Custom homepage (optional, can use docs/index.md)

# Static Assets
static/
├── img/
│   ├── logo.svg               # Site logo
│   └── favicon.ico
└── CNAME                      # Custom domain (if used)

# Build Output (not committed)
build/                         # Production build output (GitHub Pages serves this)
.docusaurus/                   # Docusaurus generated files

# GitHub Actions
.github/
└── workflows/
    ├── deploy.yml             # GitHub Pages deployment workflow
    └── test.yml               # CI tests (lint, build, lighthouse)

# Tests
tests/
├── components/                # Component unit tests
│   └── CodeBlock.test.tsx
├── accessibility/             # Accessibility tests
│   └── wcag-compliance.test.js
└── performance/               # Performance tests
    └── lighthouse.config.js
```

**Structure Decision**: Docusaurus web application structure selected because:
1. Content-heavy site (13 lessons, 4 chapters) requires documentation-optimized SSG
2. Docusaurus provides built-in Markdown → React rendering, sidebar generation, search, versioning
3. Custom theme directory (`src/theme/`) enables complete theming override while maintaining Docusaurus features
4. Separation of content (`docs/`) from presentation (`src/`) aligns with Constitution Principle III
5. Static site generation enables GitHub Pages deployment (free, reliable, HTTPS)

## Complexity Tracking

> No violations - all constitution gates pass without justification required.

---

## Phase 0: Research & Technology Validation

### Objectives

1. Validate Docusaurus 3.x custom theming approach with Tailwind CSS integration
2. Determine optimal strategy for replacing default theme while retaining core Docusaurus features
3. Research Docusaurus swizzling vs. custom theme creation tradeoffs
4. Identify best practices for MDX component integration (custom React components in Markdown)
5. Define AI content generation prompt engineering patterns for lesson structure
6. Validate ROS 2 code example testing approach (headless execution for CI/CD)

### Research Tasks

#### 1. Docusaurus Custom Theming Strategy

**Question**: How to completely replace default theme while preserving Docusaurus features (sidebar, search, versioning)?

**Research Needed**:
- Docusaurus theming architecture (swizzling vs. custom theme package)
- Tailwind CSS integration methods (PostCSS plugin, utility-first approach)
- Component override hierarchy (which components must be swizzled vs. created from scratch)
- Dark mode implementation compatible with Tailwind's dark: variants

**Success Criteria**: Clear decision on swizzling approach + Tailwind integration method

#### 2. MDX Component Registration for Lesson Templates

**Question**: How to make custom React components (ExerciseSection, QuizComponent, GlossaryTerm) available in all Markdown files without explicit imports?

**Research Needed**:
- MDX global component registration in Docusaurus
- Component injection via MDX plugins
- Tradeoffs: global registration vs. explicit imports for clarity

**Success Criteria**: Pattern for zero-import component usage in lesson Markdown

#### 3. AI Content Generation Workflow

**Question**: What prompt structure generates high-quality, pedagogically sound lesson content with executable code examples?

**Research Needed**:
- Prompt engineering for structured output (12-section lesson template)
- Chain-of-thought prompting for technical accuracy
- Code example validation strategies (syntax check → execution check → test check)
- Citation generation and verification

**Success Criteria**: Prompt templates for lesson and chapter generation with quality validation steps

#### 4. Sidebar Auto-Generation from Directory Structure

**Question**: How to configure Docusaurus to automatically generate hierarchical sidebar navigation from `docs/book/chapters/` structure?

**Research Needed**:
- Docusaurus autogenerated sidebars configuration
- Custom sidebar item types for chapter/lesson hierarchy
- Week numbering and lesson ordering
- Collapsible sections and active item highlighting

**Success Criteria**: `sidebars.js` configuration pattern for auto-generated navigation

#### 5. Performance Optimization for Static Site

**Question**: How to achieve <3s load time and >90 Lighthouse score with custom components and syntax highlighting?

**Research Needed**:
- Code splitting strategies for React components
- Lazy loading for non-critical features (quizzes, diagrams)
- Prism theme optimization (minimal syntax highlighting bundle)
- Image optimization (SVG diagrams, WebP fallbacks)
- Service worker caching strategy for offline PWA

**Success Criteria**: Performance budget allocation and optimization checklist

#### 6. Accessibility Implementation Patterns

**Question**: How to ensure WCAG 2.1 AA compliance in custom React components (especially interactive quizzes)?

**Research Needed**:
- ARIA patterns for collapsible sections (exercises)
- Keyboard navigation for quiz components
- Screen reader announcements for dynamic content
- Color contrast validation tools integration

**Success Criteria**: Accessibility checklist and component audit process

---

## Phase 1: Design & Contracts

### Data Model

*(Will be generated in `data-model.md` after Phase 0 research completes)*

**Entities to Define**:
- Chapter (module metadata, lesson list, icon identifier)
- Lesson (week number, title, 12 content sections, exercises, quiz, glossary)
- Content Section (type enum, Markdown content, code examples, diagrams)
- Code Example (language, code, ROS 2 version, execution validation status)
- Exercise (difficulty, description, hints, expected outcome)
- Quiz Question (question text, options, correct answer, explanation)

### API Contracts

*(Will be generated in `contracts/` after Phase 0 research completes)*

**Contracts to Define**:

1. **Lesson Prompt Template** (`contracts/lesson-prompt-template.md`):
   - Input: Lesson topic, learning objectives, prerequisite lessons, ROS 2 version
   - Output: Complete lesson Markdown with all 12 sections
   - Constraints: Code examples must be executable, citations must use IEEE format

2. **Chapter Prompt Template** (`contracts/chapter-prompt-template.md`):
   - Input: Module theme, lesson titles, curriculum flow
   - Output: Chapter overview Markdown with module introduction, lesson summaries

3. **Sidebar Configuration Schema** (`contracts/sidebar-schema.json`):
   - JSON schema for `sidebars.js` autogenerated structure
   - Defines chapter grouping, lesson ordering, collapsible behavior

4. **Component Props Interfaces** (TypeScript definitions):
   - ExerciseSection props (difficulty, title, content, hints)
   - QuizComponent props (questions array, feedback mode)
   - GlossaryTerm props (term, definition, context)

### Quickstart Guide

*(Will be generated in `quickstart.md` after Phase 0 research completes)*

**Developer Setup Steps**:
1. Clone repository and install dependencies (`npm install`)
2. Run local development server (`npm start`)
3. Create new lesson file in appropriate module directory
4. Use AI prompt templates to generate lesson content
5. Validate code examples execute in ROS 2 Humble environment
6. Run quality checks (lint, build, accessibility audit)
7. Preview changes locally before committing

**Content Authoring Workflow**:
1. Select lesson topic from curriculum (Week 1-13)
2. Fill lesson prompt template with topic, objectives, prerequisites
3. Generate lesson content via Gemini CLI or manual authoring
4. Validate: Run code examples, verify citations, check Markdown formatting
5. Add lesson file to docs/book/chapters/module-X/
6. Sidebar auto-updates (no manual configuration)
7. Test locally, commit to feature branch, deploy preview

---

## Execution Plan

### A. Project Setup Plan

**Objective**: Initialize Docusaurus project, install dependencies, configure Tailwind CSS, prepare custom theme structure

#### Commands:

```bash
# 1. Initialize Docusaurus (classic preset with TypeScript)
npx create-docusaurus@latest textbook-platform classic --typescript

# 2. Navigate to project directory
cd textbook-platform

# 3. Install Tailwind CSS and dependencies
npm install -D tailwindcss@3.4.0 postcss autoprefixer

# 4. Initialize Tailwind configuration
npx tailwindcss init -p

# 5. Install additional Docusaurus plugins
npm install --save @docusaurus/theme-live-codeblock
npm install --save @docusaurus/plugin-pwa
npm install --save @docusaurus/plugin-ideal-image

# 6. Install development dependencies
npm install -D markdownlint-cli
npm install -D @axe-core/cli
npm install -D lighthouse
```

#### File Modifications:

1. **tailwind.config.js** - Configure Tailwind to scan Docusaurus files:
```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Docusaurus dark mode compatibility
  theme: {
    extend: {
      colors: {
        primary: { /* blue shades */ },
        secondary: { /* teal shades */ },
        accent: { /* orange shades */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

2. **src/css/custom.css** - Import Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom typography and theme variables */
```

3. **Remove default theme remnants**:
```bash
# Remove default theme customizations (we'll rebuild from scratch)
rm -rf src/components/* # Clear default components
rm -rf src/pages/*      # Clear default pages (we'll use docs/index.md)
```

4. **Create custom theme folder structure**:
```bash
mkdir -p src/theme
mkdir -p src/components/{Header,Sidebar,ChapterCard,LessonLayout,DiagramContainer,CodeBlock,ExerciseSection,QuizComponent,GlossaryTerm}
```

**Validation**:
- Run `npm start` - Dev server launches without errors
- Visit `http://localhost:3000` - Default Docusaurus page loads
- Run `npm run build` - Production build succeeds

---

### B. Book Generation Plan

**Objective**: Generate 4 chapter overviews and 13 lesson Markdown files using AI prompt templates, store in correct directory structure

#### Steps:

##### 1. Generate Chapter Overviews

**For each of 4 modules (Physical AI, Robotics Control, Simulation, Advanced):**

```bash
# Example for Module 1: Physical AI Foundations
# Use Gemini CLI or manual prompt with chapter-prompt-template.md

INPUT:
- Module: 1 - Physical AI Foundations
- Theme: Introduction to Physical AI, embodied intelligence, sensor-motor loops
- Lessons: Week 1 (Intro to Physical AI), Week 2 (Humanoid Fundamentals), Week 3 (ROS 2 Architecture)
- Curriculum Flow: Foundational concepts → humanoid robotics principles → ROS 2 middleware

OUTPUT FILE: docs/book/chapters/module-1-physical-ai/index.md

VALIDATION:
- Markdown linting passes
- Contains module introduction, learning outcomes, lesson summaries
- Links to lesson files are relative and correct
```

**Repeat for Modules 2-4** with appropriate themes and lesson lists.

##### 2. Generate Individual Lessons

**For each of 13 lessons:**

```bash
# Example for Week 1: Introduction to Physical AI
# Use lesson-prompt-template.md with Gemini CLI

INPUT:
- Week: 1
- Title: Introduction to Physical AI
- Topic: Embodied AI, sensor-motor loops, physical-digital interaction
- Learning Objectives:
  1. Define Physical AI and distinguish from traditional AI
  2. Explain the sensor-motor loop in embodied agents
  3. Identify applications of Physical AI in robotics
- Prerequisites: Basic programming (Python), linear algebra
- ROS 2 Version: Humble Hawksbill

OUTPUT FILE: docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md

CONTENT SECTIONS (AI generates all 12):
1. Learning Objectives (3-5 measurable outcomes)
2. Prerequisites (required prior knowledge)
3. Introduction (motivation, real-world examples)
4. Conceptual Overview (plain-language explanations with analogies)
5. Technical Deep Dive (detailed content with formulas, algorithms)
6. Diagrams (ASCII art for sensor-motor loop, architecture)
7. Code Examples (Python ROS 2 examples: simple publisher/subscriber)
8. Hands-On Exercises (3 exercises: beginner → intermediate → advanced)
9. Quiz (7 multiple-choice questions with explanations)
10. Summary (bullet-point key takeaways)
11. Glossary (10-15 terms defined)
12. Further Reading (5 curated resources: papers, tutorials, docs)

VALIDATION:
- Markdown linting passes
- All 12 sections present
- Code examples syntax-valid (Python linter)
- Citations follow IEEE format
- Internal links use relative paths
```

**Repeat for Weeks 2-13** with topics from FR-002 in spec.md.

##### 3. Storage & Organization

**Directory Structure**:
```
docs/book/chapters/
├── module-1-physical-ai/         # Weeks 1-3
│   ├── index.md
│   ├── week-01-intro-physical-ai.md
│   ├── week-02-humanoid-fundamentals.md
│   └── week-03-ros2-architecture.md
├── module-2-robotics-control/    # Weeks 4-5
│   ├── index.md
│   ├── week-04-ros2-advanced.md
│   └── week-05-gazebo-simulation.md
├── module-3-simulation/          # Weeks 6-8
│   ├── index.md
│   ├── week-06-unity-robotics.md
│   ├── week-07-isaac-sim.md
│   └── week-08-sensor-integration.md
└── module-4-advanced/            # Weeks 9-13
    ├── index.md
    ├── week-09-vla-models.md
    ├── week-10-conversational-ai.md
    ├── week-11-locomotion.md
    ├── week-12-kinematics-dynamics.md
    └── week-13-capstone.md
```

**Naming Convention**:
- Chapter overviews: `index.md` (auto-detected by Docusaurus as category page)
- Lessons: `week-NN-topic-slug.md` (sortable by week number)

**Version Control**:
- Commit each module separately: `git commit -m "docs: add Module 1 (Physical AI) lessons"`
- Tag initial content release: `git tag v1.0.0-content`

---

### C. Frontend Plan

**Objective**: Build 9 custom React components, create custom Docusaurus theme, implement navigation/sidebar, configure Tailwind styling

#### 1. Build Layout Components

##### Header Component (`src/components/Header/index.tsx`)

**Features**:
- Logo (SVG, clickable to homepage)
- Navigation menu (Chapters dropdown, About link)
- Search bar (Docusaurus search plugin integration)
- Dark mode toggle (synced with Docusaurus theme)

**Tailwind Classes**: `bg-primary-600`, `text-white`, `flex`, `justify-between`, `items-center`

**Accessibility**: ARIA labels, keyboard navigation (Tab, Enter), focus indicators

##### Sidebar Component (`src/components/Sidebar/index.tsx`)

**Features**:
- Hierarchical tree (Chapters → Lessons)
- Collapsible chapter sections (expand/collapse)
- Active lesson highlighting
- Week numbering (Week 1, Week 2, etc.)
- Scroll-to-active on page load

**Tailwind Classes**: `overflow-y-auto`, `sticky`, `top-0`, `border-r`, `w-64`

**Accessibility**: ARIA tree role, keyboard navigation (Arrow keys for expand/collapse)

##### ChapterCard Component (`src/components/ChapterCard/index.tsx`)

**Features**:
- Visual card for chapter overview page
- Module icon (SVG, color-coded by module)
- Chapter title and description
- Lesson count badge
- Click to navigate to chapter index

**Props**:
```typescript
interface ChapterCardProps {
  moduleNumber: number;
  title: string;
  description: string;
  lessonCount: number;
  iconName: string;
  href: string;
}
```

**Tailwind Classes**: `rounded-lg`, `shadow-md`, `hover:shadow-lg`, `transition`, `p-6`

##### LessonLayout Component (`src/components/LessonLayout/index.tsx`)

**Features**:
- Structured layout for lesson content
- Table of contents (right sidebar, sticky)
- Progress indicator (scroll progress bar)
- Previous/Next lesson navigation buttons
- Breadcrumbs (Chapter > Lesson)

**Tailwind Classes**: `grid`, `grid-cols-12`, `gap-6`, `max-w-7xl`, `mx-auto`

#### 2. Build Content Components

##### DiagramContainer Component (`src/components/DiagramContainer/index.tsx`)

**Features**:
- Wrapper for ASCII diagrams
- Horizontal scroll for wide diagrams (mobile)
- Optional zoom/pan controls (desktop)
- Copy-to-clipboard button

**Props**:
```typescript
interface DiagramContainerProps {
  title?: string;
  children: React.ReactNode; // ASCII art in <pre> tag
  zoomable?: boolean;
}
```

##### CodeBlock Component (`src/components/CodeBlock/index.tsx`)

**Features**:
- Enhanced code display with syntax highlighting (Prism)
- Copy button (clipboard API)
- Line numbers
- Language badge (Python, Bash, YAML)
- ROS 2 version badge (e.g., "Humble")

**Props**:
```typescript
interface CodeBlockProps {
  code: string;
  language: 'python' | 'bash' | 'yaml' | 'xml';
  showLineNumbers?: boolean;
  rosVersion?: 'Humble' | 'Iron' | 'Rolling';
  title?: string;
}
```

##### ExerciseSection Component (`src/components/ExerciseSection/index.tsx`)

**Features**:
- Expandable container (accordion)
- Difficulty badge (Beginner/Intermediate/Advanced)
- Exercise description
- Solution hints (collapsible)
- Expected outcome

**Props**:
```typescript
interface ExerciseSectionProps {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  hints?: string[];
  expectedOutcome: string;
  defaultExpanded?: boolean;
}
```

##### QuizComponent Component (`src/components/QuizComponent/index.tsx`)

**Features**:
- Interactive quiz with immediate feedback (client-side)
- Multiple-choice questions
- Submit answer → show correct/incorrect with explanation
- Score tracking (X/Y correct)
- Retry button

**Props**:
```typescript
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title?: string;
}
```

**State Management**: `useState` for selected answers, score

##### GlossaryTerm Component (`src/components/GlossaryTerm/index.tsx`)

**Features**:
- Inline term with hover tooltip
- Definition display
- Optional link to full glossary page

**Props**:
```typescript
interface GlossaryTermProps {
  term: string;
  definition: string;
  href?: string; // Link to glossary page
}
```

**Implementation**: Use Radix UI Tooltip for accessible hover behavior

#### 3. Build Custom Theme

**Swizzle Strategy**: Wrap default components, override specific parts

```bash
# Swizzle layout components (eject to customize)
npm run swizzle @docusaurus/theme-classic Layout -- --eject
npm run swizzle @docusaurus/theme-classic Navbar -- --eject
npm run swizzle @docusaurus/theme-classic Footer -- --eject
```

**src/theme/Layout.tsx** - Override root layout:
```tsx
import React from 'react';
import Layout from '@theme-original/Layout';
import Header from '@site/src/components/Header';

export default function LayoutWrapper(props) {
  return (
    <>
      <Header />
      <Layout {...props} />
    </>
  );
}
```

**src/theme/MDXComponents.tsx** - Register global components:
```tsx
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ExerciseSection from '@site/src/components/ExerciseSection';
import QuizComponent from '@site/src/components/QuizComponent';
import GlossaryTerm from '@site/src/components/GlossaryTerm';
import DiagramContainer from '@site/src/components/DiagramContainer';

export default {
  ...MDXComponents,
  ExerciseSection,
  QuizComponent,
  GlossaryTerm,
  DiagramContainer,
};
```

#### 4. Add Tailwind Configuration

**tailwind.config.js** - Custom theme tokens:
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',  // Blue
          600: '#2563eb',
          900: '#1e3a8a',
        },
        secondary: {
          500: '#14b8a6',  // Teal
          600: '#0d9488',
        },
        accent: {
          500: '#f97316',  // Orange
          600: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.serif'),
            fontSize: '18px',
            lineHeight: '1.6',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

**Typography System** (`src/css/typography.css`):
```css
/* Headings: Inter */
h1, h2, h3, h4, h5, h6 {
  @apply font-sans;
  line-height: 1.2;
}

/* Body: Georgia */
body, p {
  @apply font-serif;
  line-height: 1.6;
}

/* Code: Fira Code */
code, pre {
  @apply font-mono;
  line-height: 1.4;
}

/* Responsive font sizes */
@media (max-width: 768px) {
  body { font-size: 16px; }
}

@media (min-width: 769px) {
  body { font-size: 18px; }
}
```

---

### D. Integration Plan

**Objective**: Connect Markdown content to custom components, configure sidebar navigation, link frontend UI to chapter/lesson structure

#### 1. Add Book Markdown Pages

**Steps**:
1. Ensure all 17 Markdown files exist in `docs/book/chapters/` (4 chapter index.md + 13 lesson files)
2. Validate Markdown frontmatter:
```yaml
---
id: week-01-intro-physical-ai
title: Week 1 - Introduction to Physical AI
sidebar_label: Week 1
sidebar_position: 1
---
```
3. Run Markdown linter: `npx markdownlint-cli docs/**/*.md`

#### 2. Import Custom Components in Markdown

**Example lesson file** (`docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md`):

````markdown
---
id: week-01-intro-physical-ai
title: Week 1 - Introduction to Physical AI
sidebar_position: 1
---

# Week 1: Introduction to Physical AI

## Learning Objectives

1. Define Physical AI and distinguish from traditional AI
2. Explain the sensor-motor loop in embodied agents
3. Identify applications of Physical AI in robotics

## Diagrams

<DiagramContainer title="Sensor-Motor Loop">
```
┌──────────────────────────────────────┐
│         Physical Environment         │
└──────────────────────────────────────┘
           ↑               ↓
      [Actuators]      [Sensors]
           ↑               ↓
      ┌────────────────────────┐
      │   Robot Controller     │
      │   (ROS 2 Nodes)        │
      └────────────────────────┘
```
</DiagramContainer>

## Code Examples

<CodeBlock
  code={`import rclpy
from rclpy.node import Node

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        self.get_logger().info('Sensor node initialized')

def main():
    rclpy.init()
    node = SensorNode()
    rclpy.spin(node)
    rclpy.shutdown()
`}
  language="python"
  rosVersion="Humble"
  title="Basic ROS 2 Node"
/>

## Exercises

<ExerciseSection
  title="Exercise 1: Create Your First ROS 2 Node"
  difficulty="beginner"
  description="Create a ROS 2 node that publishes sensor data at 10Hz..."
  hints={["Use rclpy.create_rate(10)", "Remember to call rclpy.init()"]}
  expectedOutcome="Node publishes messages to /sensor_data topic"
/>

## Quiz

<QuizComponent
  title="Week 1 Quiz"
  questions={[
    {
      question: "What distinguishes Physical AI from traditional AI?",
      options: [
        "Physical AI operates only in simulation",
        "Physical AI interacts with the physical world through sensors and actuators",
        "Physical AI requires more computational power",
        "Physical AI uses different programming languages"
      ],
      correctAnswer: 1,
      explanation: "Physical AI is characterized by embodied interaction with the physical environment via sensors (perception) and actuators (action)."
    },
    // ... more questions
  ]}
/>

## Glossary

- <GlossaryTerm term="Physical AI" definition="Artificial intelligence systems that interact with and learn from the physical world through embodied agents with sensors and actuators." />
- <GlossaryTerm term="Sensor-Motor Loop" definition="The cyclical process where sensors gather environmental data, the controller processes it, and actuators produce physical actions." />

## Further Reading

1. Brooks, R. A. (1991). "Intelligence without representation." [Link]
2. ROS 2 Humble Documentation. [https://docs.ros.org/en/humble/](https://docs.ros.org/en/humble/)
````

#### 3. Configure Sidebar (sidebars.js)

**Auto-generated sidebar configuration**:

```javascript
// sidebars.js
module.exports = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Module 1: Physical AI Foundations',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'book/chapters/module-1-physical-ai',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Humanoid Robotics & Control',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'book/chapters/module-2-robotics-control',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Simulation Environments',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'book/chapters/module-3-simulation',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Advanced Topics',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'book/chapters/module-4-advanced',
        },
      ],
    },
  ],
};
```

**Features**:
- Auto-detects `index.md` as category page
- Sorts lessons by `sidebar_position` frontmatter
- Collapsed/expanded controlled by `collapsed` property
- Active lesson highlighted automatically

#### 4. Link Chapters to Frontend UI

**Homepage** (`docs/index.md`) - Display chapter cards:

```mdx
---
id: index
title: Physical AI & Humanoid Robotics
---

import ChapterCard from '@site/src/components/ChapterCard';

# Physical AI & Humanoid Robotics

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <ChapterCard
    moduleNumber={1}
    title="Physical AI Foundations"
    description="Introduction to Physical AI, humanoid robotics principles, and ROS 2 architecture"
    lessonCount={3}
    iconName="brain"
    href="/book/chapters/module-1-physical-ai/"
  />

  <ChapterCard
    moduleNumber={2}
    title="Humanoid Robotics & Control"
    description="Advanced ROS 2 concepts, Gazebo simulation, and robot control systems"
    lessonCount={2}
    iconName="robot"
    href="/book/chapters/module-2-robotics-control/"
  />

  <ChapterCard
    moduleNumber={3}
    title="Simulation Environments"
    description="Unity, NVIDIA Isaac Sim, Isaac Gym, and sensor integration"
    lessonCount={3}
    iconName="cube"
    href="/book/chapters/module-3-simulation/"
  />

  <ChapterCard
    moduleNumber={4}
    title="Advanced Topics"
    description="VLA models, conversational AI, locomotion, kinematics, and capstone project"
    lessonCount={5}
    iconName="rocket"
    href="/book/chapters/module-4-advanced/"
  />
</div>
```

**Validation**:
- Click chapter card → navigates to chapter index page
- Chapter index displays lesson links
- Click lesson link → navigates to lesson page with custom layout
- Sidebar highlights active lesson
- Previous/Next navigation works between lessons

---

### E. Deployment Plan

**Objective**: Configure GitHub repository, set up GitHub Actions workflow, deploy to GitHub Pages with automated builds

#### 1. GitHub Repository Setup

**Steps**:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add remote repository
git remote add origin https://github.com/DC/hackathon-claude.git

# 3. Create and switch to main branch
git checkout -b main

# 4. Add all files
git add .

# 5. Commit initial setup
git commit -m "feat: initialize Docusaurus textbook platform

- Configure Docusaurus 3.x with TypeScript
- Integrate Tailwind CSS 3.4.0
- Add custom React components (Header, Sidebar, ChapterCard, etc.)
- Structure docs directory for 4 modules and 13 lessons
- Configure GitHub Pages deployment workflow"

# 6. Push to GitHub
git push -u origin main
```

#### 2. GitHub Pages Build Commands

**docusaurus.config.js** - Configure for GitHub Pages:

```javascript
module.exports = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A comprehensive textbook for robotics education',
  url: 'https://DC.github.io',
  baseUrl: '/hackathon-claude/',  // Repository name
  organizationName: 'DC',
  projectName: 'hackathon-claude',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',  // Serve docs at site root
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Textbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Home',
        },
        {
          type: 'doc',
          docId: 'about',
          position: 'left',
          label: 'About',
        },
        {
          href: 'https://github.com/DC/hackathon-claude',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook. Content licensed under CC BY-NC-SA 4.0. Code examples under MIT License.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['python', 'bash', 'yaml'],
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/favicon.ico',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#2563eb',
          },
        ],
      },
    ],
  ],
};
```

**package.json** - Add build scripts:

```json
{
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve",
    "write-translations": "docusaurus write-translations",
    "write-heading-ids": "docusaurus write-heading-ids",
    "lint": "markdownlint docs/**/*.md",
    "lint:fix": "markdownlint --fix docs/**/*.md",
    "test:a11y": "axe http://localhost:3000",
    "test:lighthouse": "lighthouse http://localhost:3000 --output json --output-path=./lighthouse-report.json"
  }
}
```

#### 3. GitHub Actions Workflow

**`.github/workflows/deploy.yml`** - Automated deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint Markdown
        run: npm run lint

      - name: Build site
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          cname: textbook.example.com  # Optional: custom domain
```

**`.github/workflows/test.yml`** - CI tests:

```yaml
name: CI Tests

on:
  push:
    branches:
      - '**'
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Lint Markdown
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Check for broken links
        run: npx broken-link-checker http://localhost:3000 --recursive --exclude external
```

**Deployment Steps**:
1. Push to `main` branch triggers workflow
2. Workflow runs: install deps → lint → build → lighthouse audit → deploy
3. Deployment publishes `build/` directory to `gh-pages` branch
4. GitHub Pages serves from `gh-pages` branch
5. Site accessible at `https://DC.github.io/hackathon-claude/`

---

### F. Validation Plan

**Objective**: Verify rendering, navigation, build pipeline, performance, and accessibility before production deployment

#### 1. Test Rendering

**Local Development Server**:
```bash
npm start
# Visit http://localhost:3000
```

**Manual Checks**:
- [ ] Homepage displays 4 chapter cards with correct titles and descriptions
- [ ] Chapter card click navigates to chapter index page
- [ ] Chapter index page lists all lessons in module
- [ ] Lesson page displays all 12 sections in correct order
- [ ] Code examples render with syntax highlighting
- [ ] ASCII diagrams display correctly in DiagramContainer
- [ ] Exercises expand/collapse on click
- [ ] Quiz component accepts answers and shows feedback
- [ ] Glossary terms show tooltips on hover
- [ ] Dark mode toggle works (theme switches, Tailwind classes update)
- [ ] Mobile responsive layout (test at 375px, 768px, 1024px widths)

**Automated Visual Regression** (optional):
```bash
npm install -D @percy/cli @percy/puppeteer
npx percy snapshot http://localhost:3000
```

#### 2. Test Navigation

**Sidebar Navigation**:
- [ ] Sidebar displays 4 collapsible chapter sections
- [ ] Each chapter expands to show lesson list
- [ ] Active lesson highlighted in sidebar
- [ ] Click lesson in sidebar navigates to lesson page
- [ ] Sidebar scrolls to active lesson on page load
- [ ] Keyboard navigation works (Arrow keys expand/collapse, Enter navigates)

**Breadcrumbs & Previous/Next**:
- [ ] Breadcrumbs show current location (Home > Chapter > Lesson)
- [ ] Previous button navigates to prior lesson (disabled on Week 1)
- [ ] Next button navigates to next lesson (disabled on Week 13)
- [ ] Cross-module navigation works (Week 3 → Week 4 across Module 1 → Module 2)

**Search**:
- [ ] Search bar in header accepts input
- [ ] Query "ROS 2" returns relevant lessons (Weeks 3-4)
- [ ] Search results display lesson context snippet
- [ ] Click search result navigates to lesson with highlighted term

#### 3. Test Build Pipeline

**Production Build**:
```bash
npm run build
# Build output: build/

npm run serve
# Test production build locally at http://localhost:3000
```

**Build Validation Checks**:
- [ ] Build completes without errors (`npm run build` exit code 0)
- [ ] Build completes without warnings (check console output)
- [ ] All Markdown files processed (count HTML files in `build/`)
- [ ] Static assets copied (images, fonts, icons in `build/assets/`)
- [ ] Bundle size under 500KB gzipped (check `build/assets/*.js` sizes)

**Link Validation**:
```bash
npm install -D broken-link-checker
npx broken-link-checker http://localhost:3000 --recursive --exclude external
```
- [ ] Zero broken internal links
- [ ] External links return 200 status (or 403 for robots.txt blocked)

**Markdown Linting**:
```bash
npm run lint
```
- [ ] All Markdown files pass linting rules
- [ ] Consistent heading hierarchy (no skipped levels)
- [ ] Code blocks have language specifiers

#### 4. Test Performance

**Lighthouse Audit** (Desktop):
```bash
npm install -D lighthouse
lighthouse http://localhost:3000 --output html --output-path=./lighthouse-desktop.html --preset=desktop
```

**Target Scores** (all >90):
- [ ] Performance: >90 (TTI <2s, FCP <1.5s)
- [ ] Accessibility: >90 (WCAG 2.1 AA compliance)
- [ ] Best Practices: >90 (HTTPS, no console errors)
- [ ] SEO: >90 (meta tags, headings, alt text)

**Lighthouse Audit** (Mobile):
```bash
lighthouse http://localhost:3000 --output html --output-path=./lighthouse-mobile.html --preset=mobile
```

**Target Scores** (mobile):
- [ ] Performance: >85 (TTI <3s, FCP <2s on 3G)
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

**Bundle Analysis**:
```bash
npm install -D webpack-bundle-analyzer
# Add to docusaurus.config.js plugins for build analysis
```
- [ ] Main JS bundle <300KB gzipped
- [ ] Vendor bundle (React, Docusaurus) <200KB gzipped
- [ ] No duplicate dependencies

#### 5. Test Accessibility

**Automated Audit** (axe DevTools):
```bash
npm install -D @axe-core/cli
axe http://localhost:3000 --exit
```
- [ ] Zero critical accessibility violations
- [ ] Zero serious violations
- [ ] <5 moderate violations (document if unavoidable)

**Keyboard Navigation**:
- [ ] Tab key navigates through all interactive elements (links, buttons, inputs)
- [ ] Focus indicators visible (outline/ring on focused elements)
- [ ] Escape key closes modals/tooltips
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate sidebar tree

**Screen Reader** (NVDA on Windows / VoiceOver on macOS):
- [ ] Headings announced correctly (H1, H2, H3)
- [ ] Links announced with descriptive text (not "click here")
- [ ] Code blocks announced as code regions
- [ ] Quiz questions announced with ARIA labels
- [ ] Sidebar tree announced with ARIA tree roles

**Color Contrast**:
```bash
npm install -D pa11y
pa11y http://localhost:3000 --standard WCAG2AA --threshold 0
```
- [ ] All text meets WCAG AA contrast ratio (4.5:1 normal, 3:1 large)
- [ ] Interactive elements have sufficient contrast
- [ ] Dark mode also meets contrast requirements

#### 6. End-to-End User Journey Test

**Student Journey** (User Story 1 - P1):
1. [ ] Open homepage → see 4 chapter cards
2. [ ] Click "Module 1: Physical AI Foundations" → navigate to chapter index
3. [ ] Read chapter overview → understand module goals
4. [ ] Click "Week 1: Introduction to Physical AI" → lesson loads <3s
5. [ ] Read lesson content → all 12 sections present and readable
6. [ ] Copy Python code example → paste into local editor → code executes without errors
7. [ ] Complete Exercise 1 (beginner) → hints helpful, outcome clear
8. [ ] Take quiz → answer 7 questions → receive immediate feedback with explanations
9. [ ] Review summary → all key concepts recapped
10. [ ] Check glossary term → hover tooltip displays definition
11. [ ] Click "Next" button → navigate to Week 2

**Instructor Journey** (User Story 2 - P2):
1. [ ] Review sidebar → map 13 weeks to syllabus (Week 1 = Syllabus Day 1, etc.)
2. [ ] Assign "Week 3: ROS 2 Architecture" reading
3. [ ] Review lesson exercises → confirm they reinforce lecture topics
4. [ ] Export quiz questions → copy Markdown, paste into LMS
5. [ ] Verify citations → all references accessible and IEEE formatted

**Mobile Journey** (User Story 3 - P3):
1. [ ] Open site on smartphone (375px width)
2. [ ] Homepage renders without horizontal scroll
3. [ ] Sidebar collapses to hamburger menu
4. [ ] Lesson content flows vertically (no side-by-side layout)
5. [ ] Code examples readable (no zoom required)
6. [ ] Load lesson once → go offline → lesson still accessible from cache
7. [ ] Screen reader announces content correctly

#### 7. Deployment Validation

**GitHub Pages**:
1. [ ] Push to `main` branch
2. [ ] GitHub Actions workflow runs successfully (green checkmark)
3. [ ] Lighthouse CI reports scores in workflow logs
4. [ ] Site deploys to `https://DC.github.io/hackathon-claude/`
5. [ ] Visit deployed site → all features work (not just local dev server)
6. [ ] HTTPS enforced (no mixed content warnings)
7. [ ] Custom domain (if configured) resolves correctly

**Production Checks**:
- [ ] All pages load (no 404 errors)
- [ ] Assets load from CDN (check Network tab for `/assets/` requests)
- [ ] Service worker registers (check Application tab in DevTools)
- [ ] Offline mode works (disable network, reload previously visited page)
- [ ] PWA installable (shows "Install" prompt on mobile)

---

## Post-Plan Next Steps

**After Phase 1 completes**, the following artifacts will be ready:

1. ✅ **research.md** - Technology validation, best practices, decisions
2. ✅ **data-model.md** - Entity definitions for Chapter, Lesson, Exercise, Quiz
3. ✅ **contracts/** - AI prompt templates, sidebar schema
4. ✅ **quickstart.md** - Developer setup and content authoring guide

**Command to proceed**: `/sp.tasks` - Generate dependency-ordered task list for implementation

**Estimated Timeline**:
- Phase 0 (Research): 2-3 days
- Phase 1 (Design): 2-3 days
- Phase 2 (Implementation via /sp.tasks): 3-4 weeks
  - Project Setup: 2 days
  - Content Generation: 1 week (AI-assisted)
  - Component Development: 1 week
  - Integration & Testing: 3-5 days
  - Deployment: 1 day

**Total**: ~5-6 weeks from plan to production deployment

---

## ADR Candidates

The following decisions may warrant Architecture Decision Records (ADRs):

1. **Docusaurus vs. alternatives** (Nextra, VitePress, Gatsby) for static site generation
2. **Swizzling approach** (wrap vs. eject) for custom theme
3. **Tailwind CSS integration** method (PostCSS plugin vs. CDN)
4. **AI content generation** workflow (Gemini CLI vs. manual authoring)
5. **Component library** choice (Radix UI vs. Headless UI for accessible primitives)

**Recommendation**: Create ADRs after Phase 0 research validates decisions.
