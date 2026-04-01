"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { useWindowStore, useSystemStore } from "../store/useStore"

const tracks = [
  {
    id: "0VjIjW4GlUZAMYd2vXMi3b",
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "https://p.scdn.co/mp3-preview/b6008b8b323c2140be574898abb4ef223d779fdf?cid=cfe923b2d660439caf2b557b21f31369",
  },
  {
    id: "463CkQjx2Zk1yXoBuierM9",
    title: "Levitating",
    artist: "Dua Lipa",
    url: "https://p.scdn.co/mp3-preview/a91901a141aa721f421523c914e6b22570076a92?cid=cfe923b2d660439caf2b557b21f31369",
  },
  {
    id: "4iV5W9uYEdYUVa79Axb7Rh",
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "https://p.scdn.co/mp3-preview/38167ce9f3900ca89f0744e877cd62e74288bde1?cid=cfe923b2d660439caf2b557b21f31369",
  },
  {
    id: "3n3Ppam7vgaVa1iaRUc9Lp",
    title: "Mr. Brightside",
    artist: "The Killers",
    url: "https://p.scdn.co/mp3-preview/e91901a141aa721f421523c914e6b22570076a92?cid=cfe923b2d660439caf2b557b21f31369",
  },
]

const playlistId = "2WmEeRj6bmfwhmp55ZWYii"

export default function SpotifyApp() {
  const setNowPlaying = useSystemStore(s => s.setNowPlaying)
  const nowPlaying = useSystemStore(s => s.nowPlaying)
  const volume = useSystemStore(s => s.volume)
  const focusApp = useWindowStore(s => s.focusApp)
  const audioRef = useRef(null)
  // Track which track index is loaded in the audio element
  const currentIndexRef = useRef(0)

  // ── Initialize store with first track on mount ──────────────────────────────
  useEffect(() => {
    const t = tracks[0]
    setNowPlaying({
      id: t.id,
      title: t.title,
      artist: t.artist,
      isPlaying: false,
      url: t.url,
      albumArt: "/spotify.svg",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Volume: store → audio element ──────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume / 100))
    }
  }, [volume])

  // ── Play/pause: store isPlaying → audio element ────────────────────────────
  // This is the single source of truth. Control center calls setNowPlaying({...isPlaying: true/false})
  // and this effect drives the actual audio element.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !nowPlaying) return

    // If the URL changed (track switch), update src first
    if (audio.src !== nowPlaying.url) {
      audio.src = nowPlaying.url
      audio.load()
    }

    if (nowPlaying.isPlaying) {
      audio.play().catch(() => {
        // Autoplay blocked — flip isPlaying back to false so UI stays consistent
        setNowPlaying({ ...nowPlaying, isPlaying: false })
      })
    } else {
      audio.pause()
    }
  }, [nowPlaying?.isPlaying, nowPlaying?.url])

  // ── Select a track from the list ───────────────────────────────────────────
  const selectTrack = useCallback((index) => {
    const t = tracks[index]
    currentIndexRef.current = index
    // Keep isPlaying state so clicking a new track while paused doesn't auto-play
    setNowPlaying({
      id: t.id,
      title: t.title,
      artist: t.artist,
      isPlaying: nowPlaying?.isPlaying ?? false,
      url: t.url,
      albumArt: "/spotify.svg",
    })
  }, [nowPlaying?.isPlaying, setNowPlaying])

  // ── Auto-advance to next track when current ends ───────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => {
      const next = (currentIndexRef.current + 1) % tracks.length
      const t = tracks[next]
      currentIndexRef.current = next
      setNowPlaying({
        id: t.id,
        title: t.title,
        artist: t.artist,
        isPlaying: true,
        url: t.url,
        albumArt: "/spotify.svg",
      })
    }
    audio.addEventListener("ended", onEnded)
    return () => audio.removeEventListener("ended", onEnded)
  }, [setNowPlaying])

  const activeId = nowPlaying?.id

  return (
    <div 
      onMouseDown={() => focusApp('spotify')}
      className="h-full flex bg-[#121212] text-white"
    >
      {/* Single hidden audio element — this is the ONLY audio source */}
      <audio ref={audioRef} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-white/10 flex items-center gap-3">
          <svg className="w-7 h-7 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.218.358-.679.471-1.037.253-2.871-1.754-6.486-2.152-10.741-1.177-.411.094-.821-.161-.915-.572-.094-.411.161-.821.572-.915 4.66-1.066 8.647-.611 11.87 1.358.356.216.47.678.251 1.037zm1.47-3.257c-.275.446-.856.589-1.302.314-3.287-2.022-8.3-2.615-12.189-1.434-.503.153-1.029-.133-1.182-.636-.153-.503.133-1.029.636-1.182 4.453-1.352 10.005-.689 13.753 1.62.447.275.591.856.315 1.302l-.331.016zm.126-3.41c-3.943-2.341-10.457-2.557-14.238-1.41-.605.184-1.242-.167-1.426-.772-.184-.605.167-1.242.772-1.426 4.346-1.32 11.536-1.056 16.082 1.641.544.323.722 1.031.4 1.575s-1.029.722-1.573.4l-.017-.008z" />
          </svg>
          <span className="font-bold text-sm text-white uppercase">Spotify</span>
        </div>

        {/* Embedded playlist (visual only — audio is via the <audio> ref above) */}
        <div className="flex-1 relative">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?theme=0`}
            className="absolute inset-0 w-full h-full border-0"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            // Note: "autoplay" intentionally omitted so iframe audio stays silent
          />
        </div>
      </div>
    </div>
  )
}