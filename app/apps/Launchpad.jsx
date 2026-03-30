"use client"
import AppRegistry from "../registry/appRegistry"
import useStore from "../store/useStore"

export default function Launchpad() {
  const { openApp, closeApp } = useStore()
  
  const handleOpen = (id) => {
    openApp(id)
    closeApp('launchpad')
  }

  return (
    <div className='h-full w-full bg-black/40 backdrop-blur-3xl p-12 overflow-auto animate-in zoom-in-110 fade-in duration-500'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 max-w-[1200px] mx-auto pt-10">
        {Object.values(AppRegistry).map(app => (
          <div 
            key={app.id} 
            onClick={() => handleOpen(app.id)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-20 h-20 p-2 bg-white/5 rounded-2xl group-hover:bg-white/15 transition-all group-hover:scale-105 group-active:scale-95 shadow-xl">
              <img src={app.icon} alt={app.name} className="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
            <span className="text-white text-sm font-medium opacity-90 group-hover:opacity-100">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
