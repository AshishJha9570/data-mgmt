import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './components/Providers'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Data Entry and Export App',
  description: 'An application for data entry and Excel export',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="container mx-auto mt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

