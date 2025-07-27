'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Reliability',
    //description: 'To be the Premier (first) Choice for the Clients in DRCONGO, AFRICA and whole world.',
  },
  {
    title: 'Quality service',
    //description: 'To provide the most important exquisite services for clients that make them have marketable experience within Africa and Worldwide.',
  },
  {
    title: 'Integrity',
    //description: 'At Society PALOTEM Sarl, we build every relationship and every project around three core principles: Reliability, Quality, and Integrity.',
  },
]

export default function CorevPage() {
  return (
    <section className="">
        <div className='space-y-6 mb-6 items-center justify-center text-center'>
            <br />
            <br />
            <p className="uppercase text-sm tracking-widest text-orange-600 barlow-condensed-regular">core value</p>
            <h1 className="text-4xl font-bold text-gray-700">
                <span className="block font-light text-gray-700">Our Values</span>
               
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
                
                </p>
            </motion.div>
            ))}
        </div>
    </section>
  )
}
