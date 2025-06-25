'use client'

import { MediaCollection } from '@/payload-types'
import { getMediaAlt } from '@/utils/getMediaAlt'
import { getMediaAspect } from '@/utils/getMediaAspect'
import { getMediaUrl } from '@/utils/getMediaUrl'
import Image from 'next/image'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  image: MediaCollection | string
  className?: string
  showLoading?: boolean
  allowFullscreen?: boolean
}

function ImageComp({ image, className = '', showLoading = true, allowFullscreen = false }: Props) {
  const [loading, setLoading] = useState(true)
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: getMediaAspect(image) }}>
      {allowFullscreen ? (
        <Zoom classDialog="bg-background dark:bg-background-dark">
          <Image
            onLoad={() => {
              setLoading(false)
            }}
            src={getMediaUrl(image)}
            fill
            className="w-full h-auto z-10"
            alt={getMediaAlt(image, 'Image')}
            sizes="800px"
          />
        </Zoom>
      ) : (
        <Image
          onLoad={() => {
            setLoading(false)
          }}
          src={getMediaUrl(image)}
          fill
          className="w-full h-auto z-10"
          alt={getMediaAlt(image, 'Image')}
          sizes="800px"
        />
      )}
      {showLoading && loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      )}
    </div>
  )
}

export default ImageComp
