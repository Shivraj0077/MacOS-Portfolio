"use client"
import { useState } from "react"

const tracks = [
  {
    id: 1,
    title: "Sample Track 1",
    artist: "Demo Artist",
    album: "Demo Album",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    spotify: "https://open.spotify.com",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "Sample Track 2",
    artist: "Demo Artist",
    album: "Demo Album",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    spotify: "https://open.spotify.com",
    date: "5 hours ago"
  }
]

export default function Spotify() {
  const [current, setCurrent] = useState(tracks[0])

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-900 to-black text-white p-6">

      {/* Top Section */}
      <div className="flex gap-6 items-center">
        <div className="w-48 h-48 bg-green-500 rounded-xl shadow-2xl flex items-center justify-center">
          🎵
        </div>

        <div>
          <span className="text-xs uppercase text-zinc-400">Playlist</span>
          <h1 className="text-5xl font-bold mt-2">Top Hits</h1>

          {/* Player */}
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Now Playing: {current.title}
            </span>
            <span className="text-xs text-zinc-400">
              {current.artist}
            </span>

            {/* AUDIO PLAYER */}
            {current.preview_url ? (
              <audio
                key={current.preview_url}
                controls
                autoPlay
                className="mt-2 w-[300px]"
              >
                <source src={current.preview_url} type="audio/mpeg" />
              </audio>
            ) : (
              <span className="text-xs text-red-400">
                No preview available
              </span>
            )}

            {/* Spotify Button */}
            <a
              href={current.spotify}
              target="_blank"
              className="mt-2 text-xs bg-green-500 px-4 py-1 rounded-full w-fit"
            >
              Open in Spotify
            </a>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="mt-10 overflow-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="border-b border-zinc-800">
            <tr>
              <th className="pb-2"># TITLE</th>
              <th>ALBUM</th>
              <th>DATE</th>
            </tr>
          </thead>

          <tbody>
            {tracks.map((track, i) => (
              <tr
                key={track.id}
                onClick={() => setCurrent(track)}
                className="hover:bg-zinc-800/50 cursor-pointer text-white"
              >
                <td className="py-3 flex items-center gap-3">
                  {i + 1}
                  <div>
                    <div className="font-bold">{track.title}</div>
                    <div className="text-xs text-zinc-400">
                      {track.artist}
                    </div>
                  </div>
                </td>
                <td>{track.album}</td>
                <td>{track.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}