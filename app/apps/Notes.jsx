"use client"
import { useState } from 'react'

const initialNotes = [
  { id: 'brain', title: 'Hack My Brain', content: 'Explore the neuron paths of my portfolio. Every component reflects a thought, every optimized line a synaptic connection. Welcome to the machine.' },
  { id: 'ideas', title: 'Startup Idea Generator', content: 'Type a domain to see my next billion-dollar idea. (e.g. AI, Crypto, Food)' }
]

const randomIdeas = [
  'Uber for programmers: Get someone to sit next to you for rubber ducking.',
  'AI that apologizes for your code: Automatically replies to PR comments with humble apologies.',
  'Food delivery for late-night debuggers: Only delivers when it sees a stack trace.',
  'Crypto for social media clout: Tokens based on how many stars your repo has.',
  'A gym where you only work out if your CI fails: Motivates better code.'
]

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState(initialNotes[0])
  const [domain, setDomain] = useState('')
  const [generatedIdea, setGeneratedIdea] = useState(null)

  const generateIdea = () => {
    const idea = randomIdeas[Math.floor(Math.random() * randomIdeas.length)]
    setGeneratedIdea(idea)
  }

  return (
    <div className='flex h-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 overflow-hidden font-sans border border-white/5'>
      {/* Sidebar */}
      <div className='w-48 bg-zinc-100/50 dark:bg-zinc-950/30 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-4 shadow-xl'>
        <div className='text-xs font-bold uppercase tracking-widest text-zinc-400'>Folders</div>
        <div className='flex flex-col gap-1'>
          {initialNotes.map(note => (
            <div 
              key={note.id} 
              onClick={() => setSelectedNote(note)}
              className={`p-3 rounded-xl transition-all cursor-default text-xs font-medium hover:scale-[1.02] transform active:scale-95 ${selectedNote?.id === note.id ? 'bg-yellow-400 text-black shadow-lg' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
            >
              {note.title}
            </div>
          ))}
          <div className='mt-8 text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-3'>Quick Access</div>
          <div className='p-3 text-[10px] opacity-40 italic'>All notes saved in cloud</div>
        </div>
      </div>

      {/* Editor Space */}
      <div className='flex-1 p-10 flex flex-col gap-6 overflow-auto'>
        {selectedNote?.id === 'brain' && (
           <>
            <h2 className='text-3xl font-bold tracking-tight'>{selectedNote.title}</h2>
            <p className='text-sm leading-relaxed opacity-80 whitespace-pre-wrap max-w-lg'>{selectedNote.content}</p>
            <div className='mt-10 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col gap-4 group hover:scale-[1.01] transition-transform'>
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-black">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.88A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.88A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                    </div>
                    <h3 className='font-bold text-lg'>Brain Dump</h3>
                <div className='text-xs opacity-60 leading-relaxed font-mono'>
                    System Status: 98% Synthesized
                    <br />
                    Module: Portfolio OS V2
                    <br />
                    Synapse Strength: Optimized
                </div>
            </div>
           </>
        )}

        {selectedNote?.id === 'ideas' && (
            <>
                <h2 className='text-3xl font-bold tracking-tight'>{selectedNote.title}</h2>
                <div className='flex flex-col gap-6 max-w-md bg-zinc-100 dark:bg-zinc-800 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-xs font-bold uppercase tracking-widest text-zinc-500'>Enter Domain</span>
                        <input 
                            type="text" 
                            placeholder="e.g. AI, Fintech, Bio" 
                            className='w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl text-sm outline-none focus:ring-2 ring-yellow-400/50'
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={generateIdea}
                        className='w-full px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-xl active:scale-95 transition-all'
                    >
                        Generate Idea
                    </button>
                    {generatedIdea && (
                        <div className='mt-4 p-6 bg-zinc-900 dark:bg-black rounded-2xl border-l-4 border-yellow-400 animate-in slide-in-from-top-2 fade-in duration-300'>
                            <p className='text-sm font-medium leading-relaxed italic text-zinc-300'>
                               "{generatedIdea}"
                            </p>
                        </div>
                    )}
                </div>
            </>
        )}
      </div>
    </div>
  )
}
