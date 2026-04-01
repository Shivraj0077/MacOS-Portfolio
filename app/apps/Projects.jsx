"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { 
  ExternalLink, Star, Code, 
  Cpu, Zap, 
  Sparkles, ArrowUpRight, Clock,
  Layers, GitBranch, Award, ChevronRight
} from "lucide-react"

const Github = (props) => (
  <svg 
    {...props} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

export default function Projects() {
  const containerRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

  // Removed animations for snappy UI

  const projects = [
    { 
      id: "p1",
      name: "Payment Gateway System", 
      description: "Distributed backend with ledger consistency and idempotency.",
      longDescription: "A production-ready payment processing system built for high concurrency. Features include idempotent operations and distributed transaction management.",
      tech: ["Node.js", "PostgreSQL", "Redis", "CQRS", "Docker"], 
      image: "/payment.jpg",
      metrics: ["99.99% uptime", "<50ms latency"],
      category: "FinTech",
      github: "https://github.com/Shivraj0077/Payment_Gateway_System",
      stats: { stars: 128, forks: 34, commits: 156 }
    },
    { 
      id: "p2",
      name: "AI Interviewer", 
      description: "Adaptive evaluation engine powered by LLMs.",
      longDescription: "An intelligent interviewing platform that adapts question difficulty based on candidate responses using natural language understanding.",
      tech: ["Python", "OpenAI", "Next.js", "Supabase", "LangChain"], 
      image: "/interview.jpg",
      metrics: ["5.0 rating", "Real-time analysis"],
      category: "AI",
      github: "https://github.com/Shivraj0077/AI-Interview-System",
      stats: { stars: 89, forks: 23, commits: 234 }
    },
    { 
      id: "p3",
      name: "Scheduling Platform (Cal.com-style)", 
      description: "Conflict-free job scheduling with optimistic locking.",
      longDescription: "Enterprise-grade job scheduling system with support for distributed execution, retry policies, and real-time monitoring.",
      tech: ["TypeScript", "PostgreSQL", "Redis", "BullMQ", "Docker"], 
      image: "/schedule.jpg",
      metrics: ["10k+ jobs/day", "Zero conflicts"],
      category: "Utility",
      github: "https://github.com/Shivraj0077/Cal.com",
      stats: { stars: 234, forks: 56, commits: 445 }
    },
    { 
      id: "p4",
      name: "Portfolio OS", 
      description: "High-fidelity desktop environment in the browser.",
      longDescription: "A fully-featured macOS-like desktop environment built with React. Features include draggable windows and system-wide state management.",
      tech: ["React 19", "GSAP", "Zustand", "Next.js", "Tailwind"], 
      image: "/mac-portfolio.png",
      metrics: ["60fps", "Native-like"],
      category: "Design",
      github: "https://github.com/Shivraj0077/Mac-Portfolio",
      stats: { stars: 567, forks: 89, commits: 892 }
    }
  ]

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-[#f5f5f7] dark:bg-[#1c1c1e] overflow-auto"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="hero-section mb-12 md:mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-[#8e8e93]" />
              <span className="text-[13px] font-medium text-[#6c6c70] dark:text-[#8e8e93] uppercase tracking-wide">
                Featured Projects
              </span>
            </div>
            <h1 className="text-[48px] font-semibold text-[#1c1c1e] dark:text-white tracking-tight mb-3">
              Engineering Excellence
            </h1>
            <p className="text-[17px] text-[#6c6c70] dark:text-[#8e8e93] max-w-2xl leading-relaxed">
              Production-ready systems built with modern architectures, focusing on scalability,
              performance, and real-world impact.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="project-card group cursor-pointer"
                onClick={() => window.open(project.github, "_blank")}
              >
                <div className="flex flex-col gap-6">
                  {/* Image Container */}
                  <div className="aspect-video relative rounded-3xl overflow-hidden shadow-sm bg-[#e5e5ea] dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10 transition-all group-hover:shadow-xl">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 px-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-[21px] font-semibold text-[#1c1c1e] dark:text-white tracking-tight">
                        {project.name}
                      </h2>
                      <ArrowUpRight className="w-5 h-5 text-[#8e8e93] group-hover:text-black dark:group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-[15px] text-[#6c6c70] dark:text-[#a1a1a6] leading-relaxed line-clamp-3">
                      {project.longDescription || project.description}
                    </p>
                    
                    <div className="flex items-center gap-5 pt-2">
                       <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-[#8e8e93]" />
                          <span className="text-sm font-medium text-[#1c1c1e] dark:text-white">{project.stats.stars}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <GitBranch className="w-4 h-4 text-[#8e8e93]" />
                          <span className="text-sm font-medium text-[#1c1c1e] dark:text-white">{project.stats.commits}</span>
                       </div>
                       
                       <div className="ml-auto">
                         <span className="inline-block px-3 py-0.5 text-[11px] font-medium tracking-wider rounded-full 
                                        bg-black/5 dark:bg-white/10 text-[#6c6c70] dark:text-[#a1a1a6]">
                           {project.category}
                         </span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 text-center border-t border-black/5 dark:border-white/10">
          <div className="flex items-center justify-center gap-2 text-[13px] text-[#6c6c70] dark:text-[#8e8e93]">
            <Clock className="w-4 h-4" />
            <span>All projects are production-ready and actively maintained</span>
          </div>
        </div>
      </div>
    </div>
  )
}