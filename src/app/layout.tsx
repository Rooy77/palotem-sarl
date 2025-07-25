import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Footer } from "@/components/footer";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Palotem Sarl',
  description: 'Agence digitale spécialisée dans les services web',
  
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
