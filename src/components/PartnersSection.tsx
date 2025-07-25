"use client";

import Image from "next/image";

const partners = [
  "/logos/partner1.png",
  "/logos/partner2.png",
  "/logos/partner3.png",
  "/logos/partner4.png",
  "/logos/partner5.png",
  "/logos/partner6.png",
];

export default function PartnersSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-center mb-12">
          <p className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">PARTNERSHIP</p>
          <h2 className="text-4xl font-bold text-gray-800">
            Trusted by <span className="font-light text-gray-700">Our Partners</span>
          </h2>
          <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            We have partnered with organizations to ensure that we provide holistic services to our clients.<br />
            These organizations include :
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll whitespace-nowrap gap-16">
            {partners.concat(partners).map((src, index) => (
              <div key={index} className="relative w-32 h-16 flex-shrink-0">
                <Image
                  src={src}
                  alt={`partner-${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
