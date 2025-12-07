# Tasks: Physical AI & Humanoid Robotics Textbook Platform

**Input**: Design documents from `specs/001-textbook-platform/`
**Prerequisites**: plan.md (complete), spec.md (complete)

**Organization**: Tasks are grouped by implementation phase for systematic execution

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths, commands, and validation steps in descriptions

## Path Conventions

- **Docusaurus Project**: Repository root contains Docusaurus monorepo
- **Content**: `docs/` directory for Markdown lesson files
- **Components**: `src/components/` for React components
- **Theme**: `src/theme/` for Docusaurus theme overrides
- **Config**: Root-level config files (docusaurus.config.js, tailwind.config.js)

---

## Phase 1: Environment & Docusaurus Setup

**Purpose**: Initialize Docusaurus project, install dependencies, configure Tailwind CSS, prepare custom theme structure

### T001: Initialize Docusaurus Project with TypeScript

**Description**: Create new Docusaurus project using classic preset with TypeScript support

**Commands**:
```bash
# Navigate to repository root
cd C:\Users\DC\Desktop\hackathon-claude

# Initialize Docusaurus (will create textbook-platform/ subdirectory)
npx create-docusaurus@latest textbook-platform classic --typescript

# Move into project directory
cd textbook-platform
```

**File Paths Created**:
- `textbook-platform/package.json`
- `textbook-platform/docusaurus.config.js`
- `textbook-platform/sidebars.js`
- `textbook-platform/docs/`
- `textbook-platform/src/`
- `textbook-platform/static/`

**Validation**:
```bash
# Verify Docusaurus dev server starts
npm start
# Expected: Server runs on http://localhost:3000
# Expected: Default Docusaurus homepage loads

# Stop server (Ctrl+C)
```

**Troubleshooting**:
- If `npx` not found: Install Node.js 20.x LTS from nodejs.org
- If port 3000 busy: Use `npm start -- --port 3001`
- If TypeScript errors: Ensure Node version ≥18.x

---

### T002: Install Tailwind CSS and Dependencies

**Description**: Install Tailwind CSS, PostCSS, Autoprefixer, and Docusaurus plugins

**Commands**:
```bash
# Still in textbook-platform/ directory

# Install Tailwind CSS and PostCSS
npm install -D tailwindcss@3.4.0 postcss autoprefixer

# Initialize Tailwind configuration (creates tailwind.config.js and postcss.config.js)
npx tailwindcss init -p

# Install Docusaurus plugins
npm install --save @docusaurus/theme-live-codeblock
npm install --save @docusaurus/plugin-pwa
npm install --save @docusaurus/plugin-ideal-image

# Install development/testing dependencies
npm install -D markdownlint-cli
npm install -D @axe-core/cli
npm install -D lighthouse
```

**File Paths Modified/Created**:
- `textbook-platform/package.json` (dependencies added)
- `textbook-platform/tailwind.config.js` (created)
- `textbook-platform/postcss.config.js` (created)

**Validation**:
```bash
# Check tailwind.config.js exists
cat tailwind.config.js
# Expected: module.exports with content, theme, plugins

# Verify dependencies installed
npm list tailwindcss @docusaurus/theme-live-codeblock
# Expected: Lists installed versions
```

**Troubleshooting**:
- If npm install fails: Clear cache with `npm cache clean --force`
- If peer dependency warnings: Safe to ignore for Docusaurus plugins
- If Tailwind version mismatch: Ensure exact version `3.4.0` specified

---

### T003 [P]: Configure Tailwind for Docusaurus

**Description**: Update Tailwind config to scan Docusaurus files and configure dark mode compatibility

**Commands**:
```bash
# Edit tailwind.config.js
```

**File Path**: `textbook-platform/tailwind.config.js`

**Starter Code**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Docusaurus dark mode compatibility
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Primary blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // Teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.serif'),
            fontSize: '18px',
            lineHeight: '1.6',
            maxWidth: 'none',
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

**Validation**:
```bash
# Verify Tailwind config syntax
node -e "require('./tailwind.config.js')"
# Expected: No errors

# Check content paths are correct
grep -o "content:" tailwind.config.js
# Expected: Includes src and docs directories
```

**Troubleshooting**:
- If syntax error: Validate JavaScript with `node tailwind.config.js`
- If @tailwindcss/typography missing: Run `npm install -D @tailwindcss/typography`
- If dark mode not working: Ensure `[data-theme="dark"]` matches Docusaurus theme attribute

---

### T004 [P]: Add Tailwind Directives to Custom CSS

**Description**: Import Tailwind base, components, and utilities into Docusaurus custom CSS

**File Path**: `textbook-platform/src/css/custom.css`

**Commands**:
```bash
# Edit src/css/custom.css (file already exists from Docusaurus init)
```

**Starter Code**:
```css
/**
 * Tailwind CSS Imports
 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/**
 * Custom Typography System
 */

/* Headings: Inter font */
h1, h2, h3, h4, h5, h6 {
  @apply font-sans;
  line-height: 1.2;
  font-weight: 600;
}

/* Body: Georgia serif for readability */
body, p {
  @apply font-serif;
  line-height: 1.6;
}

/* Code: Fira Code monospace */
code, pre {
  @apply font-mono;
  line-height: 1.4;
}

/**
 * Responsive Font Sizes
 */
@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
}

@media (min-width: 769px) {
  body {
    font-size: 18px;
  }
}

/**
 * Custom Docusaurus Overrides
 */
:root {
  --ifm-color-primary: #2563eb;
  --ifm-color-primary-dark: #1d4ed8;
  --ifm-color-primary-darker: #1e40af;
  --ifm-color-primary-darkest: #1e3a8a;
  --ifm-color-primary-light: #3b82f6;
  --ifm-color-primary-lighter: #60a5fa;
  --ifm-color-primary-lightest: #93c5fd;
  --ifm-code-font-size: 95%;
}

[data-theme='dark'] {
  --ifm-color-primary: #60a5fa;
  --ifm-color-primary-dark: #3b82f6;
  --ifm-color-primary-darker: #2563eb;
  --ifm-color-primary-darkest: #1d4ed8;
  --ifm-color-primary-light: #93c5fd;
  --ifm-color-primary-lighter: #bfdbfe;
  --ifm-color-primary-lightest: #dbeafe;
}
```

**Validation**:
```bash
# Start dev server
npm start

# Check browser console for Tailwind errors (should be none)
# Verify Tailwind utility classes work (add temporary test div with bg-primary-500)
```

**Troubleshooting**:
- If Tailwind not applying: Verify PostCSS config includes Tailwind plugin
- If fonts not loading: Add font imports or use web fonts CDN
- If dark mode colors wrong: Check CSS variable mappings in [data-theme='dark']

---

### T005 [P]: Remove Default Theme Components

**Description**: Clear default Docusaurus components and pages to prepare for custom theme

**Commands**:
```bash
# Remove default components (keep directory structure)
rm -rf src/components/*

# Remove default pages (we'll use docs/index.md instead)
rm -rf src/pages/*

# Keep src/css/, src/theme/ directories
```

**File Paths Removed**:
- `textbook-platform/src/components/HomepageFeatures/*` (default example)
- `textbook-platform/src/pages/index.tsx` (default homepage)
- `textbook-platform/src/pages/markdown-page.md` (default page)

**Validation**:
```bash
# Verify directories empty
ls src/components/
# Expected: Empty or only .gitkeep

ls src/pages/
# Expected: Empty or only .gitkeep

# Verify dev server still runs (will show Docusaurus default docs)
npm start
```

**Troubleshooting**:
- If build fails after removal: Docusaurus will use docs/ as homepage (expected)
- If src/ directories deleted: Recreate with `mkdir -p src/{components,pages,theme,css}`

---

### T006 [P]: Create Custom Theme Folder Structure

**Description**: Create directory structure for custom React components and theme overrides

**Commands**:
```bash
# Create component directories
mkdir -p src/components/Header
mkdir -p src/components/Sidebar
mkdir -p src/components/ChapterCard
mkdir -p src/components/LessonLayout
mkdir -p src/components/DiagramContainer
mkdir -p src/components/CodeBlock
mkdir -p src/components/ExerciseSection
mkdir -p src/components/QuizComponent
mkdir -p src/components/GlossaryTerm

# Create theme override directories
mkdir -p src/theme/Navbar
mkdir -p src/theme/Footer

# Create additional CSS directory for typography
mkdir -p src/css
```

**File Paths Created**:
- `textbook-platform/src/components/Header/` (empty, ready for index.tsx)
- `textbook-platform/src/components/Sidebar/` (empty)
- `textbook-platform/src/components/ChapterCard/` (empty)
- `textbook-platform/src/components/LessonLayout/` (empty)
- `textbook-platform/src/components/DiagramContainer/` (empty)
- `textbook-platform/src/components/CodeBlock/` (empty)
- `textbook-platform/src/components/ExerciseSection/` (empty)
- `textbook-platform/src/components/QuizComponent/` (empty)
- `textbook-platform/src/components/GlossaryTerm/` (empty)
- `textbook-platform/src/theme/Navbar/` (empty)
- `textbook-platform/src/theme/Footer/` (empty)

**Validation**:
```bash
# Verify directory structure
tree src/ -L 2
# Expected: Shows all 9 component directories + theme directories

# Alternative if tree not available
find src/ -type d
```

**Troubleshooting**:
- If mkdir fails: Check permissions, run with appropriate rights
- If directories exist: Safe to skip, directories already created

---

## Phase 2: Book Content Tasks

**Purpose**: Generate chapter overview pages and 13 weekly lesson Markdown files with complete pedagogical structure

### T007: Create Content Directory Structure

**Description**: Create docs directory structure for 4 modules and 13 lessons

**Commands**:
```bash
# Create book chapters directory structure
mkdir -p docs/book/chapters/module-1-physical-ai
mkdir -p docs/book/chapters/module-2-robotics-control
mkdir -p docs/book/chapters/module-3-simulation
mkdir -p docs/book/chapters/module-4-advanced
```

**File Paths Created**:
- `textbook-platform/docs/book/chapters/module-1-physical-ai/` (Weeks 1-3)
- `textbook-platform/docs/book/chapters/module-2-robotics-control/` (Weeks 4-5)
- `textbook-platform/docs/book/chapters/module-3-simulation/` (Weeks 6-8)
- `textbook-platform/docs/book/chapters/module-4-advanced/` (Weeks 9-13)

**Validation**:
```bash
# Verify structure
ls -la docs/book/chapters/
# Expected: Shows 4 module directories

find docs/book/chapters/ -type d
# Expected: Lists all module directories
```

