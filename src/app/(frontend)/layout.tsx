import React from 'react'
import './styles.css'
import { ThemeProvider } from 'next-themes'
import TopLoadingBar from '@/components/TopLoadingBar'

export const metadata = {
  description: "Hi, I'm Mark I build rock-solid web and software applications.",
  title: 'Mark Wilson | mkwn.dev',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="bg-background dark:bg-background-dark" >
      <body className="bg-background dark:bg-background-dark text-primary dark:text-primary-dark w-full" suppressHydrationWarning >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TopLoadingBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
