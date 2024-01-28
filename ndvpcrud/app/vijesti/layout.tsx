import Head from 'next/head';
import './globals.css';

const metadata = {
  title: 'NDVP',
  description: 'Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Head>
        <title>{metadata.title}</title>
      </Head>
        <body>{children}</body>
  </html>
  )
}