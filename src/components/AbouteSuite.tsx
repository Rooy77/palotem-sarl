'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: '01. MISSION',
    description:
      'Être le premier choix pour les clients en RDC, en Afrique et dans le monde entier.',
  },
  {
    title: '02. VISION',
    description:
      'Offrir les services les plus exquis et les plus importants aux clients, afin de leur procurer une expérience valorisable sur le marché en Afrique et à l’international.',
  },
  {
    title: '03. NOS PILIERS',
    description:
      'Chez Society PALOTEM Sarl, nous bâtissons chaque relation et chaque projet autour de trois principes fondamentaux : la Fiabilité, la Qualité et l’Intégrité.',
  },
]

export default function ServicesPage() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="bg-white p-6 border border-gray-100 transition"
          >
            <h2 className="text-sm md:text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h2>
            <p className="text-sm md:text-sm text-gray-600 font-light leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
