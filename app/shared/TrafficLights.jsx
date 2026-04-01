"use client"
import { useState } from "react"

export function TrafficLights({ onClose, onMinimize, onMaximize, maximizable = true, isMaximized = false }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="flex gap-[8px] mr-3"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.() }}
        className="w-[14px] h-[14px] rounded-full bg-[#ff5f56] border-[0.5px] border-black/20 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] hover:brightness-90 active:brightness-75 transition-[filter] shrink-0"
        aria-label="Close"
      >
        {isHovering && (
          <svg className="w-[8px] h-[8px] text-black/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Minimize */}
      <button
        onClick={(e) => { e.stopPropagation(); onMinimize?.() }}
        className="w-[14px] h-[14px] rounded-full bg-[#ffbd2e] border-[0.5px] border-black/20 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] hover:brightness-90 active:brightness-75 transition-[filter] shrink-0"
        aria-label="Minimize"
      >
        {isHovering && (
          <svg className="w-[8px] h-[8px] text-black/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        )}
      </button>

      {/* Maximize / Restore */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (maximizable) onMaximize?.()
        }}
        className={`w-[14px] h-[14px] rounded-full border-[0.5px] border-black/20 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] hover:brightness-90 active:brightness-75 transition-[filter] shrink-0 ${
          !maximizable ? 'bg-zinc-300 dark:bg-zinc-700 opacity-40 cursor-not-allowed' : 'bg-[#27c93f]'
        }`}
        aria-label={isMaximized ? "Restore" : "Maximize"}
        disabled={!maximizable}
      >
        {isHovering && maximizable && (
          isMaximized ? (
            <svg className="w-[8px] h-[8px] text-black/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          ) : (
            <svg className="w-[8px] h-[8px] text-black/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <rect x="4" y="4" width="16" height="16" rx="1" />
            </svg>
          )
        )}
      </button>
    </div>
  )
}