import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import DockItem from "./DockItem"
import styles from "./dock.module.css"
import AppRegistry from "@/app/registry/appRegistry"
import useStore from "@/app/store/useStore"

// List of apps to show on the dock
const dockAppIds = [
  "finder",
  "launchpad",
  "projects",
  "safari",
  "maps",
  "photos",
  "notes",
  "terminal",
  "spotify",
  "maze",
  "calculator",
  "settings",
  "github",
  "linkedin",
  "bin"
]

export function Dock() {
  const dockRef = useRef(null)
  const [mouseX, setMouseX] = useState(Infinity)
  const [closestIndex, setClosestIndex] = useState(-1)

  const isSomethingMaximized = useStore((state) => state.appStates && Object.values(state.appStates).some(s => s.isMaximized))

  useEffect(() => {
    const shouldHide = isSomethingMaximized && mouseX === Infinity
    gsap.to(
      dockRef.current,
      {
        y: shouldHide ? 120 : 0,
        opacity: shouldHide ? 0 : 1,
        duration: 0.6,
        ease: "power3.inOut",
      }
    )
  }, [isSomethingMaximized, mouseX])

  useEffect(() => {
    if (mouseX === Infinity || !dockRef.current) {
      if (closestIndex !== -1) setClosestIndex(-1)
      return
    }

    const items = dockRef.current.children
    let minDistance = Infinity
    let index = -1

    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const distance = Math.abs(mouseX - centerX)
      if (distance < minDistance) {
        minDistance = distance
        index = i
      }
    }

    if (index !== closestIndex) {
      setClosestIndex(index)
    }
  }, [mouseX, closestIndex])

  return (
    <div className={styles.dockContainer}>
      <div 
        ref={dockRef} 
        className={styles.dockWrapper}
        onMouseMove={(e) => setMouseX(e.pageX)}
        onMouseLeave={() => setMouseX(Infinity)}
      >
        {dockAppIds.map((id, index) => {
          const app = AppRegistry[id]
          if (!app) return null
          
          return (
            <DockItem 
              key={id} 
              app={{ ...app, title: app.name }} 
              mouseX={mouseX}
              isClosest={index === closestIndex}
              isRightNeighbor={index === closestIndex + 1}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dock