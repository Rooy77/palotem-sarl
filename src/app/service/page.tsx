import Link from "next/link";
import { Gem, Bolt, Coins } from "lucide-react";
import Mining from "@/components/MiningSection"
import Image from "next/image";

const services = [
  {
    title: "Import – Export",
    description:
      "Nous assurons l’importation et l’exportation de produits agricoles (café, cacao, huile, tournesol), matériaux de construction, pièces détachées, vivres frais, vêtements (friperie), etc.",
    icon: <Bolt className="text-orange-500 w-6 h-6" />, 
  },
  {
    title: "Génie civil & Construction",
    description:
      "Notre département réalise des projets de construction, réhabilitation d’infrastructures, voiries, bâtiments publics et privés. Nous fournissons également des expertises immobilières et accompagnons les investissements immobiliers.",
    icon: <Gem className="text-orange-500 w-6 h-6" />,
  },
  {
    title: "Logistique & Transport",
    description:
      "ONous proposons des services de transport de marchandises, fret national et international, gestion de stock, entreposage et distribution. Nous travaillons avec les meilleurs réseaux logistiques pour garantir la fiabilité.",
    icon: <Coins className="text-orange-500 w-6 h-6" />,
  },
];
export default function ServicesPage() {
  return (
    <section>
      <div className="relative w-full h-[40vh]">
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10"
        >
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
      <div className="max-w-6xl mx-auto px-8 py-16 ">
          <section className="items-center">
            {/* Text Content */}
          <div className="text-center mb-12">
            <p className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">Services</p>
            <h2 className="text-4xl font-bold text-gray-800">
              Society PALOREM Sarl<br /> <span className="font-light text-gray-700">We are competent</span>
            </h2>
            <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
            <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
              As a unique entrepreneurial company rooted in the community, Royal Import Export Sarl creates value for stakeholders through an investment strategy that strictly adheres to our Vision, Mission and Values. We strive for excellence to realise the hopes and aspirations of our company and communities.
            </p>
          </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="p-4">
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
          </section>
          <br />
          <br />
      </div>
      <Mining />
    </section>
  )
}
