"use client"
import { useState, useEffect, useCallback } from 'react'

const GRID = 12
const START = { x: 0, y: 0 }
const END = { x: 11, y: 11 }

const maze = [
  [0,0,1,0,0,0,1,0,0,0,1,0],
  [1,0,1,0,1,0,0,0,1,0,0,0],
  [1,0,0,0,1,1,1,0,1,1,1,0],
  [0,1,1,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,1,1,1,1,1,0],
  [1,1,1,0,1,0,0,0,0,0,1,0],
  [0,0,1,0,1,1,1,1,1,0,1,0],
  [0,1,1,0,0,0,0,0,1,0,0,0],
  [0,0,0,1,1,1,1,0,1,1,1,0],
  [1,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,1,1,0,1],
  [0,1,0,0,0,0,1,0,0,0,0,0],
]

const EMOJIS = ['⚡','🎮','🚀','🎯','🏆','🔮']

export default function Maze() {
  const [player, setPlayer] = useState(START)
  const [won, setWon] = useState(false)
  const [steps, setSteps] = useState(0)
  const [trail, setTrail] = useState([{ ...START }])

  const move = useCallback((dx, dy) => {
    if (won) return
    setPlayer(prev => {
      const nx = prev.x + dx
      const ny = prev.y + dy
      if (nx >= 0 && nx < GRID && ny >= 0 && ny < GRID && maze[ny][nx] === 0) {
        const next = { x: nx, y: ny }
        setSteps(s => s + 1)
        setTrail(t => [...t.slice(-25), next])
        if (nx === END.x && ny === END.y) setWon(true)
        return next
      }
      return prev
    })
  }, [won])

  useEffect(() => {
    const handler = (e) => {
      const m = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] }[e.key]
      if (m) { e.preventDefault(); move(...m) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [move])

  const reset = () => { setPlayer(START); setWon(false); setSteps(0); setTrail([{ ...START }]) }

  const inTrail = (x, y) => trail.some(t => t.x === x && t.y === y)
  const trailAlpha = (x, y) => {
    const idx = trail.findIndex(t => t.x === x && t.y === y)
    return idx === -1 ? 0 : 0.25 + (idx / trail.length) * 0.35
  }

  const Btn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-base font-bold text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 active:scale-90 transition-all shadow-sm select-none"
    >
      {children}
    </button>
  )

  return (
    <div className="h-full bg-white text-zinc-800 flex flex-col overflow-hidden select-none">

      {/* Compact Header */}
      <div className="px-5 py-3 border-b border-zinc-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight text-zinc-900 leading-none">Maze Escape</h2>
            <p className="text-[9px] text-zinc-400 font-medium tracking-widest uppercase mt-0.5">Arrow keys or buttons</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Steps</div>
            <div className="text-xl font-black text-zinc-900 tabular-nums leading-none">{steps}</div>
          </div>
          <button onClick={reset} className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[11px] font-bold hover:bg-zinc-700 active:scale-95 transition-all">Reset</button>
        </div>
      </div>

      {/* Main content area - side by side layout */}
      <div className="flex-1 flex items-center justify-center gap-4 px-4 py-3 overflow-hidden min-h-0">

        {/* Maze Grid */}
        <div className="relative flex-shrink-0" style={{ width: 'min(100%, calc(100vh - 200px), 400px)', aspectRatio: '1/1' }}>
          <div
            className="w-full h-full grid rounded-xl overflow-hidden shadow-lg border border-zinc-200"
            style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: '1px', background: '#e4e4e7' }}
          >
            {maze.flat().map((cell, i) => {
              const x = i % GRID
              const y = Math.floor(i / GRID)
              const isPlayer = player.x === x && player.y === y
              const isEnd = END.x === x && END.y === y
              const isStartCell = START.x === x && START.y === y && !isPlayer
              const isPath = inTrail(x, y) && !isPlayer
              const alpha = trailAlpha(x, y)

              return (
                <div
                  key={i}
                  style={{
                    background: cell === 1 ? '#1e1b4b'
                      : isEnd ? '#059669'
                      : isStartCell ? '#dbeafe'
                      : '#fafafa',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {isPath && <div style={{ position:'absolute', inset:'28%', borderRadius:'50%', background:`rgba(99,102,241,${alpha})` }} />}
                  {isPlayer && (
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{
                        width: '65%', height: '65%', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        boxShadow: '0 0 8px rgba(99,102,241,0.8)',
                      }} />
                    </div>
                  )}
                  {isEnd && (
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg style={{ width:'55%', height:'55%' }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Win Overlay — macOS style dialog */}
          {won && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center z-10">
              <div className="bg-white rounded-2xl shadow-2xl px-8 py-7 flex flex-col items-center gap-4 mx-4 border border-zinc-100" style={{ minWidth: 220 }}>
                {/* Success circle with checkmark */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-black text-zinc-900 tracking-tight">Maze Solved</h3>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Completed in <span className="text-indigo-600 font-bold">{steps} steps</span></p>
                </div>
                <div className="w-full h-px bg-zinc-100" />
                <button
                  onClick={reset}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-indigo-200"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side: D-Pad + Legend */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          {/* D-Pad */}
          <div className="grid grid-cols-3 gap-1.5">
            <div /><Btn onClick={() => move(0,-1)}>↑</Btn><div />
            <Btn onClick={() => move(-1,0)}>←</Btn>
            <button onClick={reset} className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-center text-sm active:scale-90 transition-all shadow-sm">⟳</button>
            <Btn onClick={() => move(1,0)}>→</Btn>
            <div /><Btn onClick={() => move(0,1)}>↓</Btn><div />
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-1.5 text-[10px] text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 inline-block shrink-0" /> You</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#1e1b4b] inline-block shrink-0" /> Wall</span>
            <span className="flex items-center gap-1.5">🏁 <span>Exit</span></span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-200 inline-block shrink-0" /> Trail</span>
          </div>

          {/* Score pill */}
          <div className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-center">
            <div className="text-[9px] text-zinc-400 uppercase font-bold tracking-widest">Record</div>
            <div className="text-base font-black text-zinc-700 tabular-nums">{steps} <span className="text-xs font-normal text-zinc-400">steps</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
