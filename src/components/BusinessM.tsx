import Image from "next/image"


export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid mb-9 md:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <div className="space-y-6">
                <p className="uppercase text-sm tracking-widest text-orange-600 barlow-condensed-regular">BUSINESS MODEL</p>
                <h1 className="text-4xl font-bold text-gray-700">
                    <span className="block font-light text-gray-700">Our Business model is</span>
                    on that emphasizes
                </h1>

                <div className="w-20 h-1 bg-orange-500 rounded"></div>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Our Business model is on that emphasizes on a finely integration of General Business, ExportImport and process.
                    <br />
                    <br />
                    PALOTEM COMPANY LIMITED offers the best Cost-effective solutions with uncompromising on quality.
                    We are committed to identify cutting edge creative solutions that are intuitive and economical intelligent and bringing those solutions to our Clients.

                </p>
            </div>
             {/* Image */}
            <div className="">
                <Image
                    src="/img/business.jpg"
                    alt="Logo Palotem"
                    width={430}
                    height={430}
                    className=""
                />
            </div>
        </div>
    </section>
  )
}