---

### T008 [P]: Generate Chapter 1 Overview (Module 1: Physical AI Foundations)

**Description**: Create chapter overview page for Module 1 covering Physical AI, Humanoid Fundamentals, ROS 2 Architecture

**File Path**: `textbook-platform/docs/book/chapters/module-1-physical-ai/index.md`

**Starter Code**:
```markdown
---
id: module-1-overview
title: Module 1 - Physical AI Foundations
sidebar_label: Module 1 Overview
sidebar_position: 0
---

# Module 1: Physical AI Foundations

## Module Overview

This module introduces the foundational concepts of Physical AI and humanoid robotics, exploring how artificial intelligence systems interact with and learn from the physical world through embodied agents. Students will gain hands-on experience with ROS 2 (Robot Operating System 2), the industry-standard middleware for robotics applications.

## Learning Outcomes

By the end of this module, you will be able to:

1. **Define and distinguish Physical AI** from traditional AI systems, explaining the role of embodiment in intelligent agents
2. **Understand humanoid robotics principles**, including sensor-motor loops, kinematics, and control architectures
3. **Master ROS 2 fundamentals**, including nodes, topics, services, actions, and the publish-subscribe communication model
4. **Implement basic ROS 2 applications** in Python for sensor data processing and robot control

## Module Structure

This module consists of **3 weeks** covering the following topics:

### Week 1: Introduction to Physical AI
- **Focus**: Embodied intelligence, sensor-motor loops, Physical AI vs. traditional AI
- **Hands-On**: First ROS 2 node, publisher/subscriber pattern
- **Prerequisites**: Basic programming (Python), linear algebra fundamentals

### Week 2: Fundamentals of Humanoid Robotics
- **Focus**: Humanoid robot anatomy, degrees of freedom, actuators, sensors
- **Hands-On**: Simulating humanoid robots, basic motion control
- **Prerequisites**: Week 1 content, understanding of coordinate systems

### Week 3: ROS 2 Architecture & Core Concepts
- **Focus**: ROS 2 nodes, topics, services, actions, parameter server, launch files
- **Hands-On**: Multi-node ROS 2 applications, inter-process communication
- **Prerequisites**: Weeks 1-2, comfortable with Python classes and async programming

## Why This Module Matters

Physical AI is transforming industries from manufacturing to healthcare to autonomous vehicles. Unlike traditional AI that operates in purely digital environments, Physical AI must:

- **Handle uncertainty** from noisy sensor data and unpredictable physical interactions
- **Operate in real-time** with hard latency constraints for safety and stability
- **Bridge the sim-to-real gap** between simulated training and physical deployment
- **Ensure safety** through robust control algorithms and fail-safe mechanisms

Humanoid robots represent the most complex embodiment of Physical AI, combining:
- **High-dimensional control** (20+ degrees of freedom)
- **Dynamic stability** (bipedal locomotion, balance)
- **Multi-modal sensing** (vision, tactile, proprioception)
- **Human-robot interaction** (natural language, gestures)

## Technologies Covered

- **ROS 2 Humble Hawksbill** (LTS release, supported until 2027)
- **Python 3.10+** for ROS 2 node development
- **Gazebo Classic / Gazebo Sim** for robot simulation (preview in this module, deep dive in Module 2)
- **URDF/SDF** robot description formats

## Assessment

- **Exercises**: 9 hands-on coding exercises (3 per week, progressive difficulty)
- **Quizzes**: 21 multiple-choice questions (7 per week) with immediate feedback
- **Mini-Project**: Build a ROS 2 application with sensor data processing and motor control (end of Week 3)

## Further Reading

Before starting this module, we recommend reviewing:

1. **ROS 2 Documentation**: [https://docs.ros.org/en/humble/](https://docs.ros.org/en/humble/)
2. Brooks, R. A. (1991). "Intelligence without representation." *Artificial Intelligence*, 47(1-3), 139-159.
3. Mataric, M. J. (2007). *The Robotics Primer*. MIT Press.
4. Siegwart, R., Nourbakhsh, I. R., & Scaramuzza, D. (2011). *Introduction to Autonomous Mobile Robots* (2nd ed.). MIT Press.

## Module Navigation

- [Week 1: Introduction to Physical AI](./week-01-intro-physical-ai.md)
- [Week 2: Fundamentals of Humanoid Robotics](./week-02-humanoid-fundamentals.md)
- [Week 3: ROS 2 Architecture & Core Concepts](./week-03-ros2-architecture.md)

---

**Next**: Begin with [Week 1 - Introduction to Physical AI](./week-01-intro-physical-ai.md) →
```

**Validation**:
```bash
# Lint Markdown
npx markdownlint-cli docs/book/chapters/module-1-physical-ai/index.md
# Expected: No errors

# Check frontmatter syntax
head -n 6 docs/book/chapters/module-1-physical-ai/index.md
# Expected: Valid YAML frontmatter

# Preview in browser
npm start
# Navigate to /book/chapters/module-1-physical-ai/
```

**Troubleshooting**:
- If markdown lint fails: Fix heading hierarchy, list formatting
- If frontmatter invalid: Check YAML syntax (no tabs, proper quotes)
- If links broken: Verify relative paths match file names

---

### T009 [P]: Generate Chapter 2 Overview (Module 2: Humanoid Robotics & Control)

**Description**: Create chapter overview page for Module 2 covering ROS 2 Advanced and Gazebo Simulation

**File Path**: `textbook-platform/docs/book/chapters/module-2-robotics-control/index.md`

**Starter Code**:
```markdown
---
id: module-2-overview
title: Module 2 - Humanoid Robotics & Control
sidebar_label: Module 2 Overview
sidebar_position: 0
---

# Module 2: Humanoid Robotics & Control

## Module Overview

Building on ROS 2 fundamentals, this module dives deep into advanced robotics concepts including control systems, simulation environments, and humanoid robot kinematics. Students will master Gazebo simulation for testing and validating robot behaviors before deploying to physical hardware.

## Learning Outcomes

By the end of this module, you will be able to:

1. **Implement advanced ROS 2 patterns** including actions, parameter management, and lifecycle nodes
2. **Simulate humanoid robots in Gazebo** with accurate physics, sensors, and actuators
3. **Design control systems** for robot manipulation and locomotion
4. **Debug and profile ROS 2 applications** using introspection tools

## Module Structure

This module consists of **2 weeks**:

### Week 4: ROS 2 Advanced Concepts (Nodes, Topics, Services, Actions)
- **Focus**: Actions for long-running tasks, parameter server, lifecycle management, QoS policies
- **Hands-On**: Implement action servers/clients, dynamic reconfiguration
- **Prerequisites**: Module 1 completion, solid understanding of ROS 2 topics and services

### Week 5: Gazebo Simulation Basics
- **Focus**: Gazebo architecture, URDF robot models, sensor plugins, physics engines
- **Hands-On**: Simulate custom humanoid robot, integrate with ROS 2 control
- **Prerequisites**: Week 4, basic understanding of 3D coordinate systems and transforms

## Technologies Covered

- **ROS 2 Actions** for goal-oriented behaviors
- **Gazebo Classic 11** and **Gazebo Sim (Ignition)** for robot simulation
- **ros2_control** framework for hardware abstraction
- **URDF/SDF** robot description languages with Xacro macros

## Further Reading

1. **Gazebo Tutorials**: [https://gazebosim.org/docs](https://gazebosim.org/docs)
2. **ROS 2 Control Documentation**: [https://control.ros.org/](https://control.ros.org/)

## Module Navigation

- [Week 4: ROS 2 Advanced Concepts](./week-04-ros2-advanced.md)
- [Week 5: Gazebo Simulation Basics](./week-05-gazebo-simulation.md)

---

**Next**: Continue with [Week 4 - ROS 2 Advanced Concepts](./week-04-ros2-advanced.md) →
```

**Validation**: Same as T008

---

### T010 [P]: Generate Chapter 3 Overview (Module 3: Simulation Environments)

**Description**: Create chapter overview page for Module 3 covering Unity, Isaac Sim, and Sensors

**File Path**: `textbook-platform/docs/book/chapters/module-3-simulation/index.md`

**Starter Code**:
```markdown
---
id: module-3-overview
title: Module 3 - Simulation Environments
sidebar_label: Module 3 Overview
sidebar_position: 0
---

# Module 3: Simulation Environments

## Module Overview

This module explores advanced simulation platforms for robotics, including Unity for game-engine-based simulation and NVIDIA Isaac Sim for photorealistic rendering and synthetic data generation. Students will integrate LiDAR, cameras, and IMU sensors into their robotic systems.

## Learning Outcomes

1. **Use Unity for robotics simulation** with Unity Robotics Hub and ROS integration
2. **Leverage NVIDIA Isaac Sim** for high-fidelity simulation and sim-to-real transfer
3. **Integrate multi-modal sensors** (LiDAR, cameras, IMU) into ROS 2 perception pipelines
4. **Generate synthetic training data** for machine learning models

## Module Structure

This module consists of **3 weeks**:

### Week 6: Unity Simulation for Robotics
### Week 7: NVIDIA Isaac Sim & Isaac Gym
### Week 8: Sensor Integration (LiDAR, Cameras, IMU)

## Technologies Covered

- **Unity 2022+ with Robotics Hub**
- **NVIDIA Isaac Sim** (Omniverse platform)
- **Isaac Gym** for reinforcement learning
- **ROS 2 sensor drivers** (velodyne, realsense, xsens)

## Module Navigation

- [Week 6: Unity Simulation](./week-06-unity-robotics.md)
- [Week 7: NVIDIA Isaac Sim](./week-07-isaac-sim.md)
- [Week 8: Sensor Integration](./week-08-sensor-integration.md)

---

**Next**: Continue with [Week 6 - Unity Simulation for Robotics](./week-06-unity-robotics.md) →
```

**Validation**: Same as T008

---

### T011 [P]: Generate Chapter 4 Overview (Module 4: Advanced Topics)

**Description**: Create chapter overview page for Module 4 covering VLA, Conversational AI, Locomotion, Kinematics

**File Path**: `textbook-platform/docs/book/chapters/module-4-advanced/index.md`

