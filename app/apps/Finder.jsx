"use client"
import { useState } from 'react'
import useStore from '../store/useStore'
import {
  LayoutGrid, List, Search,
  ChevronLeft, ChevronRight, X
} from 'lucide-react'
import Image from 'next/image'

const documentContents = {
  tech: {
    title: 'Tech Stack.md',
    icon: '⚙️',
    sections: [
      { heading: 'Backend', items: ['Node.js', 'Python (FastAPI)', 'Go (learning)', 'Redis', 'PostgreSQL', 'MongoDB'] },
      { heading: 'Frontend', items: ['React 19', 'Next.js 15', 'TailwindCSS', 'GSAP', 'Framer Motion'] },
      { heading: 'DevOps & Cloud', items: ['Docker', 'Nginx', 'Linux (Ubuntu)', 'GitHub Actions', 'Vercel'] },
      { heading: 'Architecture', items: ['CQRS', 'Event Sourcing', 'RAG Pipelines', 'Microservices', 'REST & gRPC'] }
    ]
  },
  cloud: {
    title: 'Cloud Infrastructure.sys',
    icon: '☁️',
    sections: [
      { heading: 'Deployment Stack', items: ['Linux (Ubuntu 22.04)', 'Nginx as reverse proxy', 'Docker containers', 'PM2 process manager'] },
      { heading: 'CI/CD', items: ['GitHub Actions for automated deploys', '12+ zero-downtime production releases', 'Rolling deployments'] },
      { heading: 'Monitoring', items: ['Custom health check endpoints', 'Log aggregation via journald', 'Alert pipelines for critical errors'] }
    ]
  },
  hack: {
    title: 'Hackathons.cert',
    icon: '🏆',
    sections: [
      { heading: 'Smart India Hackathon 2024 – Winner 🥇', items: ['Built an AI-powered document analysis system for government digitization', 'Competed against 500+ teams nationally', 'Final product deployed by the sponsoring ministry'] },
      { heading: 'Other Competitions', items: ['Multiple college-level hackathon participations', 'Focus areas: distributed systems, AI, full-stack web'] }
    ]
  },
  intern: {
    title: 'Internships.doc',
    icon: '💼',
    sections: [
      { heading: 'Soulsoft Infotech · Apr 2025 – Aug 2025', items: [
        'Built RAG chatbot over 4000+ docs → 2 min resolution (from 5-6 min)',
        'Job portal: 300+ applications, 800+ automated emails, 50% fewer HR follow-ups',
        '12+ zero-downtime Nginx deployments on Linux',
        'API latency: 1.8s → 1.4s (22% improvement) via caching'
      ]}
    ]
  }
}

const projectContents = {
  p1: {
    title: 'Payment Gateway System',
    image: '/payment.jpg',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'CQRS'],
    desc: 'High-performance financial backend supporting distributed transactions, idempotency, and ledger consistency.',
    metrics: ['500+ TPS', 'Sub-100ms latency', 'Full idempotency layer'],
    link: 'https://github.com/Shivraj0077/Payment_Gateway_System'
  },
  p2: {
    title: 'AI Interviewer (Adaptive)',
    image: '/interview.jpg',
    tech: ['Next.js', 'Python', 'LangChain', 'OpenAI', 'Supabase'],
    desc: 'Gen-AI powered interview candidate evaluation engine. Dynamically adjusts question complexity based on real-time response analysis.',
    metrics: ['Adaptive difficulty', 'Real-time scoring', 'Multi-domain support'],
    link: 'https://github.com/Shivraj0077'
  },
  p3: {
    title: 'Scheduling Platform (Cal.com-style)',
    image: '/schedule.jpg',
    tech: ['TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    desc: 'Conflict-free booking and job scheduling platform. Built to solve race conditions in highly concurrent environments using optimistic locking.',
    metrics: ['Zero race conditions', 'Optimistic locking', 'Concurrent-safe'],
    link: 'https://github.com/Shivraj0077/Cal.com'
  },
  p4: {
    title: 'macOS Portfolio OS v2',
    image: null,
    tech: ['React 19', 'GSAP', 'Framer Motion', 'Zustand', 'Next.js'],
    desc: 'A fully functional, high-fidelity desktop environment. Features GSAP physics-based windows and hardware-accelerated animations.',
    metrics: ['Full window management', 'GSAP animations', 'Dark/light mode'],
    link: 'https://github.com/Shivraj0077/Mac-Portfolio'
  }
}

