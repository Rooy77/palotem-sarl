// Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Image from "next/image";

const LINKS = [
  {
    title: "Entreprise",
    items: [
      { name: "À propos", href: "/about" },
      { name: "Nos services", href: "/service" },
      { name: "Nos Produits", href: "/product" },
      { name: "Blog", href: "/blog" },
      { name : "Palotem Tanzania", href:""},
    ],
  },
  {
    title: "Services",
    items: [
      { name: "Import-Export", href: "/service" },
      { name: "Génie civil", href: "/service" },
      { name: "Logistique", href: "/service" },
      { name: "Énergie", href: "/service" },
    ],
  },
  {
    title: "Contact",
    items: [
      { name: "Email", href: "/contact" },
      { name: "Téléphone", href: "/contact" },
      { name: "Adresse", href: "/contact" },
    ],
  },
];

const teaFooter = [
  {
    facebook: "https://web.facebook.com/palotemgroupsarl/?_rdc=1&_rdr#",
    insta: "https://www.instagram.com/societepalotemgroup/",
    linkedin: "https://www.linkedin.com/company/societe-palotem-sarl/?originalSubdomain=cd",
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const addressGoma = "Commerce Général & Import – Export";
  const numRccm = "RCCM 15-B-0387, IDNAT 5-9N04241K, N°IMPOT A1520238Q ";
  const villes = "Lubumbashi • Goma • Bukavu • Kinshasa / RD. Congo" ;
  const copyright = "Tous droits réservés.";

  return (
    <footer className="relative w-full bg-gray-900 text-gray-300">
      <div className="mx-auto w-full max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center mb-4 gap-4">
              <Image
                src="/logos/logopalotem.jpg"
                alt="PALOTEM Sarl Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h2 className="text-2xl text-white">
                SOCIÉTÉ <br /> PALOTEM Sarl
              </h2>
            </div>
            <div className="font-light text-gray-400 text-sm">
              <p>{addressGoma}</p>
              <p>{numRccm}</p>
              <p>{villes}</p>
            </div>
            <div className="flex max-w-full items-center gap-4 mt-3">
              {teaFooter.map((member, index) => (
                <div key={index}>
                  <div className="mt-4 flex justify-center gap-3">
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-gray-400 border hover:bg-orange-500 hover:text-gray-100 text-gray-400 rounded-full p-2 transition-all duration-300"
                    >
                      <FaFacebookF size={15} />
                    </a>
                    <a
                      href={member.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-gray-400 border hover:bg-orange-500 hover:text-gray-100 text-gray-400 rounded-full p-2 transition-all duration-300"
                    >
                      <FaInstagram size={15} />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-gray-400 border hover:bg-orange-500 hover:text-gray-100 text-gray-400 rounded-full p-2 transition-all duration-300"
                    >
                      <FaLinkedinIn size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {LINKS.map(({ title, items }) => (
              <div key={title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map(({ name, href }) => (
                    <li key={name}>
                      <Link
                        href={href}
                        className="text-sm text-gray-400 hover:text-white transition"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-1 pt-8 border-gray-800 max-w-m">
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} Société Palotem Sarl. {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
