# Physical AI & Humanoid Robotics Textbook

A comprehensive academic textbook built with Docusaurus, covering ROS 2, simulation, AI integration, and humanoid robotics.

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.x LTS** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Ubuntu 22.04** (recommended for ROS 2 examples)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```
   Opens browser at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Serve production build**:
   ```bash
   npm run serve
   ```

---

## 📦 Project Structure

```
textbook-platform/
├── docs/book/chapters/       # 13 weeks of lessons across 4 modules
├── src/components/           # React components (Header, ChapterCard, etc.)
├── src/theme/                # Custom Docusaurus theme
├── tailwind.config.js        # Tailwind CSS configuration
└── docusaurus.config.ts      # Docusaurus configuration
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run serve` | Serve built site |
| `npm run lint:md` | Lint Markdown files |

---

## 📚 Course Syllabus

**13 Weeks** covering:
1. Week 1-4: ROS 2 Foundations (Physical AI, Humanoid Robots, ROS 2 Architecture)
2. Week 5-7: Simulation (Gazebo, Unity, NVIDIA Isaac Sim)
3. Week 8-9: Sensors & AI (LiDAR, Cameras, VLA Models)
4. Week 10-13: Advanced Topics (Conversational AI, Locomotion, IK, Capstone)

---

## 🌐 Deployment

**GitHub Pages** (automatic on push to main):
```bash
git add .
git commit -m "Deploy textbook"
git push origin main
```

---

## 📄 License

Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

---

**Built with** Docusaurus + React + Tailwind CSS + ROS 2
