'use client'
import Image from "next/image";
import AutoPage from "@/components/AdminAuth";

export default function ContactSection() {

  return (
    <section>
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
          <Image
            src="/img/page-title.jpg"
            fill
            className="object-cover"
            sizes="100vw"
            alt="Image de fond"
          />
          <div className="absolute bg-gray-800/30 inset-0 flex items-center justify-left text-white text-center">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="max-w-3xl flex md:text-5xl font-semibold text-xl cursor-pointer">
                <div className="col col-xs-12">
                  <h2>Login Admin</h2>
                  <ol className="text-sm text-center font-light justify-center flex space-x-2">
                    <li className="text-orange-500"><a href="#">Accueil</a> &gt;</li>
                    <li>Login</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <AutoPage />
      </div>
    </section>
  );
}
