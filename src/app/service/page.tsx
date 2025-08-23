import Image from "next/image";
import { Gem, Coins, BrickWall, CalendarSync, Truck } from "lucide-react"; // Import des icônes Lucide
import Mining from "@/components/MiningSection";
import Link from "next/link";

const services = [
  {
    title: "Import – Export",
    description:
      "Nous assurons l’importation et l’exportation de produits agricoles (café, cacao, huile, tournesol), matériaux de construction, pièces détachées, vivres frais, vêtements (friperie), etc.",
    icon: <CalendarSync className="text-orange-500 w-6 h-6" />, 
    image: "https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg",
  },
  {
    title: "Génie civil & Construction",
    description:
      "Notre département réalise des projets de construction, réhabilitation d’infrastructures, voiries, bâtiments publics et privés. Nous fournissons également des expertises immobilières et accompagnons les investissements immobiliers.",
    icon: <BrickWall className="text-orange-500 w-6 h-6" />,
    image: "https://images.pexels.com/photos/19982408/pexels-photo-19982408.jpeg",
  },
  {
    title: "Logistique & Transport",
    description:
      "Nous proposons des services de transport de marchandises, fret national et international, gestion de stock, entreposage et distribution. Nous travaillons avec les meilleurs réseaux logistiques pour garantir la fiabilité.",
    icon: <Truck className="text-orange-500 w-6 h-6" />,
    image: "/img/port.jpg",
  },
  {
    title: "Mines :",
    description:
      "Nous procédons à l’exploitation et la transformation des cathodes et les concentrés de cuivre et cobalt, Nous faisons également l’achat et laventedes pierresprécieuses (Or, diamant, Taurmaline...).",
    icon: <Gem className="text-orange-500 w-6 h-6" />,
    image: "/img/mine-s.jpeg",
  },
  {
    title: "Sous-traitance :",
    description:
      "Nous proposons des services dans les entreprises minières, entreprises privés et étatiques. Fournituredesvivres, service de nettoyage, Fourniture des matériels de construction, Equipements miniers (Soft).",
    icon: <Coins className="text-orange-500 w-6 h-6" />,
    image: "/img/sous-trait.jpg",
  },
];
export default function ServicesPage() {
  return (
    <section>
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
          <Image
            src="/img/page-title.jpg"
            fill
            className="object-cover"
            sizes="100vw" alt={""}          />
          <div className="absolute bg-gray-800/30 inset-0 flex items-center justify-left text-white text-center">
            <div  className="max-w-6xl mx-auto px-4 py-16">
              <div className="max-w-3xl flex md:text-5xl font-semibold text-xl cursor-pointer">
                <div className="col col-xs-12">
                    <h2>Service</h2>
                    <ol className="text-sm text-center font-light justify-center flex space-x-2">
                        <li className="text-orange-500">
                          <Link href="/">
                            Home
                          </Link>  &gt;
                        </li>
                        <li>Service</li>
                    </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">Services</h3>
          <h2 className="text-4xl font-bold text-gray-800">
            Nous sommes compétents <br /> <span className="font-light text-gray-700">dans nos valeurs</span>
          </h2>
          <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            En tant qu’entreprise entrepreneuriale unique et enracinée dans la communauté, Royal Import Export Sarl crée de la valeur pour ses parties prenantes grâce à une stratégie d’investissement qui respecte strictement notre Vision, Mission et Valeurs. Nous visons l’excellence pour réaliser les espoirs et aspirations de notre société et de nos communautés.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-4">
              <div className="w-full h-48 relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-start mt-4 space-x-3">
                <div className="mt-1">{service.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600 font-light text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Mining />
    </section>
  )
}
