"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { Compass, RotateCcw, Zap, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

const MAZE_SIZE = 15
const CELL_SIZE = 32

// Generate a random maze using DFS algorithm
function generateMaze(size) {
  const maze = Array(size).fill().map(() => Array(size).fill(1))
  const start = { x: 1, y: 1 }
  maze[start.y][start.x] = 0
  
  const stack = [start]
  const directions = [
    { x: 0, y: -2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
    { x: -2, y: 0 }
  ]
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1]
    const neighbors = []
    
    for (const dir of directions) {
      const nx = current.x + dir.x
      const ny = current.y + dir.y
      if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && maze[ny][nx] === 1) {
        neighbors.push({ x: nx, y: ny, dir })
      }
    }
    
    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)]
      maze[next.y][next.x] = 0
      maze[current.y + next.dir.y / 2][current.x + next.dir.x / 2] = 0
      stack.push({ x: next.x, y: next.y })
    } else {
      stack.pop()
    }
  }
  
  maze[size - 2][size - 2] = 2
  return maze
}

export default function MazeGame() {
  const canvasRef = useRef(null)
  const mazeRef = useRef([])
  const playerRef = useRef({ x: 1, y: 1 })
  const [gameWon, setGameWon] = useState(false)
  const [moves, setMoves] = useState(0)
  const [bestScore, setBestScore] = useState(null)
  
  // Handlers defined before effects to avoid hoisting issues
  const resetGame = useCallback(() => {
    mazeRef.current = generateMaze(MAZE_SIZE)
    playerRef.current = { x: 1, y: 1 }
    setGameWon(false)
    setMoves(0)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || mazeRef.current.length === 0) return

    const ctx = canvas.getContext('2d')
    const size = MAZE_SIZE * CELL_SIZE
    const playerPos = playerRef.current

    if (canvas.width !== size) {
      canvas.width = size
      canvas.height = size
    }

    ctx.clearRect(0, 0, size, size)

    for (let y = 0; y < MAZE_SIZE; y++) {
      for (let x = 0; x < MAZE_SIZE; x++) {
        const cell = mazeRef.current[y][x]
        const px = x * CELL_SIZE
        const py = y * CELL_SIZE

        if (cell === 1) {
          ctx.fillStyle = '#2c2c2e'
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE)
        } else if (cell === 2) {
          ctx.fillStyle = '#30d158'
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE)
          ctx.fillStyle = '#ffffff'
          ctx.font = `${CELL_SIZE * 0.65}px system-ui`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('🏁', px + CELL_SIZE / 2, py + CELL_SIZE / 2)
        } else {
          ctx.fillStyle = '#f5f5f7'
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE)
        }
      }
    }

    const playerX = playerPos.x * CELL_SIZE
    const playerY = playerPos.y * CELL_SIZE
    ctx.fillStyle = '#1c1c1e'
    ctx.shadowBlur = 12
    ctx.shadowColor = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.arc(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 2, CELL_SIZE * 0.36, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.shadowBlur = 0
    ctx.beginPath()
    ctx.arc(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 2, CELL_SIZE * 0.18, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  // Initialize game
  useEffect(() => {
    resetGame()
    const saved = localStorage.getItem('mazeBestScore')
    if (saved) setBestScore(parseInt(saved))
    
    let frameId;
    const render = () => {
      draw()
      frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frameId)
  }, [resetGame, draw])

  const movePlayer = useCallback((dx, dy) => {
    if (gameWon) return

    const newX = playerRef.current.x + dx
    const newY = playerRef.current.y + dy

    if (newX < 0 || newX >= MAZE_SIZE || newY < 0 || newY >= MAZE_SIZE) return
    if (mazeRef.current[newY] && mazeRef.current[newY][newX] === 1) return

    playerRef.current = { x: newX, y: newY }
    setMoves(m => m + 1)

    if (newX === MAZE_SIZE - 2 && newY === MAZE_SIZE - 2) {
      setGameWon(true)
    }
  }, [gameWon])

  // Split best score update logic to avoid move-stale issues
  useEffect(() => {
    if (gameWon) {
       if (!bestScore || moves < bestScore) {
          setBestScore(moves)
          localStorage.setItem('mazeBestScore', moves.toString())
       }
    }
  }, [gameWon, moves, bestScore])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.startsWith('Arrow')) e.preventDefault()
      switch(e.key) {
        case 'ArrowUp':    movePlayer(0, -1); break
        case 'ArrowDown':  movePlayer(0, 1); break
        case 'ArrowLeft':  movePlayer(-1, 0); break
        case 'ArrowRight': movePlayer(1, 0); break
        case 'r':
        case 'R': resetGame(); break
        default: break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer, resetGame])

  return (
    <div className="h-full w-full bg-[#f5f5f7] dark:bg-[#1c1c1e] overflow-auto p-6 font-sans select-none">
      <div className="max-w-[1080px] mx-auto flex flex-col h-full">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-[#e5e5ea] dark:border-[#3a3a3c] flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6 text-[#1c1c1e] dark:text-white" />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-[#1c1c1e] dark:text-white">Maze</h1>
              <p className="text-[13px] text-[#6c6c70] dark:text-[#a1a1a6]">Find your way to the flag</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#6c6c70] dark:text-[#a1a1a6] mb-0.5">Moves</p>
              <div className="flex items-center gap-2 text-[#1c1c1e] dark:text-white">
                <Zap className="w-5 h-5 text-[#ff9f0a]" />
                <span className="text-3xl font-semibold tabular-nums">{moves}</span>
              </div>
            </div>

            {bestScore && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-[#6c6c70] dark:text-[#a1a1a6] mb-0.5">Best</p>
                <div className="flex items-center gap-2 text-[#30d158]">
                  <Trophy className="w-5 h-5" />
                  <span className="text-3xl font-semibold tabular-nums">{bestScore}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 flex-1 items-start justify-center">
          
          {/* Maze Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="rounded-3xl shadow-2xl border border-[#e5e5ea] dark:border-[#3a3a3c] bg-white dark:bg-[#2c2c2e]"
              style={{ width: MAZE_SIZE * CELL_SIZE, height: MAZE_SIZE * CELL_SIZE }}
            />

            {gameWon && (
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
                <div className="relative z-10 text-center px-10 py-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-semibold text-white mb-2">Victory</h2>
                  <p className="text-white/80 text-lg mb-8">Completed in {moves} moves</p>
                  
                  <button 
                    onClick={resetGame}
                    className="px-8 py-3 bg-white text-[#1c1c1e] font-semibold rounded-2xl hover:bg-[#f5f5f7] active:scale-[0.97] transition-all shadow-lg"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-[260px] bg-white dark:bg-[#2c2c2e] rounded-3xl border border-[#e5e5ea] dark:border-[#3a3a3c] p-7 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1c1c1e] dark:text-white mb-6">Movement Controls</h3>
            
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => movePlayer(0, -1)}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] active:scale-95 transition-all border border-[#e5e5ea] dark:border-[#3a3a3c]"
              >
                <ArrowUp className="w-6 h-6 text-[#1c1c1e] dark:text-white" />
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => movePlayer(-1, 0)}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] active:scale-95 transition-all border border-[#e5e5ea] dark:border-[#3a3a3c]"
                >
                  <ArrowLeft className="w-6 h-6 text-[#1c1c1e] dark:text-white" />
                </button>
                <button
                  onClick={() => movePlayer(0, 1)}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] active:scale-95 transition-all border border-[#e5e5ea] dark:border-[#3a3a3c]"
                >
                  <ArrowDown className="w-6 h-6 text-[#1c1c1e] dark:text-white" />
                </button>
                <button
                  onClick={() => movePlayer(1, 0)}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] active:scale-95 transition-all border border-[#e5e5ea] dark:border-[#3a3a3c]"
                >
                  <ArrowRight className="w-6 h-6 text-[#1c1c1e] dark:text-white" />
                </button>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="mt-10 w-full py-3.5 flex items-center justify-center gap-2.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] text-sm font-medium active:scale-[0.98] transition-all border border-[#e5e5ea] dark:border-[#3a3a3c]"
            >
              <RotateCcw className="w-4 h-4" />
              New Maze
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center" style={{ scrollbarNone: "auto" }}>
          <p className="text-[10px] text-[#6c6c70] dark:text-[#a1a1a6]">
            Arrow keys supported • Press R to reset
          </p>
        </div>
      </div>
    </div>
  )
}