"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { 
  Cpu, HardDrive, Settings, Award, Star, 
  Search, ChevronRight, Info 
} from "lucide-react"
import Image from "next/image"

export default function About() {
  const containerRef = useRef(null)

  // Removed animations for snappy UI

  return (
    <div ref={containerRef}
      className="flex h-full bg-[#f1f1f1] dark:bg-[#1c1c1e] 
                 font-sans text-[#1c1c1e] dark:text-[#f5f5f7] overflow-hidden select-none"
    >
      {/* Left Sidebar - Minimal macOS Style */}
      <div className="w-[260px] shrink-0 bg-[#e8e8e8]/90 dark:bg-[#1c1c1e]/95 backdrop-blur-3xl 
                      border-r border-[#d1d1d1] dark:border-white/5 flex flex-col">

       

        {/* Profile */}
        <div className="pt-3 px-5 pb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
              <img src="/about.svg" alt="Shivraj Pawar" className="w-11 h-11 object-cover" />
            </div>
            <div>
              <p className="font-semibold text-[15px]">Shivraj Pawar</p>
              <p className="text-xs text-[#8e8e93]">Software Developer</p>
            </div>
          </div>
        </div>

        {/* Sidebar Items */}
        <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <SidebarItem icon={<Cpu className="w-4 h-4" />} label="Full-Stack Engineer" />
          <SidebarItem icon={<HardDrive className="w-4 h-4" />} label="Distributed Systems" />
          <SidebarItem icon={<Settings className="w-4 h-4" />} label="System Architecture" />
          
          <div className="h-px bg-black/10 dark:bg-white/10 my-6 mx-3" />

          <SidebarItem icon={<Award className="w-4 h-4" />} label="SIH Winner" />
          <SidebarItem icon={<Star className="w-4 h-4" />} label="Codeforces Specialist" />
        </div>
      </div>

      {/* Main Content - Clean macOS Style */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1c1c1e] overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-14 border-b border-[#e1e1e1] dark:border-[#3a3a3c] flex items-center px-8 shrink-0">
          <Info className="w-5 h-5 text-[#8e8e93] mr-3" />
          <span className="font-semibold text-[15px] tracking-tight">About</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-12 main-content">
          <div className="max-w-3xl mx-auto">
            
            {/* Name + Title */}
            <div className="mb-12 text-center">
              <div className="relative w-36 h-36 mx-auto mb-8">
                <div className="w-full h-full rounded-full overflow-hidden border-[8px] border-[#f1f1f1] dark:border-[#2c2c2c] shadow-2xl">
                  <img src="/about.svg" alt="Shivraj Pawar" className="w-full h-full object-cover" />
                </div>
              </div>
              <h1 className="text-[52px] font-bold tracking-tighter leading-none mb-2">Shivraj Pawar</h1>
              <p className="text-[#8e8e93] text-xl font-medium">Software Engineer & AI Engineer</p>
            </div>

            {/* Right-aligned Summary Content */}
            <div className="max-w-xl ml-auto space-y-8">
              <div className="space-y-6 text-[17px] leading-relaxed">
                <p className="text-[#1c1c1e] dark:text-[#f5f5f7]">
                  I build high-performance distributed systems and production-grade applications with a strong focus on reliability and scalability.
                </p>
                
                <p className="text-[#1c1c1e] dark:text-[#f5f5f7]/90 leading-relaxed">
                  Experienced in developing payment systems, scheduling engines, multi-agent architectures, 
                  and Retrieval-Augmented Generation (RAG) solutions. 
                </p>
                
                <p className="text-[#1c1c1e] dark:text-[#f5f5f7]/90 leading-relaxed">
                  I work at an intermediate-to-advanced level in production environments, 
                  delivering clean, maintainable, and efficient systems that solve real-world problems.
                </p>
              </div>

              {/* Subtle Accent Line */}
              <div className="h-px bg-black/10 dark:bg-white/10 w-20" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label }) {
  return (
    <div className="sidebar-item flex items-center gap-3 px-4 py-[9px] text-[13px] font-medium rounded-xl 
                    hover:bg-[#d8d8d8] dark:hover:bg-[#3a3a3c] transition-colors cursor-default">
      <span className="text-[#8e8e93]">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  )
}