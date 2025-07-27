'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: '01. MISSION',
    description: 'To be the Premier (first) Choice for the Clients in DRCONGO, AFRICA and whole world.',
  },
  {
    title: '02. VISION',
    description: 'To provide the most important exquisite services for clients that make them have marketable experience within Africa and Worldwide.',
  },
  {
    title: '03. NOS PILIERS',
    description: 'At Society PALOTEM Sarl, we build every relationship and every project around three core principles: Reliability, Quality, and Integrity.',
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
