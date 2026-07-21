"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import { 
  ChevronLeft, ChevronRight, RotateCcw, 
  Home, Lock, ExternalLink, Globe, 
  Layers, Search, AlertCircle
} from "lucide-react"

const DEFAULT_URL = "https://www.google.com";

export default function Safari() {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [input, setInput] = useState(DEFAULT_URL)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([DEFAULT_URL])
  const [historyIndex, setHistoryIndex] = useState(0)
  const iframeRef = useRef(null)

  const navigateTo = useCallback((targetUrl) => {
    let q = (targetUrl || "").trim()
    if (!q) return

    let finalUrl = q

    if (!/^https?:\/\//i.test(q)) {
      if (q.includes(".") && !q.includes(" ")) {
        finalUrl = "https://" + q
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}&igu=1`
      }
    }

    setLoading(true)
    setUrl(finalUrl)
    setInput(finalUrl)
    
    setHistory(prev => {
      // Don't add duplicate if same as current
      if (prev[historyIndex] === finalUrl) return prev
      return [...prev.slice(0, historyIndex + 1), finalUrl]
    })
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  // Listen to link clicks inside proxied iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'SAFARI_NAVIGATE' && event.data.url) {
        navigateTo(event.data.url)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [navigateTo])

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    navigateTo(input)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1]
      setUrl(prevUrl)
      setInput(prevUrl)
      setHistoryIndex(prev => prev - 1)
      setLoading(true)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1]
      setUrl(nextUrl)
      setInput(nextUrl)
      setHistoryIndex(prev => prev + 1)
      setLoading(true)
    }
  }

  const goHome = () => {
    navigateTo(DEFAULT_URL)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e)
    }
  }

  const openInNewTab = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const getIframeSrc = () => {
    if (!url) return "about:blank";
    
    // Google search and home natively support igu=1 for iframe embedding
    if (url.includes("google.com") && !url.includes("google.com/search")) {
      return "https://www.google.com/webhp?igu=1&gws_rd=ssl";
    }
    if (url.includes("google.com/search")) {
      return url.includes("igu=1") ? url : `${url}&igu=1`;
    }

    // For all other websites, route through server-side proxy to bypass X-Frame-Options
    return `/api/proxy?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="h-full bg-white dark:bg-[#1c1c1e] flex flex-col overflow-hidden font-sans select-none">
      {/* macOS Safari Toolbar */}
      <div className="h-11 bg-zinc-100/90 dark:bg-zinc-900/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 flex items-center px-4 gap-4 shrink-0 z-20">
        <div className="flex items-center gap-1">
          <button 
            onClick={goBack} 
            disabled={historyIndex <= 0}
            className={`p-1.5 rounded-lg transition-colors ${historyIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'}`}
            title="Back"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg transition-colors ${historyIndex >= history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'}`}
            title="Forward"
          >
            <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </div>

        <button 
          onClick={goHome}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          title="Google Home"
        >
          <Home className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-300" />
        </button>

        <div className="flex-1 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white/70 dark:bg-zinc-800/70 border border-black/10 dark:border-white/10 rounded-lg px-4 py-1 flex items-center gap-2 group focus-within:bg-white dark:focus-within:bg-zinc-800 transition-all shadow-inner">
            <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-center text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 font-medium"
            />
            {loading ? (
              <RotateCcw className="w-3.5 h-3.5 text-blue-500 animate-spin shrink-0" />
            ) : (
              <button type="submit" className="shrink-0">
                <Search className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-600 transition-colors" />
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={openInNewTab} 
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-zinc-600 dark:text-zinc-400"
            title="Open original website in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-zinc-600 dark:text-zinc-400"
            title="Tabs"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Browser Canvas */}
      <div className="flex-1 relative overflow-hidden bg-white dark:bg-zinc-950 flex flex-col">
        {/* Active domain status bar */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-1 flex items-center justify-between text-[11px] text-zinc-500 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <Globe className="w-3 h-3 text-blue-500 shrink-0" />
            <span className="truncate">Browsing: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{url}</strong></span>
          </div>
          <button 
            onClick={openInNewTab}
            className="flex items-center gap-1 text-blue-500 font-medium hover:underline shrink-0 ml-2"
          >
            Open in new window <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Real Dynamic Browser Frame */}
        <div className="flex-1 relative">
          <iframe 
            ref={iframeRef}
            key={url}
            src={getIframeSrc()} 
            className="w-full h-full border-0 bg-white"
            onLoad={() => setLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
            title="Safari Live Web Browser"
          />

          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <RotateCcw className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold">Loading webpage...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}