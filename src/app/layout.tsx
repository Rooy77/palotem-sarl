import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Footer } from "@/components/footer"

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
        url: 'https://palotem-sarl.vercel.app/og-image.jpg',
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
    description: 'Découvrez nos services web, design et communication digitale.',
    images: ['https://palotem-sarl.vercel.app/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
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
        <meta property="og:image" content="https://palotem-sarl.vercel.app/og-image.jpg" />
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
