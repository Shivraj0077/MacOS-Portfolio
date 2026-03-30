"use client"
import { useState, useCallback } from "react"

export default function Safari() {
  const [url, setUrl] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const suggestions = [
    "Shivraj portfolio",
    "Best full stack projects",
    "How to build a macOS in React",
    "Next.js optimization techniques"
  ]

  const handleSearch = useCallback((value) => {
    let q = (value || input).trim()
    if (!q) return

    let finalUrl = q

    if (!/^https?:\/\//i.test(q)) {
      if (q.includes(".")) {
        finalUrl = "https://" + q
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}&igu=1`
      }
    }

    setLoading(true)
    setUrl(finalUrl)
    setInput(finalUrl)
    
    // Simulate loading
    setTimeout(() => setLoading(false), 300)
  }, [input])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  const goHome = () => {
    setUrl("")
    setInput("")
  }

  return (
    <div className="bg-white dark:bg-zinc-900 h-full flex flex-col overflow-hidden font-sans select-none">
      
      {/* Navigation Controls + Search Bar */}
      <div className="h-12 flex items-center px-4 gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/90 shrink-0">
        
        <div className="flex items-center gap-2">
          <button onClick={goHome} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors text-zinc-600 dark:text-zinc-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
          
          <div className="flex items-center gap-0.5">
             <button className="p-1.5 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></button>
             <button className="p-1.5 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
          </div>
        </div>

        <div className="flex-1 relative group max-w-2xl mx-auto">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
             <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or type URL"
            className="w-full h-8 pl-10 pr-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-[13px] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 ring-blue-500/30 transition-all font-medium"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <div className="w-3.5 h-3.5 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
           <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg></button>
           <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m8-8H4"/></svg></button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-white dark:bg-zinc-950">
        
        {/* Homepage State - Only visible when URL is empty */}
        {!url ? (
          <div className="h-full flex flex-col items-center pt-[15vh] px-6">
            <h1 className="text-6xl font-bold tracking-tighter mb-12 select-none">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
            </h1>

            <div className="w-full max-w-xl flex flex-col gap-8">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                   <svg className="w-5 h-5 text-zinc-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-14 pl-14 pr-14 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none transition-shadow text-base text-zinc-900 dark:text-zinc-100"
                  placeholder="Search Google or type a URL"
                />
              </div>

              {/* Suggestions */}
              <div className="flex gap-3 flex-wrap justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="px-5 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Shortcuts */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-8 mt-4">
                {[
                  { name: "GitHub", url: "github.com", color: "bg-zinc-900", initial: "G" },
                  { name: "Twitter", url: "twitter.com", color: "bg-blue-400", initial: "T" },
                  { name: "LinkedIn", url: "linkedin.com", color: "bg-blue-600", initial: "L" },
                  { name: "YouTube", url: "youtube.com", color: "bg-red-500", initial: "Y" }
                ].map((site) => (
                  <div
                    key={site.name}
                    onClick={() => handleSearch(site.url)}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 ${site.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {site.initial}
                    </div>
                    <span className="text-[10px] font-bold opacity-60 group-hover:opacity-100">{site.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Browser Viewport - iframe mounts only when URL is active */
          <div className="w-full h-full animate-in fade-in zoom-in-100 duration-500">
            <iframe
              key={url}
              src={url}
              className="w-full h-full border-0"
              tabIndex={-1}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        )}
      </div>
    </div>
  )
}