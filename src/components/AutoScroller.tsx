'use client'

import { MediaCollection } from '@/payload-types'
import { useRef, useEffect, useState } from 'react'
import ImageComp from './Image'

type Media = string | MediaCollection

type AutoScrollerProps = {
  items: Media[]
}

export default function AutoScroller({ items }: AutoScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayItems, setDisplayItems] = useState<Media[]>([])

  useEffect(() => {
    if (items.length === 0) return

    const containerWidth = window.innerWidth
    const itemWidth = 200 + 8
    const minItemsNeeded = Math.ceil(containerWidth / itemWidth) + 1
    const repeatCount = Math.ceil(minItemsNeeded / items.length)

    const repeated = Array(repeatCount).fill(items).flat()
    setDisplayItems([...repeated, ...repeated])
  }, [items])

  useEffect(() => {
    let start: number | null = null
    let rafId: number
    const speed = 0.5

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      start = timestamp

      const container = containerRef.current
      if (container) {
        container.scrollLeft += speed * elapsed

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0
        }
      }

      rafId = requestAnimationFrame(step)
    }

    if (displayItems.length > 0) {
      rafId = requestAnimationFrame(step)
    }

    return () => cancelAnimationFrame(rafId)
  }, [displayItems])

  if (items.length === 0) return null

  return (
    <div className="overflow-hidden w-full">
      <div ref={containerRef} className="flex w-max animate-none whitespace-nowrap">
        {displayItems.map((src, i) => (
          <div key={i} className="flex-none w-[200px] mr-2 shrink-0">
            <ImageComp className="w-full" image={src} showLoading={false} />
          </div>
        ))}
      </div>
    </div>
  )
}
