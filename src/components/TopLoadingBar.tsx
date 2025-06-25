'use client'

import HolyLoader from 'holy-loader'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function TopLoadingBar() {
	const { theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const currentTheme = theme === 'system' ? resolvedTheme : theme
	const color = currentTheme === 'dark' ? '#ffffffcc' : '#000000b3'

	return (
		<HolyLoader key={currentTheme} color={color} showSpinner={false} />
	)
}

export default TopLoadingBar
