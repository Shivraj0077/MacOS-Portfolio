"use client"
import { useState, useRef, useEffect } from 'react'

const initialCommands = [
  { input: 'help', output: 'Available commands: help, clear, siri, date, about' },
  { input: 'siri --help', output: 'Siri: I can help you with your coding journey. Just type "siri <your question>"' },
  { input: 'date', output: new Date().toString() },
  { input: 'about', output: 'A futuristically optimized macOS-style portfolio environment.' }
]

export default function Terminal() {
  const [history, setHistory] = useState(initialCommands)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase()
      let output = `Command not found: ${cmd}`

      if (cmd === 'clear') {
        setHistory([])
        setInput('')
        return
      }
      
      if (cmd === 'help') output = 'Available commands: help, clear, whoami, skills, experience, education, date, about'
      if (cmd === 'date') output = new Date().toString()
      if (cmd === 'about') output = 'A high-performance macOS-style portfolio showcasing distributed systems and backend engineering projects.'
      if (cmd === 'whoami') output = 'Shivraj Pawar - Backend Engineer | Specialized in Distributed Systems & AI Infrastucture.'
      if (cmd === 'education') output = 'B.Tech in Computer Science Engineering (2022-2026)\nSandip University, Nashik\nGPA: 8.50'
      if (cmd === 'skills') output = 'Languages: JS, TS, Python, C++\nBackend: Node.js, PostgreSQL, Redis, Redis, CQRS\nCloud: AWS (S3, Lambda), Docker, Nginx'
      if (cmd === 'experience') output = 'Soulsoft Infotech (Apr 2025 - Aug 2025)\n- Built RAG-based chatbot over 4,000+ docs\n- Developed job portal with automated workflows\n- Optimized API latency by 22% via caching'
      
      if (cmd.startsWith('siri')) {
          const query = cmd.replace('siri', '').trim()
          if (!query) output = 'Siri: Hello! I am your AI assistant. Type "siri <your question>"'
          else output = `Siri: Searching my knowledge base for "${query}"... (I'm actually a simple local script, but I believe in you!)`
      }

      setHistory([...history, { input, output }])
      setInput('')
    }
  }

  return (
    <div className='h-full bg-zinc-950 text-emerald-500 p-6 font-mono text-sm overflow-auto flex flex-col gap-2 selection:bg-emerald-500 selection:text-black'>
      <div className='flex flex-col gap-4'>
        <div className='text-xs opacity-50 border-b border-emerald-500/10 pb-4 mb-4'>
            Last login: {new Date().toLocaleDateString()} on ttys001
            <br />
            Type "help" to see available commands.
        </div>
        
        {history.map((item, i) => (
          <div key={i} className='flex flex-col gap-1 anim-fade-in'>
            <div className='flex gap-2 items-center'>
              <span className='text-emerald-500/40'>sh-3.2#</span>
              <span className='text-zinc-100'>{item.input}</span>
            </div>
            <div className='pl-2 opacity-80 whitespace-pre-wrap leading-relaxed'>{item.output}</div>
          </div>
        ))}

        <div className='flex gap-2 items-center'>
          <span className='text-emerald-500/40'>sh-3.2#</span>
          <input 
            type='text'
            autoFocus
            className='flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-emerald-500/20'
            placeholder='type a command...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
          />
        </div>
        <div ref={bottomRef} className='h-1' />
      </div>
      
      <div className='fixed bottom-8 right-8 animate-pulse pointer-events-none'>
          <div className='w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]' />
      </div>
    </div>
  )
}
