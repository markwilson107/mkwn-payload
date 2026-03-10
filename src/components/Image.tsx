'use client'

import { MediaCollection } from '@/payload-types'
import { getMediaAlt } from '@/utils/getMediaAlt'
import { getMediaAspect } from '@/utils/getMediaAspect'
import { getMediaUrl } from '@/utils/getMediaUrl'
import Image from 'next/image'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'

type Props = {
  image: MediaCollection | number | string
  className?: string
  imgClassName?: string;
  showLoading?: boolean
  allowFullscreen?: boolean
  size?: "thumbnail" | "medium" | "large"
}

function ImageComp({ image, className = '', imgClassName = "", showLoading = true, allowFullscreen = false, size = "thumbnail" }: Props) {
  const [loading, setLoading] = useState(true)
  let src = "";
  if (image && typeof image === 'object') {
    src = `${image.sizes?.[size]?.url || image.url}`
  }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: getMediaAspect(image) }}>
      {allowFullscreen ? (
        <Zoom classDialog="bg-background dark:bg-background-dark">
          <Image
            onLoad={() => {
              setLoading(false)
            }}
            src={src}
            fill
            className={`w-full h-auto z-10 ${imgClassName}`}
            alt={getMediaAlt(image, 'Image')}
            unoptimized
          />
        </Zoom>
      ) : (
        <Image
          onLoad={() => {
            setLoading(false)
          }}
          src={src}
          fill
          className={`w-full h-auto z-10 ${imgClassName}`}
          alt={getMediaAlt(image, 'Image')}
          unoptimized
        />
      )}
      {showLoading && loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      )}
    </div>
  )
}

export default ImageComp
