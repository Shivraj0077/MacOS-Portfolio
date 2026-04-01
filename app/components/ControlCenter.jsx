"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, Bluetooth, Radio, Moon, Sun, Keyboard, Maximize, Play, Pause, ChevronRight } from "lucide-react"
import { useSystemStore } from "../store/useStore"

export default function ControlCenter({ isOpen, onClose }) {
   const toggleTheme = useSystemStore(state => state.toggleTheme)
   const theme = useSystemStore(state => state.theme)
   const brightness = useSystemStore(state => state.brightness)
   const setBrightness = useSystemStore(state => state.setBrightness)
   const volume = useSystemStore(state => state.volume)
   const setVolume = useSystemStore(state => state.setVolume)
   const nowPlaying = useSystemStore(state => state.nowPlaying)
   const setNowPlaying = useSystemStore(state => state.setNowPlaying)
   const [wifi, setWifi] = useState(true)
   const [bluetooth, setBluetooth] = useState(true)
   const [airDrop, setAirDrop] = useState(true)

   if (!isOpen) return null

   const isPlaying = nowPlaying?.isPlaying || false

   const togglePlay = () => {
      if (nowPlaying) {
         setNowPlaying({ ...nowPlaying, isPlaying: !isPlaying })
      }
   }

   return (
    <>
         <div
            className="fixed top-10 right-4 w-[340px] bg-white/70 dark:bg-zinc-800/70 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[24px] shadow-2xl z-[10001] p-4 flex flex-col gap-3 selection:bg-none select-none"
         >
            {/* Top Grid: Connectivity & Toggles */}
            <div className="grid grid-cols-2 gap-3">
               {/* Connectivity Group */}
               <div className="bg-white/50 dark:bg-zinc-700/50 rounded-2xl p-3 flex flex-col gap-3 border border-black/5">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full transition-colors ${wifi ? 'bg-blue-600 text-white' : 'bg-zinc-300 dark:bg-zinc-600 text-zinc-500'}`} onClick={() => setWifi(!wifi)}>
                        <Wifi className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-zinc-900 dark:text-white leading-tight">Wi-Fi</span>
                        <span className="text-[10px] text-zinc-500 font-medium">{wifi ? 'Home' : 'Off'}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full transition-colors ${bluetooth ? 'bg-blue-600 text-white' : 'bg-zinc-300 dark:bg-zinc-600 text-zinc-500'}`} onClick={() => setBluetooth(!bluetooth)}>
                        <Bluetooth className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-zinc-900 dark:text-white leading-tight">Bluetooth</span>
                        <span className="text-[10px] text-zinc-500 font-medium">{bluetooth ? 'On' : 'Off'}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full transition-colors ${airDrop ? 'bg-blue-600 text-white' : 'bg-zinc-300 dark:bg-zinc-600 text-zinc-500'}`} onClick={() => setAirDrop(!airDrop)}>
                        <Radio className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-zinc-900 dark:text-white leading-tight">AirDrop</span>
                        <span className="text-[10px] text-zinc-500 font-medium">Contacts Only</span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  {/* Theme Toggle */}
                  <div
                     className="bg-white/50 dark:bg-zinc-700/50 rounded-2xl p-3 flex items-center gap-3 border border-black/5 cursor-pointer hover:bg-white/70 transition-colors"
                     onClick={toggleTheme}
                  >
                     <div className="p-2 bg-white dark:bg-zinc-600 rounded-full shadow-sm">
                        {theme === 'dark' ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-amber-500" />}
                     </div>
                     <span className="text-[11px] font-bold text-zinc-900 dark:text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </div>

                  {/* Utility Icons */}
                  <div className="grid grid-cols-2 gap-3 flex-1">
                     <div className="bg-white/50 dark:bg-zinc-700/50 rounded-2xl flex flex-col items-center justify-center gap-1 border border-black/5 hover:bg-white/70">
                        <Keyboard className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                        <span className="text-[8px] text-zinc-500 font-bold uppercase text-center px-1">Keyboard<br />Brightness</span>
                     </div>
                     <div className="bg-white/50 dark:bg-zinc-700/50 rounded-2xl flex flex-col items-center justify-center gap-1 border border-black/5 hover:bg-white/70" onClick={() => document.documentElement.requestFullscreen()}>
                        <Maximize className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                        <span className="text-[8px] text-zinc-500 font-bold uppercase text-center">Full Screen</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Display Slider */}
            <div className="bg-white/50 dark:bg-zinc-700/50 rounded-2xl p-3 border border-black/5 flex flex-col gap-2">
               <span className="text-[11px] font-bold text-zinc-900 dark:text-white">Display</span>
               <div className="flex items-center gap-3">
                  <Sun className="w-3.5 h-3.5 text-zinc-400" />
                  <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-600/50 rounded-full relative overflow-hidden group">
                     <div className="absolute top-0 left-0 h-full bg-white transition-all shadow-sm" style={{ width: `${brightness}%` }} />
                     <input
                        type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
