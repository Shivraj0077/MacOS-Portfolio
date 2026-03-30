"use client"
import { useState } from 'react'

const files = [
  { id: 'resume', name: 'Shivraj_Resume.pdf', type: 'pdf', icon: '/notes.svg' },
  { id: 'langs', name: 'Languages.js', type: 'file', icon: '/settings.svg' },
  { id: 'backend', name: 'Backend_Node.js', type: 'file', icon: '/settings.svg' },
  { id: 'db', name: 'PostgreSQL_Redis.sql', type: 'file', icon: '/settings.svg' },
  { id: 'systems', name: 'DistributedSystems.sys', type: 'file', icon: '/settings.svg' },
  { id: 'cloud', name: 'AWS_Nginx_Docker.config', type: 'file', icon: '/settings.svg' },
  { id: 'soulsoft', name: 'Soulsoft_Internship', type: 'folder', icon: '/folder.svg' },
  { id: 'sih', name: 'SIH_Winner.cert', type: 'cert', icon: '/notes.svg' }
]

export default function Finder() {
  const [search, setSearch] = useState('')
  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='flex h-full bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 overflow-hidden font-sans select-none'>
        {/* Sidebar */}
        <div className='w-44 bg-zinc-100/50 dark:bg-zinc-950/20 p-4 border-r dark:border-zinc-800 flex flex-col gap-6 selection:bg-blue-500/20'>
            <div className='flex flex-col gap-3'>
                <div className='text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2'>Favorites</div>
                {['Recents', 'Desktop', 'Documents', 'Downloads'].map(item => (
                    <div key={item} className={`px-3 py-1.5 rounded-lg text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 group cursor-default ${item === 'Documents' ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}>
                        <span className='opacity-40 group-hover:opacity-100 transition-opacity'>📁</span>
                        {item}
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-3'>
                <div className='text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2'>iCloud</div>
                <div className='px-3 py-1.5 rounded-lg text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 group cursor-default'>
                    <span className='opacity-40 group-hover:opacity-100 transition-opacity'>☁️</span>
                    Drive
                </div>
            </div>
        </div>

        {/* Main Area */}
        <div className='flex-1 flex flex-col'>
            <div className='h-12 border-b dark:border-zinc-800 flex items-center px-6 justify-between bg-zinc-50/50 dark:bg-zinc-900/50'>
                <div className='flex items-center gap-4'>
                    <div className='flex gap-2 mr-4'>
                        <span className='opacity-30 cursor-default'>◀</span>
                        <span className='opacity-30 cursor-default'>▶</span>
                    </div>
                    <span className='text-sm font-bold opacity-80'>Documents</span>
                </div>
                
                <div className='flex items-center gap-4 w-full max-w-[240px]'>
                    <div className='flex bg-zinc-200/50 dark:bg-zinc-800 rounded-md p-0.5'>
                        <button className='p-1 hover:bg-white dark:hover:bg-zinc-700 rounded shadow-sm transition-all'>
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </button>
                        <button className='p-1 opacity-40'>
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        </button>
                    </div>
                    <div className='relative flex-1'>
                        <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-30 text-zinc-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className='w-full bg-zinc-200/50 dark:bg-zinc-800 border dark:border-white/5 rounded-md pl-8 pr-2 py-1 text-[11px] outline-none focus:ring-1 ring-blue-500/50'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='flex-1 p-6 overflow-auto'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4'>
                    {filteredFiles.map(file => (
                        <div key={file.id} className='flex flex-col items-center gap-2 group cursor-default'>
                            <div className='w-16 h-16 p-2 rounded-xl group-hover:bg-zinc-100 dark:group-hover:bg-white/5 transition-all flex items-center justify-center relative'>
                                <img src={file.icon} alt={file.name} className='w-12 h-12 object-contain group-hover:scale-110 transition-transform' />
                                {file.type === 'folder' && <div className='absolute bottom-3 right-3 text-[8px] bg-blue-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-lg border-[1.5px] border-white dark:border-zinc-900 font-bold'>📁</div>}
                            </div>
                            <span className='text-[11px] font-medium text-center leading-tight max-w-[80px] break-words'>{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='h-6 bg-zinc-50/80 dark:bg-zinc-950/20 border-t dark:border-zinc-800/50 flex items-center justify-center px-4'>
                <span className='text-[9px] text-zinc-400 font-medium uppercase tracking-[0.15em]'>{filteredFiles.length} items, 1.2 GB available</span>
            </div>
        </div>
    </div>
  )
}
