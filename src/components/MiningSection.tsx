"use client";

import Image from "next/image";

const reasons = [
  {
    title: "Personnel expérimenté et formé",
    image: "https://images.pexels.com/photos/8547341/pexels-photo-8547341.jpeg",
    description:
      "Notre personnel expérimenté est formé pour fournir un service de relation client de qualité, adapté aux besoins du client.",
  },
  {
    title: "Approche centrée sur le client",
    image: "https://images.pexels.com/photos/8867252/pexels-photo-8867252.jpeg",
    description:
      "Nous comprenons que chaque client est unique, nous nous efforçons de comprendre les objectifs du service demandé et de fournir un service personnalisé qui aidera à atteindre les besoins ou objectifs du client.",
  },
  {
    title: "Communication multilingue",
    image: "https://images.pexels.com/photos/9487622/pexels-photo-9487622.jpeg",
    description:
      "Notre équipe est composée de personnels multilingues maîtrisant les principales langues des Nations Unies, ce qui leur permet de communiquer facilement avec les clients qu'ils assistent.",
  },
];

export default function WhyUsPage() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Disposition des images à gauche */}
        <div className="flex gap-4 justify-center">
          <div className="relative mt-6 w-40 h-50">
            <Image
              src={reasons[0].image}
              alt={reasons[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-[-3.35rem] left-0 w-full h-10 bg-none border-b-4 border-t-4 border-orange-500" />
            <div className="absolute bottom-[-4.5rem] left-0 w-full h-10 bg-none border-b-4 border-t-4 border-orange-500" />
          </div>
          <div className="block space-x-4 items-center">
            <div className="relative w-40 h-36 mb-4">
              <Image
                src={reasons[1].image}
                alt={reasons[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-40 h-36">
              <Image
                src={reasons[2].image}
                alt={reasons[2].title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Disposition du texte à droite */}
        <div>
          <div className="mb-6">
            <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">Pourquoi choisir</h3>
            <h2 className="text-4xl font-bold text-gray-800">
              Société Palotem <span className="font-light text-gray-700">Sarl</span>
            </h2>
            <div className="mt-4 w-12 h-1 rounded bg-orange-500" />
          </div>
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <p key={index} className="text-gray-700 text-sm leading-relaxed">
                <strong>{reason.title}</strong> <br /> <span className="font-light">{reason.description}</span> 
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
