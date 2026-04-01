"use client"
import { useEffect, useRef, useState } from "react"

// ✅ FIXED (removed TypeScript types)
const VISITOR_DATA = [
  [20.5937, 78.9629, 0.9],
  [37.0902, -95.7129, 0.7],
  [51.5074, -0.1278, 0.5],
  [48.8566, 2.3522, 0.4],
  [35.6762, 139.6503, 0.6],
  [52.5200, 13.4050, 0.3],
  [-14.2350, -51.9253, 0.3],
  [55.7558, 37.6173, 0.2],
  [-33.8688, 151.2093, 0.3],
  [1.3521, 103.8198, 0.4],
  [39.9042, 116.4074, 0.5],
  [19.0760, 72.8777, 0.8],
  [28.7041, 77.1025, 0.7],
  [12.9716, 77.5946, 0.75],
]

const STATS = [
  { label: "Visitors", value: "12,847" },
  { label: "Countries", value: "38" },
  { label: "Today", value: "1,203" },
  { label: "Live", value: "47" },
]

export default function Maps() {
  const mapContainerRef = useRef(null) // ✅ FIXED
  const mapRef = useRef(null)

  const [currentVisitor, setCurrentVisitor] = useState(null)

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d =>
        setCurrentVisitor({
          city: d.city || "Unknown",
          country: d.country_name || "Unknown",
        })
      )
      .catch(() =>
        setCurrentVisitor({ city: "Unknown", country: "Unknown" })
      )
  }, [])

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return

    let map

    const init = async () => {
  const L = (await import("leaflet")).default
  await import("leaflet/dist/leaflet.css")

  const map = L.map(mapContainerRef.current, {
    center: [20, 10],
    zoom: 2,
    zoomControl: false,
    attributionControl: false,
  })

  mapRef.current = map

  // Clean Apple-style tiles
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 19 }
  ).addTo(map)

  // Get user location
  const res = await fetch("https://ipapi.co/json/")
  const loc = await res.json()

  if (!loc.latitude || !loc.longitude) return

  const lat = loc.latitude
  const lng = loc.longitude

  // 🌍 STEP 1: Country zoom
  map.flyTo([lat, lng], 4, { duration: 2 })

  setTimeout(() => {
    // 🗺 STEP 2: State zoom (approx)
    map.flyTo([lat, lng], 6, { duration: 2 })

    // soft state highlight
    L.circle([lat, lng], {
      radius: 200000,
      color: "#007aff",
      fillColor: "#007aff",
      fillOpacity: 0.05,
      weight: 1,
    }).addTo(map)

  }, 2000)

  setTimeout(() => {
    // 🏙 STEP 3: City zoom
    map.flyTo([lat, lng], 10, { duration: 2 })

    L.circle([lat, lng], {
      radius: 20000,
      fillColor: "#007aff",
      fillOpacity: 0.08,
      stroke: false,
    }).addTo(map)

  }, 4000)

  setTimeout(() => {
    // 📍 STEP 4: Exact location
    map.flyTo([lat, lng], 14, { duration: 2 })

    // pin
    L.circleMarker([lat, lng], {
      radius: 6,
      color: "#007aff",
      fillColor: "#007aff",
      fillOpacity: 1,
    }).addTo(map)

    // accuracy ring
    L.circle([lat, lng], {
      radius: 500,
      color: "#007aff",
      fillOpacity: 0.1,
    }).addTo(map)

  }, 6000)

  L.control.zoom({ position: "bottomright" }).addTo(map)
}
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #f5f7fb, #eef1f6)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        </div>

        <span style={{ fontSize: 13, color: "#1d1d1f" }}>
          Maps
        </span>
      </div>

      {/* Map */}
      <div style={{ position: "relative", flex: 1 }}>
        <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />

        {/* Stats */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 16,
            padding: 12,
            display: "flex",
            gap: 16,
          }}
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontWeight: 600 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#6e6e73" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Current user */}
        {currentVisitor && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              borderRadius: 12,
              padding: "8px 12px",
              fontSize: 12,
            }}
          >
            {currentVisitor.city}, {currentVisitor.country}
          </div>
        )}
      </div>
    </div>
  )
}