**Starter Code**:
```markdown
---
id: module-4-overview
title: Module 4 - Advanced Topics
sidebar_label: Module 4 Overview
sidebar_position: 0
---

# Module 4: Advanced Topics in Physical AI & Humanoid Robotics

## Module Overview

The final module covers cutting-edge topics in Physical AI, including Vision-Language-Action (VLA) models, conversational AI for human-robot interaction, humanoid locomotion algorithms, and inverse kinematics. Students will integrate these advanced techniques into a capstone project.

## Learning Outcomes

1. **Implement VLA models** for language-conditioned robotic manipulation
2. **Design conversational AI systems** for natural human-robot interaction
3. **Develop locomotion controllers** for bipedal humanoid robots
4. **Apply inverse kinematics** for end-effector pose control
5. **Integrate multiple systems** in a comprehensive capstone project

## Module Structure

This module consists of **5 weeks**:

### Week 9: Vision-Language-Action (VLA) Models
### Week 10: Conversational AI for Human-Robot Interaction
### Week 11: Humanoid Locomotion Algorithms
### Week 12: Inverse Kinematics & Dynamics
### Week 13: Capstone Integration Project

## Technologies Covered

- **VLA Models**: RT-1, RT-2, OpenVLA
- **LLMs for Robotics**: GPT-4V, Claude 3, LLaMA
- **Locomotion**: ZMP, MPC, reinforcement learning
- **IK Solvers**: KDL, TRAC-IK, analytical solutions

## Module Navigation

- [Week 9: VLA Models](./week-09-vla-models.md)
- [Week 10: Conversational AI](./week-10-conversational-ai.md)
- [Week 11: Locomotion](./week-11-locomotion.md)
- [Week 12: Kinematics & Dynamics](./week-12-kinematics-dynamics.md)
- [Week 13: Capstone Project](./week-13-capstone.md)

---

**Next**: Continue with [Week 9 - Vision-Language-Action Models](./week-09-vla-models.md) →
```

**Validation**: Same as T008

---

### T012-T024: Generate Weekly Lesson Files (Weeks 1-13)

**Description**: Create 13 lesson Markdown files with complete 12-section pedagogical structure

**Note**: Due to length, I'll provide a detailed template for Week 1, then shorter stubs for Weeks 2-13. Use the same template structure for all weeks, adjusting topic-specific content.

#### T012: Generate Week 1 Lesson (Introduction to Physical AI)

**File Path**: `textbook-platform/docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md`

**Starter Code** (Complete 12-Section Template):

```markdown
---
id: week-01-intro-physical-ai
title: Week 1 - Introduction to Physical AI
sidebar_label: Week 1
sidebar_position: 1
---

# Week 1: Introduction to Physical AI

## Learning Objectives

By the end of this lesson, you will be able to:

1. **Define Physical AI** and distinguish it from traditional AI systems
2. **Explain the sensor-motor loop** in embodied agents and its role in physical intelligence
3. **Identify real-world applications** of Physical AI across industries (manufacturing, healthcare, autonomous systems)
4. **Implement a basic ROS 2 node** in Python for sensor data processing
5. **Understand the challenges** of deploying AI in physical environments (uncertainty, latency, safety)

## Prerequisites

Before starting this lesson, you should have:

- **Basic Python programming** (functions, classes, loops, conditionals)
- **Linear algebra fundamentals** (vectors, matrices, coordinate systems)
- **Command-line proficiency** (navigating directories, running scripts)
- **Ubuntu 22.04 or equivalent** with ROS 2 Humble installed ([installation guide](https://docs.ros.org/en/humble/Installation.html))

If you need to brush up on these topics, see the [Further Reading](#further-reading) section for recommended resources.

## Introduction

Imagine a robot navigating a busy hospital corridor, delivering medications to patients while avoiding staff and equipment. Unlike a chess-playing AI that operates in a perfectly defined digital environment, this robot must:

- **Perceive** its surroundings through noisy sensors (cameras with varying lighting, LiDAR with occlusions)
- **Act** in real-time with motors that have mechanical constraints and imperfect control
- **Adapt** to unpredictable human behavior and environmental changes
- **Ensure safety** even when sensor readings are ambiguous or contradictory

This is **Physical AI** – artificial intelligence that doesn't just think, but *acts* in the physical world.

### The Paradigm Shift

Traditional AI (symbolic reasoning, expert systems, deep learning for classification) excels in digital domains:
- Chess engines evaluate millions of board positions
- Image classifiers identify objects in static photographs
- Language models generate coherent text

But physical embodiment introduces fundamental challenges:
- **Sensor uncertainty**: Real-world sensors are noisy, have limited resolution, and can fail
- **Actuation imprecision**: Motors don't execute commands perfectly; there's slippage, backlash, and latency
- **Environmental complexity**: Physical spaces are high-dimensional, partially observable, and stochastic
- **Real-time constraints**: A self-driving car can't "think" for 10 seconds before braking

Physical AI addresses these challenges by tightly coupling perception, decision-making, and action in a continuous **sensor-motor loop**.

## Conceptual Overview

### The Sensor-Motor Loop

At the heart of Physical AI is the **sensor-motor loop**, a cyclical process where:

1. **Sensors** gather information about the environment (cameras, LiDAR, touch sensors, IMUs)
2. **Perception** processes sensor data into meaningful representations (object detection, localization)
3. **Decision-Making** determines what action to take based on goals and current state (path planning, grasping strategies)
4. **Actuation** sends commands to motors/actuators to execute the action (wheel velocities, joint angles)
5. **Effect** modifies the environment, which is then sensed again (closing the loop)

This loop runs continuously at rates from 10 Hz (high-level planning) to 1000 Hz (low-level control).

#### Analogy: Driving a Car

Think of driving a car:
- **Sensors**: Your eyes see the road, pedestrians, traffic lights; your ears hear sirens
- **Perception**: You recognize a red light, estimate distance to the car ahead
- **Decision**: You decide to brake, not accelerate
- **Actuation**: You press the brake pedal
- **Effect**: The car slows down, changing your relative position to other vehicles
- **Loop**: You continuously monitor (sense) the slowing car and adjust brake pressure (act)

This happens unconsciously, integrating multi-modal sensing and motor control in real-time.

### Physical AI vs. Traditional AI

| Aspect | Traditional AI | Physical AI |
|--------|----------------|-------------|
| **Environment** | Digital, fully observable | Physical, partially observable, noisy |
| **State Space** | Discrete, finite | Continuous, infinite |
| **Actions** | Symbolic (e.g., "move queen to E5") | Motor commands (e.g., "apply 2.5 Nm torque to joint 3") |
| **Feedback** | Immediate, deterministic | Delayed, stochastic |
| **Constraints** | Computational (time, memory) | Physical (dynamics, safety, power) |
| **Evaluation** | Accuracy, perplexity, win rate | Task success, safety, efficiency |

### Key Concepts

- **Embodiment**: AI system physically instantiated in the world (robot, drone, vehicle) vs. purely software
- **Reactive Behavior**: Immediate response to sensory input without deliberative planning (e.g., reflex)
- **Deliberative Behavior**: Reasoning about future states, planning sequences of actions (e.g., navigation)
- **Hybrid Architecture**: Combination of reactive (fast, low-level) and deliberative (slow, high-level) layers
- **Sim-to-Real Gap**: Difference between simulated and real-world performance due to modeling errors

## Technical Deep Dive

### ROS 2: Middleware for Physical AI

**ROS 2 (Robot Operating System 2)** is the industry-standard middleware for building Physical AI systems. It provides:

1. **Communication Infrastructure**: Publish-subscribe messaging between sensor, perception, and control modules
2. **Abstraction Layers**: Hardware-independent interfaces for sensors and actuators
3. **Tools & Libraries**: Visualization (RViz), simulation (Gazebo), logging, debugging
4. **Ecosystem**: Thousands of packages for SLAM, navigation, manipulation, perception

#### Core ROS 2 Concepts

**Nodes**: Independent processes performing computation (e.g., camera driver, path planner, motor controller)

**Topics**: Named buses for asynchronous, many-to-many messaging
- Publishers send messages to topics
- Subscribers receive messages from topics
- Example: `/camera/image_raw` topic carries sensor_msgs/Image messages

**Services**: Synchronous request-reply communication for remote procedure calls
- Client sends request → Server processes → Server sends response
- Example: `/reset_simulation` service to restart Gazebo

**Actions**: Asynchronous goal-oriented communication with feedback
- Client sends goal → Server provides periodic feedback → Server returns result
- Example: `/navigate_to_pose` action for robot navigation

**Parameters**: Configuration values that can be changed at runtime
- Example: `max_velocity` parameter for speed limit

### ROS 2 Python API Basics

**Creating a Node:**

```python
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')  # Node name
        self.get_logger().info('Node initialized')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalNode()
    rclpy.spin(node)  # Keep node running
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Publishing to a Topic:**

```python
from std_msgs.msg import String

class PublisherNode(Node):
    def __init__(self):
        super().__init__('publisher_node')
        self.publisher = self.create_publisher(String, 'chatter', 10)
        self.timer = self.create_timer(1.0, self.publish_message)  # 1 Hz
        self.count = 0

    def publish_message(self):
        msg = String()
        msg.data = f'Hello World {self.count}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')
        self.count += 1
```

**Subscribing to a Topic:**

```python
class SubscriberNode(Node):
    def __init__(self):
        super().__init__('subscriber_node')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10
        )

    def listener_callback(self, msg):
        self.get_logger().info(f'Received: {msg.data}')
```

### The Sensor-Motor Loop in ROS 2

```
┌─────────────────────────────────────────────────────────┐
│                  Physical Environment                    │
└─────────────────────────────────────────────────────────┘
              ↑                              ↓
         [Actuators]                    [Sensors]
         (Motors,                       (Camera,
          Grippers)                      LiDAR,
              ↑                           IMU)
              │                              ↓
         /cmd_vel                      /camera/image_raw
         (Topic)                       (Topic)
              │                              ↓
    ┌─────────────────┐              ┌─────────────────┐
    │ Control Node    │              │ Perception Node │
    │ (motor commands)│←─────────────│ (object detect) │
    └─────────────────┘   /objects   └─────────────────┘
                          (Topic)
```

**Flow:**
1. Sensor publishes data to `/camera/image_raw` topic
2. Perception node subscribes, processes image, publishes detected objects to `/objects`
3. Control node subscribes to `/objects`, computes motor commands, publishes to `/cmd_vel`
4. Actuator node subscribes to `/cmd_vel`, sends commands to motors
5. Motors move robot → environment changes → sensors detect new state → loop continues

## Diagrams

