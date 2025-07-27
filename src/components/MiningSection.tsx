"use client";

import Image from "next/image";

const reasons = [
  {
    title: "Experienced & Trained Staff",
    image: "https://images.pexels.com/photos/8547341/pexels-photo-8547341.jpeg",
    description:
      "Our experience staff is trained to provide quality Client relation service tailored to the need of the client.",
  },
  {
    title: "Client-Centered Approach",
    image: "https://images.pexels.com/photos/8867252/pexels-photo-8867252.jpeg",
    description:
      "We understand each client is unique, we strive to understand the goals of the required service and deliver a personalized service that will help achieve Client's need or objective.",
  },
  {
    title: "Multilingual Communication",
    image: "https://images.pexels.com/photos/9487622/pexels-photo-9487622.jpeg",
    description:
      "Our team composed of multilingual staffs that are fluent in major United Nations Languages hence they can easily connect with Clients they are attending to.",
  },
];

export default function WhyUsPage() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left images layout */}
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

        {/* Right text layout */}
        <div>
          <div className="mb-6">
            <p className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">Why Choose</p>
            <h2 className="text-4xl font-bold text-gray-800">
              Société Palotem<span className="font-light text-gray-700">Sarl</span>
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
