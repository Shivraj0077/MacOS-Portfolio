"use client"
import { useState, useEffect } from 'react'

export default function Maps() {
  const [location, setLocation] = useState({ city: 'Loading...', country: '...' })
  const [visitors, setVisitors] = useState([
    { top: '30%', left: '20%', intensity: 0.8 },
    { top: '50%', left: '70%', intensity: 0.6 },
    { top: '40%', left: '45%', intensity: 0.9 },
    { top: '60%', left: '15%', intensity: 0.4 },
    { top: '25%', left: '80%', intensity: 0.7 },
  ])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation({ city: data.city, country: data.country_name })
        // Add user to highlights
        setVisitors(prev => [...prev, { top: '45%', left: '55%', intensity: 1, isUser: true }])
      })
      .catch(() => setLocation({ city: 'Mumbai', country: 'India' }))
  }, [])

  return (
    <div className="h-full bg-[#f4f1ea] dark:bg-zinc-900 flex flex-col overflow-hidden select-none">
      <div className="h-10 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md flex items-center px-4 border-b border-black/5 dark:border-white/5 shrink-0 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tighter">Live Satellite View</span>
        </div>
        <span className="text-[11px] font-medium text-zinc-500">{location.city}, {location.country}</span>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#242426]">
        {/* The Maps Image */}
        <img 
          src="/maps.png" 
          alt="World Map" 
          className="w-full h-full object-cover opacity-80"
        />

        {/* Heatmap Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {visitors.map((v, i) => (
            <div 
              key={i}
              className={`absolute rounded-full blur-xl animate-pulse ${v.isUser ? 'bg-blue-500/60' : 'bg-red-500/40'}`}
              style={{
                top: v.top,
                left: v.left,
                width: 60 + (v.intensity * 40),
                height: 60 + (v.intensity * 40),
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* User Marker */}
        <div className="absolute top-[45%] left-[55%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-ping absolute" />
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-10" />
            <div className="mt-2 bg-white/90 dark:bg-zinc-800 px-2 py-1 rounded-md text-[10px] font-bold shadow-xl border border-black/5">YOU ARE HERE</div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-white flex flex-col gap-1 shadow-2xl">
           <div className="text-[10px] font-bold text-blue-400 uppercase">Global Traffic</div>
           <div className="text-xl font-black">1.4K+ <span className="text-[10px] font-normal opacity-60">Visits Today</span></div>
           <div className="text-[10px] opacity-40">Heatmap updated every 5s</div>
        </div>
      </div>
    </div>
  )
}
