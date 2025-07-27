"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
 // Assure-toi que le chemin est correct

const navItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "À PROPOS", href: "/about" },
  { label: "SERVICES", href: "/service" },
  { label: "PRODUCT", href: "/product" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nom */}
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
              Société Palotem Sarl
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

            {/* Language Switcher Desktop */}

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

          {/* Menu bouton (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`md:hidden p-2 transition-all duration-300 ${
              scrolled
                ? "bg-white text-orange-600 border border-orange-600"
                : "bg-orange-600 text-white"
            }`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md px-4 py-6 space-y-6 text-center overflow-hidden"
          >
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

            {/* Language Switcher Mobile */}
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 transition mx-auto"
            >
              Get a quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
