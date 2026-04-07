"use client"
import { lazy } from 'react'

const Finder = lazy(() => import('../apps/Finder'))
const Launchpad = lazy(() => import('../apps/Launchpad'))
const Projects = lazy(() => import('../apps/Projects'))
const Safari = lazy(() => import('../apps/Safari'))
const Notes = lazy(() => import('../apps/Notes'))
const Terminal = lazy(() => import('../apps/Terminal'))
const Spotify = lazy(() => import('../apps/Spotify'))
const Settings = lazy(() => import('../apps/Settings'))
const Calculator = lazy(() => import('../apps/Calculator'))
const Maze = lazy(() => import('../apps/Maze'))
const Bin = lazy(() => import('../apps/Bin'))
const About = lazy(() => import('../apps/About'))
const Contact = lazy(() => import('../apps/Contact'))
const Experience = lazy(() => import('../apps/Experience'))

const AppRegistry = {
  finder: { id: "finder", name: "Finder", component: Finder, icon: "/finder.svg" },
  launchpad: { id: "launchpad", name: "Launchpad", component: Launchpad, icon: "/Launch Pad.svg" },
  about: { id: "about", name: "About Me", component: About, icon: "/about.svg" },
  projects: { id: "projects", name: "Projects", component: Projects, icon: "/app-store.svg" },
  contact: { id: "contact", name: "Contact", component: Contact, icon: "/mail.png" },
  experience: { id: "experience", name: "Experience", component: Experience, icon: "/projects.svg" },
  safari: { id: "safari", name: "Safari", component: Safari, icon: "/safari.svg" },
  notes: { id: "notes", name: "Notes", component: Notes, icon: "/notes.svg" },
  terminal: { id: "terminal", name: "Terminal", component: Terminal, icon: "/terminal.svg" },
  spotify: { id: "spotify", name: "Spotify", component: Spotify, icon: "/spotify.svg" },
  settings: { id: "settings", name: "Settings", component: Settings, icon: "/settings.svg" },
  calculator: { id: "calculator", name: "Calculator", component: Calculator, icon: "/calculator.svg", resizable: false, maximizable: false, minWidth: 280, minHeight: 400 },
  maze: { id: "maze", name: "Maze", component: Maze, icon: "/maze.svg", resizable: false },
  github: { id: "github", name: "GitHub", url: "https://github.com/Shivraj0077", icon: "/github.svg" },
  linkedin: { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/shivraj-pawar-4a632837b", icon: "/linkedin.svg" },
  bin: { id: "bin", name: "Bin", component: Bin, icon: "/trash.png" }
};

export default AppRegistry;
