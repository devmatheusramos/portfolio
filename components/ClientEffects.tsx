'use client'

import { useEffect } from 'react'

export default function ClientEffects() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (cursor) {
        cursor.style.left = mx + 'px'
        cursor.style.top = my + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
      }
      requestAnimationFrame(animRing)
    }
    animRing()

    const onEnter = () => {
      cursor?.classList.add('expanded')
      ring?.classList.add('expanded')
    }
    const onLeave = () => {
      cursor?.classList.remove('expanded')
      ring?.classList.remove('expanded')
    }
    const addHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addHover()

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return null
}
