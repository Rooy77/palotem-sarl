"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const slides = [
  "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg",
  "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg",
  "https://images.pexels.com/photos/105377/pexels-photo-105377.jpeg",
];

const captions = [
  <>
    <span className="barlow-condensed-regular">PALOTEM Sarl, l’excellence </span>
    <br />
    congolaise au service de l’Afrique
  </>,
  <>
    <span className="barlow-condensed-regular">Des solutions fiables </span>
    pour un développement durable
  </>,
  <>
    <span className="barlow-condensed-regular">Présents en RDC, </span>
    <br />
    en Afrique et à l’international
  </>,
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`slide-${index}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-600/50 flex items-center justify-center text-white text-center px-4">
            <div className="max-w-4xl font-semibold">
              <h2
                className="text-[2rem] sm:text-[5vh] md:text-[7vh] lg:text-[8vh] leading-tight"
              >
                {captions[index]}
              </h2>
            </div>
          </div>
        </div>
      ))}

      {/* Flèches - masquées sur petits écrans */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 items-center justify-center rounded-full hover:bg-black/70 transition z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 items-center justify-center rounded-full hover:bg-black/70 transition z-20"
      >
        &#10095;
      </button>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
