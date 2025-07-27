import Image from "next/image"

import Aboutsuite from "@/components/AbouteSuite";


export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid mb-9 md:grid-cols-2 gap-10 items-center">
                {/* Image */}
       <div className="">
         <Image
            src="/img/glod.jpg"
            alt="Logo Palotem"
            width={430}
            height={430}
            className=""
        />
       </div>

      {/* Text Content */}
      <div className="space-y-6">
        <p className="uppercase text-sm tracking-widest text-orange-600 barlow-condensed-regular">About us</p>
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="block text-gray-700">Welcome to</span>
          Society Palotem Sarl
        </h1>

        <div className="w-20 h-1 bg-orange-500 rounded"></div>
        <p className="text-gray-600 text-sm font-light leading-relaxed">
            Société Palotem Sarl est une entreprise congolaise fondée en 2015 par M. Michel Kadakala Mudesa Sangara. Active dans
            plusieurs domaines stratégiques, elle développe ses activités en RDC et à l’étranger avec une vision ambitieuse
            et une éthique fondée sur l’intégrité et la performance.
            Notre expertise couvre le commerce général, l’import-export, les produits agricoles, les matériaux de construction,
            le génie civil, les énergies et les services logistiques. Présente à Goma, Lubumbashi, Kinshasa, Bukavu, Kampala et
            Hong Kong, Société Palotem Sarl est aujourd’hui un acteur majeur du développement économique et social.

        </p>

        <blockquote className="border-l-4 pl-4 font-medium text-sm border-gray-200 text-gray-500 py-2">
          Société Palotem Sarl pour dire « la Patience est la Longueur du Temps » est une société unipersonnelle régie par l’Acte uniforme
          relative au droit des activités commerciales et du groupement d’intérêt économique ayant pour objet acheter et vendre...,
          importer et exporter mais aussi, rentrer dans toutes les activités de nature à favoriser son développement pourvu
          que ça cadre avec son objet social.
          investments.
        </blockquote>
      </div>
      </div>
      <Aboutsuite />
      
    </section>
  )
}



