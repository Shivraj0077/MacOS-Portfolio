#  macOS Portfolio — Next.js 16 Interactive Desktop

<div align="center">

![macOS Portfolio Banner](https://img.shields.io/badge/macOS-Sequoia%20UI-000000?style=for-the-badge&logo=apple&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-764ABC?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)

*An interactive, fully functional macOS-inspired web experience built to turn a standard developer portfolio into an immersive digital playground.*

[✨ Live Demo](#) • [🚀 Quick Start](#-quick-start) • [⚡ Features](#-features--apps) • [⌨️ Keyboard Shortcuts](#%EF%B8%8F-keyboard-shortcuts) • [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)

---

</div>

## 💡 Why This Project?

Traditional portfolios are great, but static pages often fail to capture the depth of what we build as developers. 

**macOS Portfolio** reimagines the developer portfolio as a living operating system inside your browser. Every window is draggable, resizable, and depth-managed. Every icon launches a real app—from a working UNIX terminal and custom web browser to dynamic project viewers, maps, and even a mini arcade maze game.

It's designed to be fast, fluid, accessible, and most importantly—fun to explore.

---

## ⚡ Features & Built-in Apps

### 🖥️ Core Desktop Experience
- **Window Management Engine**: Real-time z-index layering, window minimize/maximize/close, dragging, and resizing powered by `react-rnd` and `Zustand`.
- **Top Menu Bar & Control Center**: Dynamic clock, status indicators, theme toggles, sound controls, and system preferences.
- **Dynamic Dock**: Magnification hover effects, active app indicators, and responsive positioning.
- **Spotlight Search (`Cmd + Space` / `Cmd + K`)**: Lightning-fast command palette to launch apps, search projects, or jump straight to links.
- **Bootloader & Lock Screen**: Authentic Apple startup sequence with audio cues, user login, and screen lock capabilities.

### 📱 Built-in macOS Applications
| Icon | Application | Description |
| :--- | :--- | :--- |
| 📁 | **Finder** | Navigate through virtual file directories, view projects, read docs, and inspect file metadata. |
| 💻 | **Terminal** | Fully functional interactive shell with custom commands (`help`, `cat`, `ls`, `clear`, `about`, `matrix`, secrets & easter eggs). |
| 🌐 | **Safari Browser** | Custom web container featuring interactive embedded previews for platforms like Codeforces, LeetCode, LinkedIn, and GitHub. |
| 📝 | **Notes** | Markdown-rendered view of personal thoughts, engineering philosophy, tech stack details, and quick snippets. |
| 🚀 | **Projects & Experience** | Visual showcase of key engineering work, live links, code repositories, and timeline milestones. |
| 🎮 | **Maze Game** | Built-in arcade mini-game for visitors who want to take a break while exploring. |
| 🗺️ | **Maps** | Interactive spatial geospatial viewer powered by Leaflet & Mapbox GL. |
| 🎵 | **Spotify / Music** | Embedded audio player to set the vibe while browsing the portfolio. |
| 🧮 | **Calculator & Photos** | Utilities and image gallery with lightbox view. |
| 🗑️ | **Bin / Trash** | Real trash bin with item restore capabilities and secret Easter eggs. |

---

## 🛠️ Tech Stack

Built using modern web technologies focused on performance, modularity, and smooth 60fps animations:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **UI Library**: [React 19](https://react.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Global window state, focused app hierarchy, active themes)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for glassmorphism effects
- **Window Drag & Resize**: [React-RND](https://github.com/bokuweb/react-rnd)
- **Animations & Motion**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Icons & Visuals**: [Lucide React](https://lucide.dev/)
- **Maps**: [Mapbox GL](https://www.mapbox.com/) & [Leaflet](https://leafletjs.com/)

---

## ⚡ Speed & Performance Optimizations

Engineered to deliver desktop-class responsiveness directly inside the web browser while maintaining a lightweight footprint:

### 🚀 1. Dynamic Code Splitting & On-Demand App Bundling
- **Lazy Application Loading**: heavy modules (e.g., Mapbox, Leaflet, Arcade Maze game engine, GSAP animations) are dynamically imported using `next/dynamic`. They only download when an application window is opened for the first time, keeping the initial bundle size exceptionally tiny.

### 🏎️ 2. 60 FPS Window Dragging & Hardware Acceleration
- **GPU-Accelerated Compositing**: Window positions use CSS `transform: translate3d(...)` instead of layout-triggering `top`/`left` properties, offloading calculations directly to the GPU.
- **Selective React Re-renders**: Window z-indexes, position state, and active focus are managed via **Zustand fine-grained slice selectors**. Dragging a window does *not* trigger re-renders across other open desktop windows or background UI.

### 📦 3. Zero Memory Leaks & DOM Cleanups
- **Smart Window Disposal**: When an application window is closed, it is cleanly unmounted from the DOM rather than visually hidden, preventing DOM node buildup during extended sessions.
- **Resource Cleanup**: Timers, audio contexts, web workers, and event listeners attached to individual apps are properly disposed of on window unmount.

### 🎨 4. Sub-Second Initial Load (LCP & TBT Optimization)
- **Next.js 16 App Router SSR**: The core desktop shell, Dock, and Menu Bar render on the server, ensuring immediate Largest Contentful Paint (LCP) and zero layout shifts (CLS).
- **Optimized Asset Pipeline**: Wallpapers and heavy icons leverage WebP format with strict caching headers and responsive Next.js Image optimization (`next/image`).

---

## 🚀 Quick Start

Get the portfolio running on your local machine in under two minutes:

### Prerequisites
Make sure you have Node.js 18+ and `npm` (or `pnpm` / `bun`) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mac-portfolio.git
   cd mac-portfolio/Mac-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to launch your local macOS session!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd` / `Ctrl` + `K` | Open Spotlight Search |
| `Cmd` / `Ctrl` + `Space` | Toggle Spotlight Command Palette |
| `Esc` | Close active modal / Spotlight |
| `Cmd` / `Ctrl` + `Alt` + `T` | Launch Terminal |

---

## 🎨 Customization Guide

Want to tailor this macOS portfolio for yourself? Here is how to make it your own:

1. **Personal Information & Experience**: Edit `app/apps/About.jsx`, `app/apps/Experience.jsx`, and `app/apps/Projects.jsx`.
2. **Terminal Commands**: Add your own shell commands or easter eggs in `app/apps/Terminal.jsx`.
3. **Wallpapers & Themes**: Add custom high-res background images to `/public/wallpapers/` and configure choices inside `app/apps/Settings.jsx`.
4. **Links & Contact**: Update social links and email endpoints in `app/apps/Contact.jsx`.

---

## 🤝 Contributing

Contributions, feedback, and star ratings are always welcome! Feel free to open an issue or submit a pull request if you'd like to add new macOS apps or performance enhancements.

```bash
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/CoolNewApp)
3. Commit your Changes (git commit -m 'Add custom macOS app')
4. Push to the Branch (git push origin feature/CoolNewApp)
5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">

Crafted with ❤️ and a touch of Apple magic.

[Back to top ↑](#-macos-portfolio--nextjs-16-interactive-desktop)

</div>

