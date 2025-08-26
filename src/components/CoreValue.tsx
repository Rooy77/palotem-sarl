'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Fiabilité',
    //description: 'Être le premier (choix numéro un) pour les clients en RDC, en Afrique et dans le monde entier.',
  },
  {
    title: 'Service de qualité',
    //description: 'Fournir les services les plus importants et exquis aux clients afin qu’ils vivent une expérience valorisante en Afrique et dans le monde.',
  },
  {
    title: 'Intégrité',
    //description: 'Chez Société PALOTEM Sarl, nous construisons chaque relation et chaque projet autour de trois principes fondamentaux : Fiabilité, Qualité et Intégrité.',
  },
]

export default function CorevPage() {
  return (
    <section className="">
        <div className='space-y-6 mb-6 items-center justify-center text-center'>
            <br />
            <br />
            <h3 className="uppercase mb-3 text-sm tracking-widest text-orange-600 barlow-condensed-regular">valeurs fondamentales</h3>
            <h1 className="text-4xl font-bold text-gray-700">
                <span className="block font-light text-gray-700">Nos Valeurs</span>
               
            </h1>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((values, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-white p-6 border border-gray-100 transition"
            >
                <h2 className="text-sm md:text-2xl font-semibold text-gray-800 mb-2 uppercase">
                {values.title}
                </h2> 
                <p className="text-sm md:text-sm text-gray-600 font-light leading-relaxed">
                  {/* Description ici si besoin */}
                </p>
            </motion.div>
            ))}
        </div>
    </section>
  )
}
