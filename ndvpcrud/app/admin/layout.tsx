import Head from "next/head";
import "./adminDashboard/globals.css";

const metadata = {
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
      <Head>
        <title>{metadata.title}</title>
      </Head>
        <body>{children}</body>
      </html>
    )
  }