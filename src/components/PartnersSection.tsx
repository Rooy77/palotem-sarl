"use client";

import Image from "next/image";

const partners = [
  { src: "/img/port.jpg", label: "Logistique portuaire", color: "#FF5733" },
  { src: "/img/port.jpg", label: "Import / Export", color: "#33C1FF" },
  { src: "/img/port.jpg", label: "Énergie", color: "#28A745" },
  { src: "/img/port.jpg", label: "Construction & BTP", color: "#FFC107" },
  { src: "/img/port.jpg", label: "Consulting professionnel", color: "#8E44AD" },
  { src: "/img/port.jpg", label: "Transport & Transit", color: "#E74C3C" },
];

export default function PartnersSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-center mb-12">
          <p className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">
            PARTENARIAT
          </p>
          <h2 className="text-4xl font-bold text-gray-800">
            Recommandé par <span className="font-light text-gray-700">nos partenaires</span>
          </h2>
          <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            Nous avons établi des partenariats avec plusieurs organisations afin d’offrir un service complet à nos clients.
            Ces organisations comprennent notamment :
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll whitespace-nowrap gap-16">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-40 flex-shrink-0"
              >
                <div className="relative w-32 h-16">
                  <Image
                    src={partner.src}
                    alt={`partner-${index}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p
                  className="text-[12px] mt-2 font-light"
                  style={{ color: partner.color }}
                >
                  {partner.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
