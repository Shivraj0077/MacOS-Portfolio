export default function Projects() {
  const projects = [
    { 
      name: "Payment Gateway System", 
      desc: "Distributed financial infrastructure supporting authorization, capture, and settlement with idempotent APIs.",
      tech: ["Node.js", "PostgreSQL", "Redis", "CQRS"], 
      image: "/payment.png",
      link: "https://github.com/Shivraj0077/Payment_Gateway_System"
    },
    { 
      name: "Scheduling Platform", 
      desc: "Dynamic scheduling engine with multi-timezone support and conflict-free booking handling.",
      tech: ["Node.js", "PostgreSQL", "Redis", "Zustand"], 
      image: "/schedule.png",
      link: "https://github.com/Shivraj0077/Cal.com"
    },
    { 
      name: "Adaptive AI Interviewer", 
      desc: "LLM-powered interview system where difficulty adjusts dynamically based on candidate responses.",
      tech: ["Node.js", "Supabase", "LLM APIs"], 
      image: "/interview.jpg",
      link: "https://github.com/Shivraj0077"
    },
    { 
      name: "macOS Portfolio OS", 
      desc: "High-performance macOS-style desktop environment built with React and optimized state management.",
      tech: ["React", "Zustand", "Tailwind"], 
      color: "bg-zinc-800",
      link: "https://github.com/Shivraj0077/Mac-Portfolio"
    },
  ]

  return (
    <div className="p-8 h-full bg-zinc-50 dark:bg-zinc-900 overflow-auto">
      <h2 className="text-3xl font-bold mb-8 text-zinc-800 dark:text-zinc-100">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
            <a 
              key={i} 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all cursor-default block no-underline text-zinc-900 dark:text-zinc-100"
            >
                {project.image ? (
                  <img src={project.image} alt={project.name} className="w-full aspect-video object-cover rounded-2xl mb-5 group-hover:shadow-lg transition-all" />
                ) : (
                  <div className={`w-full aspect-video ${project.color} rounded-2xl mb-5 group-hover:shadow-lg transition-all flex items-center justify-center text-white/80`}>
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors">{project.name}</h3>
                <p className="text-xs opacity-60 mb-4 leading-relaxed line-clamp-2">{project.desc}</p>
                <div className="flex gap-2 flex-wrap">
                    {project.tech.map(t => (
                        <span key={t} className="text-[10px] px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg font-bold tracking-tight opacity-80">{t}</span>
                    ))}
                </div>
            </a>
        ))}
      </div>
    </div>
  )
}
