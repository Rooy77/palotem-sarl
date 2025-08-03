"use client";

import Image from "next/image";
import ContactF from "@/components/contactF";

export default function Contact() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Image avec contenu superposé */}
        <div className="relative h-[500px] w-full">
          <Image
            src="https://images.pexels.com/photos/5647584/pexels-photo-5647584.jpeg"
            alt="Contact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 p-6 text-center shadow-lg max-w-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Prenons contact</h2>
              <p className="text-sm text-gray-600 mt-2">
                Nous serions ravis de vous lire. Envoyez-nous un message et nous vous répondrons dès que possible.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div>
          <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">Contactez-nous</h3>
          <h2 className="text-gray-600 text-5xl mb-6 font-medium">
            <span className="font-light">Vous pouvez</span> <br /> nous contacter, <br /> si vous avez une question.
          </h2>
          <ContactF />
        </div>
      </div>
    </section>
  );
}
