import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Naucno Drustvo Vladimir Prelog',
  description: 'ndvp main site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
