"use client"

import React from 'react'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const FullscreenWrapper: React.FC<{
  node: SerializedUploadNode
  children: React.ReactNode
}> = ({ node, children }) => {

  return (
    <Zoom classDialog="bg-background dark:bg-background-dark">
      {children}
    </Zoom>
  )
}

export default FullscreenWrapper
