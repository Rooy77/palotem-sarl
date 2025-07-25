// Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";

const LINKS = [
  {
    title: "Entreprise",
    items: ["À propos", "Nos valeurs", "Historique", "Partenaires"],
  },
  {
    title: "Services",
    items: ["Import-Export", "Génie civil", "Logistique", "Énergie"],
  },
  {
    title: "Contact",
    items: ["Email", "Téléphone", "Adresse"],
  },
];

const teaFooter = [
  {
    facebook: "https://facebook.com/linda.kanku",
    twitter: "https://x.com/linda_projects",
    linkedin: "#",
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  // Texte avec apostrophes typographiques directement ici
  const addressGoma = "Adresse siège : Goma, 03 Av. de la Frontière, Q. Katindo";
  const addressLubumbashi = "Bureau L’shi : 96 Av. du Cadastre, Q. Salama, C. L’shi";
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
              <p>{addressLubumbashi}</p>
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
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-gray-400 border hover:bg-orange-500 hover:text-gray-100 text-gray-400 rounded-full p-2 transition-all duration-300"
                    >
                      <FaXTwitter size={15} />
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
                  {items.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-white transition"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} PALOTEM Sarl. {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
