import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import useStore from '../store/useStore'

export default function Window({ app, isActive, children }) {
  const { closeApp, focusApp, updateAppPosition, toggleMaximize, toggleMinimize, appStates } = useStore()
  const windowState = appStates[app.id] || { x: 100, y: 100, width: 800, height: 600, isMaximized: false, isMinimized: false }
  const isMaximized = windowState.isMaximized
  const [isHoveringLights, setIsHoveringLights] = useState(false)

  // Use motion values for smooth dragging and resizing
  const x = useMotionValue(windowState.x)
  const y = useMotionValue(windowState.y)
  const width = useMotionValue(windowState.width)
  const height = useMotionValue(windowState.height)

  // Sync motion values if store overrides (e.g. from elsewhere)
  useEffect(() => {
    x.set(windowState.x)
    y.set(windowState.y)
    width.set(windowState.width)
    height.set(windowState.height)
  }, [windowState.x, windowState.y, windowState.width, windowState.height])
  
  const handleDragStart = () => {
    if (isMaximized) toggleMaximize(app.id)
    focusApp(app.id)
  }

  const handleDragEnd = () => {
    updateAppPosition(app.id, { x: x.get(), y: y.get() })
  }

  const startResizing = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width.get();
    const startHeight = height.get();
    const startLeft = x.get();
    const startTop = y.get();

    const onMouseMove = (moveEvent) => {
      let deltaX = moveEvent.clientX - startX;
      let deltaY = moveEvent.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;

      if (direction.includes('e')) newWidth = Math.max(300, startWidth + deltaX);
      if (direction.includes('s')) newHeight = Math.max(200, startHeight + deltaY);
      if (direction.includes('w')) {
        const potentialWidth = startWidth - deltaX;
        if (potentialWidth > 300) {
          newWidth = potentialWidth;
          newX = startLeft + deltaX;
        }
      }
      if (direction.includes('n')) {
        const potentialHeight = startHeight - deltaY;
        if (potentialHeight > 200) {
          newHeight = potentialHeight;
          newY = startTop + deltaY;
        }
      }

      x.set(newX);
      y.set(newY);
      width.set(newWidth);
      height.set(newHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      updateAppPosition(app.id, { 
        width: width.get(), 
        height: height.get(), 
        x: x.get(), 
        y: y.get() 
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      style={{ 
        x: isMaximized ? 0 : x, 
        y: isMaximized ? 0 : y, 
        width: isMaximized ? '100vw' : width,
        height: isMaximized ? '100vh' : height,
        zIndex: isMaximized ? 2000 : (isActive ? 100 : 10),
        borderRadius: isMaximized ? 0 : 12,
        top: isMaximized ? 0 : 'auto',
        left: isMaximized ? 0 : 'auto',
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      exit={{ scale: 0.85, opacity: 0 }}
      className="absolute bg-white dark:bg-zinc-900 shadow-2xl border border-white/20 overflow-hidden flex flex-col pointer-events-auto group"
    >
      {/* Title Bar */}
      <div 
        onDoubleClick={() => app.maximizable !== false && toggleMaximize(app.id)}
        className="h-12 bg-zinc-100 dark:bg-zinc-800/50 border-b border-black/5 dark:border-white/5 flex items-center px-4 select-none cursor-default shrink-0"
      >
        <div 
          className="flex gap-3 mr-5"
          onMouseEnter={() => setIsHoveringLights(true)}
          onMouseLeave={() => setIsHoveringLights(false)}
        >
          {/* Close */}
          <div onClick={(e) => { e.stopPropagation(); closeApp(app.id); }} className="w-5 h-5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.25)]">
            {isHoveringLights && <svg className="w-2.5 h-2.5 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>}
          </div>
          {/* Minimize */}
          <div onClick={(e) => { e.stopPropagation(); toggleMinimize(app.id); }} className="w-5 h-5 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.25)]">
            {isHoveringLights && <div className="w-2.5 h-[2px] bg-black/70 rounded-full" />}
          </div>
          {/* Expand / Restore */}
          <div 
            onClick={(e) => { 
                e.stopPropagation(); 
                if (app.maximizable !== false) toggleMaximize(app.id); 
            }} 
            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.25)] transition-all ${app.maximizable === false ? 'bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed opacity-50' : 'bg-[#27c93f] hover:brightness-110'}`}
          >
            {app.maximizable !== false && (
                isMaximized ? (
                    <div className={`w-2.5 h-2.5 border-2 rounded-[2px] transition-colors ${isHoveringLights ? 'border-black/80' : 'border-black/40'}`} />
                ) : (
                    isHoveringLights && (
                        <svg className="w-2.5 h-2.5 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                    )
                )
            )}
          </div>
        </div>
        <span className="text-[12px] font-semibold text-zinc-600 dark:text-zinc-400 opacity-70 flex-1 text-center pr-12">
          {app.name}
        </span>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-auto relative bg-white dark:bg-transparent">
        {children}
      </div>

      {/* 8-Point Resize Handles */}
      {!isMaximized && app.resizable !== false && (
        <>
          {/* Borders */}
          <div className="absolute top-0 left-4 right-4 h-1.5 cursor-ns-resize z-[100] hover:bg-blue-500/10 transition-colors" onMouseDown={(e) => startResizing(e, 'n')} />
          <div className="absolute bottom-0 left-4 right-4 h-1.5 cursor-ns-resize z-[100] hover:bg-blue-500/10 transition-colors" onMouseDown={(e) => startResizing(e, 's')} />
          <div className="absolute left-0 top-4 bottom-4 w-1.5 cursor-ew-resize z-[100] hover:bg-blue-500/10 transition-colors" onMouseDown={(e) => startResizing(e, 'w')} />
          <div className="absolute right-0 top-4 bottom-4 w-1.5 cursor-ew-resize z-[100] hover:bg-blue-500/10 transition-colors" onMouseDown={(e) => startResizing(e, 'e')} />
          
          {/* Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-[101]" onMouseDown={(e) => startResizing(e, 'nw')} />
          <div className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-[101]" onMouseDown={(e) => startResizing(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-[101]" onMouseDown={(e) => startResizing(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-[101] group/resize flex items-end justify-end p-1" onMouseDown={(e) => startResizing(e, 'se')}>
             <svg className="w-3 h-3 text-zinc-400 opacity-20 group-hover/resize:opacity-60 transition-opacity rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 19L19 5"/></svg>
          </div>
        </>
      )}
    </motion.div>
  )
}
