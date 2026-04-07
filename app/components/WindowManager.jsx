import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { useWindowStore } from '../store/useStore'
import AppRegistry from '../registry/appRegistry'
import Window from './Window'
import ErrorBoundary from './ErrorBoundary'

export default function WindowManager() {
  const openApps = useWindowStore(state => state.openApps)
  const activeApp = useWindowStore(state => state.activeApp)
  const appStates = useWindowStore(state => state.appStates)

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      {openApps.map((appId) => {
        const app = AppRegistry[appId]
        if (!app || !app.component) return null

        const state = appStates[appId]
        if (state?.isMinimized) return null

        const AppComponent = app.component

        return (
          <Window 
            key={appId}
            app={app} 
            isActive={activeApp === appId}
          >
            <ErrorBoundary>
              <Suspense fallback={
                <div className="flex items-center justify-center w-full h-full bg-white/50 dark:bg-black/50 backdrop-blur-md">
                   <div className="w-8 h-8 border-2 border-zinc-400 dark:border-zinc-600 border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <AppComponent />
              </Suspense>
            </ErrorBoundary>
          </Window>
        )
      })}
    </div>
  )
}