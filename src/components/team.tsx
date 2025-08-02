"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6"; // Ajout LinkedIn

const teamMembers = [
  {
    name: "MICHEL SANGARA",
    role: "PDG & Président",
    desc: "Dirige la vision stratégique de l'entreprise et le développement global des affaires.",
    img: "/img/glod.jpg",
    facebook: "#",
    twitter: "https://x.com/alex_nsimba",
    linkedin: "#",
  },
  {
    name: "MOISE MPINDA",
    role: "Directeur Administratif",
    desc: "Supervise les opérations administratives et les processus internes.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/claire.mbuyi",
    twitter: "https://x.com/claire_mbuyi",
    linkedin: "#",
  },
  {
    name: "ANGELUS MIRINDI",
    role: "Directeur Commercial",
    desc: "Supervise les stratégies commerciales et le développement des relations clients.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/jules.mavungu",
    twitter: "https://x.com/jules_code",
    linkedin: "#",
  },
  {
    name: "JUSTIN YAMBA",
    role: "Conseiller Spirituel / Juridique",
    desc: "Fournit des conseils juridiques et spirituels pour l’éthique et la culture d’entreprise.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/sarah.tshiala",
    twitter: "https://x.com/sarah_marketing",
    linkedin: "#",
  },
  {
    name: "JACQUES NKINZO",
    role: "Responsable Agronome",
    desc: "Gère les initiatives de développement agricole et les recherches agronomiques.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/kevin.mbayo",
    twitter: "https://x.com/kevin_uiux",
    linkedin: "#",
  },
  {
    name: "TATIANA IKOBYA",
    role: "Responsable Secrétariat",
    desc: "Gère la communication interne, l'organisation et les tâches administratives.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/linda.kanku",
    twitter: "https://x.com/linda_projects",
    linkedin: "#",
  },
  {
    name: "AZIZ JUMA",
    role: "Responsable Automobile",
    desc: "Supervise les opérations automobiles et la logistique des transports de l'entreprise.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/david.kalonji",
    twitter: "https://x.com/david_devops",
    linkedin: "#",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-gray-100 py-20" id="equipe">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-orange-500 barlow-condensed-regular uppercase text-sm">Notre Équipe</p>
          <h2 className="text-4xl font-bold text-gray-800">
            Des professionnels talentueux <br />
            <span className="font-light text-gray-700">portés par nos valeurs</span>
          </h2>
          <div className="mt-4 w-12 h-1 bg-orange-500 rounded mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            L’équipe de la Société PALOTEM Sarl incarne l&apos;engagement, la compétence et la diversité.
            Chaque membre contribue avec passion à la vision de l&apos;entreprise, combinant expertise
            professionnelle, sens aigu des responsabilités et attachement aux valeurs qui nous définissent.
            Ensemble, nous bâtissons une organisation forte, tournée vers l&apos;innovation et l&apos;excellence.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-4 py-6 text-center">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-orange-500 text-sm sm:text-sm">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">{member.desc}</p>

                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-orange-500 border hover:bg-orange-500 hover:text-gray-100 text-orange-500 rounded-full p-2 transition-all duration-300"
                  >
                    <FaFacebookF size={15} />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-orange-500 border hover:bg-orange-500 hover:text-gray-100 text-orange-500 rounded-full p-2 transition-all duration-300"
                  >
                    <FaXTwitter size={15} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-orange-500 border hover:bg-orange-500 hover:text-gray-100 text-orange-500 rounded-full p-2 transition-all duration-300"
                  >
                    <FaLinkedinIn size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
