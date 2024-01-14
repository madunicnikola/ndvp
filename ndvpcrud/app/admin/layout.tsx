import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDVP',
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