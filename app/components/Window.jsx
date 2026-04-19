"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rnd } from "react-rnd"
import { TrafficLights } from "../shared/TrafficLights"
import { useWindowStore } from "../store/useStore"

export default function Window({ app, isActive, children }) {
  const closeApp = useWindowStore(s => s.closeApp)
  const focusApp = useWindowStore(s => s.focusApp)
  const updateAppPosition = useWindowStore(s => s.updateAppPosition)
  const toggleMaximize = useWindowStore(s => s.toggleMaximize)
  const toggleMinimize = useWindowStore(s => s.toggleMinimize)
  const appStates = useWindowStore(s => s.appStates)
  
  const windowState = appStates[app.id] || { 
    x: 100, y: 100, width: 800, height: 600, 
    isMaximized: false, isMinimized: false, zIndex: 100
  }

  const isMaximized = windowState.isMaximized
  const isMinimized = windowState.isMinimized
  
  const [isClosing, setIsClosing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const handleClose = useCallback(() => {
    closeApp(app.id)
  }, [app.id, closeApp])

  const handleMinimize = useCallback(() => toggleMinimize(app.id), [app.id, toggleMinimize])
  const handleMaximize = useCallback(() => toggleMaximize(app.id), [app.id, toggleMaximize])

  const isFirstMount = useRef(true)
  useEffect(() => {
    isFirstMount.current = false
  }, [])

  if (isMinimized) return null

  const isFullScreen = isMobile || isMaximized

  return (
    <>
      <Rnd
          key={app.id}
          size={{
             width: isFullScreen ? '100vw' : windowState.width,
             height: isFullScreen ? (isMobile ? 'calc(100dvh - 85px)' : '100vh') : windowState.height
          }}
          position={{
             x: isFullScreen ? 0 : windowState.x,
             y: isFullScreen ? 0 : windowState.y
          }}
          onDragStop={(e, d) => {
            if (isFullScreen) return
            updateAppPosition(app.id, { x: d.x, y: d.y })
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (isFullScreen) return
            updateAppPosition(app.id, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              ...position
            })
          }}
          onMouseDown={() => focusApp(app.id)}
          dragHandleClassName="window-title-bar"
          minWidth={app.minWidth || 320}
          minHeight={app.minHeight || 240}
          bounds="window"
          disableDragging={isFullScreen}
          enableResizing={!isFullScreen && app.resizable !== false}
          style={{
            zIndex: windowState.zIndex || 100,
            display: 'flex',
            flexDirection: 'column',
            position: isFullScreen ? 'fixed' : 'absolute',
            transition: isFullScreen ? 'none' : 'box-shadow 0.2s ease',
            pointerEvents: 'auto'
          }}
        >
          <div
            className={`w-full h-full bg-white/95 dark:bg-[#1c1c1e]/90 backdrop-blur-3xl shadow-2xl 
                        border border-black/10 dark:border-white/[0.08] flex flex-col overflow-hidden
                        ${isFullScreen ? (isMobile ? 'rounded-t-[20px] rounded-b-[20px] ring-1 ring-white/10' : 'rounded-none') : 'rounded-[14px]'} ${isActive && !isFullScreen ? "ring-1 ring-blue-500/30" : ""}`}
          >
            {/* Title Bar */}
            <div
              className={`h-11 bg-zinc-100/90 dark:bg-zinc-800/90 border-b border-black/10 dark:border-white/10 
                         flex items-center px-4 select-none shrink-0 relative z-10 window-title-bar
                         ${isFullScreen ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
              onDoubleClick={handleMaximize}
            >
              <TrafficLights
                onClose={handleClose}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                maximizable={app.maximizable !== false}
                isMaximized={isMaximized}
              />
              <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 pointer-events-none">
                {app.name}
              </h2>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto relative">
              {children}
            </div>
          </div>
        </Rnd>
    </>
  )
}