### Sensor-Motor Loop Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Physical Environment                      │
│  (Obstacles, Objects, Terrain, Lighting, Dynamics)           │
└──────────────────────────────────────────────────────────────┘
                 ↑                              ↓
            [Actuators]                    [Sensors]
            (DC Motors,                    (RGB-D Camera: 30 Hz
             Servos,                        LiDAR: 10 Hz
             Grippers)                      IMU: 100 Hz
                 ↑                          Touch: Event-driven)
                 │                              ↓
            ┌─────────────────────────────────────────────┐
            │          ROS 2 Communication Layer          │
            │                                             │
            │  /cmd_vel (Twist)    ←→    /odom (Odometry)│
            │  /joint_cmds (Float64MultiArray)           │
            │  /gripper_cmd (Bool) ←→  /camera/image_raw │
            └─────────────────────────────────────────────┘
                 ↑                              ↓
       ┌──────────────────┐          ┌──────────────────┐
       │  Control Layer   │          │ Perception Layer │
       │                  │          │                  │
       │ - Path Planning  │←────────→│ - Object Detect  │
       │ - Motion Control │ /objects │ - Localization   │
       │ - Grasping Logic │ (Array)  │ - Mapping        │
       └──────────────────┘          └──────────────────┘
                 ↑
       ┌──────────────────┐
       │  Decision Layer  │
       │  (High-Level AI) │
       │                  │
       │ - Task Planning  │
       │ - Behavior Trees │
       │ - Learning       │
       └──────────────────┘
```

### ROS 2 Node Graph Example

```
    [Camera Driver Node]
            │
            │ publishes
            ↓
    /camera/image_raw (sensor_msgs/Image)
            │
            │ subscribes
            ↓
    [Object Detection Node]
            │
            │ publishes
            ↓
    /detected_objects (vision_msgs/Detection2DArray)
            │
            │ subscribes
            ↓
    [Navigation Node]
            │
            │ publishes
            ↓
    /cmd_vel (geometry_msgs/Twist)
            │
            │ subscribes
            ↓
    [Motor Controller Node]
            │
            │ hardware interface
            ↓
    [Robot Hardware (Motors)]
```

## Code Examples

### Example 1: Basic ROS 2 Publisher (Sensor Simulator)

**File**: `sensor_sim_node.py`

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
import random

class SensorSimNode(Node):
    """
    Simulates a temperature sensor publishing data at 10 Hz.
    Demonstrates basic ROS 2 publisher pattern.
    """
    def __init__(self):
        super().__init__('sensor_sim_node')

        # Create publisher: topic name, message type, queue size
        self.publisher = self.create_publisher(Float32, '/temperature', 10)

        # Create timer: period (seconds), callback function
        self.timer = self.create_timer(0.1, self.publish_temperature)  # 10 Hz

        self.get_logger().info('Sensor simulator started, publishing to /temperature at 10 Hz')

    def publish_temperature(self):
        """Callback function: generates and publishes simulated temperature."""
        # Simulate temperature reading (20-25°C with noise)
        temp = 22.5 + random.uniform(-2.5, 2.5)

        # Create message
        msg = Float32()
        msg.data = temp

        # Publish message
        self.publisher.publish(msg)
        self.get_logger().info(f'Published temperature: {temp:.2f}°C')

def main(args=None):
    rclpy.init(args=args)
    node = SensorSimNode()

    try:
        rclpy.spin(node)  # Keep node running until Ctrl+C
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Usage:**
```bash
# Terminal 1: Run sensor simulator
python3 sensor_sim_node.py

# Terminal 2: Echo topic to verify messages
ros2 topic echo /temperature
# Expected: Stream of Float32 messages

# Terminal 3: Check topic info
ros2 topic info /temperature
# Expected: Type: std_msgs/msg/Float32, Publishers: 1, Subscribers: 0
```

**ROS 2 Version**: Humble Hawksbill

---

### Example 2: Basic ROS 2 Subscriber (Sensor Monitor)

**File**: `sensor_monitor_node.py`

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class SensorMonitorNode(Node):
    """
    Subscribes to temperature sensor data and logs warnings for high temps.
    Demonstrates basic ROS 2 subscriber pattern.
    """
    def __init__(self):
        super().__init__('sensor_monitor_node')

        # Create subscriber: topic name, message type, callback, queue size
        self.subscription = self.create_subscription(
            Float32,
            '/temperature',
            self.temperature_callback,
            10
        )

        self.threshold = 24.0  # °C
        self.get_logger().info(f'Monitoring /temperature (threshold: {self.threshold}°C)')

    def temperature_callback(self, msg):
        """Callback function: processes incoming temperature messages."""
        temp = msg.data

        if temp > self.threshold:
            self.get_logger().warn(f'HIGH TEMPERATURE: {temp:.2f}°C (threshold: {self.threshold}°C)')
        else:
            self.get_logger().info(f'Temperature OK: {temp:.2f}°C')

def main(args=None):
    rclpy.init(args=args)
    node = SensorMonitorNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Usage:**
```bash
# Terminal 1: Run sensor simulator (from Example 1)
python3 sensor_sim_node.py

# Terminal 2: Run sensor monitor
python3 sensor_monitor_node.py
# Expected: Logs temperature readings, warnings when temp > 24°C

# Terminal 3: Visualize node graph
rqt_graph
# Expected: Shows sensor_sim_node → /temperature → sensor_monitor_node
```

---

### Example 3: Sensor-Motor Loop (Simple Control)

**File**: `simple_controller_node.py`

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32, Bool

class SimpleControllerNode(Node):
    """
    Implements a simple thermostat: turns heater on/off based on temperature.
    Demonstrates sensor-motor loop: subscribes to sensor, publishes control command.
    """
    def __init__(self):
        super().__init__('simple_controller_node')

        # Subscriber: temperature sensor input
        self.temp_sub = self.create_subscription(
            Float32,
            '/temperature',
            self.control_callback,
            10
        )

        # Publisher: heater control output
        self.heater_pub = self.create_publisher(Bool, '/heater_cmd', 10)

        self.target_temp = 23.0  # °C
        self.hysteresis = 0.5    # °C (prevent rapid on/off switching)

        self.get_logger().info(f'Controller started (target: {self.target_temp}°C)')

    def control_callback(self, msg):
        """
        Control logic: Bang-bang controller with hysteresis.
        If temp < target - hysteresis: turn heater ON
        If temp > target + hysteresis: turn heater OFF
        """
        temp = msg.data

        cmd = Bool()
        if temp < (self.target_temp - self.hysteresis):
            cmd.data = True  # Turn heater ON
            self.get_logger().info(f'Temp {temp:.2f}°C < {self.target_temp - self.hysteresis:.2f}°C → Heater ON')
        elif temp > (self.target_temp + self.hysteresis):
            cmd.data = False  # Turn heater OFF
            self.get_logger().info(f'Temp {temp:.2f}°C > {self.target_temp + self.hysteresis:.2f}°C → Heater OFF')
        else:
            # In hysteresis band: maintain previous state (not shown in this simple version)
            cmd.data = False  # Default OFF

        self.heater_pub.publish(cmd)

def main(args=None):
    rclpy.init(args=args)
    node = SimpleControllerNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Usage:**
```bash
# Terminal 1: Run sensor simulator
python3 sensor_sim_node.py

# Terminal 2: Run controller
python3 simple_controller_node.py
# Expected: Logs control decisions (ON/OFF)

# Terminal 3: Monitor heater commands
ros2 topic echo /heater_cmd
# Expected: Bool messages (True/False)

# Terminal 4: Visualize full loop
rqt_graph
# Expected: sensor_sim → /temperature → controller → /heater_cmd
```

## Hands-On Exercises

### Exercise 1: Create Your First ROS 2 Publisher (Beginner)

**Difficulty**: ⭐ Beginner

**Objective**: Write a ROS 2 node that publishes your name to a `/student_name` topic at 1 Hz.

**Description**:
Create a Python ROS 2 node called `name_publisher_node.py` that:
1. Initializes a ROS 2 node named `'name_publisher'`
2. Creates a publisher to the `/student_name` topic using `String` message type
3. Publishes your name once per second (1 Hz)
4. Logs each published message to the console

**Hints**:
- Use `from std_msgs.msg import String` for the message type
- Use `self.create_timer(1.0, callback)` for 1 Hz rate
- Use `self.get_logger().info()` for logging

**Expected Outcome**:
- Node runs without errors
- `ros2 topic list` shows `/student_name`
- `ros2 topic echo /student_name` displays your name messages
- `ros2 topic hz /student_name` shows ~1 Hz rate

**Solution Validation**:
```bash
# Run your node
python3 name_publisher_node.py

# In another terminal, verify topic
ros2 topic echo /student_name
# Should see: data: 'Your Name'

# Check rate
ros2 topic hz /student_name
# Should see: average rate: 1.000
```

---

### Exercise 2: Implement a Sensor Subscriber (Intermediate)

**Difficulty**: ⭐⭐ Intermediate

**Objective**: Create a subscriber node that calculates the moving average of sensor readings.

**Description**:
Create `moving_average_node.py` that:
1. Subscribes to `/temperature` topic (Float32)
2. Maintains a sliding window of the last 10 readings
3. Computes and publishes the moving average to `/temperature_filtered` (Float32)
4. Logs both raw and filtered values

**Hints**:
- Use a Python `collections.deque(maxlen=10)` for the sliding window
- Compute average: `sum(window) / len(window)`
- Create both subscriber (input) and publisher (output)

**Expected Outcome**:
- Node smooths noisy sensor data
- `/temperature_filtered` values are less noisy than `/temperature`
- Correctly handles startup (less than 10 samples initially)

**Solution Validation**:
```bash
# Terminal 1: Run sensor simulator
python3 sensor_sim_node.py

# Terminal 2: Run your moving average node
python3 moving_average_node.py

# Terminal 3: Compare raw vs. filtered
ros2 topic echo /temperature
ros2 topic echo /temperature_filtered
# Filtered should show smoother values
```

---

### Exercise 3: Build a Bi-Directional Sensor-Motor Loop (Advanced)

**Difficulty**: ⭐⭐⭐ Advanced

**Objective**: Implement a PID controller (simplified PI) for temperature control.

**Description**:
Create `pid_controller_node.py` that:
1. Subscribes to `/temperature` (Float32)
2. Implements a PI controller: `output = Kp * error + Ki * integral(error)`
3. Publishes control signal (0.0 to 1.0) to `/heater_power` (Float32)
4. Allows dynamic parameter updates for Kp, Ki via ROS 2 parameters

**Hints**:
- Error: `target_temp - current_temp`
- Integral: Accumulate errors over time (watch for windup!)
- Clamp output: `max(0.0, min(1.0, output))`
- Use `self.declare_parameter()` and `self.get_parameter()` for Kp, Ki

**Expected Outcome**:
- Controller maintains temperature close to target
- No oscillations (tune Kp, Ki if needed)
- Responds to parameter changes via `ros2 param set`

**Solution Validation**:
```bash
# Terminal 1: Sensor simulator
python3 sensor_sim_node.py

