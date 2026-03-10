'use client'

import ArrowBackSharp from '@/assets/ArrowBackSharp'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button type="button" className='cursor-pointer' onClick={() => router.back()}>
      <ArrowBackSharp className="w-6 h-6 mr-3" />
    </button>
  )
}
