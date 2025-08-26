import Image from "next/image"

export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid mb-9 md:grid-cols-2 gap-10 items-center">
        {/* Contenu Texte */}
        <div className="space-y-6">
          <h3 className="text-orange-500 font-regular uppercase mb-3 tracking-widest text-sm">MODÈLE ÉCONOMIQUE</h3>
          <h1 className="text-4xl font-bold text-gray-700">
            <span className="block font-light text-gray-700">Notre modèle économique repose</span>
            sur une mise en valeur
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded"></div>
          <p className="text-gray-600 text-sm font-light leading-relaxed">
            Notre modèle économique repose sur une intégration fine du commerce général, de l’export-import et du traitement des processus.
            <br />
            <br />
            PALOTEM COMPANY LIMITED propose les meilleures solutions rentables sans compromis sur la qualité.
            Nous nous engageons à identifier des solutions innovantes de pointe, intuitives, économiquement intelligentes et à les mettre à la disposition de nos clients.
          </p>
        </div>

        {/* Image */}
        <div className="">
          <Image
            src="/img/business.jpg"
            alt="Logo Palotem"
            width={430}
            height={430}
            className=""
          />
        </div>
      </div>
    </section>
  )
}
