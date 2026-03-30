import { create } from 'zustand'

const useStore = create((set, get) => ({
  openApps: [], // ['finder', 'terminal']
  activeApp: null,
  wallpaper: '/wallpaper2.jpg',
  appStates: {
    // app_id: { x, y, width, height, isMaximized }
  },

  openApp: (appId) => set((state) => {
    // If already open, just focus and restore if minimized
    if (state.openApps.includes(appId)) {
        return { 
          activeApp: appId,
          appStates: {
            ...state.appStates,
            [appId]: { ...state.appStates[appId], isMinimized: false }
          }
        };
    }
    
    // Custom initial sizes for apps
    let initialWidth = 800;
    let initialHeight = 580;
    if (appId === 'calculator') { initialWidth = 280; initialHeight = 400; }
    if (appId === 'maze') { initialWidth = 600; initialHeight = 620; }
    if (appId === 'safari' || appId === 'projects') { initialWidth = 1000; initialHeight = 650; }

    // Calculate staggered offset
    const offset = (state.openApps.length % 5) * 30;
    const initialPos = { 
      x: 100 + offset, 
      y: 80 + offset, 
      width: initialWidth, 
      height: initialHeight,
      isMaximized: false,
      isMinimized: false
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

  focusApp: (appId) => set({ activeApp: appId }),

  setWallpaper: (url) => set({ wallpaper: url }),

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
          // Always restore from maximized when minimizing
          isMaximized: isCurrentlyMinimized ? current?.isMaximized : false
        }
      }
    }
  }),

  isSomethingMaximized: () => {
    const states = get().appStates;
    // Only count windows that are maximized AND visible (not minimized)
    return Object.values(states).some(s => s.isMaximized && !s.isMinimized);
  }
}))

export default useStore
