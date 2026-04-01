import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWindowStore = create((set, get) => ({
  openApps: [], // ['finder', 'terminal']
  activeApp: null,
  appStates: {}, // app_id: { x, y, width, height, isMaximized, isMinimized, zIndex }

  openApp: (appId) => set((state) => {
    // If already open, just focus and restore if minimized
    if (state.openApps.includes(appId)) {
        const nextZ = Math.max(...Object.values(state.appStates).map(s => s.zIndex || 0), 100) + 1;
        return { 
          activeApp: appId,
          appStates: {
            ...state.appStates,
            [appId]: { 
              ...state.appStates[appId], 
              isMinimized: false,
              zIndex: nextZ 
            }
          }
        };
    }
    
    // Custom initial sizes for apps
    let initialWidth = 800;
    let initialHeight = 580;
    if (appId === 'calculator') { initialWidth = 280; initialHeight = 400; }
    if (appId === 'maze') { initialWidth = 820; initialHeight = 640; }
    if (appId === 'safari' || appId === 'projects') { initialWidth = 1000; initialHeight = 650; }

    // Calculate staggered offset
    const offset = (state.openApps.length % 5) * 30;
    const nextZ = Math.max(...Object.values(state.appStates).map(s => s.zIndex || 0), 100) + 1;
    const initialPos = { 
      x: 100 + offset, 
      y: 80 + offset, 
      width: initialWidth, 
      height: initialHeight,
      isMaximized: false,
      isMinimized: false,
      zIndex: nextZ
    };

    return {
      openApps: [...state.openApps, appId],
      activeApp: appId,
      appStates: {
        ...state.appStates,
        [appId]: initialPos
      }
    };
  }),

  closeApp: (appId) => set((state) => ({
    openApps: state.openApps.filter(id => id !== appId),
    activeApp: state.activeApp === appId ? (state.openApps.length > 1 ? state.openApps[state.openApps.length - 2] : null) : state.activeApp
  })),

  focusApp: (appId) => set((state) => {
    if (state.activeApp === appId) return {};
    const nextZ = Math.max(...Object.values(state.appStates).map(s => s.zIndex || 0), 100) + 1;
    return { 
      activeApp: appId, 
      appStates: {
        ...state.appStates,
        [appId]: { ...state.appStates[appId], zIndex: nextZ }
      }
    };
  }),

  updateAppPosition: (appId, pos) => set((state) => ({
    appStates: {
      ...state.appStates,
      [appId]: { ...state.appStates[appId], ...pos }
    }
  })),

  toggleMaximize: (appId) => set((state) => ({
    appStates: {
      ...state.appStates,
      [appId]: { 
        ...state.appStates[appId], 
        isMaximized: !state.appStates[appId]?.isMaximized 
      }
    }
  })),

  toggleMinimize: (appId) => set((state) => {
    const current = state.appStates[appId]
    const isCurrentlyMinimized = current?.isMinimized
    return {
      appStates: {
        ...state.appStates,
        [appId]: { 
          ...current, 
          isMinimized: !isCurrentlyMinimized,
          isMaximized: isCurrentlyMinimized ? current?.isMaximized : false
        }
      }
    }
  }),

  isSomethingMaximized: () => {
    const states = get().appStates;
    return Object.values(states).some(s => s.isMaximized && !s.isMinimized);
  }
}))

export const useSystemStore = create(
  persist(
    (set) => ({
      wallpaper: '/wallpaper2.jpg',
      theme: 'dark', // 'light' | 'dark'
      brightness: 100,
      volume: 70,
      nowPlaying: null,

      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setWallpaper: (url) => set({ wallpaper: url }),
      setBrightness: (val) => set({ brightness: val }),
      setVolume: (val) => set({ volume: val }),
      setNowPlaying: (obj) => set({ nowPlaying: obj }),
    }),
    {
      name: 'system-storage',
      getStorage: () => (typeof window !== 'undefined' ? localStorage : null),
    }
  )
)

// For backward compatibility (legacy items)
const useStore = () => {
  const windowStore = useWindowStore();
  const systemStore = useSystemStore();
  return { ...windowStore, ...systemStore };
}

export default useStore;
