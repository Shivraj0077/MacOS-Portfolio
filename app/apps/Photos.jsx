"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Photos() {
  const [photos, setPhotos] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB

  // Load from Supabase (fallback to localStorage)
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('photos')
          .select('*')
          // Optional: ordering by created time, assume standard table
        
        if (data && data.length > 0 && !error) {
          setPhotos(data.reverse()) // newest first
        } else {
          const saved = JSON.parse(localStorage.getItem('imgbb-gallery') || '[]')
          setPhotos(saved)
        }
      } catch (err) {
        const saved = JSON.parse(localStorage.getItem('imgbb-gallery') || '[]')
        setPhotos(saved)
      }
    }
    loadPhotos()
  }, [])

  // Preload all images for instant playback
  useEffect(() => {
    photos.forEach((p) => {
      const img = new Image()
      img.src = p.url
    })
  }, [photos])

  const savePhotos = async (newPhoto, updated) => {
    setPhotos(updated)
    localStorage.setItem('imgbb-gallery', JSON.stringify(updated))

    try {
      // Save URL to Supabase DB
      await supabase.from('photos').insert([{
        url: newPhoto.url,
        title: newPhoto.title
      }])
    } catch (err) {
      console.error("Supabase insert error:", err)
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        const url = data.data.url

        // ✅ PRELOAD BEFORE SHOWING (important)
        const img = new Image()
        img.src = url
        await new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })

        const newPhoto = {
          id: data.data.id,
          url,
          title: file.name,
          date: new Date().toLocaleDateString(),
        }

        const updated = [newPhoto, ...photos]
        savePhotos(newPhoto, updated)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] text-zinc-900 flex flex-col p-8 gap-12'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold'>Photos Hub</h2>
          <span className='text-zinc-500 text-xs uppercase tracking-widest'>
            ImgBB Gallery
          </span>
        </div>

        <label className={`px-6 py-2 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md
          ${isUploading 
            ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>

          <input
            type="file"
            hidden
            onChange={handleUpload}
            disabled={isUploading}
            accept="image/*,image/gif"
          />

          <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
        </label>
      </div>

      {/* Gallery */}
      <div>
        <h3 className='text-lg font-semibold text-blue-600 mb-6'>
          Your Images
        </h3>

        {photos.length === 0 ? (
          <div className='flex flex-col items-center justify-center p-20 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow'>
            <span className='text-zinc-600 text-sm'>No images uploaded yet</span>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {photos.map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                onClick={() => setSelectedImage(photo)}
                className='group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white/40 backdrop-blur border border-white/30 shadow hover:shadow-xl transition-all'
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="eager"   // ✅ instant load
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3'>
                  <span className='text-xs text-white font-semibold truncate'>
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-6'
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className='max-w-full max-h-[85vh] object-contain rounded-xl'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  )
}