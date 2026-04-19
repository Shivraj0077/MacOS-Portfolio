"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Dock } from "../components/dock/Dock"
import WindowManager from "../components/WindowManager"
import AppRegistry from "../registry/appRegistry"
import Image from "next/image"
import Spotlight from "../components/Spotlight"
import ControlCenter from "../components/ControlCenter"
import { useWindowStore, useSystemStore } from "../store/useStore"
import { useState, useEffect } from "react"
import { useWindowSize } from "../hooks/useWindowSize"

export default function Home({ isLoaded }) {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [hasInteractedWithSearch, setHasInteractedWithSearch] = useState(false)
  const [isSearchGlowing, setIsSearchGlowing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hasPlayedEntrance, setHasPlayedEntrance] = useState(false)

  const [mounted, setMounted] = useState(false)

  const theme = useSystemStore((state) => state.theme)
  const wallpaper = useSystemStore((state) => state.wallpaper)
  const brightness = useSystemStore((state) => state.brightness || 100)
  const nowPlaying = useSystemStore((state) => state.nowPlaying)

  const openApp = useWindowStore((state) => state.openApp)
  const activeAppId = useWindowStore((state) => state.activeApp)
  const appStates = useWindowStore((state) => state.appStates)
  const activeApp = activeAppId ? AppRegistry[activeAppId] : { name: "Finder" }
  const { winWidth, winHeight } = useWindowSize()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoaded && !hasPlayedEntrance) {
    setHasPlayedEntrance(true)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // ... (time updater & keyboard shortcuts kept same)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        setIsSpotlightOpen(prev => !prev)
        setHasInteractedWithSearch(true)
      }
      if (e.key === 'Escape') {
        setIsSpotlightOpen(false)
        setIsControlCenterOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSpotlightOpen])

  const formatTime = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
    return date.toLocaleDateString('en-US', options).replace(',', '')
  }

  const isSomethingMaximized = Object.values(appStates).some(s => s.isMaximized && !s.isMinimized)

  return (
    <main 
      className="relative w-full h-screen overflow-hidden select-none bg-black"
      style={{ width: winWidth, height: winHeight }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="absolute inset-0 z-0 bg-black"
      >
        {wallpaper && wallpaper !== "" ? (
          <Image 
            key={wallpaper}
            src={wallpaper}
            alt="Desktop wallpaper with macOS style colors"
            fill 
            priority 
            quality={65}
            className="object-cover pointer-events-none select-none"
            onError={(e) => {
              e.currentTarget.src = "/wallpaper2.jpg"; // fallback image
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-950" />   // solid fallback background
        )}
      </motion.div>

      <Spotlight key={isSpotlightOpen ? "open" : "closed"} isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
      <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />

      {/* Top Menu Bar - Hidden when full screen */}
      {!isSomethingMaximized && (
        <motion.div 
          initial={hasPlayedEntrance ? false : { y: -30, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="absolute top-0 w-full h-[30px] bg-white/60 dark:bg-black/50 backdrop-blur-3xl border-b border-black/5 dark:border-white/[0.05] z-[10000] flex items-center px-4 justify-between text-[#1d1d1f] dark:text-white/90 text-[12px] font-bold tracking-tight shadow-sm"
        >
          <div className="flex gap-4 items-center h-full">
            <div 
              role="button"
              tabIndex={0}
              aria-label="Apple Menu"
              className="hover:bg-white/15 px-2 rounded-md transition-colors cursor-default py-1"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault() }}
            >
              <Image src="/apple-logo.svg" alt="apple" width={14} height={14} className="w-[14px] h-[14px] dark:invert" />
            </div>
            <span className="px-2 rounded-md hover:bg-white/15 py-1 cursor-default transition-colors">
              {activeApp.name}
            </span>
            <div className="flex items-center gap-1">
               {["Finder", "Projects", "Blogs", "Experience"].map((item) => (
                  <span 
                    key={item} 
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${item}`}
                    onClick={() => {
                      if (item === 'Finder') openApp('finder')
                      if (item === 'Projects') openApp('projects')
                      if (item === 'Blogs') window.open('https://shivraj.dev/blog', '_blank')
                      if (item === 'Experience') openApp('experience')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (item === 'Finder') openApp('finder')
                        if (item === 'Projects') openApp('projects')
                        if (item === 'Blogs') window.open('https://shivraj.dev/blog', '_blank')
                        if (item === 'Experience') openApp('experience')
                      }
                    }}
                    className={`hidden md:block opacity-90 px-2.5 rounded-md hover:bg-white/15 py-1 cursor-pointer transition-all active:scale-95 ${activeApp.name === item ? 'bg-white/10' : ''}`}
                  >
                    {item}
                  </span>
               ))}
            </div>
          </div>
          
          <div className="flex gap-3 items-center h-full pr-1">
            <div className="flex items-center gap-4 px-2">
              <div className="hidden sm:flex items-center opacity-85 hover:bg-white/15 px-1.5 py-1 rounded-md cursor-default">
                <div className="w-6 h-[11px] border border-white/50 rounded-[3px] relative p-[1px] flex items-center justify-start">
                  <div className="bg-emerald-400 h-full w-[85%] rounded-[1px]" />
                  <div className="absolute top-1/2 -right-[2.5px] -translate-y-1/2 w-[2px] h-[4px] bg-white/50 rounded-r-full" />
                </div>
              </div>

              <svg className="w-[15px] h-[15px] opacity-80 hover:opacity-100 transition-opacity cursor-default" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.59 16.11a6 6 0 0 1 6.82 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>

              <svg 
                onClick={() => setIsSpotlightOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open Search"
                className="w-[15px] h-[15px] opacity-80 hover:opacity-100 cursor-pointer" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsSpotlightOpen(true) }}
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <div 
                onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                className={`px-1.5 py-1 rounded-md transition-colors cursor-pointer ${isControlCenterOpen ? 'bg-white/20' : 'hover:bg-white/15'}`}
              >
                <div className="w-[15px] h-[15px] opacity-90">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <span className="opacity-90 hover:bg-white/15 px-2 rounded-md py-1 transition-colors cursor-default tabular-nums">
              {mounted ? formatTime(currentTime) : ""}
            </span>
          </div>
        </motion.div>
      )}

      <WindowManager />

      {/* Desktop Icons */}
      {!isSomethingMaximized && (
        <motion.div 
          initial={hasPlayedEntrance ? false : { x: -40, opacity: 0 }}
          animate={isLoaded ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[50px] left-6 z-10 flex flex-col gap-8 items-center pointer-events-none"
        >
          <div 
            role="button"
            tabIndex={0}
            aria-label="About Me desktop icon"
            onClick={() => openApp('about')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openApp('about')
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer pointer-events-auto active:scale-95 transition-all outline-none"
          >
            <div className="w-[60px] h-[60px] bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-colors">
              <Image src="/about.svg" alt="about" width={34} height={34} className="w-[34px] h-[34px] " />
            </div>
            <span className="text-[11px] font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded-md bg-transparent transition-all">About Me</span>
          </div>
        </motion.div>
      )}

      <div className="absolute inset-0 pointer-events-none z-[9000] bg-black" style={{ opacity: (100 - brightness) / 100 * 0.8 }} />

      {!isSomethingMaximized && (
        <motion.div 
          initial={hasPlayedEntrance ? false : { y: 80, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="fixed bottom-0 left-0 w-full flex justify-center pb-4 z-[10000]"
        >
          <Dock />
        </motion.div>
      )}
    </main>
  )
}