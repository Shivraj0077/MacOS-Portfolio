"use client"
import { useState } from "react"
import { Mail, Send, Sparkles, ArrowRight, Copy, Check, User, AtSign } from "lucide-react"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const email = "shivrajpawar6906@gmail.com"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const userEmail = formData.get('email')
    const message = formData.get('message')
    
    // Create email body with user's contact info
    const emailBody = `From: ${name} (${userEmail})\n\nMessage:\n${message}`
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSent(true)
      
      // Open mail client with properly formatted email
      window.location.href = `mailto:${email}?subject=Message from ${name}&body=${encodeURIComponent(emailBody)}`
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSent(false)
        e.target.reset()
      }, 3000)
    }, 800)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] dark:from-[#1c1c1e] dark:to-[#0a0a0a] flex flex-col items-center py-10 px-4 sm:px-6 font-sans overflow-auto">
      
      {/* Main Container - macOS style with responsive padding */}
      <div className="w-full max-w-2xl">
        
        {/* Glassmorphic Card */}
        <div className="bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
          
          {/* Content with responsive padding */}
          <div className="p-5 sm:p-8 md:p-12">
            
            {/* Profile Section - responsive text */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1 sm:mb-2">
                Get in Touch
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md px-2">
                I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
              </p>
            </div>
            
            {/* Email Display with Copy Button - responsive layout */}
            <div className="mb-6 sm:mb-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 sm:p-4 border border-black/5 dark:border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 break-all">
                    {email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-all border border-black/10 dark:border-white/10 w-full sm:w-auto"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Appleseed"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Your Email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || sent}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : sent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            
            {/* Footer Note */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/5 dark:border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-500">
                <Sparkles className="w-3 h-3" />
                <span>I&apos;ll respond within 24-48 hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Links - responsive sizing */}
        <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3">
          <a 
            href="https://github.com/Shivraj0077" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-all border border-black/5 dark:border-white/5"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/shivraj-pawar-4a632837b" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-all border border-black/5 dark:border-white/5"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}