# Terminal 2: Your PI controller
python3 pid_controller_node.py

# Terminal 3: Monitor control output
ros2 topic echo /heater_power

# Terminal 4: Tune parameters
ros2 param set /pid_controller_node Kp 0.5
ros2 param set /pid_controller_node Ki 0.1
```

## Quiz

**Instructions**: Answer the following 7 multiple-choice questions. Check your answers using the feedback provided.

### Question 1: Core Concept

**What is the primary characteristic that distinguishes Physical AI from traditional AI?**

A) Physical AI uses more advanced algorithms
B) Physical AI operates in the real world through sensors and actuators
C) Physical AI requires more computational power
D) Physical AI only works with humanoid robots

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: B) Physical AI operates in the real world through sensors and actuators

**Explanation**: Physical AI is defined by its embodiment – it interacts with and learns from the physical world through sensors (perception) and actuators (action). Traditional AI operates in purely digital environments. While Physical AI may use advanced algorithms and require computation, these are not its defining characteristics. Physical AI applies to all embodied systems (drones, vehicles, manipulators), not just humanoid robots.

</details>

---

### Question 2: Sensor-Motor Loop

**In the sensor-motor loop, what happens immediately after the "Decision-Making" step?**

A) Sensors gather new information
B) Perception processes sensor data
C) Actuation sends commands to motors
D) The environment resets to initial state

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: C) Actuation sends commands to motors

**Explanation**: The sensor-motor loop follows this sequence:
1. Sensors gather data
2. Perception processes data
3. Decision-Making determines action
4. **Actuation executes action** (← answer)
5. Effect modifies environment
6. Loop repeats (sensors gather new data reflecting changes)

After deciding what to do, the system must actuate (execute the motor commands) before sensing the results.

</details>

---

### Question 3: ROS 2 Communication

**Which ROS 2 communication pattern is best suited for asynchronous, many-to-many messaging where multiple nodes can publish and multiple nodes can subscribe simultaneously?**

A) Services
B) Actions
C) Topics
D) Parameters

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: C) Topics

**Explanation**:
- **Topics**: Asynchronous publish-subscribe, many publishers → many subscribers (correct answer)
- **Services**: Synchronous request-reply, one client ↔ one server at a time
- **Actions**: Asynchronous goal-oriented with feedback, one client ↔ one server
- **Parameters**: Configuration values, not communication pattern

Topics are ideal for streaming sensor data where multiple sensors can publish and multiple processing nodes can subscribe.

</details>

---

### Question 4: Code Understanding

**Given this ROS 2 code snippet, what is the purpose of the `timer` callback?**

```python
self.timer = self.create_timer(0.1, self.publish_data)
```

A) It delays node initialization by 0.1 seconds
B) It calls `publish_data()` once after 0.1 seconds
C) It calls `publish_data()` every 0.1 seconds (10 Hz)
D) It sets a timeout for publishing data

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: C) It calls `publish_data()` every 0.1 seconds (10 Hz)

**Explanation**: `create_timer(period, callback)` creates a repeating timer that calls the callback function at the specified period (in seconds). Here, `0.1` seconds = 10 Hz. This is commonly used for periodic publishing of sensor data or control commands. The timer continues calling the callback until the node shuts down.

</details>

---

### Question 5: Physical AI Challenges

**Which of the following is NOT a primary challenge unique to Physical AI compared to traditional AI?**

A) Dealing with noisy and uncertain sensor data
B) Meeting real-time latency constraints for safety
C) Training neural networks with backpropagation
D) Bridging the sim-to-real gap in performance

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: C) Training neural networks with backpropagation

**Explanation**: Backpropagation is a general machine learning technique used in both traditional AI (image classification, NLP) and Physical AI (vision-based control, policy learning). It is not unique to Physical AI.

Challenges specific to Physical AI:
- **A)** Noisy sensors due to real-world physics (lighting, occlusion, vibration)
- **B)** Real-time constraints (e.g., quadrotor control at 500 Hz, collision avoidance in milliseconds)
- **D)** Sim-to-real gap (models trained in simulation often fail on real hardware)

</details>

---

### Question 6: ROS 2 Practical

**You run `ros2 topic list` and see `/camera/image_raw`. How can you find out what message type this topic uses?**

A) `ros2 topic echo /camera/image_raw`
B) `ros2 topic info /camera/image_raw`
C) `ros2 topic hz /camera/image_raw`
D) `ros2 node list`

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: B) `ros2 topic info /camera/image_raw`

**Explanation**:
- **`ros2 topic info`**: Shows topic type, publisher/subscriber counts (correct answer)
- **`ros2 topic echo`**: Displays message contents (useful for viewing data, not discovering type)
- **`ros2 topic hz`**: Measures publish rate in Hz
- **`ros2 node list`**: Lists active nodes (not topic information)

Example output:
```
$ ros2 topic info /camera/image_raw
Type: sensor_msgs/msg/Image
Publisher count: 1
Subscriber count: 2
```

</details>

---

### Question 7: Application Reasoning

**A self-driving car must decide whether to brake when detecting an object ahead. Which architectural component would be responsible for the high-level decision "brake vs. swerve" in a hybrid architecture?**

A) Reactive layer (fast reflexes)
B) Deliberative layer (planning and reasoning)
C) Sensor fusion module
D) Motor controller

<details>
<summary>Click to reveal answer</summary>

**Correct Answer**: B) Deliberative layer (planning and reasoning)

**Explanation**: Hybrid architectures combine:
- **Reactive layer**: Fast, low-level reflexes (e.g., emergency stop if collision imminent)
- **Deliberative layer**: High-level planning and decision-making (e.g., "Should I brake or swerve? What's the safest maneuver?") ← **Answer**
- **Sensor fusion**: Combines sensor data (not decision-making)
- **Motor controller**: Executes commands (not decision-making)

The deliberative layer evaluates options (brake vs. swerve), considers consequences (stopping distance, adjacent lanes), and selects the optimal action. The reactive layer then executes it quickly.

</details>

## Summary

**Key Takeaways:**

- **Physical AI** is artificial intelligence embodied in physical systems that interact with the real world through sensors and actuators, facing challenges like sensor noise, actuation imprecision, and real-time constraints.

- **The sensor-motor loop** is the fundamental cycle at the heart of Physical AI: sense → perceive → decide → act → effect → sense again. This loop runs continuously, often at high frequencies (10-1000 Hz).

- **ROS 2 (Robot Operating System 2)** is the industry-standard middleware providing communication infrastructure (topics, services, actions), abstraction layers, and a rich ecosystem of tools for building Physical AI systems.

- **ROS 2 topics** enable asynchronous, many-to-many publish-subscribe messaging, ideal for streaming sensor data and control commands. Publishers send messages; subscribers receive them.

- **Challenges of Physical AI** include handling uncertainty (noisy sensors), meeting real-time constraints (latency-critical safety), bridging the sim-to-real gap (simulation vs. reality), and ensuring robustness (sensor failures, unexpected events).

- **Hybrid architectures** combine reactive (fast, reflex-like) and deliberative (slow, planning-based) layers to balance responsiveness and intelligence.

- **Python is the primary language** for ROS 2 development, with libraries like `rclpy` providing node management, publishers, subscribers, timers, and logging.

## Glossary

- **Physical AI**: Artificial intelligence systems that interact with and learn from the physical world through embodied agents equipped with sensors and actuators.

- **Sensor-Motor Loop**: The cyclical process where sensors gather environmental data, perception processes it, decision-making determines actions, and actuators execute them, creating a feedback loop.

- **Embodiment**: The physical instantiation of an AI system in the world (e.g., robot body), enabling interaction with physical environments.

- **ROS 2 (Robot Operating System 2)**: Open-source middleware framework providing communication infrastructure, hardware abstraction, and tools for robotics software development.

- **Node**: Independent computational process in ROS 2 that performs a specific function (e.g., sensor driver, path planner).

- **Topic**: Named communication channel in ROS 2 for asynchronous publish-subscribe messaging.

- **Publisher**: ROS 2 entity that sends messages to a topic.

- **Subscriber**: ROS 2 entity that receives messages from a topic.

- **Message**: Data structure transmitted over ROS 2 topics (e.g., `std_msgs/Float32`, `sensor_msgs/Image`).

- **Service**: Synchronous request-reply communication pattern in ROS 2 for remote procedure calls.

- **Action**: Asynchronous goal-oriented communication pattern in ROS 2 with feedback and result.

- **Reactive Behavior**: Immediate, reflex-like response to sensory input without deliberative planning.

- **Deliberative Behavior**: Reasoning about future states and planning sequences of actions to achieve goals.

- **Hybrid Architecture**: System combining reactive (fast, low-level) and deliberative (slow, high-level) layers.

- **Sim-to-Real Gap**: Performance degradation when transferring models trained in simulation to real-world hardware, caused by modeling inaccuracies and unmodeled phenomena.

- **Latency**: Time delay between sensing an event and responding with an action; critical for safety in Physical AI.

- **Actuator**: Device that converts control signals into physical motion (motors, servos, pneumatic cylinders).

- **Sensor Fusion**: Combining data from multiple sensors to improve accuracy and robustness (e.g., fusing camera and LiDAR).

- **URDF (Unified Robot Description Format)**: XML format for describing robot kinematics, dynamics, and visual appearance in ROS 2.

## Further Reading

### Essential Resources

1. **ROS 2 Humble Documentation** (Official)
   [https://docs.ros.org/en/humble/](https://docs.ros.org/en/humble/)
   Comprehensive guide to ROS 2 installation, tutorials, concepts, and API reference.

2. **Brooks, R. A. (1991). "Intelligence without representation."**
   *Artificial Intelligence*, 47(1-3), 139-159.
   Seminal paper introducing behavior-based robotics and the subsumption architecture. Argues that intelligence emerges from interaction with the world, not from symbolic reasoning.

3. **Mataric, M. J. (2007). *The Robotics Primer***
   MIT Press.
   Accessible introduction to robotics fundamentals, covering sensors, actuators, control, and embodied intelligence.

4. **Siegwart, R., Nourbakhsh, I. R., & Scaramuzza, D. (2011). *Introduction to Autonomous Mobile Robots*** (2nd ed.)
   MIT Press.
   Comprehensive textbook on mobile robotics, covering perception, localization, mapping, path planning, and control.

### Additional Learning

5. **ROS 2 Tutorials - Creating a Workspace**
   [https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)
   Step-by-step guide to setting up a ROS 2 workspace and building packages.

6. **Arkin, R. C. (1998). *Behavior-Based Robotics***
   MIT Press.
   In-depth exploration of reactive and behavior-based approaches to robot control.

7. **ROS 2 Python Package Tutorial**
   [https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html)
   Learn to create ROS 2 Python packages with proper structure and dependencies.

---

**Next Lesson**: [Week 2 - Fundamentals of Humanoid Robotics](./week-02-humanoid-fundamentals.md) →

**Module Navigation**: [Back to Module 1 Overview](./index.md)
```

