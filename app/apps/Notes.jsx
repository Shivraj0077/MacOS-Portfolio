"use client"
import { useState } from "react"
import {
  Search, StickyNote, Sparkles,
  Share, Lock, Trash2, ChevronDown, Folder, Grid, Copy, Check
} from "lucide-react"

const IDEAS_DATABASE = {
  "agriculture": [
    { title: "Drone Swarm Health Scanning", description: "Drone swarm system for real-time crop health scanning.", market: "AgriTech" },
    { title: "AI Farmer Marketplace", description: "AI marketplace connecting small farmers directly to buyers.", market: "AgriTech" },
    { title: "Urban Vertical Farming", description: "Subscription vertical farming kits for urban balconies.", market: "AgriTech" },
    { title: "Blockchain Traceability", description: "Blockchain traceability app for farm-to-table produce.", market: "AgriTech" }
  ],
  "ai": [
    { title: "AI Life Coach", description: "AI personal life coach that predicts burnout before it hits.", market: "AI & ML" },
    { title: "No-Code AI Agent Builder", description: "No-code AI agent builder for small businesses.", market: "AI & ML" },
    { title: "Predictive Shopping Assistant", description: "Predictive AI for hyper-personalized shopping assistants.", market: "AI & ML" },
    { title: "AI Ethics Auditor", description: "AI ethics auditor tool for enterprise models.", market: "AI & ML" }
  ],
  "automotive": [
    { title: "EV Battery-Swapping Network", description: "EV battery-swapping network for ride-share fleets.", market: "Automotive" },
    { title: "AI Traffic Prediction", description: "AI traffic prediction app that pays users for carpool data.", market: "Automotive" },
    { title: "Last-Mile Delivery Robots", description: "Autonomous last-mile delivery robots for cities.", market: "Automotive" },
    { title: "Smart Driving Insurance", description: "Smart insurance tied to real-time driving behavior.", market: "Automotive" }
  ],
  "biotechnology": [
    { title: "At-Home CRISPR Kits", description: "At-home CRISPR kits for personalized gene editing insights.", market: "Biotech" },
    { title: "Organ-on-Chip Platform", description: "Organ-on-chip platform for faster drug testing.", market: "Biotech" },
    { title: "Microbiome Supplements", description: "Microbiome-based personalized supplements subscription.", market: "Biotech" },
    { title: "AI Synthetic Biology Tool", description: "AI-driven synthetic biology design tool for labs.", market: "Biotech" }
  ],
  "blockchain": [
    { title: "Decentralized Gig Identity", description: "Decentralized identity wallet for gig workers.", market: "Blockchain & Web3" },
    { title: "NFT Retail Loyalty", description: "NFT loyalty program for everyday retail brands.", market: "Blockchain & Web3" },
    { title: "Web3 Social Network", description: "Web3 social network with built-in creator revenue share.", market: "Blockchain & Web3" },
    { title: "Tokenized Asset Market", description: "Tokenized real-world asset marketplace for art & collectibles.", market: "Blockchain & Web3" }
  ],
  "construction": [
    { title: "AR Blueprint Overlays", description: "AR glasses for on-site blueprint overlays and error detection.", market: "ConTech" },
    { title: "AI Material Waste Predictor", description: "AI material waste predictor for construction bids.", market: "ConTech" },
    { title: "Modular Prefab Homes", description: "Modular prefab homes designed via user-input app.", market: "ConTech" },
    { title: "Drone Site Safety", description: "Drone + AI safety monitoring system for job sites.", market: "ConTech" }
  ],
  "cybersecurity": [
    { title: "AI Phishing Simulator", description: "AI-powered phishing email simulator for employee training.", market: "Cybersecurity" },
    { title: "IoT Home Protector", description: "Zero-trust home network protector for IoT devices.", market: "Cybersecurity" },
    { title: "Personal Data Vault", description: "Privacy-first personal data vault with auto-deletion rules.", market: "Cybersecurity" },
    { title: "Dark Web Monitoring", description: "Real-time dark web monitoring subscription for individuals.", market: "Cybersecurity" }
  ],
  "education": [
    { title: "VR Vocational Training", description: "VR vocational training simulator for trade skills.", market: "EdTech" },
    { title: "Adaptive AI Tutor", description: "AI tutor that adapts in real-time to student emotions.", market: "EdTech" },
    { title: "Blockchain Credentials", description: "Micro-credential marketplace with blockchain verification.", market: "EdTech" },
    { title: "Gamified Language Match", description: "Gamified language learning with native speaker matching.", market: "EdTech" }
  ],
  "energy": [
    { title: "Home Solar Trading", description: "Peer-to-peer home solar energy trading app.", market: "Energy" },
    { title: "AI Battery Grid Optimizer", description: "AI-optimized home battery charging based on grid prices.", market: "Energy" },
    { title: "Micro-Wind Turbines", description: "Portable micro-wind turbines for off-grid communities.", market: "Energy" },
    { title: "Consumer Carbon Credits", description: "Carbon credit marketplace for everyday consumers.", market: "Energy" }
  ],
  "entertainment": [
    { title: "AI Fan Movie Creation", description: "AI co-creation tool for fan-made movie endings.", market: "Media" },
    { title: "Audio Storytelling App", description: "Short-form audio storytelling platform with live voice actors.", market: "Media" },
    { title: "Personalized News Digest", description: "Personalized news digest using only user-chosen sources.", market: "Media" },
    { title: "Virtual Indie Venues", description: "Virtual concert venue for indie artists with ticket NFTs.", market: "Media" }
  ],
  "environment": [
    { title: "Carbon Offset Market", description: "Personal carbon footprint offset marketplace.", market: "ClimateTech" },
    { title: "Smart Recycling Bins", description: "Smart bin IoT system that sorts and rewards recycling.", market: "ClimateTech" },
    { title: "Urban Flood Prediction", description: "AI platform predicting and preventing urban flooding.", market: "ClimateTech" },
    { title: "Upcycled Material Supply", description: "Upcycled material supplier network for fashion brands.", market: "ClimateTech" }
  ],
  "fashion": [
    { title: "3D Body Scan Try-On", description: "AI virtual try-on with 3D body scanning via phone.", market: "FashionTech" },
    { title: "Auth Resale Platform", description: "Sustainable fashion resale platform with authenticity AI.", market: "FashionTech" },
    { title: "Photo Skincare Formula", description: "Personalized skincare formula creator using skin photos.", market: "FashionTech" },
    { title: "Designer Wardrobe Rental", description: "Rental subscription for high-end designer wardrobes.", market: "FashionTech" }
  ],
  "finance": [
    { title: "Digital Nomad Neo-Bank", description: "Neo-bank for digital nomads with multi-currency auto-conversion.", market: "FinTech" },
    { title: "AI Investment Coach", description: "AI investment coach using behavioral nudges.", market: "FinTech" },
    { title: "Voice Invoice Finance", description: "Invoice financing app for freelancers using voice commands.", market: "FinTech" },
    { title: "Crypto Tax Harvesting", description: "Crypto savings account with built-in tax harvesting.", market: "FinTech" }
  ],
  "food": [
    { title: "Fridge-to-Recipe AI", description: "AI recipe generator that uses only ingredients in your fridge.", market: "FoodTech" },
    { title: "Demand Ghost Kitchens", description: "Ghost kitchen network optimized by real-time demand data.", market: "FoodTech" },
    { title: "Gut-Test Nutrition Sub", description: "Personalized nutrition drink subscription via gut-test kits.", market: "FoodTech" },
    { title: "Zero-Waste Food Supply", description: "Zero-waste restaurant supply chain marketplace.", market: "FoodTech" }
  ],
  "gaming": [
    { title: "Urban AR Battlegrounds", description: "Mobile AR game that turns real cities into battle arenas.", market: "Gaming" },
    { title: "AI Endless RPG Masters", description: "AI dungeon master for endless tabletop RPGs.", market: "Gaming" },
    { title: "Casual Esports Betting", description: "Skill-based betting platform for casual esports.", market: "Gaming" },
    { title: "Cross-Reality Gaming", description: "Cross-reality gaming hub merging VR and physical toys.", market: "Gaming" }
  ],
  "healthcare": [
    { title: "Early Heart Alert Wearable", description: "Wearable AI that detects heart issues 48 hours early.", market: "HealthTech" },
    { title: "Journal Trained Chatbot", description: "Mental health chatbot trained on your personal journal.", market: "HealthTech" },
    { title: "Instant AI Diagnostic Lab", description: "At-home lab testing with instant AI diagnosis.", market: "HealthTech" },
    { title: "VR Anxiety Exposure", description: "VR exposure therapy platform for anxiety disorders.", market: "HealthTech" }
  ],
  "hospitality": [
    { title: "Mood-Based Trip Planner", description: "AI trip planner that books everything based on mood & budget.", market: "TravelTech" },
    { title: "Local Life Marketplace", description: "Peer-to-peer “local life” experience marketplace.", market: "TravelTech" },
    { title: "Sustainable Hotel Booking", description: "Sustainable hotel booking with real carbon impact scores.", market: "TravelTech" },
    { title: "Digital Visa Automation", description: "Digital passport + visa automation tool.", market: "TravelTech" }
  ],
  "hr": [
    { title: "AI Interview Coach", description: "AI video interview coach with instant feedback.", market: "HRTech" },
    { title: "Resume-Free Platform", description: "Skills-based hiring platform that ignores resumes.", market: "HRTech" },
    { title: "Employee Wellness Stipend", description: "Employee wellness stipend marketplace.", market: "HRTech" },
    { title: "Turnover Predictor Dashboard", description: "Predictive turnover prevention dashboard.", market: "HRTech" }
  ],
  "insurance": [
    { title: "Everything Micro-Insurance", description: "Usage-based insurance for everything (phone, bike, pet).", market: "InsurTech" },
    { title: "60-Second Claims Processor", description: "AI claims processor that pays out in under 60 seconds.", market: "InsurTech" },
    { title: "Gig Economy Bundles", description: "Micro-insurance bundles for gig economy workers.", market: "InsurTech" },
    { title: "Wellness-Priced Health Care", description: "Health insurance priced by real-time wellness data.", market: "InsurTech" }
  ],
  "legal": [
    { title: "AI Contract Negotiator", description: "AI contract generator + auto-negotiator for freelancers.", market: "LegalTech" },
    { title: "Block-Chain Wills", description: "Blockchain-based will and inheritance platform.", market: "LegalTech" },
    { title: "AI Mediator Marketplace", description: "Dispute resolution marketplace with AI mediators.", market: "LegalTech" },
    { title: "AI Regulation Checker", description: "Compliance checker for new AI regulations.", market: "LegalTech" }
  ],
  "logistics": [
    { title: "Electric Route Optimizer", description: "AI route optimizer for last-mile electric delivery.", market: "Supply Chain" },
    { title: "Satellite Supply Tool", description: "Predictive inventory tool using satellite + weather data.", market: "Supply Chain" },
    { title: "Ethical Sourcing Block", description: "Blockchain platform for ethical sourcing verification.", market: "Supply Chain" },
    { title: "Hybrid Robot Delivery", description: "Drone + robot hybrid delivery network for warehouses.", market: "Supply Chain" }
  ],
  "manufacturing": [
    { title: "3D Parts Marketplace", description: "On-demand 3D printing marketplace for spare parts.", market: "Manufacturing" },
    { title: "Predictive Factory AI", description: "AI predictive maintenance for factory machines.", market: "Manufacturing" },
    { title: "Sustainable Mat Discovery", description: "Sustainable material discovery platform using AI.", market: "Manufacturing" },
    { title: "Micro-Factory Rentals", description: "Micro-factory rental spaces for indie hardware makers.", market: "Manufacturing" }
  ],
  "marketing": [
    { title: "AI Instant Ad Testing", description: "AI ad creative generator that tests 100 versions instantly.", market: "MarTech" },
    { title: "Behavior Twin Campaigns", description: "Hyper-personalized email campaigns using user behavior twins.", market: "MarTech" },
    { title: "Fraud Detecting Matching", description: "Influencer matching platform with fraud detection.", market: "MarTech" },
    { title: "Zero-Party Reward Tool", description: "Zero-party data collection tool with rewards.", market: "MarTech" }
  ],
  "mental health": [
    { title: "AI Best Friend Companion", description: "AI companion app that feels like talking to a best friend.", market: "Wellness" },
    { title: "Metaverse Group Therapy", description: "Group therapy metaverse sessions with anonymous avatars.", market: "Wellness" },
    { title: "Burnout Intervener Wear", description: "Burnout prediction wearable with micro-intervention tools.", market: "Wellness" },
    { title: "Journal Insight App", description: "Journaling app that turns entries into actionable insights.", market: "Wellness" }
  ],
  "pet care": [
    { title: "Bark-to-English AI", description: "AI pet translator app using bark/meow analysis.", market: "PetTech" },
    { title: "DNA-Matched Pet Sub", description: "Subscription box customized by pet DNA + behavior.", market: "PetTech" },
    { title: "GPS Smart Alert Collar", description: "GPS smart collar with predictive health alerts.", market: "PetTech" },
    { title: "Virtual Vet Prescription", description: "Virtual vet video visits with instant prescriptions.", market: "PetTech" }
  ],
  "real estate": [
    { title: "Sentiment Valuation Tool", description: "AI home valuation tool using neighborhood sentiment data.", market: "PropTech" },
    { title: "Fractional Vacation Shares", description: "Fractional ownership platform for vacation homes.", market: "PropTech" },
    { title: "Virtual Walkthrough Stage", description: "Virtual staging + AR walkthrough app.", market: "PropTech" },
    { title: "Smart Lease Auto-Renew", description: "Smart lease management with auto-renew and dispute tools.", market: "PropTech" }
  ],
  "retail": [
    { title: "AI Multi-Store Shopper", description: "AI personal shopper that finds deals across 50 stores.", market: "E-commerce" },
    { title: "Zero-Inventory Pop-Ups", description: "Zero-inventory pop-up shop platform.", market: "E-commerce" },
    { title: "Instant Checkout Streaming", description: "Social commerce live-streaming with instant checkout.", market: "E-commerce" },
    { title: "Sustainably Packed Sub", description: "Sustainable packaging subscription for online sellers.", market: "E-commerce" }
  ],
  "senior care": [
    { title: "Companion Robot System", description: "AI companion robot that reminds + entertains.", market: "Eldercare" },
    { title: "Smart Fall Detection", description: "Fall detection + emergency response smart home system.", market: "Eldercare" },
    { title: "Virtual Family Connector", description: "Virtual family connection platform with shared activities.", market: "Eldercare" },
    { title: "Medication Family Oversight", description: "Medication adherence app with family oversight.", market: "Eldercare" }
  ],
  "spacetech": [
    { title: "Satellite Data Market", description: "Satellite data marketplace for climate & agriculture insights.", market: "SpaceTech" },
    { title: "VR Space Tourism Preview", description: "Space tourism booking platform with VR previews.", market: "SpaceTech" },
    { title: "Small Satellite Broker", description: "Low-cost small satellite launch broker.", market: "SpaceTech" },
    { title: "Orbital Cleanup Service", description: "Orbital debris tracking + cleanup service.", market: "SpaceTech" }
  ],
  "sports": [
    { title: "AI Home Form Checker", description: "AI form checker for home workouts via phone camera.", market: "Fitness" },
    { title: "NFT Fantasy Leagues", description: "Fantasy sports league with real-time player NFTs.", market: "Fitness" },
    { title: "Recovery Wearable Analysis", description: "Personalized recovery plans using wearable data.", market: "Fitness" },
    { title: "Prize Community Challenges", description: "Community challenge app with prize pools.", market: "Fitness" }
  ]
};

