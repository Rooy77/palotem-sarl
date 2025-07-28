"use client";

import Image from "next/image";
import ContactF from "@/components/contactF";
export default function Contact() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Image side with overlay content */}
        <div className="relative h-[500px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1160"
            alt="Contact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 p-6 text-center shadow-lg max-w-sm">
              <h2 className="text-2xl font-bold text-gray-900"> Lets Get in Touch</h2>
              <p className="text-sm text-gray-600 mt-2">
                We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Contact form side */}
        <div>
          <h3 className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">Contact Us</h3>
          <p className="text-gray-600 text-5xl mb-6 barlow-condensed-medium">
            <span className="barlow-condensed-light"> You can </span> contact us, <br /> if you have any query.
          </p>
          <ContactF />
        </div>
      </div>
    </section>
  );
}
