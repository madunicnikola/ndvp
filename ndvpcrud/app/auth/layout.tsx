import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: 'NDVPauth',
  description: 'Autentikacija admin korisnika/sekreterijata',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <body>{children}</body>
    </html>
  )
}