export default function Notes() {
  const [domain, setDomain] = useState("")
  const [ideas, setIdeas] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const generateIdeas = (e) => {
    e.preventDefault()
    const query = domain.toLowerCase().trim()
    if (!query) return
    
    setIsGenerating(true)
    setNotFound(false)
    
    setTimeout(() => {
      const matchedKey = Object.keys(IDEAS_DATABASE).find(key => 
        query.includes(key) || key.includes(query)
      );

      if (matchedKey) {
        setIdeas(IDEAS_DATABASE[matchedKey])
        setNotFound(false)
      } else {
        setIdeas([])
        setNotFound(true)
      }
      setIsGenerating(false)
    }, 800)
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="flex h-full bg-[#f6f6f6] dark:bg-[#1c1c1e] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden select-none">

      {/* ── Minimal Sidebar ── */}
      <div className="w-56 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-2xl border-r border-black/5 dark:border-white/5 p-4 flex flex-col gap-8">
        <div>
          <div className="px-2 flex items-center justify-between text-zinc-400 text-[10px] uppercase tracking-widest font-bold opacity-60 mb-4">
             iCloud
             <ChevronDown className="w-3 h-3" />
          </div>
          <div className="space-y-0.5">
             <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium bg-black/5 dark:bg-white/10">
                <StickyNote className="w-4 h-4 text-orange-500" />
                Notes
             </div>
          </div>
        </div>
      </div>

      {/* ── Main Workspace ── */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1c1c1e] overflow-auto">
        
        {/* Toolbar */}
        <div className="h-12 flex items-center justify-between px-6 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl shrink-0">
          <div className="flex gap-6">
            <button onClick={() => { setDomain(""); setIdeas([]); setNotFound(false) }} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                <Trash2 className="w-4 h-4" />
             </button>
             <Share className="w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer" />
          </div>
          <div className="flex gap-4 items-center">
             <Lock className="w-4 h-4 text-zinc-400" />
             <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
             <Search className="w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Content View */}
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full py-8 px-6 overflow-hidden">
           {/* Header - slightly reduced padding */}
           <div className="mb-6 shrink-0">
              <h1 className="text-3xl font-bold tracking-tight mb-1 text-zinc-900 dark:text-white">Ideas</h1>
              <p className="text-zinc-400 text-sm font-medium">Input a domain to generate startup ideas.</p>
           </div>

           {/* Search Input - Native look */}
           <form onSubmit={generateIdeas} className="mb-6 shrink-0">
              <div className="flex gap-3">
                 <input 
                   type="text"
                   value={domain}
                   onChange={(e) => setDomain(e.target.value)}
                   placeholder="Enter Domain..."
                   className="flex-1 bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 rounded-xl px-4 py-2.5 text-base outline-none focus:ring-1 focus:ring-black/10 dark:focus:ring-white/10 transition-all font-medium placeholder:text-zinc-400"
                 />
                 <button 
                   type="submit"
                   disabled={isGenerating || !domain.trim()}
                   className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl transition-all hover:opacity-90 active:scale-95 disabled:opacity-30"
                 >
                    {isGenerating ? "..." : "Search"}
                 </button>
              </div>
           </form>

           {/* Results Pane - specifically optimized for "fit" */}
           <div className="flex-1 min-h-0 flex flex-col">
              {notFound && (
                <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
                   <div className="w-full h-full max-w-[500px] flex items-center justify-center border border-black/5 dark:border-white/5 rounded-xl shadow-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900 ">
                      <img 
                        src="/expert-review.png" 
                        className="w-full h-full object-contain" 
                        alt="Expert Review" 
                      />
                   </div>
                </div>
              )}

              {ideas.length > 0 && (
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                  {ideas.map((idea, idx) => (
                    <div key={idx} className="p-6 rounded-[18px] bg-zinc-50 dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.03] hover:border-black/10 dark:hover:border-white/10 transition-all group relative">
                       <div className="flex justify-between items-start mb-4">
                          <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white leading-tight">
                            {idea.title}
                          </h3>
                          <button 
                            onClick={() => copyToClipboard(`${idea.title}: ${idea.description}`, idx)}
                            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all text-zinc-400"
                          >
                             {copiedId === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                       </div>
                       <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 font-medium">
                          {idea.description}
                       </p>
                       <div className="flex items-center">
                         <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                            {idea.market}
                         </span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  )
}