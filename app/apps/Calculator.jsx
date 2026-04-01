"use client"
import { useState, useEffect, useCallback } from 'react'
import { useWindowStore } from '../store/useStore'

const BASIC_BUTTONS = [
  ['AC', '+/-', '%', '/'],
  ['7',  '8',  '9',  'x'],
  ['4',  '5',  '6',  '-'],
  ['1',  '2',  '3',  '+'],
  ['0',       '.',  '='],
]

const SCIENTIFIC_LEFT = [
  ['(',  ')',  'mc',  'm+'],
  ['2nd','x2','x3',  'xn'],
  ['1/x','2r','3r',  'nr'],
  ['ln', 'log','ex', '10x'],
  ['sin','cos','tan','inv'],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [memory, setMemory] = useState(0)
  const [is2nd, setIs2nd] = useState(false)
  const updateAppPosition = useWindowStore((state) => state.updateAppPosition)

  // Dynamic window resizing when switching to Scientific mode
  useEffect(() => {
    updateAppPosition('calculator', { 
      width: isAdvanced ? 480 : 280, 
      height: isAdvanced ? 400 : 400 
    })
  }, [isAdvanced, updateAppPosition])

  const handleNumber = useCallback((n) => {
    if (waitingForOperand) {
      setDisplay(n)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? n : display + n)
    }
  }, [display, waitingForOperand])

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) { setDisplay('0.'); setWaitingForOperand(false); return }
    if (!display.includes('.')) setDisplay(display + '.')
  }, [display, waitingForOperand])

  const compute = (a, b, op) => {
    switch(op) {
      case '+': return a + b
      case '-': return a - b
      case 'x': return a * b
      case '/': return b === 0 ? 'Error' : a / b
      default: return b
    }
  }

  const handleOperator = useCallback((op) => {
    const current = parseFloat(display)
    if (prevValue !== null && !waitingForOperand) {
      const res = compute(prevValue, current, operator)
      setDisplay(String(res))
      setPrevValue(res)
    } else {
      setPrevValue(current)
    }
    setOperator(op)
    setExpression(display + ' ' + op)
    setWaitingForOperand(true)
  }, [display, prevValue, operator, waitingForOperand])

  const calculate = useCallback(() => {
    if (operator === null || waitingForOperand) return
    const current = parseFloat(display)
    const result = compute(prevValue, current, operator)
    if (typeof result === 'number' && result > 1000000) {
      setDisplay("I want this amount in my bank account")
      setPrevValue(null); setOperator(null); setWaitingForOperand(false)
      return
    }
    setDisplay(typeof result === 'number' ? +result.toFixed(10) + '' : result)
    setExpression('')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }, [display, prevValue, operator, waitingForOperand])

  const handleClear = useCallback(() => {
    setDisplay('0'); setExpression(''); setPrevValue(null)
    setOperator(null); setWaitingForOperand(false)
  }, [])

  const handleSci = useCallback((fn) => {
    const v = parseFloat(display)
    if (isNaN(v)) return
    const map = {
      'sin': Math.sin, 'cos': Math.cos, 'tan': Math.tan,
      'inv': (x) => 1/x, '1/x': (x) => 1/x,
      'x2': (x) => x*x, 'x3': (x) => x*x*x,
      '2r': Math.sqrt, '3r': (x) => Math.cbrt(x),
      'ln': Math.log, 'log': Math.log10,
      'ex': Math.exp, '10x': (x) => Math.pow(10, x),
      '+/-': (x) => -x, '%': (x) => x/100,
      'mc': () => { setMemory(0); return v },
      'm+': () => { setMemory(m => m + v); return v },
    }
    const fn2nd = { 'sin': (x) => Math.asin(x)*180/Math.PI, 'cos': (x) => Math.acos(x)*180/Math.PI, 'tan': (x) => Math.atan(x)*180/Math.PI }
    const execFn = is2nd && fn2nd[fn] ? fn2nd[fn] : map[fn]
    if (execFn) {
      const result = execFn(v)
      if (typeof result === 'number') {
        if (result > 1000000) {
          setDisplay("I want this amount in my bank account")
          return
        }
        setDisplay(+result.toFixed(8) + '')
      }
    }
    if (fn === '2nd') { setIs2nd(p => !p); return }
    setIs2nd(false)
  }, [display, is2nd])

  useEffect(() => {
    const handler = (e) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key)
      else if (e.key === '.') handleDecimal()
      else if (e.key === '+') handleOperator('+')
      else if (e.key === '-') handleOperator('-')
      else if (e.key === '*') handleOperator('x')
      else if (e.key === '/') { e.preventDefault(); handleOperator('/') }
      else if (e.key === 'Enter' || e.key === '=') calculate()
      else if (e.key === 'Escape' || e.key === 'c') handleClear()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNumber, handleDecimal, handleOperator, calculate, handleClear])

  const BtnBase = 'flex items-center justify-center rounded-full font-medium text-sm active:scale-95 transition-all cursor-pointer select-none h-11'
  const getBasicStyle = (btn) => {
    if (['/', 'x', '-', '+'].includes(btn)) return `${BtnBase} bg-[#ff9f0a] hover:bg-[#ffb340] text-white text-lg`
    if (['AC', '+/-', '%'].includes(btn)) return `${BtnBase} bg-[#a1a1aa] hover:bg-[#b4b4bc] text-black text-sm`
    if (btn === '=') return `${BtnBase} bg-[#ff9f0a] hover:bg-[#ffb340] text-white text-lg`
    return `${BtnBase} bg-[#3a3a3c] hover:bg-[#4a4a4e] text-white`
  }

  const getSciStyle = () => `flex items-center justify-center rounded-full font-medium text-[11px] active:scale-95 transition-all cursor-pointer select-none h-11 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-zinc-300`

  const handleBasicBtn = (btn) => {
    if (btn === 'AC') handleClear()
    else if (btn === '=') calculate()
    else if (['+', '-', 'x', '/'].includes(btn)) handleOperator(btn)
    else if (btn === '.') handleDecimal()
    else if (btn === '+/-' || btn === '%') handleSci(btn)
    else handleNumber(btn)
  }

  const formatDisplay = (val) => {
    if (isNaN(parseFloat(val))) return val
    if (val.length > 9) return parseFloat(val).toExponential(3)
    return val
  }

  return (
    <div
      className="bg-[#1c1c1e] text-white flex flex-col select-none overflow-hidden h-full w-full"
      style={{
        borderRadius: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}
    >
      {/* Display */}
      <div className="px-4 pt-4 pb-2 text-right flex flex-col gap-0.5">
        <div className="text-[11px] text-zinc-500 h-4 tabular-nums">{expression || '\u00A0'}</div>
        <div className="text-4xl font-light tracking-tight tabular-nums truncate">
          {formatDisplay(display)}
        </div>
      </div>

      {/* Advanced toggle */}
      <div className="flex justify-end px-4 pb-2">
        <button
          onClick={() => setIsAdvanced(p => !p)}
          className="text-[10px] text-[#ff9f0a] font-semibold tracking-wide uppercase hover:opacity-70 transition-opacity"
        >
          {isAdvanced ? 'Basic' : 'Scientific'}
        </button>
      </div>

      {/* Button grid */}
      <div className="flex flex-1 px-3 pb-3 gap-1.5 overflow-hidden">

        {/* Scientific panel */}
        {isAdvanced && (
          <div className="grid grid-cols-4 gap-1.5 content-start" style={{ width: 196 }}>
            {SCIENTIFIC_LEFT.flat().map((btn, i) => (
              <button
                key={i}
                onClick={() => handleSci(btn)}
                className={getSciStyle() + (btn === '2nd' && is2nd ? ' bg-[#ff9f0a] text-white' : '')}
              >
                {btn}
              </button>
            ))}
          </div>
        )}

        {/* Basic numpad */}
        <div className="flex-1 grid gap-1.5" style={{ gridTemplateRows: 'repeat(5, 1fr)' }}>
          {BASIC_BUTTONS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((btn, ci) => (
                <button
                  key={ci}
                  onClick={() => handleBasicBtn(btn)}
                  className={getBasicStyle(btn)}
                  style={{ flex: btn === '0' ? 2 : 1 }}
                >
                  {btn === 'x' ? '×' : btn === '/' ? '÷' : btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