**Validation**:
```bash
# Lint Markdown
npx markdownlint-cli docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md

# Check word count (should be ~2000-3000 words)
wc -w docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md

# Verify all 12 sections present
grep "^## " docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md
# Expected: Learning Objectives, Prerequisites, Introduction, Conceptual Overview,
#           Technical Deep Dive, Diagrams, Code Examples, Hands-On Exercises,
#           Quiz, Summary, Glossary, Further Reading

# Check code blocks have language specifiers
grep -E "^```[a-z]+" docs/book/chapters/module-1-physical-ai/week-01-intro-physical-ai.md
# Expected: ```python, ```bash, etc. (no plain ```)

# Preview in browser
npm start
# Navigate to /book/chapters/module-1-physical-ai/week-01-intro-physical-ai
```

---

#### T013-T024: Generate Remaining Weekly Lessons (Weeks 2-13)

**Note**: Use the same 12-section template structure as Week 1. For brevity, I'll provide shortened starters. Each lesson should follow the full template with ~2000-3000 words.

**T013**: Week 2 - Fundamentals of Humanoid Robotics
**File**: `docs/book/chapters/module-1-physical-ai/week-02-humanoid-fundamentals.md`
**Topics**: Humanoid anatomy, degrees of freedom, actuators, sensors, kinematics basics

**T014**: Week 3 - ROS 2 Architecture & Core Concepts
**File**: `docs/book/chapters/module-1-physical-ai/week-03-ros2-architecture.md`
**Topics**: Topics, services, actions, parameters, launch files, QoS policies

**T015**: Week 4 - ROS 2 Advanced (Nodes, Topics, Services, Actions)
**File**: `docs/book/chapters/module-2-robotics-control/week-04-ros2-advanced.md`
**Topics**: Action servers/clients, lifecycle nodes, parameter callbacks, composition

**T016**: Week 5 - Gazebo Simulation Basics
**File**: `docs/book/chapters/module-2-robotics-control/week-05-gazebo-simulation.md`
**Topics**: Gazebo architecture, URDF models, sensor plugins, physics engines

**T017**: Week 6 - Unity Simulation for Robotics
**File**: `docs/book/chapters/module-3-simulation/week-06-unity-robotics.md`
**Topics**: Unity Robotics Hub, ROS-Unity integration, articulation bodies

**T018**: Week 7 - NVIDIA Isaac Sim & Isaac Gym
**File**: `docs/book/chapters/module-3-simulation/week-07-isaac-sim.md`
**Topics**: Isaac Sim setup, USD scenes, synthetic data generation, Isaac Gym RL

**T019**: Week 8 - Sensor Integration (LiDAR, Cameras, IMU)
**File**: `docs/book/chapters/module-3-simulation/week-08-sensor-integration.md`
**Topics**: ROS 2 sensor drivers, point cloud processing, camera calibration, IMU fusion

**T020**: Week 9 - Vision-Language-Action (VLA) Models
**File**: `docs/book/chapters/module-4-advanced/week-09-vla-models.md`
**Topics**: RT-1, RT-2, OpenVLA, language-conditioned manipulation

**T021**: Week 10 - Conversational AI for Human-Robot Interaction
**File**: `docs/book/chapters/module-4-advanced/week-10-conversational-ai.md`
**Topics**: LLMs for robotics, dialogue systems, intent recognition, safety constraints

**T022**: Week 11 - Humanoid Locomotion Algorithms
**File**: `docs/book/chapters/module-4-advanced/week-11-locomotion.md`
**Topics**: ZMP (Zero Moment Point), MPC (Model Predictive Control), RL for locomotion

**T023**: Week 12 - Inverse Kinematics & Dynamics
**File**: `docs/book/chapters/module-4-advanced/week-12-kinematics-dynamics.md`
**Topics**: Forward/inverse kinematics, Jacobians, IK solvers (KDL, TRAC-IK), dynamics

**T024**: Week 13 - Capstone Integration Project
**File**: `docs/book/chapters/module-4-advanced/week-13-capstone.md`
**Topics**: Integrating VLA, conversational AI, locomotion; project requirements, rubric

**Validation** (for each lesson T013-T024): Same as T012

---

## Phase 3: Frontend Tasks

**Purpose**: Build 9 custom React components and configure Docusaurus theme

### T025 [P]: Create Header Component

**Description**: Build custom header with logo, navigation menu, search bar, dark mode toggle

**File Path**: `textbook-platform/src/components/Header/index.tsx`

**Starter Code**:
```typescript
import React from 'react';
import styles from './styles.module.css';

export default function Header(): JSX.Element {
  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/img/logo.svg" alt="Textbook Logo" className="h-10 w-10" />
          <span className="text-xl font-bold font-sans">Physical AI & Humanoid Robotics</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-primary-200 transition">Home</a>
          <a href="/about" className="hover:text-primary-200 transition">About</a>
          <a href="https://github.com/DC/hackathon-claude" className="hover:text-primary-200 transition">GitHub</a>
        </nav>

        {/* Search & Dark Mode (placeholder - integrate Docusaurus search) */}
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 border border-white rounded hover:bg-primary-700 transition">
            Search
          </button>
          <button className="p-2 rounded hover:bg-primary-700 transition" title="Toggle dark mode">
            🌙
          </button>
        </div>
      </div>
    </header>
  );
}
```

**File Path**: `textbook-platform/src/components/Header/styles.module.css`

```css
/* Additional component-specific styles */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

**Validation**:
```bash
# Import and use in src/theme/Layout.tsx (see T032)
npm start
# Expected: Header appears at top of page with logo, nav, search, dark mode button
# Expected: Header is sticky on scroll
```

---

### T026-T033: Create Remaining Components

Due to length, I'll provide component names and key props. Use similar structure to T025.

**T026 [P]**: Sidebar Component (`src/components/Sidebar/index.tsx`)
**Props**: `items: SidebarItem[]`, `currentPath: string`
**Features**: Hierarchical tree, collapsible chapters, active highlighting

**T027 [P]**: ChapterCard Component (`src/components/ChapterCard/index.tsx`)
**Props**: `moduleNumber, title, description, lessonCount, iconName, href`
**Features**: Visual card, hover effects, click navigation

**T028 [P]**: LessonLayout Component (`src/components/LessonLayout/index.tsx`)
**Props**: `children, toc: TocItem[]`
**Features**: Grid layout, sticky TOC, previous/next buttons

**T029 [P]**: DiagramContainer Component (`src/components/DiagramContainer/index.tsx`)
**Props**: `title?, children, zoomable?`
**Features**: Horizontal scroll (mobile), copy button

**T030 [P]**: CodeBlock Component (`src/components/CodeBlock/index.tsx`)
**Props**: `code, language, showLineNumbers?, rosVersion?, title?`
**Features**: Prism highlighting, copy button, version badge

**T031 [P]**: ExerciseSection Component (`src/components/ExerciseSection/index.tsx`)
**Props**: `title, difficulty, description, hints?, expectedOutcome, defaultExpanded?`
**Features**: Accordion, difficulty badge, collapsible hints

**T032 [P]**: QuizComponent Component (`src/components/QuizComponent/index.tsx`)
**Props**: `questions: QuizQuestion[], title?`
**Features**: Interactive quiz, immediate feedback, score tracking

**T033 [P]**: GlossaryTerm Component (`src/components/GlossaryTerm/index.tsx`)
**Props**: `term, definition, href?`
**Features**: Hover tooltip (use Radix UI or Headless UI)

**Validation** (for each): Import in Markdown, verify rendering

---

### T034: Register Global MDX Components

**Description**: Make custom components available in all Markdown files without imports

**File Path**: `textbook-platform/src/theme/MDXComponents.tsx`

**Starter Code**:
```typescript
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ExerciseSection from '@site/src/components/ExerciseSection';
import QuizComponent from '@site/src/components/QuizComponent';
import GlossaryTerm from '@site/src/components/GlossaryTerm';
import DiagramContainer from '@site/src/components/DiagramContainer';
import CodeBlock from '@site/src/components/CodeBlock';
import ChapterCard from '@site/src/components/ChapterCard';

export default {
  ...MDXComponents,
  ExerciseSection,
  QuizComponent,
  GlossaryTerm,
  DiagramContainer,
  CodeBlock,
  ChapterCard,
};
```

**Validation**:
```bash
# In any Markdown file, use component without import:
# <ExerciseSection title="Test" difficulty="beginner" ... />

npm start
# Expected: Component renders without "ExerciseSection is not defined" error
```

---

## Phase 4: Integration Tasks

**Purpose**: Connect Markdown content to UI, configure navigation

### T035: Configure Sidebar Navigation

**Description**: Set up auto-generated sidebar with 4 module categories

**File Path**: `textbook-platform/sidebars.js`

**Starter Code**:
```javascript
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
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
    {
      type: 'doc',
      id: 'about',
      label: 'About',
    },
  ],
};

module.exports = sidebars;
```

**Validation**:
```bash
npm start
# Expected: Sidebar shows 4 modules
# Expected: Each module expands to show chapter overview + lessons
# Expected: Active lesson highlighted
# Expected: Collapsible sections work
```

---

### T036: Create Homepage with ChapterCards

**Description**: Build homepage displaying 4 chapter cards

**File Path**: `textbook-platform/docs/index.md`

