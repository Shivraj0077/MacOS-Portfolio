"use client";
import { useState, useEffect, useRef } from "react";
import AppRegistry from "@/app/registry/appRegistry";
import { useWindowStore } from "@/app/store/useStore";
import { Search, X, FileText } from "lucide-react";

export default function Spotlight({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openApp = useWindowStore((state) => state.openApp);
  const inputRef = useRef(null);

  const catalog = [
    // ── Applications (Registry) ──
    ...Object.values(AppRegistry).map((app) => ({
      id: app.id,
      name: app.name,
      type: "app",
      icon: app.icon,
      category: "Applications",
    })),

    // ── Files & Documents (from Finder) ──
    { id: "tech", name: "Tech Stack.md", type: "file", icon: "⚙️", category: "Files", target: "finder", tab: 'Documents' },
    { id: "cloud", name: "Cloud Infrastructure.sys", type: "file", icon: "☁️", category: "Files", target: "finder", tab: 'Documents' },
    { id: "hack", name: "Hackathons.cert", type: "file", icon: "🏆", category: "Files", target: "finder", tab: 'Documents' },
    { id: "intern", name: "Internships.doc", type: "file", icon: "💼", category: "Files", target: "finder", tab: 'Documents' },
    { id: "Desktop", name: "Desktop", type: "folder", icon: "🖥️", category: "Folders", target: "finder", tab: 'Desktop' },
    { id: "Projects", name: "Projects Folder", type: "folder", icon: "📁", category: "Folders", target: "finder", tab: 'Projects' },
    { id: "Documents", name: "Documents Folder", type: "folder", icon: "📄", category: "Folders", target: "finder", tab: 'Documents' },

    // ── Career & Experience (from Experience) ──
    { id: "e1", name: "Soulsoft Infotech (Work)", type: "experience", icon: "🏢", category: "Experience", target: "experience" },
    { id: "e2", name: "SPPU Computer Engineering", type: "experience", icon: "🎓", category: "Experience", target: "experience" },
    { id: "e3", name: "Smart India Hackathon Winner", type: "achievement", icon: "🥇", category: "Achievements", target: "experience" },
    { id: "e4", name: "Codeforces Specialist", type: "achievement", icon: "🌟", category: "Achievements", target: "experience" },

    // ── Projects (from Projects App) ──
    { id: "p1", name: "Payment Gateway System", type: "project", icon: "💳", category: "Projects", target: "finder", tab: 'Projects' },
    { id: "p2", name: "AI Interviewer (Adaptive)", type: "project", icon: "🤖", category: "Projects", target: "finder", tab: 'Projects' },
    { id: "p3", name: "Distributed Scheduler", type: "project", icon: "⏰", category: "Projects", target: "finder", tab: 'Projects' },
    { id: "p4", name: "macOS Portfolio OS v2", type: "project", icon: "🍎", category: "Projects", target: "finder", tab: 'Projects' },

    // ── Music & Media (from Spotify) ──
    { id: "s1", name: "Blinding Lights - The Weeknd", type: "music", icon: "🎵", category: "Music", target: "spotify" },
    { id: "s2", name: "Levitating - Dua Lipa", type: "music", icon: "🎵", category: "Music", target: "spotify" },
    { id: "s3", name: "Shape of You - Ed Sheeran", type: "music", icon: "🎵", category: "Music", target: "spotify" },
    { id: "s4", name: "Mr. Brightside - The Killers", type: "music", icon: "🎵", category: "Music", target: "spotify" },

    // ── Notes (from Notes App) ──
    { id: "n1", name: "Startup Idea Generator", type: "note", icon: "💡", category: "Notes", target: "notes" },
    { id: "n2", name: "Project Roadmap 2025", type: "note", icon: "📋", category: "Notes", target: "notes" },
    { id: "n3", name: "Key Performance Metrics", type: "note", icon: "📊", category: "Notes", target: "notes" },

    // ── System Settings (from Settings) ──
    { id: "v1", name: "Wi-Fi & Network Settings", type: "setting", icon: "🌐", category: "System Settings", target: "settings" },
    { id: "v2", name: "Appearance (Light/Dark Mode)", type: "setting", icon: "🌓", category: "System Settings", target: "settings" },
    { id: "v3", name: "Wallpaper & Desktop Settings", type: "setting", icon: "🖼️", category: "System Settings", target: "settings" },
    { id: "v4", name: "Displays & Resolution", type: "setting", icon: "🖥️", category: "System Settings", target: "settings" },

    // ── External Presence ──
    { id: "w1", name: "GitHub - Shivraj0077", type: "url", url: "https://github.com/Shivraj0077", icon: <img src="/github.svg" className="w-5 h-5 dark:invert" alt="" />, category: "Web Links" },
    { id: "w2", name: "LinkedIn - Shivraj Pawar", type: "url", url: "https://linkedin.com/in/shivrajpawar", icon: <img src="/linkedin.svg" className="w-5 h-5" alt="" />, category: "Web Links" },
    { id: "w3", name: "Twitter / X Profile", type: "url", url: "https://twitter.com/shivraj_twt", icon: <img src="/twitter.svg" className="w-5 h-5 dark:invert" alt="" />, category: "Web Links" },
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const filtered = catalog.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flat = [];
  Object.keys(grouped).forEach((cat) => {
    flat.push({ type: "label", name: cat });
    grouped[cat].forEach((item) => flat.push({ type: "item", item }));
  });

  const handleSelect = (item) => {
    if (item.type === "app") {
      openApp(item.id);
    } else if (item.target === 'finder') {
      openApp(item.target, { 
        tab: item.tab,
        selectedItem: (item.type === 'file' || item.type === 'project') ? { id: item.id } : null
      });
    } else if (item.target) {
      openApp(item.target);
    } else if (item.type === "url") {
      window.open(item.url, "_blank");
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((p) => (p + 1) % flat.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((p) => (p - 1 + flat.length) % flat.length);
    }
    if (e.key === "Enter") {
      const curr = flat[selectedIndex];
      if (curr?.item) handleSelect(curr.item);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-[12vh]">
      
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative w-[640px] rounded-2xl overflow-hidden
        bg-white/90 dark:bg-zinc-900/80
        backdrop-blur-xl
        border border-black/10 dark:border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

        {/* input */}
        <div className="flex items-center px-5 pt-5 pb-3 relative">
          <Search className="absolute left-5 w-5 h-5 text-zinc-500" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full bg-transparent outline-none pl-8 pr-8
              text-[20px] font-medium
              text-zinc-800 dark:text-zinc-100
              placeholder:text-zinc-400"
          />
          {search && (
            <X
              onClick={() => setSearch("")}
              className="absolute right-5 w-4 h-4 text-zinc-500 cursor-pointer"
            />
          )}
        </div>

        {/* results */}
        <div className="max-h-[45vh] overflow-y-auto pb-3">

          {flat.map((entry, idx) => {
            const isActive = idx === selectedIndex;

            if (entry.type === "label") {
              return (
                <div
                  key={idx}
                  className="px-5 pt-4 pb-1 text-xs uppercase tracking-wide text-zinc-500"
                >
                  {entry.name}
                </div>
              );
            }

            const item = entry.item;

            return (
              <div
                key={idx}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-3 px-5 py-2 cursor-pointer
                ${isActive ? "bg-black/5 dark:bg-white/10" : ""}`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {typeof item.icon === "string" ? (
                    <img src={item.icon} alt="" className="w-5 h-5" />
                  ) : (
                    item.icon
                  )}
                </div>
                <div className="text-sm text-zinc-700 dark:text-zinc-200">
                  {item.name}
                </div>
              </div>
            );
          })}

        </div>

        {/* footer */}
        <div className="flex justify-between px-5 py-2 text-[11px]
          text-zinc-500 border-t border-black/10 dark:border-white/10">
          <div>↑↓ navigate • enter open</div>
          <div>esc close</div>
        </div>
      </div>
    </div>
  );
}