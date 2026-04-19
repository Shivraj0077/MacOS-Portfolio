"use client"
import { useState } from 'react'
import { useSystemStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, Menu } from 'lucide-react'

/* ─── Sidebar nav items ───────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'wallpaper', label: 'Wallpaper', emoji: '🖥️' },
  { id: 'appearance', label: 'Appearance', emoji: '🎨' },
]

const ACCENT_COLORS = [
  { color: '#0071e3', label: 'Blue' },
  { color: '#BF5AF2', label: 'Purple' },
  { color: '#FF2D55', label: 'Pink' },
  { color: '#FF9F0A', label: 'Orange' },
  { color: '#34C759', label: 'Green' },
  { color: '#636366', label: 'Graphite' },
]

/* ─── Tiny helpers ────────────────────────────────────────────── */
function SidebarNavItem({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5 px-2.5 py-[6px] rounded-[7px]
        text-[13px] font-[450] tracking-[-0.01em] transition-all duration-150 select-none text-left
        ${active
          ? 'bg-[#0071e3] text-white shadow-sm'
          : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/6'}
      `}
    >
      <span
        className={`
          w-[28px] h-[28px] rounded-[7px] flex items-center justify-center shrink-0 text-[14px]
          ${active ? 'bg-white/20' : 'bg-black/5 dark:bg-white/7'}
        `}
      >
        {item.emoji}
      </span>
      {item.label}
    </button>
  )
}

function ToggleSwitch({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`
        relative w-[36px] h-[22px] rounded-full transition-colors duration-200 flex-shrink-0 focus:outline-none
        ${on ? 'bg-[#34C759]' : 'bg-black/12 dark:bg-white/15'}
      `}
    >
      <span
        className={`
          absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.22)]
          transition-transform duration-200 ease-[cubic-bezier(0.34,1.4,0.64,1)]
          ${on ? 'translate-x-[16px]' : 'translate-x-[2px]'}
        `}
      />
    </button>
  )
}

function PreferenceRow({ label, children, divider = true }) {
  return (
    <>
      <div className="flex items-center justify-between py-[10px]">
        <span className="text-[13px] font-[450] text-[#1d1d1f] dark:text-[#f5f5f7]">{label}</span>
        {children}
      </div>
      {divider && <div className="h-px bg-black/6 dark:bg-white/6 -mx-4" />}
    </>
  )
}

function PreferenceCard({ label, children }) {
  return (
    <div className="bg-white dark:bg-[#2c2c2e] border border-black/6 dark:border-white/6 rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden">
      {label && (
        <p className="text-[11px] font-[600] uppercase tracking-[0.03em] text-[#6e6e73] dark:text-[#98989d] px-4 pt-[14px] pb-0">
          {label}
        </p>
      )}
      <div className="px-4 py-[14px]">{children}</div>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────── */
export default function Settings() {
  const theme = useSystemStore(state => state.theme)
  const toggleTheme = useSystemStore(state => state.toggleTheme)
  const wallpaper = useSystemStore(state => state.wallpaper)
  const setWallpaper = useSystemStore(state => state.setWallpaper)
  const [activeTab, setActiveTab] = useState('wallpaper')
  const [accentColor, setAccentColor] = useState('#0071e3')
  const [reduceTransparency, setReduceTransparency] = useState(false)
  const [increaseContrast, setIncreaseContrast] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const wallpapers = [
    { id: 1, src: '/wallpaper2.jpg', name: 'Those Eyes' },
    { id: 2, src: '/wallpaper9.png', name: 'Julius' },
    { id: 5, src: '/wallpaper7.png', name: 'Space Portal' },
    { id: 9, src: '/wallpaper6.jpg', name: 'Meowfia' },
  ]

  return (
    <div
      className="flex flex-col sm:flex-row h-full overflow-hidden select-none relative"
      style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif" }}
    >
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="absolute inset-0 bg-black/40 z-30 sm:hidden backdrop-blur-sm"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          ${showSidebar ? 'flex absolute inset-y-0 left-0 z-40' : 'hidden'} sm:flex
          w-[240px] flex-shrink-0 flex-col shadow-2xl sm:shadow-none
          bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(44,44,46,0.95)]
          border-r border-black/8 dark:border-white/7
          backdrop-blur-[40px]
          transition-all duration-300
        `}
      >
        {/* Header */}
        <div className="px-4 pt-5 pb-2 flex-shrink-0">
          <p className="text-[13px] font-[600] text-[#6e6e73] dark:text-[#98989d] tracking-[0.01em] px-1.5 mb-2">
            System Settings
          </p>

        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-none space-y-0.5">
          <p className="text-[11px] font-[600] uppercase tracking-[0.04em] text-[#aeaeb2] dark:text-[#636366] px-2 pt-3 pb-1">
            Personalization
          </p>
          {NAV_ITEMS.map(item => (
            <SidebarNavItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              onClick={() => { setActiveTab(item.id); setShowSidebar(false); }}
            />
          ))}
        </nav>
      </aside>

      {/* ── Content ── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e] transition-colors duration-300">
        
        {/* Mobile Header */}
        <div className="sm:hidden h-14 border-b border-black/10 dark:border-white/10 flex items-center px-4 shrink-0 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
          <button 
            onClick={() => setShowSidebar(true)}
            className="p-2 -ml-2 rounded-lg active:bg-black/5 transition-colors"
          >
            <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="font-semibold ml-2 text-[15px]">{NAV_ITEMS.find(i => i.id === activeTab)?.label}</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[660px] mx-auto px-4 sm:px-9 py-6 sm:py-8">

          <AnimatePresence mode="wait">

            {/* ── Appearance ── */}
            {activeTab === 'appearance' && (
              <div
                key="appearance"
                className="space-y-4"
              >
                <h1 className="text-[22px] font-[700] tracking-[-0.025em] text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
                  Appearance
                </h1>

                {/* Theme card */}
                <PreferenceCard label="Theme">
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    {/* Light */}
                    <div
                      className="cursor-pointer group"
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <div
                        className={`
                          aspect-[16/10] rounded-[12px] overflow-hidden relative
                          border-2 transition-all duration-200
                          shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]
                          group-hover:scale-[1.01]
                          ${theme === 'light'
                            ? 'border-[#0071e3] scale-[1.015] shadow-[0_0_0_3px_rgba(0,113,227,0.18),0_4px_16px_rgba(0,0,0,0.1)]'
                            : 'border-transparent hover:border-black/15 dark:hover:border-white/15'}
                        `}
                      >
                        {/* Mini light UI */}
                        <div className="w-full h-full bg-[#F2F2F7] flex items-center justify-center p-3">
                          <div className="w-full h-[72%] bg-white rounded-[8px] shadow-sm flex gap-[5px] p-2 overflow-hidden">
                            <div className="w-[28%] bg-[#F8F8F9] rounded-[5px]" />
                            <div className="flex-1 flex flex-col gap-1 pt-1">
                              <div className="h-1.5 bg-[#E8E8EC] rounded w-3/4" />
                              <div className="h-1.5 bg-[#E8E8EC] rounded w-1/2" />
                            </div>
                          </div>
                        </div>
                        {theme === 'light' && (
                          <div
                            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                            style={{ background: accentColor }}
                          >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1.5 4L3.5 6L8.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-center mt-2.5 text-[12px] font-[500] transition-colors ${theme === 'light' ? 'text-[#0071e3]' : 'text-[#6e6e73] dark:text-[#98989d]'}`}>
                        Light
                      </p>
                    </div>

                    {/* Dark */}
                    <div
                      className="cursor-pointer group"
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <div
                        className={`
                          aspect-[16/10] rounded-[12px] overflow-hidden relative
                          border-2 transition-all duration-200
                          shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]
                          group-hover:scale-[1.01]
                          ${theme === 'dark'
                            ? 'border-[#0071e3] scale-[1.015] shadow-[0_0_0_3px_rgba(0,113,227,0.18),0_4px_16px_rgba(0,0,0,0.1)]'
                            : 'border-transparent hover:border-black/15 dark:hover:border-white/15'}
                        `}
                      >
                        {/* Mini dark UI */}
                        <div className="w-full h-full bg-[#1C1C1E] flex items-center justify-center p-3">
                          <div className="w-full h-[72%] bg-[#2C2C2E] rounded-[8px] shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex gap-[5px] p-2 overflow-hidden">
                            <div className="w-[28%] bg-[#3A3A3C] rounded-[5px]" />
                            <div className="flex-1 flex flex-col gap-1 pt-1">
                              <div className="h-1.5 bg-[#48484A] rounded w-3/4" />
                              <div className="h-1.5 bg-[#48484A] rounded w-1/2" />
                            </div>
                          </div>
                        </div>
                        {theme === 'dark' && (
                          <div
                            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                            style={{ background: accentColor }}
                          >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1.5 4L3.5 6L8.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-center mt-2.5 text-[12px] font-[500] transition-colors ${theme === 'dark' ? 'text-[#0071e3]' : 'text-[#6e6e73] dark:text-[#98989d]'}`}>
                        Dark
                      </p>
                    </div>
                  </div>
                </PreferenceCard>


              </div>
            )}

            {/* ── Wallpaper ── */}
            {activeTab === 'wallpaper' && (
              <div
                key="wallpaper"
                className="space-y-4"
              >
                <h1 className="text-[22px] font-[700] tracking-[-0.025em] text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
                  Wallpaper
                </h1>

                {/* Preview */}
                <div className="flex flex-col items-center mb-2">
                  <div
                    className="
                      w-full max-w-[420px] aspect-[16/10] rounded-[16px] overflow-hidden relative
                      shadow-[0_2px_8px_rgba(0,0,0,0.12),0_8px_30px_rgba(0,0,0,0.12)]
                      border border-black/10 dark:border-white/10
                    "
                  >
                    <Image
                      key={wallpaper}
                      src={wallpaper}
                      fill
                      className="object-cover"
                      alt="Current Wallpaper"
                    />
                    {/* Menu bar */}
                    <div className="absolute top-0 left-0 right-0 h-[22px] bg-black/35 backdrop-blur-[12px] flex items-center px-2.5 gap-1.5">
                      <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
                      <div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
                      <div className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
                    </div>
                    {/* Dock */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-[20px] border border-white/25 rounded-[12px] px-2 py-1.5 flex gap-1.5 shadow-lg">
                      <div className="w-6 h-6 bg-white/30 rounded-[6px]" />
                      <div className="w-6 h-6 bg-white/30 rounded-[6px]" />
                      <div className="w-6 h-6 bg-white/30 rounded-[6px]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#aeaeb2] dark:text-[#636366] mt-3">Current Wallpaper</p>
                </div>

                {/* Gallery card */}
                <PreferenceCard label="Gallery">
                  <div className="grid grid-cols-4 gap-3 pt-1">
                    {wallpapers.map(wp => (
                      <div
                        key={wp.id}
                        className="cursor-pointer group"
                        onClick={() => setWallpaper(wp.src)}
                      >
                        <div
                          className={`
                            aspect-square rounded-[10px] overflow-hidden relative
                            border-2 transition-all duration-200
                            shadow-[0_2px_8px_rgba(0,0,0,0.14)]
                            group-hover:scale-[1.04]
                            ${wallpaper === wp.src
                              ? 'border-[#0071e3] scale-[1.02] shadow-[0_0_0_3px_rgba(0,113,227,0.2),0_2px_8px_rgba(0,0,0,0.14)]'
                              : 'border-transparent'}
                          `}
                        >
                          <Image
                            src={wp.src}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            alt={wp.name}
                          />
                          {wallpaper === wp.src && (
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-[8px]">
                              <div
                                className="w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-sm"
                                style={{ background: accentColor }}
                              >
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1.5 4L3.5 6L8.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <p
                          className={`
                            text-center mt-2 text-[11px] font-[500] transition-colors
                            ${wallpaper === wp.src
                              ? 'text-[#0071e3] font-[600]'
                              : 'text-[#6e6e73] dark:text-[#98989d]'}
                          `}
                        >
                          {wp.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </PreferenceCard>
              </div>
            )}

          </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}