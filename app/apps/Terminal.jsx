"use client"
import { useState, useRef, useEffect, useCallback } from 'react'
import useStore from '../store/useStore'

export default function Terminal() {
  const { openApp } = useStore()
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to ShivrajOS Terminal v2.4.0 (ttys001).\nFor a list of all commands, type "help"' }
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const showAIShortcuts = input.trim().toLowerCase() === 'ai' || input.trim().toLowerCase() === 'ai '

  const aiCommands = {
    "1": { q: "Tell me about Shivraj", a: "Backend engineer focused on distributed systems and performance-critical applications." },
    "2": { q: "What projects has he built?", a: "* Payment Gateway System\n* AI Interview Platform\n* Distributed Scheduler" },
    "3": { q: "Explain payment system project", a: "A Stripe-like backend supporting authorization, capture, refunds, idempotent APIs, and double-entry ledger." },
    "4": { q: "What are his strengths?", a: "System design, backend architecture, performance optimization, and debugging production issues." },
    "5": { q: "What makes him different?", a: "Focuses on building systems that handle real-world constraints: concurrency, scale, and failures." },
    "6": { q: "Explain his backend expertise", a: "Works with Node.js and PostgreSQL to build scalable, consistent, and high-performance APIs." },
    "7": { q: "What problems has he solved?", a: "Reduced API latency (22% improvement), handled concurrency in booking systems, and built reliable financial transaction systems." }
  }

  const commands = {
    help: () => `Available Commands:\n\nwhoami        Who are you\nwhois         Detailed profile\nskills        Technical skills\nexperience    Work experience\nprojects      View projects\nachievements  Achievements\nai            Ask AI about me\napps          List internal apps\nclear         Clear screen\n\ngithub | linkedin | twitter | blog`,
    whoami: () => "Shivraj Pawar\nBackend Engineer — Distributed Systems",
    whois: () => "Backend-focused engineer specializing in distributed systems, high-performance APIs, and production reliability.",
    skills: () => "JavaScript • TypeScript • Python • Node.js • PostgreSQL • Redis • Docker • AWS • Fastify",
    experience: () => "Software Development Intern @ Soulsoft Infotech (Apr–Aug 2025)\n• Built RAG Chatbot (4000+ docs)\n• Developed Job Portal (–50% HR workload)\n• API Optimization (–22% latency)",
    projects: () => "1. Payment Gateway System (Stripe-like)\n2. Conflict-free Scheduling Platform\n3. AI Interview Evaluation System",
    achievements: () => `Achievements & Recognitions 

* Winner: Smart India Hackathon (SIH)
  National level winner of India's premier hackathon, creating ai based decision making system for train managements for IRCTC.

* Winner: Kumbhathon
  Recognized for engineering innovative solutions for the world's 
  largest human gathering (Kumbh Mela) in Nashik.

* Winner: SunHacks
  Gold medalist/top finish in the SunHacks hackathon, demonstrating 
  rapid prototyping and end-to-end product engineering skills.

* Competitive Programming
  Codeforces Max Rating: 1269.
`,
    apps: () => "Available applications (use 'open [app]'):\n\nfinder      safari      spotify      projects\nnotes       maze        settings     calculator\nabout       contact     experience   terminal\nbin",
    ai: () => `AI Assistant Ready!\n\nType a number (1-7) or use the shortcuts below:\n\n1. About Shivraj\n2. Projects\n3. Payment System\n4. Strengths\n5. What makes him different\n6. Backend Expertise\n7. Problems Solved`,
    clear: () => { setHistory([]); return null; },
    github: () => { window.open("https://github.com/Shivraj0077", "_blank"); return "Opening GitHub..."; },
    linkedin: () => { window.open("https://linkedin.com/in/shivrajpawar", "_blank"); return "Opening LinkedIn..."; },
    twitter: () => { window.open("https://twitter.com/shivraj_twt", "_blank"); return "Opening X..."; },
  }

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim()
      if (!trimmedInput) return
      const cmd = trimmedInput.toLowerCase()
      setCommandHistory(prev => [...prev, trimmedInput])
      setHistoryIndex(-1)
      let output = ""
      if (cmd.startsWith("open ")) {
        const appName = cmd.split(" ")[1]
        openApp(appName)
        output = `Opening ${appName}...`
      } else if (aiCommands[cmd]) {
        output = aiCommands[cmd].a
      } else if (commands[cmd]) {
        output = commands[cmd]()
      } else {
        output = `zsh: command not found: ${cmd}`
      }
      if (output !== null) {
        setHistory(prev => [...prev,
          { type: 'input', content: trimmedInput },
          { type: 'output', content: output }
        ])
      }
      setInput('')
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const idx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(idx)
        setInput(commandHistory[idx])
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const idx = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1
        setHistoryIndex(idx)
        setInput(idx === -1 ? '' : commandHistory[idx])
      }
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#e0e0e0] font-mono text-[14px] overflow-hidden selection:bg-white/10">
      
      {/* ── Terminal Content ── */}
      <div className="flex-1 p-6 overflow-auto bg-[#1e1e1e]/95 leading-relaxed custom-scrollbar">
        {/* Welcome Line */}
        <div className="text-[#00ff9d] mb-4 opacity-80">
          Last login: {new Date().toString().slice(0, 24)} on ttys001
        </div>

        {history.map((item, i) => (
          <div key={i} className="mb-1.5 ">
            {item.type === 'input' ? (
              <div className="flex items-start gap-2.5">
                <span className="text-[#00ff9d] font-bold select-none whitespace-nowrap">➜</span>
                <span className="text-[#ff9d00] font-bold select-none whitespace-nowrap">~</span>
                <span className="text-white font-medium">{item.content}</span>
              </div>
            ) : (
              <div className="pl-9 text-[#cccccc] whitespace-pre-wrap font-medium">
                {item.content}
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-start gap-2.5 mt-1">
          <span className="text-[#00ff9d] font-bold select-none whitespace-nowrap">➜</span>
          <span className="text-[#ff9d00] font-bold select-none whitespace-nowrap">~</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="w-full bg-transparent outline-none text-white caret-[#00ff9d] font-medium"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* AI Shortcuts Panel */}
        {showAIShortcuts && (
          <div className="mt-8 pl-9 ">
            <div className="text-[#00ff9d] text-[10px] mb-4 font-black tracking-widest uppercase opacity-60">
              Terminal Intelligence — AI Assistant
            </div>
            <div className="grid grid-cols-1 gap-1">
              {Object.entries(aiCommands).map(([key, cmd]) => (
                <button
                  key={key}
                  onClick={() => {
                    setHistory(prev => [...prev,
                      { type: 'input', content: cmd.q },
                      { type: 'output', content: cmd.a }
                    ])
                    setInput('')
                    scrollToBottom()
                  }}
                  className="text-left px-4 py-2 hover:bg-white/5 rounded-lg transition-colors flex items-start gap-4 group"
                >
                  <span className="text-[#00ff9d] font-bold w-4 shrink-0">{key}.</span>
                  <span className="text-[#e0e0e0] group-hover:text-white transition-colors opacity-80 group-hover:opacity-100 italic">
                    &quot;{cmd.q}&quot;
                  </span>
                </button>
              ))}
            </div>
            <div className="pl-4 mt-6 text-[11px] text-[#666] font-medium italic">
              Tip: Press any number 1–7 to execute
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-8" />
      </div>
    </div>
  )
}