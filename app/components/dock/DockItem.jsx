import { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import styles from "./dock.module.css"
import { useWindowStore } from "@/app/store/useStore"
import AppRegistry from "@/app/registry/appRegistry"
import Image from "next/image"


export default function DockItem({ app, mouseX }) {
  const itemRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const openApp = useWindowStore((state) => state.openApp)
  const isOpen = useWindowStore((state) => state.openApps.includes(app.id))

  const baseWidth = 40;
  const distanceLimit = baseWidth * 6;
  const dockMag = 1.6;

  const distance = useTransform(mouseX, (val) => {
    const el = itemRef.current;
    if (el && val !== null) {
      const rect = el.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      return val - imgCenterX;
    }
    return distanceLimit + 1;
  });

  const widthPX = useSpring(
    useTransform(
      distance,
      [-distanceLimit, -distanceLimit / (dockMag * 0.65), -distanceLimit / (dockMag * 0.85), 0, distanceLimit / (dockMag * 0.85), distanceLimit / (dockMag * 0.65), distanceLimit],
      [baseWidth, baseWidth * (dockMag * 0.55), baseWidth * (dockMag * 0.75), baseWidth * dockMag, baseWidth * (dockMag * 0.75), baseWidth * (dockMag * 0.55), baseWidth]
    ),
    { stiffness: 1700, damping: 90 }
  );

  const handleClick = () => {
    const appRef = AppRegistry[app.id]
    if (appRef?.url) window.open(appRef.url, "_blank")
    else openApp(app.id)
  }

  return (
    <motion.div
      ref={itemRef}
      className={styles.dockItem}
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.title}`}
      style={{
        width: widthPX,
        height: widthPX,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer"
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        // Prefetch data if it's Spotify or Settings (for wallpapers)
        if (app.id === 'spotify') {
          console.log('Prefetching Spotify tracks...')
        }
        if (app.id === 'settings') {
          console.log('Prefetching wallpapers...')
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${isHovered ? '-6px' : '0px'})`,
          transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          backgroundColor: 'rgba(30,30,30,0.82)',
          backdropFilter: 'blur(6px)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: `11px`,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          marginBottom: '4px',
          zIndex: 100
        }}
      >
        {app.title}
      </div>

      <motion.div 
        className={styles.iconWrapper}
        style={{ width: widthPX, height: widthPX, position: 'relative' }}
      >
        <Image
          src={app.icon}
          alt={app.title}
          fill
          style={{
            objectFit: 'contain',
            borderRadius: (app.id === 'maze' || app.id === 'calculator' || app.id === 'notes') ? '22%' : '0',
            overflow: 'hidden',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
          draggable="false"
          sizes="(max-width: 768px) 40px, 64px"
        />
      </motion.div>

      {isOpen && (
        <div className={styles.activeDot} />
      )}
    </motion.div>
  )
}