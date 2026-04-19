"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { 
  Briefcase, Calendar, MapPin, Award, 
  TrendingUp, Zap, Server 
} from "lucide-react"

export default function Experience() {
  const containerRef = useRef(null)

  // Removed animations for snappy UI

  const experiences = [
    {
      company: "Soulsoft Infotech",
      role: "Software Development Engineer Intern",
      period: "April 2025 – August 2025",
      location: "Remote",
      achievements: [
        {
          title: "RAG Chatbot System",
          description: "Production-grade RAG system indexing 4,000+ documents with traceable citations.",
          metrics: ["+40% adoption", "LangChain · RAG"],
          icon: Zap,
        },
        {
          title: "Internal Job Portal",
          description: "Automated candidate screening pipeline with notification workflows.",
          metrics: ["-50% HR load", "Node · React"],
          icon: Briefcase,
        },
        {
          title: "Linux Server Deployments",
          description: "Zero-downtime deployments with reverse proxy and infra reliability fixes.",
          metrics: ["Zero downtime", "Docker · Nginx"],
          icon: Server,
        },
        {
          title: "API Optimization",
          description: "Reduced latency using caching strategies and optimized query layers.",
          metrics: ["-22% latency", "FastAPI · Redis"],
          icon: TrendingUp,
        }
      ]
    }
  ]

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-[#FBFBFD] dark:bg-black overflow-auto"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">

        {/* Header */}
        <div className="exp-section mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#0071E3]" />
            </div>

            <span className="text-xs tracking-wide text-[#6E6E73] uppercase">
              Experience
            </span>
          </div>

          <h1 className="text-[48px] font-semibold tracking-tight text-[#1D1D1F] dark:text-white leading-tight">
            Professional Journey
          </h1>

          <p className="mt-4 text-[17px] text-[#6E6E73] max-w-lg">
            Building reliable systems and solving real-world problems through structured engineering.
          </p>
        </div>

        {experiences.map((exp, idx) => (
          <div key={idx} className="exp-section">

            {/* Company Panel */}
            <div className="mb-14 p-10 rounded-[28px] 
                            bg-white/80 dark:bg-zinc-800/50 
                            backdrop-blur-2xl 
                            border border-transparent dark:border-white/10
                            shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

              <div className="flex flex-col md:flex-row justify-between gap-8">

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#1D1D1F] dark:bg-white flex items-center justify-center text-2xl font-light text-white dark:text-black">
                    S
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white">
                      {exp.company}
                    </h2>
                    <p className="text-[#6E6E73] mt-1">
                      {exp.role}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-[#6E6E73] flex flex-col gap-2 md:text-right">
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>
                </div>

              </div>
            </div>

            {/* Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              {exp.achievements.map((a, i) => {
                const Icon = a.icon
                return (
                  <div
                    key={i}
                    className="group p-8 rounded-[24px] 
                               bg-white/70 dark:bg-white/5 
                               backdrop-blur-xl 
                               shadow-[0_6px_20px_rgba(0,0,0,0.04)]
                               hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                               hover:-translate-y-[2px]
                               transition-all duration-300"
                  >
                    <div className="flex gap-5">

                      {/* Icon */}
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl 
                                      bg-[#0071E3]/10">
                        <Icon className="w-4 h-4 text-[#0071E3]" />
                      </div>

                      <div>
                        <h3 className="text-[17px] font-semibold text-[#1D1D1F] dark:text-white mb-2">
                          {a.title}
                        </h3>

                        <p className="text-[14.5px] text-[#6E6E73] leading-relaxed mb-4">
                          {a.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {a.metrics.map((m, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 rounded-full 
                                         bg-[#0071E3]/10 text-[#0071E3]"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="exp-section mt-20 pt-8 flex justify-between items-center text-sm text-[#6E6E73]">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              4 Deliverables
            </span>

            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Measurable impact
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#34C759]" />
            Open to work
          </div>
        </div>

      </div>
    </div>
  )
}