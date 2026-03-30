import { useRef, useState, useEffect } from "react"
import styles from "./dock.module.css"
import useStore from "@/app/store/useStore"
import AppRegistry from "@/app/registry/appRegistry"

export default function DockItem({ app, isClosest, isRightNeighbor, mouseX }) {
  const itemRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeout = useRef(null)
  const openApp = useStore((state) => state.openApp)

  const BASE_SIZE = 48

  useEffect(() => {
    if (mouseX === Infinity) {
      setScale(1)
      return
    }
    if (isClosest) setScale(1.8)
    else if (isRightNeighbor) setScale(1.3)
    else setScale(1)
  }, [mouseX, isClosest, isRightNeighbor])

  const handleMouseEnter = () => {
    setIsHovered(true)
    hoverTimeout.current = setTimeout(() => {
      const appRef = AppRegistry[app.id]
      if (appRef?.component?.preload) appRef.component.preload()
    }, 300)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
  }

  const handleClick = () => {
    const appRef = AppRegistry[app.id]
    if (appRef?.url) window.open(appRef.url, "_blank")
    else openApp(app.id)
  }

  const iconSize = BASE_SIZE * scale

  return (
  <div
    ref={itemRef}
    className={styles.dockItem}
    style={{
      width: 48 * scale,
      height: 48,
      transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={handleClick}
  >
    <div
      className={styles.iconWrapper}
      style={{
        transformOrigin: "bottom center",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        zIndex: isClosest ? 100 : (isRightNeighbor ? 50 : 10)
      }}
    >
      {/* Tooltip moved INSIDE iconWrapper so it scales + lifts with the icon */}
      <div
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${isHovered ? '-6px' : '0px'})`,
          transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
          position: 'absolute',
          bottom: '100%',        // sits just above the icon
          left: '50%',
          backgroundColor: 'rgba(30,30,30,0.82)',
          backdropFilter: 'blur(6px)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: `${11 / scale}px`,  // counter-scale so text stays readable
          fontWeight: '400',
          whiteSpace: 'nowrap',
          lineHeight: '1.4',
          pointerEvents: 'none',
          marginBottom: '4px',
        }}
      >
        {app.title}
      </div>

      <img
        src={app.icon}
        alt={app.title}
        className={styles.icon}
        style={{
          borderRadius: app.id === 'maze' ? '12px' : '0',
          overflow: app.id === 'maze' ? 'hidden' : 'visible'
        }}
        draggable="false"
      />
    </div>

    {/* Active Dot */}
    {useStore((state) => state.openApps.includes(app.id)) && (
      <div
        className={styles.activeDot}
        style={{
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: mouseX === Infinity ? 1 : 0.6
        }}
      />
    )}
  </div>
)
}