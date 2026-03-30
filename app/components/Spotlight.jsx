"use client"
import { useState, useEffect, useRef } from "react"
import AppRegistry from "@/app/registry/appRegistry"
import useStore from "@/app/store/useStore"

export default function Spotlight({ isOpen, onClose }) {
  const [search, setSearch] = useState("")
  const { openApp } = useStore()
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setSearch("")
    }
  }, [isOpen])

  const filteredApps = Object.values(AppRegistry).filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5)

  if (!isOpen) return null

  const handleSelect = (appId) => {
    openApp(appId)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Subtle backdrop dimming */}
      <div className="absolute inset-0 bg-black/15 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-[600px] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-[32px] border border-white/30 dark:border-white/10 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        {/* Search Input */}
        <div className="p-4 flex items-center gap-3 border-b border-black/5 dark:border-white/5">
          <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-100 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Spotlight Search" 
            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 text-xl font-semibold placeholder-zinc-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose()
                if (e.key === 'Enter' && filteredApps.length > 0) {
                    handleSelect(filteredApps[0].id)
                }
            }}
          />
        </div>

        {/* Results */}
        {(search || filteredApps.length > 0) && (
          <div className="p-2">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500/80 dark:text-zinc-400/80">Applications</div>
            <div className="flex flex-col gap-1 mt-1">
              {filteredApps.map(app => (
                <div 
                  key={app.id} 
                  onClick={() => handleSelect(app.id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-all group active:scale-[0.98]"
                >
                  <img src={app.icon} alt={app.name} className="w-10 h-10 group-hover:scale-110 group-active:scale-95 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold">{app.name}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium opacity-80">Application</span>
                  </div>
                </div>
              ))}
              {filteredApps.length === 0 && (search) && (
                <div className="p-10 text-center text-zinc-500 text-sm italic">No records found for "{search}"</div>
              )}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="p-3 pt-0 flex justify-end">
           <div className="text-[10px] font-bold text-zinc-500/50 dark:text-zinc-400/50 uppercase tracking-widest px-2">Press Enter to Open</div>
        </div>
      </div>
    </div>
  )
}
