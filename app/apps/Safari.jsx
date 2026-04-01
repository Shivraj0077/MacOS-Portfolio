"use client"
import { useState, useCallback, useRef } from "react"
import { 
  ChevronLeft, ChevronRight, RotateCcw, 
  Home, Lock, Search, 
  ExternalLink, Globe, AlertCircle, PlusCircle, Layers
} from "lucide-react"

const DEFAULT_URL = "https://www.google.com";
const GOOGLE_WEBHP = "https://www.google.com/webhp?igu=1&gws_rd=ssl";

export default function Safari() {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [input, setInput] = useState(DEFAULT_URL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([DEFAULT_URL])
  const [historyIndex, setHistoryIndex] = useState(0)

  const handleSearch = useCallback((searchValue) => {
    let q = (searchValue || input).trim()
    if (!q) return

    let finalUrl = q

    // Redirect old LinkedIn profile to new one
    if (q.includes("linkedin.com/in/shivrajpawar")) {
      q = "https://www.linkedin.com/in/shivraj-pawar-4a632837b"
    }

    if (!/^https?:\/\//i.test(q)) {
      if (q.includes(".") && !q.includes(" ")) {
        finalUrl = "https://" + q
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}&igu=1`
      }
    } else if (!q.startsWith("http://") && !q.startsWith("https://")) {
      finalUrl = "https://" + q;
    }

    setLoading(true)
    setError(null)
    setUrl(finalUrl)
    setInput(finalUrl)
    
    setHistory(prev => [...prev.slice(0, historyIndex + 1), finalUrl])
    setHistoryIndex(prev => prev + 1)
    
    setTimeout(() => setLoading(false), 600)
  }, [input, historyIndex])

  const goBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1]
      setUrl(prevUrl)
      setInput(prevUrl)
      setHistoryIndex(prev => prev - 1)
      setLoading(true)
      setTimeout(() => setLoading(false), 400)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1]
      setUrl(nextUrl)
      setInput(nextUrl)
      setHistoryIndex(prev => prev + 1)
      setLoading(true)
      setTimeout(() => setLoading(false), 400)
    }
  }

  const goHome = () => {
    setLoading(true)
    setUrl(DEFAULT_URL)
    setInput(DEFAULT_URL)
    setHistory(prev => [...prev.slice(0, historyIndex + 1), DEFAULT_URL])
    setHistoryIndex(prev => prev + 1)
    setTimeout(() => setLoading(false), 300)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  const openInNewTab = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-[#1e1e1e]">
          <RotateCcw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-zinc-500 text-sm">Loading...</p>
        </div>
      );
    }

    // Google homepage - use webhp URL like Ubuntu Chrome
    if (url.includes("google.com") && !url.includes("google.com/search")) {
      return (
        <iframe
          src={GOOGLE_WEBHP}
          className="w-full h-full border-0 bg-white"
          title="Google Search"
        />
      );
    }

    // Google search - iframe with search URL (using igu=1)
    if (url.includes("google.com/search")) {
      const searchUrl = url.includes("igu=1") ? url : `${url}&igu=1`;
      return (
        <iframe
          src={searchUrl}
          className="w-full h-full border-0 bg-white"
          title="Google Search Results"
        />
      );
    }

    // Custom placeholders for sites that block embedding
    if (url.includes("github.com")) {
      return (
        <div className="h-full bg-white dark:bg-[#0d1117] p-12 overflow-auto text-zinc-900 dark:text-white">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <img src="/github.svg" alt="GitHub" className="w-12 h-12 invert dark:invert-0" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">GitHub</h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl">
              Where the world builds software. This is a secure simulation for the portfolio experience.
            </p>
            <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-black/5 dark:border-white/5 p-8 text-left shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Featured Repositories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "microsoft/vscode", lang: "TypeScript", color: "bg-blue-500" },
                  { name: "facebook/react", lang: "JavaScript", color: "bg-yellow-400" },
                  { name: "vercel/next.js", lang: "TypeScript", color: "bg-blue-500" },
                  { name: "shivraj/mac-portfolio", lang: "JavaScript", color: "bg-yellow-400" }
                ].map((repo) => (
                  <div key={repo.name} className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-colors cursor-default">
                    <span className="font-semibold text-blue-500 block mb-1">{repo.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${repo.color}`} />
                      <span className="text-xs opacity-60 font-medium">{repo.lang}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={openInNewTab}
                className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                View original site <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes("stackoverflow.com")) {
      return (
        <div className="h-full bg-white dark:bg-zinc-900 p-12 overflow-auto text-zinc-900 dark:text-white">
           <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">?</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Stack Overflow</h1>
                  <p className="text-zinc-500">Knowledge shared across the globe.</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  "How to center a div horizontally and vertically?",
                  "What is the difference between map() and forEach()?",
                  "How to handle CORS in a Next.js API route?",
                  "Getting started with GSAP animations in React"
                ].map((q, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5">
                    <h3 className="text-blue-500 font-semibold mb-2 cursor-pointer hover:underline">{q}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white dark:bg-zinc-700 text-[10px] rounded border border-black/5">javascript</span>
                      <span className="px-2 py-1 bg-white dark:bg-zinc-700 text-[10px] rounded border border-black/5">react</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={openInNewTab} className="mt-8 text-blue-500 font-medium flex items-center gap-2">
                Open Stack Overflow <ExternalLink className="w-4 h-4" />
              </button>
           </div>
        </div>
      );
    }

    // Default iframe for other sites
    return (
      <div className="relative w-full h-full bg-white">
        <iframe 
          src={url} 
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          title="Web Browser"
        />
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center">
            <RotateCcw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white dark:bg-[#1c1c1e] flex flex-col overflow-hidden font-system select-none">
      {/* macOS Safari Toolbar */}
      <div className="h-11 bg-zinc-100/90 dark:bg-zinc-900/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 flex items-center px-4 gap-4 shrink-0 z-20">
        <div className="flex items-center gap-1">
          <button 
            onClick={goBack} 
            disabled={historyIndex <= 0}
            className={`p-1.5 rounded-lg transition-colors ${historyIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg transition-colors ${historyIndex >= history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button 
          onClick={goHome}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
        >
          <Home className="w-4.5 h-4.5" />
        </button>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="bg-white/50 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 rounded-lg px-4 py-1 flex items-center gap-2 group focus-within:bg-white dark:focus-within:bg-zinc-800 transition-all shadow-inner">
            <Lock className="w-3 h-3 text-zinc-400" />
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-xs text-center text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 font-medium"
            />
            {loading ? <RotateCcw className="w-3.5 h-3.5 text-blue-500 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5 text-zinc-400 cursor-pointer hover:text-zinc-600" onClick={() => handleSearch()} />}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={openInNewTab} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-zinc-500">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-zinc-500">
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-white">
        {renderContent()}
      </div>
    </div>
  )
}