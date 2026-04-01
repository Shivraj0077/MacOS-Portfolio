"use client"
import { useState } from 'react'

const trashFiles = [
  { id: 'sleep', name: 'sleep_schedule.txt', content: 'Planned sleep: 11:00 PM\nActual sleep: when the bug fixes itself\n\nDay 1: I\'ll sleep early\nDay 2: debugging\nDay 3: debugging the debugging' },
  { id: 'final', name: 'final_final_version.js', content: 'final.js\nfinal_v2.js\nfinal_final.js\nfinal_final_REAL.js\nfinal_final_REAL_last.js\n\nNote: These files were sacrificed during development.' },
  { id: 'works', name: 'works_on_my_machine.txt', content: 'Bug report: "App crashes."\n\nDeveloper response:\nWorks on my machine.' },
  { id: 'console', name: 'console_log_collection.txt', content: 'console.log("why");\nconsole.log("why is this happening");\nconsole.log("WHAT IS THIS");\nconsole.log("ok it works now");' },
  { id: 'ideas', name: 'startup_ideas_3am.txt', content: 'Uber for programmers\nAI that writes my code\nAI that debugs my code\nAI that explains my code\nAI that apologizes for my code' },
  { id: 'temp', name: 'temporary_fix.js', content: '// TODO: fix properly later\nif(true){\n   runEverything()\n}\n\nNote: This fix survived production for 6 months.' },
  { id: 'motivation', name: 'motivation.txt', content: 'I will code for 2 hours today.\n\n12 hours later:\nstill debugging.' },
  { id: 'stackoverflow', name: 'stack_overflow_history.txt', content: 'Search #1: javascript array remove item\nSearch #2: why is my code broken\nSearch #3: how to center div\nSearch #4: how to center div again\nSearch #5: why CSS hates me' },
  { id: 'meeting', name: 'meeting_notes.txt', content: 'Meeting Agenda:\n\n• Discuss architecture\n• Agree on architecture\n• Ignore architecture\n• Rewrite everything' },
  { id: 'bug', name: 'bug_that_fixed_itself.txt', content: 'Bug existed yesterday.\n\nToday it works.\n\nNo one touched the code.\n\nWe move on and never speak of it again.' }
]

export default function Bin() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [alert, setAlert] = useState(null)

  const emptyTrash = () => {
    setAlert({ title: 'Error: Permission denied.', message: 'Developer attached emotional value to these files.' })
  }

  return (
    <div className='flex h-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'>
      {/* Sidebar */}
      <div className='w-48 bg-zinc-100/50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 p-4'>
        <div className='text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4'>Trash</div>
        <div className='flex flex-col gap-1'>
          {trashFiles.map(file => (
            <div 
              key={file.id} 
              onClick={() => setSelectedFile(file)}
              className={`text-xs p-2 rounded cursor-pointer transition-colors ${selectedFile?.id === file.id ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
            >
              {file.name}
            </div>
          ))}
        </div>
        <button 
          onClick={emptyTrash}
          className='mt-10 w-full text-center text-xs font-semibold py-2 px-4 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors'
        >
          Empty Trash
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col'>
        {selectedFile ? (
          <div className='p-8 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>{selectedFile.name}</h2>
              <span className='text-[10px] uppercase font-bold text-zinc-500'>Sacrificed File</span>
            </div>
            <pre className='bg-zinc-100 dark:bg-zinc-950 p-6 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-wrap border border-zinc-200 dark:border-zinc-800'>
              {selectedFile.content}
            </pre>
          </div>
        ) : (
          <div className='flex-1 flex items-center justify-center flex-col gap-4 opacity-40'>
            <div className='w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-600'>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <span className='font-bold text-lg'>Trash Items</span>
              <span className='text-sm'>Select a file to view its history</span>
            </div>
          </div>
        )}
      </div>

      {/* Custom Alert */}
      {alert && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4'>
          <div className='bg-white dark:bg-zinc-900 border border-white/20 shadow-2xl rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 transform '>
            <div className='flex flex-col gap-1 text-center'>
              <h3 className='text-lg font-bold text-red-500'>{alert.title}</h3>
              <p className='text-sm opacity-70'>{alert.message}</p>
            </div>
            <div className='flex justify-center mt-2'>
              <button 
                onClick={() => setAlert(null)}
                className='px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors'
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
