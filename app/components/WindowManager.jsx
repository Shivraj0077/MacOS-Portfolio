import { AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import AppRegistry from '../registry/appRegistry'
import Window from './Window'
import ErrorBoundary from './ErrorBoundary'

export default function WindowManager() {
  const openApps = useStore((state) => state.openApps)
  const activeApp = useStore((state) => state.activeApp)
  const appStates = useStore((state) => state.appStates)

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {openApps.map((appId) => {
          const app = AppRegistry[appId]
          const state = appStates[appId]
          if (!app || !app.component || state?.isMinimized) return null
          
          const AppComponent = app.component
          
          return (
            <Window 
              key={appId}
              app={app} 
              isActive={activeApp === appId}
            >
              <ErrorBoundary>
                <AppComponent />
              </ErrorBoundary>
            </Window>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
