import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Palotem Sarl',
  description: 'une société unipersonnelle régie par l’Acte uniforme',
  openGraph: {
    title: 'Society Palotem Sarl',
    description: 'Notre expertise couvre le commerce général, l’import-export, les produits agricoles, les matériaux de construction, le génie civil, les énergies et les services logistiques',
    url: 'https://palotem-sarl.vercel.app/',
    siteName: 'Palotem Sarl',
    images: [
      {
        url: 'https://palotem-sarl.vercel.app/_next/image?url=%2Fimg%2Fglod.jpg&w=640&q=75',
        width: 1200,
        height: 630,
        alt: 'Présentation de Palotem Sarl',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palotem Sarl - Agence Digitale',
    description: 'Notre expertise couvre le commerce général, l’import-export, les produits agricoles, les matériaux de construction, le génie civil, les énergies et les services logistiques.',
    images: ['https://palotem-sarl.vercel.app/_next/image?url=%2Fimg%2Fglod.jpg&w=640&q=75'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://palotem-sarl.vercel.app/_next/image?url=%2Fimg%2Fglod.jpg&w=640&q=75" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
