import './style.css';

export const metadata = {
  title: 'NDVP',
  description: 'Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>{children}</div>
  )
}