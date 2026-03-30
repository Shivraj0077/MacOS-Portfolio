"use client"
import { useState, useEffect } from "react"
import { Dock } from "../components/dock/Dock"
import WindowManager from "../components/WindowManager"
import AppRegistry from "../registry/appRegistry"
import Image from "next/image"
import Spotlight from "../components/Spotlight"
import useStore from "../store/useStore"

export default function Home() {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [hasInteractedWithSearch, setHasInteractedWithSearch] = useState(false)
  const [isSearchGlowing, setIsSearchGlowing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const activeAppId = useStore((state) => state.activeApp)
  const activeApp = activeAppId ? AppRegistry[activeAppId] : { name: "Finder" }
  const isSomethingMaximized = useStore((state) => state.appStates && Object.values(state.appStates).some(s => s.isMaximized))
  const wallpaper = useStore((state) => state.wallpaper)

  // Eager preloading for core apps
  useEffect(() => {
    const appsToPreload = ['finder', 'projects']
    appsToPreload.forEach(id => {
      const app = AppRegistry[id]
      if (app && app.component && app.component.preload) {
        app.component.preload()
      }
    })

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        setIsSpotlightOpen(prev => !prev)
        setHasInteractedWithSearch(true)
      }
      if (e.key === 'Escape') {
        setIsSpotlightOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearInterval(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Search Icon Glow Logic
  useEffect(() => {
    if (hasInteractedWithSearch) {
        setIsSearchGlowing(false)
        return
    }

    const glowInterval = setInterval(() => {
        if (!hasInteractedWithSearch) {
            setIsSearchGlowing(true)
            setTimeout(() => setIsSearchGlowing(false), 3000) // Glow for 3 seconds
        }
    }, 10000) // Repeat every 30 seconds

    // Initial glow after 20 seconds
    const initialGlow = setTimeout(() => {
        if (!hasInteractedWithSearch) {
            setIsSearchGlowing(true)
            setTimeout(() => setIsSearchGlowing(false), 3000)
        }
    }, 20000)

    return () => {
        clearInterval(glowInterval)
        clearTimeout(initialGlow)
    }
  }, [hasInteractedWithSearch])

  const formatTime = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
    return date.toLocaleDateString('en-US', options).replace(',', '')
  }

  return (
    <main className="relative w-full h-screen overflow-hidden select-none bg-[#0a0a0a]">
      {/* Optimized Background Wallpaper */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <Image
          src={wallpaper}
          alt="Desktop Wallpaper" 
          fill
          priority
          className="object-cover pointer-events-none transition-opacity duration-1000"
          onLoad={(e) => e.currentTarget.style.opacity = '1'}
          style={{ opacity: 0 }}
        />
      </div>
      
      {/* Subtle Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] pointer-events-none z-[1]" />

      <Spotlight 
        isOpen={isSpotlightOpen} 
        onClose={() => setIsSpotlightOpen(false)} 
      />

      {/* Top Menu Bar Section */}
      <div className="absolute top-0 w-full h-[28px] bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-b border-white/5 z-[1000] flex items-center px-4 justify-between text-white text-[12px] font-medium tracking-tight">
        <div className="flex gap-5 items-center h-full">
          <div className="hover:bg-white/10 px-2 rounded-md transition-colors cursor-default py-1">
            <img src="/apple-logo.svg" alt="apple" className="w-[15px] h-[15px] invert" />
          </div>
          <span className="font-bold px-2 rounded-md hover:bg-white/10 py-1 cursor-default transition-colors">{activeApp.name}</span>
          {["File", "Edit", "View", "Go", "Window", "Help"].map(item => (
            <span key={item} className="hidden lg:block opacity-90 px-2 rounded-md hover:bg-white/10 py-1 cursor-default transition-colors">{item}</span>
          ))}
        </div>
        
        <div className="flex gap-4 items-center h-full">
          <div className="flex items-center gap-5 px-2">
            <div className="hidden sm:flex items-center gap-2 opacity-80 hover:bg-white/10 p-2 rounded-md cursor-default">
              <span className="text-[12px]">75%</span>
              <div className="w-8 h-4 border border-white/40 rounded-sm relative p-[2px]">
                  <div className="bg-white h-full w-[75%] rounded-[1px]" />
                  <div className="absolute top-1/2 right-[-3px] -translate-y-1/2 w-1 h-2 bg-white/40 rounded-full" />
              </div>
            </div>
            
            <svg className="w-[15px] h-[15px] opacity-80 hover:opacity-100 transition-opacity cursor-default" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.59 16.11a6 6 0 0 1 6.82 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            
            <svg 
               onClick={() => { setIsSpotlightOpen(true); setHasInteractedWithSearch(true); setIsSearchGlowing(false); }}
               className={`w-[15px] h-[15px] transition-all cursor-pointer duration-500 ${isSearchGlowing ? 'animate-pulse drop-shadow-[0_0_12px_rgba(181,141,89,0.9)] opacity-100 scale-125' : 'opacity-80 hover:opacity-100'}`} 
               viewBox="0 0 24 24" fill="none"
               stroke={isSearchGlowing ? "url(#gold-gradient)" : "currentColor"}
               strokeWidth={2.5}
            >
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#b5864e', stopOpacity: 1 }} />
                  <stop offset="25%" style={{ stopColor: '#e5c18b', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#f3e5c0', stopOpacity: 1 }} />
                  <stop offset="75%" style={{ stopColor: '#e5c18b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#b5864e', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <div className="hover:bg-white/10 p-1 rounded-md transition-colors cursor-default">
                <div className="w-[15px] h-[15px] text-white/80">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                </div>
            </div>
          </div>
          <span className="opacity-90 hover:bg-white/10 px-2 rounded-md py-1 transition-colors cursor-default tabular-nums">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Window Manager - direct absolute child so windows can go full screen */}
      <div className={`absolute inset-0 pointer-events-none ${isSomethingMaximized ? 'z-[2000]' : 'z-20'}`}>
        <WindowManager />
      </div>

      {/* The Dock */}
      <Dock />
    </main>
  );
}