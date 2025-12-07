---
id: 003
title: Textbook Platform Implementation Plan
stage: plan
date: 2025-12-07
surface: agent
model: claude-sonnet-4-5-20250929
feature: textbook-platform
branch: 001-textbook-platform
user: DC
command: /sp.plan
labels: ["planning", "architecture", "docusaurus", "react", "tailwind", "deployment"]
links:
  spec: specs/001-textbook-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-textbook-platform/plan.md
tests:
  - Constitution Check gates (all PASS)
---

## Prompt

Create a complete execution plan.

Sections required:

A. Project Setup Plan
   - Commands to initialize Docusaurus
   - Install Tailwind
   - Remove default theme
   - Create custom theme folder

B. Book Generation Plan
   - Steps to generate each module's chapter
   - Steps to generate each week's lesson
   - How to store generated chapters

C. Frontend Plan
   - Build layout components
   - Build custom theme
   - Build navigation & sidebar
   - Add Tailwind config

D. Integration Plan
   - Add book markdown pages
   - Import them into sidebar
   - Link chapters to frontend UI

E. Deployment Plan
   - GitHub repo setup
   - GitHub Pages build commands

F. Validation Plan
   - Test rendering
   - Test navigation
   - Test build pipeline

## Response snapshot

Created comprehensive implementation plan for Docusaurus-based textbook platform with six detailed execution sections.

**Plan Structure**:

1. **Technical Context** - Fully specified:
   - Stack: JavaScript/TypeScript ES2022, Node.js 20.x, Docusaurus 3.6.0+, React 18.2.0, Tailwind CSS 3.4.0
   - Performance goals: <3s desktop, >90 Lighthouse, <500KB bundle
   - Constraints: Static site only, offline PWA, WCAG 2.1 AA, GitHub Pages deployment

2. **Constitution Check** - All 7 principles PASS:
   - Academic Excellence: 12-section lesson structure, content validation gates
   - Production-Ready: Exact versions, automated deployment, zero error builds
   - Modular Architecture: Content/presentation separation, 9 reusable components
   - Accessibility: WCAG 2.1 AA, performance budgets, responsive design
   - Content Completeness: 13 weeks mapped, 4 modules defined
   - Versioning: Semantic versioning, ROS 2 version badges
   - Testing/QA: Multi-layer validation (lint, build, a11y, performance)

3. **Project Structure** - Docusaurus monorepo:
   - Content: docs/book/chapters/module-{1-4}/week-{01-13}
   - Components: src/components/{Header,Sidebar,ChapterCard,LessonLayout,DiagramContainer,CodeBlock,ExerciseSection,QuizComponent,GlossaryTerm}
   - Theme: src/theme/{Root,Layout,MDXComponents}
   - Config: docusaurus.config.js, sidebars.js, tailwind.config.js

4. **Phase 0: Research** - 6 research tasks defined:
   - Docusaurus custom theming strategy (swizzling vs custom theme)
   - MDX component registration for zero-import usage
   - AI content generation workflow with prompt templates
   - Sidebar auto-generation from directory structure
   - Performance optimization (code splitting, lazy loading)
   - Accessibility patterns (ARIA, keyboard nav, screen readers)

5. **Phase 1: Design & Contracts** - Artifacts to generate:
   - data-model.md: Chapter, Lesson, Exercise, Quiz entities
   - contracts/lesson-prompt-template.md: AI generation template
   - contracts/chapter-prompt-template.md: Module overview template
   - contracts/sidebar-schema.json: Navigation configuration
   - quickstart.md: Developer setup and authoring workflow

6. **Execution Plan** - 6 detailed sections:

**A. Project Setup Plan**:
- Initialize Docusaurus with TypeScript
- Install Tailwind CSS, PostCSS, Docusaurus plugins (PWA, search)
- Configure Tailwind for Docusaurus dark mode compatibility
- Create component directory structure
- Validation: Dev server, production build succeeds

**B. Book Generation Plan**:
- Generate 4 chapter overview files (index.md)
- Generate 13 lesson files with 12-section pedagogical structure
- Store in docs/book/chapters/module-{1-4}/ hierarchy
- Validation: Markdown lint, code syntax, IEEE citations, relative links

**C. Frontend Plan**:
- Build 4 layout components (Header, Sidebar, ChapterCard, LessonLayout)
- Build 5 content components (DiagramContainer, CodeBlock, ExerciseSection, QuizComponent, GlossaryTerm)
- Swizzle Docusaurus theme (Layout, Navbar, Footer)
- Register global MDX components
- Configure Tailwind with custom colors, fonts, responsive typography

**D. Integration Plan**:
- Add 17 Markdown files (4 chapter + 13 lesson)
- Configure sidebars.js for auto-generated navigation
- Link ChapterCard components to chapter index pages
- Validate navigation flow (homepage → chapter → lesson, previous/next)

**E. Deployment Plan**:
- GitHub repository setup with main branch
- Configure docusaurus.config.js for GitHub Pages (baseUrl, organizationName)
- Create GitHub Actions workflows (deploy.yml, test.yml)
- Deployment pipeline: lint → build → lighthouse audit → deploy to gh-pages branch

**F. Validation Plan**:
- Rendering: Manual checks (12 items), optional visual regression
- Navigation: Sidebar, breadcrumbs, previous/next, search (8 items)
- Build: Production build, link validation, Markdown lint (8 items)
- Performance: Lighthouse desktop/mobile audits, bundle analysis (9 items)
- Accessibility: axe audit, keyboard nav, screen reader, color contrast (15 items)
- E2E User Journeys: Student (11 steps), Instructor (5 steps), Mobile (7 steps)
- Deployment: GitHub Pages validation, PWA features (12 items)

**Key Decisions Documented**:
- Docusaurus selected for content-heavy site with built-in features
- Static site generation enables GitHub Pages (free, reliable)
- Swizzling approach wraps defaults vs full eject
- Tailwind integrated via PostCSS with dark mode compatibility
- Component props interfaces defined with TypeScript
- AI prompt templates enable rapid content generation

**ADR Candidates Identified**:
1. Docusaurus vs. alternatives (Nextra, VitePress, Gatsby)
2. Swizzling approach (wrap vs. eject)
3. Tailwind CSS integration method
4. AI content generation workflow
5. Component library choice (Radix UI vs. Headless UI)

## Outcome

- ✅ Impact: Complete implementation plan with detailed execution steps for all 6 required sections
- 🧪 Tests: Constitution Check validation (7/7 PASS)
- 📁 Files: 1 created (plan.md - 1627 lines, comprehensive)
- 🔁 Next prompts: Phase 0 research tasks, then /sp.tasks (task generation)
- 🧠 Reflection: Plan balances technical specificity (exact commands, file paths, code samples) with flexibility (research tasks, ADR candidates). All constitution gates pass without violations. Clear separation of concerns: content (Markdown) vs. presentation (React). Estimated 5-6 weeks total timeline.

## Evaluation notes (flywheel)

- Failure modes observed: None - all constitution gates pass, plan comprehensive
- Graders run and results (PASS/FAIL): Constitution Check PASS (7/7 principles), Plan completeness PASS (all 6 sections A-F detailed)
- Prompt variant (if applicable): N/A - initial plan
- Next experiment (smallest change to try): Execute Phase 0 research tasks to validate Docusaurus theming approach, then proceed to /sp.tasks for task generation
