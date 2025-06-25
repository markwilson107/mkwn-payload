'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return;

  if (resolvedTheme === 'dark') {
    return <FiSun className="text-lg cursor-pointer hover:text-theme select-none" onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <FiMoon className="text-lg cursor-pointer hover:text-theme select-none" onClick={() => setTheme('dark')} />
  }

}