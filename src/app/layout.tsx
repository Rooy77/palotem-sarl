import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Palotem Sarl',
  description: 'Agence digitale spécialisée dans les services web',
  openGraph: {
    title: 'Palotem Sarl - Agence Digitale',
    description: 'Agence digitale spécialisée dans la création de sites web, design, branding et plus encore.',
    url: 'https://palotem-sarl.vercel.app/',
    siteName: 'Palotem Sarl',
    images: [
      {
        url: 'https://palotem-sarl.vercel.app/og-image.jpg', // Place cette image dans /public
        width: 1200,
        height: 630,
        alt: 'Présentation de Palotem Sarl'
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palotem Sarl - Agence Digitale',
    description: 'Découvrez nos services web, design et communication digitale.',
    images: ['https://palotem-sarl.vercel.app/og-image.jpg'],
    creator: '@palotem_sarl' // remplace par ton handle Twitter, ou supprime si non utilisé
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
