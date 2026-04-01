"use client"
import Image from "next/image"

const assets = [
  "/finder.svg",
  "/Launch Pad.svg",
  "/about.svg",
  "/app-store.svg",
  "/mail.png",
  "/projects.svg",
  "/safari.svg",
  "/notes.svg",
  "/terminal.svg",
  "/spotify.svg",
  "/settings.svg",
  "/calculator.svg",
  "/maze.svg",
  "/github.svg",
  "/linkedin.svg",
  "/trash.png",
  "/apple-logo.svg",
  "/expert-review.png",
  "/file.svg",
  "/folder.svg",
  "/globe.svg",
  "/home.svg",
  "/mac.svg",
  "/maps.png",
  "/message.png",
  "/photos.svg",
  "/rocket.png",
  "/twitter.svg",
  "/window.svg",
  "/wallpaper2.jpg",
  "/wallpaper6.jpg",
  "/wallpaper7.png",
  "/wallpaper9.png",
  "/payment.jpg",
  "/interview.jpg",
  "/schedule.jpg"
]

export default function Preloader() {
  return (
    <div className="hidden" aria-hidden="true">
      {assets.map((src) => (
        <img key={src} src={src} alt="" />
      ))}
    </div>
  )
}
