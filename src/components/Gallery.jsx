import { useEffect, useMemo, useState, useCallback } from 'react'

function usePhotos() {
  const photos = useMemo(() => {
    const modules = import.meta.glob(
      '../assets/photos/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,webp,WEBP,avif,AVIF}',
      {
        eager: true,
        as: 'url',
      },
    )
    return Object.keys(modules)
      .map((path) => ({ url: modules[path], name: path.split('/').pop()?.toLowerCase() ?? 'photo' }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p) => p.url)
  }, [])
  return photos
}

export default function Gallery() {
  const photos = usePhotos()
  const [activeIndex, setActiveIndex] = useState(-1)

  const close = useCallback(() => setActiveIndex(-1), [])
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i <= 0 ? photos.length - 1 : i - 1)),
    [photos.length],
  )
  const showNext = useCallback(
    () => setActiveIndex((i) => (i >= photos.length - 1 ? 0 : i + 1)),
    [photos.length],
  )

  useEffect(() => {
    function onKey(e) {
      if (activeIndex < 0) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, close, showPrev, showNext])

  if (!photos.length) {
    return (
      <div className="hint">No photos yet — drop images into src/assets/photos and refresh.</div>
    )
  }

  return (
    <>
      <div className="gallery">
        {photos.map((src, idx) => (
          <button
            key={src}
            className="gallery-item"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Open photo ${idx + 1}`}
            style={{ padding: 0, background: 'transparent', border: 'none', cursor: 'zoom-in', touchAction: 'manipulation' }}
          >
            <img src={src} alt={`Memory ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {activeIndex >= 0 && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={photos[activeIndex]} alt={`Photo ${activeIndex + 1}`} />
            <button className="nav prev" onClick={showPrev} aria-label="Previous" style={{ touchAction: 'manipulation' }}>‹</button>
            <button className="nav next" onClick={showNext} aria-label="Next" style={{ touchAction: 'manipulation' }}>›</button>
            <button className="close" onClick={close} aria-label="Close" style={{ touchAction: 'manipulation' }}>✕</button>
          </div>
        </div>
      )}
    </>
  )
}

