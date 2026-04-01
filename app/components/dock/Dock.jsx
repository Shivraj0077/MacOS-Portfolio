import { useRef, useEffect } from "react"
import { useMotionValue } from "framer-motion"
import DockItem from "./DockItem"
import styles from "./dock.module.css"
import AppRegistry from "@/app/registry/appRegistry"
import useStore from "@/app/store/useStore"

const dockAppIds = [
  "finder",
  "safari",
  "launchpad",
  "about",
  "projects",
  "terminal",
  "notes",
  "spotify",
  "contact",
  "experience",
  "maze",
  "calculator",
  "bin",
  "settings",
  "github",
  "linkedin",
]

export function Dock() {
  const mouseX = useMotionValue(null)
  return (
    <div className={styles.dockContainer}>
      <div 
        className={styles.dockWrapper}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          gap: '10px',
          padding: '8px 12px',
        }}
      >
        {dockAppIds.map((id) => {
          const app = AppRegistry[id]
          if (!app) return null
          
          return (
            <DockItem 
              key={id} 
              app={{ ...app, title: app.name }} 
              mouseX={mouseX}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dock