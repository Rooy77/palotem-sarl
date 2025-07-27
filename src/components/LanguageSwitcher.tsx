"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const locales = [
  { code: "fr", label: "FR", flag: "/flags/fr.svg" },
  { code: "en", label: "EN", flag: "/flags/en.svg" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // Trouver la locale courante dans l'URL
  const currentLocale =
    locales.find(({ code }) => pathname.startsWith(`/${code}`)) || locales[0];

  function changeLocale(newLocale: string) {
    setIsOpen(false);

    let newPathname = pathname;

    // Retirer la locale existante de l'URL
    locales.forEach(({ code }) => {
      if (newPathname.startsWith(`/${code}`)) {
        newPathname = newPathname.replace(`/${code}`, "");
      }
    });

    // Par défaut : pas de préfixe locale dans l'URL
    const defaultLocale = locales[0].code;

    if (newLocale !== defaultLocale) {
      newPathname = `/${newLocale}${newPathname}`;
    }

    const search = searchParams.toString();

    router.push(newPathname + (search ? `?${search}` : ""));
  }

  return (
    <div className="relative inline-block text-left">
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <img
          src={currentLocale.flag}
          alt={currentLocale.label}
          className="h-4 w-6 rounded-sm object-cover"
          loading="lazy"
        />
        <span>{currentLocale.label}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
        >
          <div className="py-1">
            {locales.map(({ code, label, flag }) => {
              if (code === currentLocale.code) return null;
              return (
                <button
                  key={code}
                  onClick={() => changeLocale(code)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <img
                    src={flag}
                    alt={label}
                    className="h-4 w-6 rounded-sm object-cover"
                    loading="lazy"
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
