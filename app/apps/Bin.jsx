"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, FileText, ChevronDown, ChevronRight, Lightbulb, Trash, Info, Sparkles } from 'lucide-react'

const trashItems = [
  "your attention span",
  "the trip you planned with your friends",
  "your new year resolution",
  "song overplayed",
  "that dress you saw in that shop",
  "the book in the shelf you havent completed",
  "your diet plan",
  "The shower thought that sounded Nobel Prize-worthy",
  "the pet you wanted to adopt",
  "Your sense of direction without maps"
]

const startupIdeas = [
  "Dating app with let matches go on dates by subscribers money",
  "OAuth system with ai based security",
  "Cloud drive peer to peer system",
  "Ai powered news platform",
]

export default function Bin() {
  const [showIdeas, setShowIdeas] = useState(false)
  const [alert, setAlert] = useState(null)

  const emptyTrash = () => {
    setAlert({ 
      title: 'Failed to empty Trash', 
      message: 'The items in this folder have been flagged as "Emotional Baggage" and cannot be deleted at this time. Please contact your therapist for more information.' 
    })
  }

  return (
    <div className='h-full bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] overflow-auto select-none font-sans'>
      <div className='max-w-[720px] mx-auto px-6 py-10'>
        
        {/* Apple-style Header */}
        <div className='mb-10 flex items-center justify-between'>
           <div className='flex items-center gap-5'>
             <div className='w-14 h-14 rounded-[18px] bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]'>
               <Trash2 className='w-7 h-7 text-[#ff3b30]' />
             </div>
             <div>
               <h1 className='text-[24px] font-[700] tracking-tight'>Trash</h1>
               <div className='flex items-center gap-2 mt-0.5 text-[#86868b] dark:text-[#98989d] text-[13px] font-[450]'>
               </div>
             </div>
           </div>
           
           <button 
             onClick={emptyTrash}
             className='px-5 py-2.5 bg-white dark:bg-[#2c2c2e] hover:bg-[#fafafa] dark:hover:bg-[#3a3a3c] text-[#ff3b30] rounded-full text-[13px] font-[600] border border-black/5 dark:border-white/10 shadow-sm transition-all active:scale-95'
           >
             Empty Trash
           </button>
        </div>

        {/* Content Card Section */}
        <div className='bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10 rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden'>
          
          <div className='p-1'>
            {trashItems.map((item, index) => (
              <div 
                key={index}
                className={`
                  group flex items-center justify-between px-5 py-[14px] transition-colors
                  ${index !== trashItems.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}
                  hover:bg-black/5 dark:hover:bg-white/5
                `}
              >
                <div className='flex items-center gap-4'>
                  <div className='w-9 h-9 rounded-[10px] bg-[#0071e3]/10 flex items-center justify-center'>
                    <FileText className='w-5 h-5 text-[#0071e3]' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[14px] font-[500] leading-tight capitalize'>{item}</span>
                  </div>
                </div>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity pr-2'>
                  <Info className='w-4 h-4 text-[#aeaeb2]' />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section - Settings Inspired Title Style */}
        <p className="text-[11px] font-[600] uppercase tracking-[0.05em] text-[#86868b] dark:text-[#98989d] px-1 mt-8 mb-3">
          Legacy Projects
        </p>

        <div className='bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10 rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden'>
          <div 
            onClick={() => setShowIdeas(!showIdeas)}
            className={`
              cursor-pointer flex items-center justify-between px-5 py-[16px] transition-all hover:bg-black/5 dark:hover:bg-white/5
              ${showIdeas ? 'bg-[#0071e3]/5 dark:bg-[#0071e3]/10' : ''}
            `}
          >
            <div className='flex items-center gap-5'>
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shadow-sm transition-colors ${showIdeas ? 'bg-[#0071e3] text-white' : 'bg-[#5856d6]/10 text-[#5856d6]'}`}>
                <Lightbulb className='w-5 h-5' />
              </div>
              <div className='flex flex-col'>
                <span className='text-[15px] font-[600] tracking-tight'>Abandoned Project Ideas</span>
              </div>
            </div>
            <div className='flex items-center gap-3 pr-2'>
               {showIdeas ? <ChevronDown className='w-5 h-5 text-[#aeaeb2]' /> : <ChevronRight className='w-5 h-5 text-[#aeaeb2]' />}
            </div>
          </div>

          {/* Sub-Rows with Framer Motion Animation */}
          <AnimatePresence>
            {showIdeas && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]"
              >
                {startupIdeas.map((idea, index) => (
                  <motion.div 
                    key={`idea-${index}`}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className='flex items-center gap-5 px-6 py-4 border-b border-black/5 dark:border-white/5 last:border-0'
                  >
                    <div className='w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_8px_rgba(0,113,227,0.4)] flex-shrink-0' />
                    <div className='flex flex-col'>
                      <span className='text-[13px] font-[500] leading-relaxed italic opacity-85'>{idea}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Persistence Prohibited Alert - MacOS Style */}
      <AnimatePresence>
        {alert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-6'
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='bg-[#ffffffdd] dark:bg-[#2c2c2edd] backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[24px] w-full max-w-[320px] p-8 flex flex-col items-center gap-6'
            >
              <div className='w-16 h-16 rounded-[14px] bg-[#ff3b30]/10 flex items-center justify-center'>
                <Trash2 className='w-8 h-8 text-[#ff3b30]' />
              </div>
              <div className='flex flex-col gap-2 text-center'>
                <h3 className='text-[18px] font-[700] tracking-tight'>Failed to Empty</h3>
                <p className='text-[13px] text-[#6e6e73] dark:text-[#98989d] font-[450] leading-[1.4]'>{alert.message}</p>
              </div>
              <button 
                onClick={() => setAlert(null)}
                className='w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-[10px] font-[600] text-[13px] shadow-[0_2px_8px_rgba(0,113,227,0.3)] transition-all active:scale-[0.98]'
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
