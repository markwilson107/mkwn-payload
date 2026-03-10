'use client'

import SunIcon from "@/assets/SunIcon"
import MoonIcon from "@/assets/MoonIcon"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch({className = ""}:{className?: string}) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return;

  if (resolvedTheme === 'dark') {
    return <SunIcon width={20} height={20} className={`text-lg cursor-pointer hover:text-theme select-none ${className}`} onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <MoonIcon width={20} height={20} className={`text-lg cursor-pointer hover:text-theme select-none ${className}`} onClick={() => setTheme('dark')} />
  }

}