export default function Finder() {
  const [viewMode, setViewMode] = useState('grid')
  const [activeTab, setActiveTab] = useState('Applications')
  const [activeView, setActiveView] = useState("grid")
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const { openApp } = useStore()

  const ICON_COLOR = "#1d8ad3"

  const SidebarIcons = {
    Desktop: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="13" rx="2" stroke={ICON_COLOR} strokeWidth="2.5"/>
        <path d="M8 20H16" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 17V20" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    Documents: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8L13 2Z" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 2V8H19" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Applications: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="10" stroke={ICON_COLOR} strokeWidth="2.5"/>
         <path d="M12 7V17M12 7L8 11M12 7L16 11" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Projects: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H9L11 5H20C21.1046 5 22 5.89543 22 7V19Z" stroke={ICON_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  const tabs = [
    { id: 'Desktop', name: 'Desktop', icon: SidebarIcons.Desktop },
    { id: 'Projects', name: 'Projects', icon: SidebarIcons.Projects },
    { id: 'Applications', name: 'Applications', icon: SidebarIcons.Applications },
    { id: 'Documents', name: 'Documents', icon: SidebarIcons.Documents },
  ]

  const AppRegistry_local = {
    finder: { id: 'finder', name: 'Finder', icon: '/finder.svg' },
    about: { id: 'about', name: 'About Me', icon: '/about.svg' },
    projects: { id: 'projects', name: 'Projects', icon: '/app-store.svg' },
    terminal: { id: 'terminal', name: 'Terminal', icon: '/terminal.svg' },
    notes: { id: 'notes', name: 'Notes', icon: '/notes.svg' },
    safari: { id: 'safari', name: 'Safari', icon: '/safari.svg' },
    spotify: { id: 'spotify', name: 'Spotify', icon: '/spotify.svg' },
    settings: { id: 'settings', name: 'Settings', icon: '/settings.svg' },
    calculator: { id: 'calculator', name: 'Calculator', icon: '/calculator.svg' },
    contact: { id: 'contact', name: 'Contact', icon: '/mail.png' },
    experience: { id: 'experience', name: 'Experience', icon: '/projects.svg' },
    maze: { id: 'maze', name: 'Mirror Room', icon: '/maze.svg' },
    bin: { id: 'bin', name: 'Bin', icon: '/trash.png' },
  }

  const contents = {
    Desktop: [
      { id: 'about', name: 'About Me', type: 'app', icon: '/about.svg', action: () => openApp('about') }
    ],
    Applications: Object.values(AppRegistry_local).map(app => ({
      id: app.id, name: app.name, type: 'application', icon: app.icon, action: () => openApp(app.id)
    })),
    Documents: [
      { id: 'tech', name: 'Tech Stack.md', type: 'markdown', icon: '/file.svg' },
      { id: 'cloud', name: 'Cloud Infrastructure.sys', type: 'system', icon: '/file.svg' },
      { id: 'hack', name: 'Hackathons.cert', type: 'document', icon: '/file.svg' },
      { id: 'intern', name: 'Internships.doc', type: 'document', icon: '/file.svg' },
    ],
    Projects: [
      { id: 'p1', name: 'WeLoveWeb', type: 'project', icon: '/globe.svg' },
      { id: 'p2', name: 'DarkModeToggle', type: 'project', icon: '/globe.svg' },
      { id: 'p3', name: 'VolumeControl', type: 'project', icon: '/globe.svg' },
      { id: 'p4', name: 'SpeedScanner', type: 'project', icon: '/globe.svg' },
      { id: 'p5', name: 'UbuntuOS', type: 'project', icon: '/globe.svg' },
    ]
  }

  const handleItemClick = (item) => {
    // If it's an app/application, start it immediately on click
    if (item.action) {
      item.action()
      return
    }

    // For folders/documents/projects, show the detail view
    setSelectedItem(item)
    setActiveView("document")
  }

  const currentItems = (contents[activeTab] || []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const detailContent = selectedItem
    ? (activeTab === 'Documents' ? documentContents[selectedItem.id] : projectContents[selectedItem.id])
    : null

  return (
    <div className="flex h-full
      bg-[#f6f6f6] dark:bg-[#1c1c1e]
      text-zinc-900 dark:text-zinc-100
      font-[system-ui,-apple-system,BlinkMacSystemFont]
      overflow-hidden">

      {/* Sidebar */}
      <div className="w-52 p-3
        bg-white/60 dark:bg-zinc-900/40
        backdrop-blur-2xl
        border-r border-black/5 dark:border-white/5">

        <div className="text-[10px] uppercase text-zinc-400 px-2 mb-2">
          Favorites
        </div>

        {tabs.map(tab => (
           <div 
             key={tab.id}
             onClick={() => {
               setSelectedItem(null)
               setActiveTab(tab.id)
               setActiveView("grid")
             }}
             className={`px-3 py-1.5 rounded-md text-[13px] flex items-center gap-2 cursor-default
             ${activeTab === tab.id
               ? "bg-black/5 dark:bg-white/10"
               : "hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400"
             }`}
           >
             <div className="w-4 h-4 flex items-center justify-center">
                <tab.icon />
             </div>
             {tab.name}
           </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Toolbar */}
        <div className="h-11 flex items-center px-4 gap-4
          bg-white/60 dark:bg-zinc-900/40
          backdrop-blur-xl
          border-b border-black/5 dark:border-white/5">

          <div className="flex gap-2 opacity-40">
            <ChevronLeft className="w-4 h-4 cursor-pointer" onClick={() => activeView === 'document' && setActiveView('grid')} />
            <ChevronRight className="w-4 h-4" />
          </div>

          <span className="text-sm flex-1 font-medium">{activeTab}</span>

          <div className="flex bg-zinc-200/60 dark:bg-white/10 rounded-md p-0.5">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/80 dark:bg-white/10' : 'opacity-40'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/80 dark:bg-white/10' : 'opacity-40'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-zinc-200/60 dark:bg-white/10 backdrop-blur-md rounded-md pl-7 pr-3 py-1.5 text-sm outline-none"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">

          {activeView === "grid" && viewMode === 'grid' && (
            <div className="grid grid-cols-4 gap-x-6 gap-y-10 ">
              {currentItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="flex flex-col items-center gap-2 p-2 rounded-xl cursor-default group hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div className="w-16 h-16 relative drop-shadow-md group-active:scale-95 transition-transform">
                    {item.icon
                      ? <Image src={item.icon} fill className="object-contain" alt="" />
                      : <span className="text-5xl flex items-center justify-center h-full drop-shadow-lg">{item.emoji}</span>}
                  </div>
                  <span className="text-[12px] text-center font-bold px-2 py-0.5 rounded-md leading-tight max-w-[100px] break-words text-zinc-800 dark:text-zinc-100 dark:drop-shadow-sm">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeView === "grid" && viewMode === 'list' && (
            <div className="flex flex-col ">
               <div className="flex items-center px-4 py-1 border-b border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <div className="w-1/2">Name</div>
                  <div className="w-1/4">Kind</div>
                  <div className="w-1/4">Size</div>
               </div>
               <div className="flex flex-col mt-1">
                  {currentItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center px-4 py-1.5 rounded-md text-[13px] group cursor-default hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <div className="w-1/2 flex items-center gap-3 truncate">
                        <div className="w-5 h-5 relative shrink-0">
                           {item.icon 
                             ? <img src={item.icon} className="w-full h-full object-contain" alt="" />
                             : <span className="text-sm">{item.emoji}</span>}
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="w-1/4 truncate opacity-60">{item.type || 'Application'}</div>
                      <div className="w-1/4 text-zinc-400 font-mono text-[11px]">
                        {item.type === 'app' ? '--' : `${(Math.random() * 5 + 1).toFixed(1)} MB`}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

        {activeView === "document" && selectedItem && detailContent && (
  <div className="flex justify-center py-10 ">

    {/* macOS Document Window */}
    <div className="
      w-full max-w-4xl
      bg-white dark:bg-[#1e1e1e]
      rounded-xl
      shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      border border-black/10 dark:border-white/10
      overflow-hidden
    ">

      {/* Top Toolbar (macOS style) */}
      <div className="
        flex items-center justify-between
        px-4 py-2
        bg-zinc-100/80 dark:bg-zinc-900/80
        backdrop-blur-xl
        border-b border-black/10 dark:border-white/10
      ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("grid")}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {detailContent.title}
        </span>

        <div className="text-xs text-zinc-400">
          Preview
        </div>
      </div>

      {/* Document Content (Paper) */}
      <div className="px-10 py-10 bg-white dark:bg-[#1e1e1e]">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {detailContent.title}
          </h1>
        </div>

        {/* PROJECT VIEW */}
        {activeTab === "Projects" && (
          <div className="space-y-6 text-[15px] leading-relaxed">

            <p className="text-zinc-700 dark:text-zinc-300">
              {detailContent.desc}
            </p>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Tech Stack
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
                {detailContent.tech.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Metrics
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
                {detailContent.metrics.map(m => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <a
              href={detailContent.link}
              target="_blank"
              className="
                inline-block mt-4
                text-blue-600 dark:text-blue-400
                hover:underline text-sm
              "
            >
              Open Repository →
            </a>
          </div>
        )}

        {/* DOCUMENT VIEW */}
        {activeTab === "Documents" && (
          <div className="space-y-8 text-[15px] leading-relaxed">

            {detailContent.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  {section.heading}
                </h2>

                <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  </div>
)}
        </div>

        {/* Status bar */}
        <div className="h-6 flex items-center justify-between px-4 text-[10px] text-zinc-400 font-bold uppercase tracking-widest
          bg-white/60 dark:bg-zinc-900/40 border-t border-black/5 dark:border-white/5 shrink-0">
          <span>{currentItems.length} items found</span>
          <span>1.42 GB SSD Available</span>
        </div>
      </div>
    </div>
  )
}