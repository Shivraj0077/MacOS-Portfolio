import dynamic from 'next/dynamic'

const createAppLoader = (importFn) => {
  const component = dynamic(importFn, { ssr: false });
  component.preload = importFn;
  return component;
};

const AppRegistry = {
  finder: {
    id: "finder",
    name: "Finder",
    component: createAppLoader(() => import('../apps/Finder')),
    icon: "/finder.svg"
  },
  launchpad: {
    id: "launchpad",
    name: "Launchpad",
    component: createAppLoader(() => import('../apps/Launchpad')),
    icon: "/Launch Pad.svg"
  },
  projects: {
    id: "projects",
    name: "Projects",
    component: createAppLoader(() => import('../apps/Projects')),
    icon: "/app-store.svg"
  },
  safari: {
    id: "safari",
    name: "Safari",
    component: createAppLoader(() => import('../apps/Safari')),
    icon: "/safari.svg"
  },
  notes: {
    id: "notes",
    name: "Notes",
    component: createAppLoader(() => import('../apps/Notes')),
    icon: "/notes.svg"
  },
  photos: {
    id: "photos",
    name: "Photos",
    component: createAppLoader(() => import('../apps/Photos')),
    icon: "/photos.svg"
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    component: createAppLoader(() => import('../apps/Terminal')),
    icon: "/terminal.svg"
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    component: createAppLoader(() => import('../apps/Spotify')),
    icon: "/spotify.svg"
  },
  settings: {
    id: "settings",
    name: "Settings",
    component: createAppLoader(() => import('../apps/Settings')),
    icon: "/settings.svg"
  },
  calculator: {
    id: "calculator",
    name: "Calculator",
    component: createAppLoader(() => import('../apps/Calculator')),
    icon: "/calculator.svg",
    resizable: false,
    maximizable: false
  },
  maze: {
    id: "maze",
    name: "Maze",
    component: createAppLoader(() => import('../apps/Maze')),
    icon: "/maze.svg",
    resizable: false
  },
  github: {
    id: "github",
    name: "GitHub",
    url: "https://github.com/Shivraj0077",
    icon: "/github.svg"
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/shivrajpawar",
    icon: "/linkedin.svg"
  },
  bin: {
    id: "bin",
    name: "Bin",
    component: createAppLoader(() => import('../apps/Bin')),
    icon: "/trash.png"
  },
  maps: {
    id: "maps",
    name: "Maps",
    component: createAppLoader(() => import('../apps/Maps')),
    icon: "/maps.png"
  },
};

export default AppRegistry;
