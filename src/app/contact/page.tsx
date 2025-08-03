'use client'
import Image from "next/image";
import ContactF from "@/components/contactF";

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
                  <h2>Contact</h2>
                  <ol className="text-sm text-center font-light justify-center flex space-x-2">
                    <li className="text-orange-500"><a href="#">Accueil</a> &gt;</li>
                    <li>Contact</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">Contactez-nous</h3>
            <h2 className="text-gray-600 text-5xl mb-6 font-medium">
              <span className="font-light">Vous pouvez</span> <br /> nous contacter, <br /> si vous avez une question.
            </h2>
            <ContactF />
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-4 bg-orange-500 p-8 h-auto w-auto">
              {/* Email de contact */}
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <div>
                  <h3 className="text-md font-medium text-foreground">Email</h3>
                  <a href="mailto:societepalotemgroup@gmail.com" className="text-sm font-light text-muted-foreground hover:text-primary transition-colors break-all">
                    societepalotemgroup@gmail.com
                  </a>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div>
                  <h3 className="text-md font-medium text-foreground">Téléphone (Support WhatsApp)</h3>
                  <a href="tel:+243979370937" className="text-sm font-light text-muted-foreground hover:text-primary transition-colors break-all">
                    +243 979 370 937 | +243 970 805 367
                  </a>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <h3 className="text-md font-medium text-foreground">Bureau (Sur Rendez-vous)</h3>
                  <p className="text-sm font-light text-muted-foreground hover:text-primary transition-colors break-all">
                    <span className="font-medium">Adresse siège : </span>Goma, 03 Av. de la Frontière, Q. Katindo <br />
                    <span className="font-medium">Bureau L&apos;shi : </span>96 Av. du Cadastre, Q. Salama, C. L&apos;shi <br />
                    <span className="font-medium">Adresse :</span> Lubumbashi • Goma • Bukavu • Kinshasa / RD. Congo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
