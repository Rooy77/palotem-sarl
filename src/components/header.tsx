"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"

const navItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "À PROPOS", href: "/about" },
  { label: "SERVICES", href: "/service" },
  { label: "CONTACT", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo + texte */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logos/logopalotem.jpg"
              alt="Logo Palotem"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <span
              className={`text-2xl font-semibold barlow-condensed-regular transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Palotem Sarl
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium barlow-condensed-regular hover:text-orange-600 transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-orange-600"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className={`ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                scrolled
                  ? "bg-orange-600 text-white hover:bg-gray-100 hover:text-orange-600"
                  : "bg-orange-600 text-white hover:bg-orange-600/20"
              }`}
            >
              Get a quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Menu Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-base font-medium barlow-condensed-regular transition-colors duration-200 ${
                pathname === item.href ? "text-orange-600" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 transition"
          >
            Get a quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  )
}
