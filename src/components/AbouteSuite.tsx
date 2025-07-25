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
    description: 'At PALOTEM Sarl, we build every relationship and every project around three core principles: Reliability, Quality, and Integrity.',
  },
]

export default function ServicesPage() {
  return (
    <section className="">
      <div className="flex gap-8 md:grid-cols-2">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="bg-white  p-6 border border-gray-100 hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm font-light">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
