import confetti from 'canvas-confetti'
import { useCallback } from 'react'

export default function ConfettiButton({ children }) {
  const burst = useCallback(() => {
    const durationMs = 1200
    const animationEnd = Date.now() + durationMs
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const frame = () => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return

      const particleCount = 60 * (timeLeft / durationMs)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.2, 0.4), y: 0.2 }, colors: ['#ff2e79','#ff6b9f','#ffd1e1','#ffffff'] })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.8), y: 0.2 }, colors: ['#ff2e79','#ff6b9f','#ffd1e1','#ffffff'] })

      requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <button className="button-primary" onClick={burst}>
      {children}
    </button>
  )
}

