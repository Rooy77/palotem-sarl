"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6"; // Ajout LinkedIn

const teamMembers = [
  {
    name: "MICHEL SANGARA",
    role: "CEO & President",
    desc: "Leads the company's strategic vision and overall business development.",
    img: "/img/glod.jpg",
    facebook: "#",
    twitter: "https://x.com/alex_nsimba",
    linkedin: "#",
  },
  {
    name: "MOISE MPINDA",
    role: "Administrator Director",
    desc: "Supervises administrative operations with internal processes.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/claire.mbuyi",
    twitter: "https://x.com/claire_mbuyi",
    linkedin: "#",
  },
  {
    name: "ANGELUS MIRINDI",
    role: "Commercial Director",
    desc: "Oversees commercial strategies and client relationship development.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/jules.mavungu",
    twitter: "https://x.com/jules_code",
    linkedin: "#",
  },
  {
    name: "JUSTIN YAMBA",
    role: "Spiritual Advisor / Legal Counsel",
    desc: "Provides legal guidance and spiritual insight for corporate ethics and culture.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/sarah.tshiala",
    twitter: "https://x.com/sarah_marketing",
    linkedin: "#",
  },
  {
    name: "JACQUES NKINZO",
    role: "Agronomist Manager",
    desc: "Manages agricultural development initiatives and agronomic research.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/kevin.mbayo",
    twitter: "https://x.com/kevin_uiux",
    linkedin: "#",
  },
  {
    name: "TATIANA IKOBYA",
    role: "Secretary Manager",
    desc: "Handles internal communication, organization and administrative tasks.",
    img: "/img/glod.jpg",
    facebook: "https://facebook.com/linda.kanku",
    twitter: "https://x.com/linda_projects",
    linkedin: "#",
  },
  {
    name: "AZIZ JUMA",
    role: "Automobile Manager",
    desc: "Oversees the company's automotive operations and transport logistics.",
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
          <p className="text-orange-500 uppercase text-sm">Our Team</p>
          <h2 className="text-4xl font-bold text-gray-800">
            Talented professionals <br />
            <span className="font-light text-gray-700">driven by our values</span>
          </h2>
          <div className="mt-4 w-12 h-1 bg-orange-500 rounded mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            The team at Society PALOTEM Sarl Sarl embodies commitment, competence, and diversity.
            Each member contributes passionately to the company’s vision, combining professional
            expertise, a strong sense of responsibility, and dedication to the values that define us.
            Together, we are building a strong organization focused on innovation and excellence.
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