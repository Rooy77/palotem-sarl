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
        <h3 className="uppercase text-sm tracking-widest text-orange-600 font-regular">A PROPOS DE NOUS</h3>
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="block font-light text-gray-700">Bienvenu Chez</span>
          Société Palotem Sarl
        </h1>

        <div className="w-20 h-1 bg-orange-500 rounded"></div>
        <p className="text-gray-600 text-sm font-light text-justify leading-relaxed">
            Société Palotem Sarl est une entreprise congolaise fondée en 2015 par M. Michel Kadakala Mudesa Sangara. Active dans
            plusieurs domaines stratégiques, elle développe ses activités en RDC et à l’étranger avec une vision ambitieuse
            et une éthique fondée sur l’intégrité et la performance.
            Notre expertise couvre le commerce général, l’import-export, les produits agricoles, les matériaux de construction,
            le génie civil, les énergies et les services logistiques. <br />
            Présente sur le plan national et international. Sur le plan national, dans 4 provinces de la République Démocratique du Congo dont :
      
        </p>
        <ul className="grid grid-cols-2 gap-8 text-gray-600 text-sm font-medium">
              <div className="space-y-1">
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-orange-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  Nord-Kivu (Goma)  
                </li>
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-orange-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  Sud-Kivu (Bukavu)
                </li>
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-orange-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  Haut-Katanga (Lubumbashi)
                </li>
              </div>
              <div className="space-y-1">
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-orange-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  Lualaba (KOLWEZI)
                </li>
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-orange-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  Ville province de Kinshasa
                </li>
              </div>
          </ul>
          <p className="text-gray-600 text-sm font-light">
            Société Palotem Sarl est aujourd’hui un acteur majeur du développement économique et social.
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