**Starter Code**:
```mdx
---
id: index
title: Physical AI & Humanoid Robotics
sidebar_position: 0
---

import ChapterCard from '@site/src/components/ChapterCard';

# Physical AI & Humanoid Robotics

A comprehensive academic textbook for graduate-level robotics education.

## Course Structure

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

## About This Textbook

This textbook provides a hands-on introduction to Physical AI and Humanoid Robotics using industry-standard tools (ROS 2, Gazebo, Unity, NVIDIA Isaac Sim). Each lesson includes:

- Clear learning objectives
- Technical deep dives with diagrams
- Executable code examples (ROS 2 Humble)
- Progressive exercises (beginner → advanced)
- Quizzes with immediate feedback
- Curated further reading

**Target Audience**: Graduate students, robotics professionals, self-directed learners with Python proficiency.

**Duration**: 13 weeks (semester format)

---

**Ready to begin?** Start with [Module 1: Physical AI Foundations](./book/chapters/module-1-physical-ai/) →
```

**Validation**:
```bash
npm start
# Navigate to /
# Expected: Homepage displays 4 chapter cards in grid layout
# Expected: Cards are clickable and navigate to chapter index pages
```

---

### T037: Create About Page

**Description**: Add about page with course information, licensing, contact

**File Path**: `textbook-platform/docs/about.md`

**Starter Code**:
```markdown
---
id: about
title: About This Textbook
sidebar_label: About
sidebar_position: 999
---

# About This Textbook

## Overview

*Physical AI & Humanoid Robotics* is a comprehensive, open-source textbook designed for graduate-level robotics courses and self-directed learners. It covers the complete spectrum from foundational concepts (Physical AI, ROS 2) to advanced topics (VLA models, conversational AI, locomotion).

## Course Structure

- **Duration**: 13 weeks (semester format)
- **Modules**: 4 (Physical AI Foundations, Robotics & Control, Simulation, Advanced Topics)
- **Lessons**: 13 (one per week)
- **Exercises**: 39 total (3 per lesson, progressive difficulty)
- **Quizzes**: 91 questions (7 per lesson)

## Technologies Covered

- **ROS 2 Humble Hawksbill** (industry-standard robotics middleware)
- **Python 3.10+** (primary language for ROS 2 development)
- **Gazebo Classic / Gazebo Sim** (physics simulation)
- **Unity 2022+ with Robotics Hub** (game-engine-based simulation)
- **NVIDIA Isaac Sim / Isaac Gym** (photorealistic rendering, RL)
- **VLA Models** (RT-1, RT-2, OpenVLA for language-conditioned manipulation)

## Licensing

- **Content License**: [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Code Examples License**: [MIT License](https://opensource.org/licenses/MIT)

You are free to use, adapt, and share this textbook for non-commercial educational purposes with attribution.

## Authors

This textbook was created using AI-assisted authoring tools with manual expert review for technical accuracy.

**Maintainers**: Open-source contributors (see [GitHub repository](https://github.com/DC/hackathon-claude))

## Contributing

We welcome contributions! To report errors, suggest improvements, or contribute new content:

1. **Open an issue**: [GitHub Issues](https://github.com/DC/hackathon-claude/issues)
2. **Submit a pull request**: Follow the [Contributing Guidelines](https://github.com/DC/hackathon-claude/blob/main/CONTRIBUTING.md)
3. **Join discussions**: [GitHub Discussions](https://github.com/DC/hackathon-claude/discussions)

## Contact

For questions, feedback, or collaboration inquiries:

- **Email**: [email protected]
- **GitHub**: [DC/hackathon-claude](https://github.com/DC/hackathon-claude)

## Acknowledgments

Special thanks to:
- The ROS 2 and Gazebo development teams
- NVIDIA for Isaac Sim and Isaac Gym
- Unity Technologies for Robotics Hub
- The open-source robotics community

---

**Version**: 1.0.0 | **Last Updated**: 2025-12-07 | **Status**: Active Development
```

**Validation**: Same as other Markdown pages

---

## Phase 5: Deployment Tasks

**Purpose**: Configure GitHub repository, set up CI/CD, deploy to GitHub Pages

### T038: Configure Docusaurus for GitHub Pages

**Description**: Update docusaurus.config.js with GitHub Pages settings

**File Path**: `textbook-platform/docusaurus.config.js`

**Diff to Apply**:
```javascript
// Update these fields in docusaurus.config.js:

module.exports = {
  // BEFORE:
  // url: 'https://your-docusaurus-test-site.com',
  // baseUrl: '/',

  // AFTER:
  url: 'https://DC.github.io',
  baseUrl: '/hackathon-claude/',
  organizationName: 'DC',
  projectName: 'hackathon-claude',

  onBrokenLinks: 'throw',  // Fail build on broken links
  onBrokenMarkdownLinks: 'warn',

  // ... rest of config
};
```

**Validation**:
```bash
# Build production site
npm run build

# Serve locally to test base URL
npm run serve
# Navigate to http://localhost:3000/hackathon-claude/
# Expected: Site loads correctly with base URL prefix
```

**Troubleshooting**:
- If assets 404: Verify baseUrl matches repository name
- If CSS broken: Check Tailwind PostCSS processing in production build

---

### T039: Add Build Scripts to package.json

**Description**: Add custom npm scripts for linting, testing, deployment

**File Path**: `textbook-platform/package.json`

**Diff to Apply**:
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
    // ADD THESE:
    "lint": "markdownlint docs/**/*.md",
    "lint:fix": "markdownlint --fix docs/**/*.md",
    "test:a11y": "axe http://localhost:3000",
    "test:lighthouse": "lighthouse http://localhost:3000 --output json --output-path=./lighthouse-report.json"
  }
}
```

**Validation**:
```bash
# Test lint script
npm run lint
# Expected: Lists Markdown issues or "No errors"

# Test lighthouse (requires dev server running)
npm start &
npm run test:lighthouse
# Expected: Generates lighthouse-report.json
```

---

### T040: Create GitHub Actions Deploy Workflow

**Description**: Set up automated deployment to GitHub Pages on push to main

**File Path**: `textbook-platform/.github/workflows/deploy.yml`

**Starter Code**:
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
          cache-dependency-path: textbook-platform/package-lock.json

      - name: Install dependencies
        working-directory: ./textbook-platform
        run: npm ci

      - name: Lint Markdown
        working-directory: ./textbook-platform
        run: npm run lint

      - name: Build site
        working-directory: ./textbook-platform
        run: npm run build

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./textbook-platform/build
          cname: textbook.example.com  # Optional: remove if no custom domain
```

**Commands**:
```bash
# Create .github directory
mkdir -p .github/workflows

# Create deploy.yml file (paste content above)
```

**Validation**:
```bash
# Commit and push workflow file
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
git push origin main

# Check GitHub Actions tab in repository
# Expected: Workflow runs successfully
# Expected: Site deploys to https://DC.github.io/hackathon-claude/
```

**Troubleshooting**:
- If workflow fails: Check GitHub Actions logs for specific error
- If permission denied: Enable GitHub Pages in repository settings, set source to gh-pages branch
- If 404 on deployed site: Verify baseUrl matches repository name

---

### T041: Create GitHub Actions Test Workflow

**Description**: Set up CI tests (lint, build, link check) on all pushes

**File Path**: `textbook-platform/.github/workflows/test.yml`

**Starter Code**:
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
          cache: 'npm'
          cache-dependency-path: textbook-platform/package-lock.json

      - name: Install dependencies
        working-directory: ./textbook-platform
        run: npm ci

      - name: Lint Markdown
        working-directory: ./textbook-platform
        run: npm run lint

      - name: Build
        working-directory: ./textbook-platform
        run: npm run build

      - name: Check bundle size
        working-directory: ./textbook-platform/build
        run: |
          BUNDLE_SIZE=$(find assets -name "*.js" -exec du -ch {} + | grep total | awk '{print $1}')
          echo "Total JS bundle size: $BUNDLE_SIZE"
          # Add size limit check if needed
```

**Validation**: Same as T040 (check GitHub Actions)

---

### T042: Enable GitHub Pages in Repository Settings

**Description**: Configure GitHub repository to serve from gh-pages branch

**Commands** (Manual Steps):
```
1. Navigate to GitHub repository: https://github.com/DC/hackathon-claude
2. Go to Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select branch: "gh-pages"
5. Select folder: "/ (root)"
6. Click Save
7. Wait 1-2 minutes for first deployment
8. Visit https://DC.github.io/hackathon-claude/
```

**Validation**:
```bash
# After workflow completes, visit deployed site
# Expected: Homepage loads with chapter cards
# Expected: Navigation works
# Expected: HTTPS enforced
```

---

## Phase 6: Validation & Testing

**Purpose**: Verify rendering, navigation, performance, accessibility

### T043: Test Rendering - Manual Checklist

**Description**: Verify all UI elements render correctly

**Manual Checklist**:
```bash
# Start dev server
cd textbook-platform
npm start

# Visit http://localhost:3000/hackathon-claude/

# Check homepage (/)
- [ ] 4 chapter cards display in grid layout
- [ ] Cards have correct titles, descriptions, lesson counts
- [ ] Cards clickable, navigate to chapter index pages
- [ ] Header displays logo, navigation menu
- [ ] Dark mode toggle visible (may not function yet - full implementation in future task)

# Check Chapter 1 index page
- [ ] Chapter overview displays module introduction
- [ ] Links to Week 1-3 lessons work
- [ ] Breadcrumbs show: Home > Module 1

# Check Week 1 lesson page
- [ ] All 12 sections present (Learning Objectives → Further Reading)
- [ ] Code examples have syntax highlighting
- [ ] ASCII diagrams display in DiagramContainer
- [ ] Exercises expandable (if interactive component complete)
- [ ] Quiz renders (if QuizComponent complete)
- [ ] Glossary terms have hover tooltips (if GlossaryTerm complete)

# Check sidebar
- [ ] Sidebar displays 4 module categories
- [ ] Each module expands to show lessons
- [ ] Active lesson highlighted
- [ ] Collapsible sections work

# Check responsive design
- [ ] Resize browser to 375px width (mobile)
- [ ] Layout stacks vertically, no horizontal scroll
- [ ] Sidebar collapses to hamburger menu (if implemented)
- [ ] Code blocks readable without zooming
```

**Validation**: All checklist items pass

**Troubleshooting**:
- If components missing: Verify MDXComponents.tsx registration
- If layout broken: Check Tailwind classes, CSS conflicts
- If responsive issues: Test breakpoints in tailwind.config.js

---

### T044: Test Build Pipeline

**Description**: Verify production build succeeds without errors

**Commands**:
```bash
cd textbook-platform

# Clean previous build
npm run clear

# Run production build
npm run build
# Expected: Build succeeds with "Success! Generated static files in 'build'."
# Expected: No errors or warnings in output

# Check build output size
du -sh build/
# Expected: Total size < 50MB

