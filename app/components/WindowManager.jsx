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
              <AppComponent />
            </ErrorBoundary>
          </Window>
        )
      })}
    </div>
  )
}