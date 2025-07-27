import Link from "next/link";
import { ArrowRight } from "lucide-react"
import Team from "@/components/team";
import Corevalue from "@/components/CoreValue";
import BusinessM from "@/components/BusinessM";
import Mining from "@/components/MiningSection"

import Image from "next/image";

import Aboutsuite from "@/components/AbouteSuite";
export default function AboutPage() {
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
                    <h2>About us</h2>
                    <ol className="text-sm text-center font-light justify-center flex space-x-2">
                        <li className="text-orange-500"><a href="#">Home</a> {'>'}</li>
                        <li>About us</li>
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
            <div className="space-y-6">
              <p className="uppercase barlow-condensed-regular text-sm tracking-widest text-orange-600">About us</p>
              <h1 className="text-4xl text-gray-900">
                <span className="block text-gray-700">Welcome to</span>
                Royal Import Export Sarl
              </h1>

              <div className="w-20 h-1 bg-orange-500 rounded"></div>

              <p className="text-gray-600 font-light text-sm leading-relaxed">
                La Société Palotem Sarl est née d’une histoire, d’un choc d’idées d’une pensée liée aux potentialités tant
                humaines, spirituelles, matérielles que financières avec comme connotation la créativité innovatrice responsable.
                <br />
                <br />

                C’est au terme de multiples voyages et contacts avec divers couches et catégories de personnes dans le monde
                du business plein de surprises heureuses ou malheureuses que l’Associé unique Mr. KADAKALA SANGARA Michel, au
                bout de beaucoup de patience et de sacrifice, est rentré au pays, car congolais de la RDC de nationalité, pour
                arranger tous les papiers autorisant l’exploitation des pierres de couleurs, l’Ametiste, les quartz, l’or,
                le cuivre, le cobalt etc... tellement la RDC regorge d’importantes et diverses richesses du sous- sol qui font
                la convoitise de nombreux pays.
                <br />
                <br />

                Dès lors que l’Associé unique s’est mis en ordre avec l’Etat, quelques contrats et/ou protocoles de partenariats
                avec d’importantes sociétés propriétaires des concessions minières ont été signés avec lui et lui ont permis
                de donner naissance à la société PALOTEM Sarl, en date du 13 novembre 2015 pour une durée de 99 ans.
                <br />
                <br />

                Il importe de signaler que l’Associé unique Mr. Michel KADAKALA MUDESA SANGARA n’en est pas resté là.
                Dans ses multiples contacts avec l’extérieur, il a été aussi fort sollicité pour les produits agricoles
                exportables tels que le CAFE, le CACAO, le TOURNESOL, l’HUILE DE PALME, le BOIS etc.
                <br />
                <br />

                Dans le souci majeur d’élargir sa vision à plus d’activités possibles, l’Associé unique Mr. KADAKALA MUDESA SANGARA
                a ouvert au sein de la société PALOTEM, le Département de Génie Civil, Bâtiments et Expertises Immobilières pour
                non seulement les études, mais aussi les constructions diverses et réhabilitation des chantiers.
                PALOTEM pour dire « la Patience est la Longueur du Temps » est une société unipersonnelle régie par l’Acte uniforme
                relative au droit des activités commerciales et du groupement d’intérêt économique ayant pour objet acheter et vendre...,
                importer et exporter mais aussi, rentrer dans toutes les activités de nature à favoriser son développement pourvu
                que ça cadre avec son objet social.
                C’est une société beaucoup plus élargie et sans frontière car déjà représentée à Kampala (Uganda), à Hong Kong etc...
                dont le siège est sis au n°03, Av. de la frontière, Commune de Goma en RD. Congo.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white bg-orange-600 hover:bg-gray-100 hover:text-orange-600"
              >
              Lire plus
              <ArrowRight className="w-4 h-4" />
            </Link>
            </div>
          </section> <br />
          <Aboutsuite/>
          <br />
          <Corevalue />
          <BusinessM />
      </div>
      <div className="border-b border-gray-300/50">
        <Mining />
      </div>
      <Team />
    </section>
  )
}
