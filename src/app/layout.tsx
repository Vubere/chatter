
import { Providers } from '@/state/provider'


import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  var bodyClass = `${inter.className} bg-white w-[100vw] h-[100vh] overflow-hidden`;

  return (
    <html lang="en">
      <body className={bodyClass}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
