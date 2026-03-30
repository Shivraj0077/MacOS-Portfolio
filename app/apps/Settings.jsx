"use client"
import { useState } from 'react'
import useStore from '../store/useStore'

const wallpapers = [
  { id: 1, url: '/wallpaper6.png', name: 'Classic Mac' },
  { id: 2, url: '/wallpaper2.jpg', name: 'Dark Horizon' },
  { id: 3, url: '/wallpaper8.png', name: 'Buffon Of Vanity' },
    { id: 4, url: '/wallpaper7.png', name: 'Space Portal' }

]

const quizQuestions = [
  { q: "What happens when you drag a window?", a: "Only updates frame on drag end", icon: "window" },
  { q: "What is special about the Trash folder?", a: "It contains emotional value", icon: "trash" },
  { q: "How are apps loaded?", a: "Lazy loading via JS chunks", icon: "package" },
  { q: "What's the hover preload duration?", a: "300ms", icon: "timer" }
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Wallpapers')
  const [quizScore, setQuizScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const currentWallpaper = useStore((state) => state.wallpaper)
  const setWallpaper = useStore((state) => state.setWallpaper)

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) setQuizScore(prev => prev + 25)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizFinished(true)
    }
  }

  return (
    <div className='h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex p-8 gap-8 overflow-auto'>
      <div className='w-48 flex flex-col gap-2'>
        <h2 className='text-3xl font-bold mb-6 tracking-tight'>Settings</h2>
        {['Wallpapers', 'Quiz', 'About'].map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-xl cursor-default font-medium transition-all transform active:scale-95 ${activeTab === tab ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
          >
            {tab}
          </div>
        ))}

        <div className='mt-10 p-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex flex-col gap-2 opacity-80'>
          <span className='text-[10px] font-bold uppercase text-zinc-500 tracking-widest'>Status</span>
          <div className='flex items-center gap-2 text-xs'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            System Optimized
          </div>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-6 bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl'>
        {activeTab === 'Wallpapers' && (
          <div className='flex flex-col gap-8'>
            <h3 className='text-xl font-bold'>Wallpapers</h3>
            <div className='grid grid-cols-2 gap-4'>
              {wallpapers.map(wp => (
                <div key={wp.id} onClick={() => setWallpaper(wp.url)} className='relative flex flex-col gap-2 group cursor-pointer'>
                  <div className={`aspect-video rounded-xl overflow-hidden border-2 transition-all shadow-lg ${currentWallpaper === wp.url ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent group-hover:border-blue-400'}`}>
                    <img src={wp.url} alt={wp.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                    {currentWallpaper === wp.url && (
                      <div className='absolute top-2 right-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold'>Active</div>
                    )}
                  </div>
                  <span className='text-xs font-semibold text-center'>{wp.name}</span>
                </div>
              ))}
            </div>
            <div className='p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex flex-col gap-2 mt-4'>
              <h4 className='text-sm font-bold text-blue-500'>Custom Wallpapers?</h4>
              <p className='text-xs opacity-70'>You can change wallpapers only in this session. Re-booting resets the dynamic shell context.</p>
            </div>
          </div>
        )}

        {activeTab === 'Quiz' && (
          <div className='flex flex-col gap-6 items-center justify-center p-8 text-center'>
            {!quizFinished ? (
              <>
                <div className='text-zinc-400 dark:text-zinc-600 mb-8'>
                  <svg
                    className="w-16 h-16 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <>
                      {quizQuestions[currentQuestion].icon === 'window' && (
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      )}

                      {quizQuestions[currentQuestion].icon === 'trash' && (
                        <>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </>
                      )}

                      {quizQuestions[currentQuestion].icon === 'package' && (
                        <>
                          <line x1="16.5" y1="9.4" x2="7.5" y2="4.28" />
                          <polyline points="3.29 7 12 12 20.71 7" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                          <polyline points="21 7 21 17 12 22 3 17 3 7 12 2 21 7" />
                        </>
                      )}

                      {quizQuestions[currentQuestion].icon === 'timer' && (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </>
                      )}
                    </>
                  </svg>
                </div>
                <h3 className='text-2xl font-bold mb-4 tracking-tight'>{quizQuestions[currentQuestion].q}</h3>
                <div className='grid grid-cols-1 gap-3 w-full max-w-sm'>
                  <button onClick={() => handleQuizAnswer(true)} className='p-4 bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-500 hover:text-white rounded-2xl font-medium transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm'>{quizQuestions[currentQuestion].a}</button>
                  <button onClick={() => handleQuizAnswer(false)} className='p-4 bg-zinc-100 dark:bg-zinc-900 hover:bg-red-500 hover:text-white rounded-2xl font-medium transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm'>Something else</button>
                </div>
                <p className='text-[10px] text-zinc-500 mt-8 uppercase tracking-[0.2em] font-bold'>Questions: {currentQuestion + 1} of {quizQuestions.length}</p>
              </>
            ) : (
              <div className='flex flex-col gap-6 animate-in fade-in zoom-in duration-500 items-center'>
                <div className='w-24 h-24 shadow-2xl bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4 flex items-center justify-center text-blue-500'>
                  {quizScore >= 75 ? (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                  )}
                </div>
                <h3 className='text-4xl font-black'>Score: {quizScore}%</h3>
                <p className='text-sm opacity-70 max-w-xs'>
                  {quizScore >= 75 ? "Excellent! You truly mastered the portfolio. A hidden maze feature is teased for you in the Maze game!" : "Not bad, but keep exploring. Scores 75%+ get a special tease."}
                </p>
                <button onClick={() => { setQuizFinished(false); setQuizScore(0); setCurrentQuestion(0); }} className='px-10 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mt-4'>Retry Quiz</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'About' && (
          <div className='flex flex-col gap-6 p-8 h-full overflow-auto'>
            <h3 className='text-xl font-bold'>Engineer Profile</h3>
            <div className='flex flex-col gap-4 text-sm'>
              <div className='flex justify-between border-b dark:border-white/5 pb-3'>
                <span className='opacity-60'>Education</span><span className='font-bold text-blue-500'>B.Tech CSE @ Sandip Uni</span>
              </div>
              <div className='flex justify-between border-b dark:border-white/5 pb-3'>
                <span className='opacity-60'>Current GPA</span><span className='font-bold text-emerald-500'>8.50 / 10.0</span>
              </div>
              <div className='flex justify-between border-b dark:border-white/5 pb-3'>
                <span className='opacity-60'>Expertise</span><span className='font-bold text-purple-500'>Distributed Systems</span>
              </div>
              <div className='flex justify-between border-b dark:border-white/5 pb-3'>
                <span className='opacity-60'>Competitive</span><span className='font-bold text-orange-500'>Codeforces Specialist</span>
              </div>
            </div>

            <div className='mt-4 flex flex-col gap-3'>
               <h4 className='text-xs font-bold uppercase tracking-widest text-zinc-500'>Recent Successes</h4>
               <div className='flex flex-wrap gap-2'>
                  {['SIH Winner', 'Kumbhathon Winner', 'SunHacks Winner'].map(tag => (
                    <span key={tag} className='px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold border dark:border-white/5'>{tag}</span>
                  ))}
               </div>
            </div>

            <div className='mt-8 bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col gap-4 group transition-shadow hover:shadow-xl'>
              <div className='w-16 h-16 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform'>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div>
                <h4 className='text-lg font-bold'>Shivraj Pawar</h4>
                <p className='text-xs opacity-60 italic mt-1'>Backend Engineer | Architecting Distributed Financial & Time Systems</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