# Check JS bundle sizes
find build/assets -name "*.js" -exec ls -lh {} \; | awk '{print $5, $9}'
# Expected: No single bundle > 500KB

# Serve production build locally
npm run serve
# Visit http://localhost:3000/hackathon-claude/
# Expected: Site works identically to dev server
```

**Validation**:
- Build exit code 0 (no errors)
- Build warnings < 5 (document any warnings)
- Bundle size within budget
- Production site renders correctly

---

### T045: Test Link Validation

**Description**: Check for broken internal links

**Commands**:
```bash
cd textbook-platform

# Install broken-link-checker (if not already installed)
npm install -D broken-link-checker

# Start production server
npm run serve &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Run link checker
npx broken-link-checker http://localhost:3000/hackathon-claude/ --recursive --exclude external --filter-level 3

# Stop server
kill $SERVER_PID

# Expected: No broken internal links (exit code 0)
# Expected: External links may show errors (429, 403) - acceptable for now
```

**Validation**:
- 0 broken internal links
- All chapter/lesson navigation works
- Relative paths resolve correctly

**Troubleshooting**:
- If links broken: Check Markdown relative paths (should be `./lesson.md` not `/lesson.md`)
- If 404 errors: Verify file paths match frontmatter IDs

---

### T046: Test Performance - Lighthouse Audit

**Description**: Run Lighthouse performance audit on key pages

**Commands**:
```bash
cd textbook-platform

# Ensure lighthouse installed
npm install -D lighthouse

# Start production server
npm run serve &
SERVER_PID=$!
sleep 5

# Run Lighthouse audit on homepage (desktop)
lighthouse http://localhost:3000/hackathon-claude/ \
  --output html \
  --output-path=./lighthouse-homepage-desktop.html \
  --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo

# Run Lighthouse audit on lesson page (mobile)
lighthouse http://localhost:3000/hackathon-claude/book/chapters/module-1-physical-ai/week-01-intro-physical-ai \
  --output html \
  --output-path=./lighthouse-lesson-mobile.html \
  --preset=mobile \
  --only-categories=performance,accessibility,best-practices,seo

# Stop server
kill $SERVER_PID

# Open HTML reports
# Expected: All scores > 90 (desktop) or > 85 (mobile)
```

**Validation**:
- Performance > 90 (desktop), > 85 (mobile)
- Accessibility > 90
- Best Practices > 90
- SEO > 90

**Troubleshooting**:
- If performance low: Check bundle sizes, enable code splitting
- If accessibility issues: Run `npm run test:a11y` for details
- If SEO low: Add meta tags in docusaurus.config.js

---

### T047: Test Accessibility - Automated Audit

**Description**: Run axe accessibility audit

**Commands**:
```bash
cd textbook-platform

# Ensure axe-core/cli installed
npm install -D @axe-core/cli

# Start dev server
npm start &
SERVER_PID=$!
sleep 10

# Run axe audit
axe http://localhost:3000/hackathon-claude/ --exit

# Stop server
kill $SERVER_PID

# Expected: 0 critical or serious violations
# Expected: < 5 moderate violations (document any)
```

**Validation**:
- 0 critical violations
- 0 serious violations
- < 5 moderate violations (acceptable if documented)

**Troubleshooting**:
- If color contrast fails: Update Tailwind colors in tailwind.config.js
- If ARIA issues: Add proper roles to custom components
- If heading hierarchy broken: Fix Markdown heading levels

---

### T048: Test Keyboard Navigation

**Description**: Verify all interactive elements accessible via keyboard

**Manual Checklist**:
```bash
# Start dev server
npm start

# Visit http://localhost:3000/hackathon-claude/

# Test keyboard navigation:
- [ ] Press Tab: Focus moves through all interactive elements (links, buttons)
- [ ] Focus indicators visible (outline/ring on focused elements)
- [ ] Press Enter on chapter card: Navigates to chapter
- [ ] Press Enter on sidebar lesson: Navigates to lesson
- [ ] Press Escape (if modal/tooltip open): Closes modal/tooltip
- [ ] Press Arrow keys in sidebar: Expands/collapses categories (if implemented)
- [ ] All interactive elements reachable without mouse
```

**Validation**: All checklist items pass

---

### T049: End-to-End User Journey - Student

**Description**: Simulate student using textbook from homepage to quiz

**Manual Test Steps**:
```
1. Open homepage (/)
   ✓ See 4 chapter cards

2. Click "Module 1: Physical AI Foundations"
   ✓ Navigate to module overview
   ✓ See chapter introduction, learning outcomes, lesson links

3. Click "Week 1: Introduction to Physical AI"
   ✓ Lesson loads in < 3 seconds
   ✓ All 12 sections visible

4. Read lesson content
   ✓ Headings clear, typography readable
   ✓ Diagrams display correctly

5. Copy Python code example (Example 1)
   ✓ Code block has copy button
   ✓ Code copies to clipboard
   ✓ Paste into local editor: code is valid Python

6. Complete Exercise 1 (beginner)
   ✓ Exercise description clear
   ✓ Hints helpful (if collapsible implemented)
   ✓ Expected outcome stated

7. Take quiz
   ✓ 7 questions render
   ✓ Select answers, submit
   ✓ Immediate feedback with explanations (if interactive implemented)

8. Review summary
   ✓ All key concepts recapped

9. Hover over glossary term
   ✓ Tooltip shows definition (if GlossaryTerm implemented)

10. Click "Next" button (if navigation implemented)
    ✓ Navigate to Week 2

11. Check sidebar
    ✓ Active lesson highlighted
```

**Validation**: All steps complete successfully

---

### T050: Deployment Validation - GitHub Pages

**Description**: Verify deployed site on GitHub Pages

**Manual Steps**:
```
1. Commit all changes to main branch
   git add .
   git commit -m "feat: complete textbook platform MVP"
   git push origin main

2. Wait for GitHub Actions workflow to complete (2-5 minutes)
   Visit: https://github.com/DC/hackathon-claude/actions
   ✓ Workflow status: Success (green checkmark)

3. Visit deployed site
   https://DC.github.io/hackathon-claude/
   ✓ Homepage loads
   ✓ HTTPS enforced (lock icon in browser)

4. Test navigation
   ✓ All chapter links work
   ✓ All lesson links work
   ✓ No 404 errors

5. Check service worker (if PWA implemented)
   Open DevTools > Application > Service Workers
   ✓ Service worker registered
   ✓ Status: Activated

6. Test offline mode
   Load a lesson page
   Disable network in DevTools
   Reload page
   ✓ Page loads from cache

7. Test PWA install (mobile)
   Open site on mobile browser
   ✓ "Install" prompt appears (or Add to Home Screen in menu)
```

**Validation**: All steps pass, site production-ready

---

## Dependency Graph

**Phase Dependencies**:
- **Phase 1** (Setup) → No dependencies
- **Phase 2** (Content) → Depends on Phase 1 complete
- **Phase 3** (Frontend) → Depends on Phase 1 complete (can run parallel with Phase 2)
- **Phase 4** (Integration) → Depends on Phases 2 AND 3 complete
- **Phase 5** (Deployment) → Depends on Phases 1-4 complete
- **Phase 6** (Validation) → Depends on Phases 1-5 complete

**Within-Phase Parallelization**:
- **Phase 1**: Tasks T003-T006 can run in parallel (marked [P])
- **Phase 2**: Tasks T008-T011 (chapter overviews) can run in parallel; Tasks T012-T024 (lessons) can run in parallel
- **Phase 3**: Tasks T025-T033 (components) can run in parallel

**Critical Path** (longest dependency chain):
```
T001 (Init Docusaurus)
→ T002 (Install deps)
→ T007 (Create content dirs)
→ T012 (Week 1 lesson - longest content task ~2-3 hours)
→ T034 (Register MDX components)
→ T035 (Configure sidebar)
→ T038 (Configure GitHub Pages)
→ T040 (Create deploy workflow)
→ T042 (Enable GitHub Pages)
→ T050 (Deployment validation)
```

**Estimated Timeline**:
- **Phase 1** (Setup): 1-2 hours
- **Phase 2** (Content): 1-2 weeks (AI-assisted generation + manual review)
- **Phase 3** (Frontend): 1 week (component development)
- **Phase 4** (Integration): 1-2 days
- **Phase 5** (Deployment): 1 day
- **Phase 6** (Validation): 1-2 days

**Total**: ~3-4 weeks for full implementation

---

## Troubleshooting Guide

### Common Issues & Solutions

**Issue**: npm install fails with peer dependency errors
**Solution**: Use `npm install --legacy-peer-deps` or upgrade npm to latest version

**Issue**: Tailwind classes not applying
**Solution**: Verify PostCSS config includes Tailwind plugin; restart dev server

**Issue**: Custom components not rendering in Markdown
**Solution**: Check MDXComponents.tsx registration; ensure component exported as default

**Issue**: Sidebar navigation broken
**Solution**: Verify frontmatter `sidebar_position` in Markdown files; check sidebars.js config

**Issue**: GitHub Pages shows 404
**Solution**: Verify `baseUrl` in docusaurus.config.js matches repository name; check gh-pages branch exists

**Issue**: Lighthouse performance score low
**Solution**: Analyze bundle sizes (`npm run build --profile`); enable code splitting; lazy load non-critical components

**Issue**: Build fails with "Cannot find module"
**Solution**: Run `npm install` to ensure dependencies installed; check import paths

**Issue**: Dark mode not working
**Solution**: Verify Tailwind `darkMode` config uses `[data-theme="dark"]`; check Docusaurus theme settings

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- Each task includes exact file paths, commands, and validation steps
- Starter code provided for configuration files and components
- Use template structure from T012 (Week 1) for all lesson files
- All constitution principles validated in plan.md (no violations)
- Estimated 3-4 weeks total implementation time with AI-assisted content generation
- Commit after each phase completion for incremental progress

---

## Next Steps

After completing all tasks:

1. **Content Quality Review**: Expert review of all 13 lesson files for technical accuracy
2. **Code Example Testing**: Execute all ROS 2 Python examples in Humble environment
3. **Citation Verification**: Validate all external references are accessible
4. **Performance Optimization**: If Lighthouse scores < 90, implement code splitting and lazy loading
5. **Accessibility Audit**: Fix any remaining WCAG violations
6. **Beta Testing**: Deploy preview site, gather feedback from pilot users (students, instructors)
7. **Documentation**: Write developer README, contributing guidelines
8. **Versioning**: Tag release as v1.0.0, create CHANGELOG.md

**Command to track progress**: Update tasks.md checkboxes as tasks complete
