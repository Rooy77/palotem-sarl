"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  name: string;
  image: string;
  description: string;
  category: string;
};

const products: Product[] = [
  {
    name: "Cathodes de cuivre",
    image: "/img/products/Cuivre.jpg",
    description: "Cuivre raffiné pour diverses industries.",
    category: "Produits miniers"
  },
  {
    name: "Or",
    image: "/img/products/or.jpg",
    description: "Or pur pour l’exportation et l’investissement.",
    category: "Produits miniers"
  },
  {
    name: "Diamant",
    image: "/img/products/diamant.jpg",
    description: "Diamants bruts de qualité exceptionnelle.",
    category: "Produits miniers"
  },
  {
    name: "Acajou (Mahogany)",
    image: "/img/products/Mahogany.jpg",
    description: "Bois précieux pour meubles et décoration.",
    category: "Arbres rares"
  },
  {
    name: "Iroko",
    image: "/img/products/Iroko.jpg",
    description: "Alternative durable au teck.",
    category: "Arbres rares"
  },
  {
    name: "Sapelli",
    image: "/img/products/Sapelli.jpg",
    description: "Bois africain très prisé pour l’ameublement.",
    category: "Arbres rares"
  },
  {
    name: "Café",
    image: "/img/products/Café.jpeg",
    description: "Café Arabica de haute altitude.",
    category: "Produits agricoles"
  },
  {
    name: "Cacao",
    image: "/img/products/Cacao.jpg",
    description: "Cacao brut pour l’industrie chocolatière.",
    category: "Produits agricoles"
  },
  {
    name: "Huile végétale",
    image: "/img/products/Huile.jpg",
    description: "Huile végétale naturelle et bio.",
    category: "Produits agricoles"
  },
  {
    name: "Ciment",
    image: "/img/products/Ciment.jpg",
    description: "Ciment de qualité supérieure.",
    category: "Matériaux de construction"
  },
  {
    name: "Fer à béton",
    image: "/img/products/fer.jpg",
    description: "Fer à béton pour infrastructures durables.",
    category: "Matériaux de construction"
  },
  {
    name: "Matériaux & outils",
    image: "/img/products/all.jpeg",
    description: "Matériaux de construction et outils variés.",
    category: "Matériaux de construction"
  },
];

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section>
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
          <Image
            src="/img/page-title.jpg"
            fill
            className="object-cover"
            sizes="100vw"
            alt=""
          />
          <div className="absolute bg-gray-800/30 inset-0 flex items-center justify-left text-white text-center">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="max-w-3xl flex md:text-5xl font-semibold text-xl cursor-pointer">
                <div className="col col-xs-12">
                  <h2>Nos Produits</h2>
                  <ol className="text-sm text-center font-light justify-center flex space-x-2">
                    <li className="text-orange-500">
                      <a href="#">Accueil</a> {'>'}
                    </li>
                    <li>Produits</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-orange-500 barlow-condensed-regular uppercase tracking-widest text-sm">
            produits
          </p>
          <h2 className="text-4xl font-bold text-gray-800">
            Society PALOREM Sarl<br />
            <span className="font-light text-gray-700">nos produits</span>
          </h2>
          <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            En tant qu’entreprise entrepreneuriale enracinée dans la communauté,
            Royal Import Export Sarl crée de la valeur pour les parties
            prenantes à travers une stratégie d’investissement durable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-[20px] font-medium text-gray-700">{product.name}</h3>
                <div className="border-b-[2px] mt-2 border-orange-500 max-w-max text-left">
                  <p className="text-[11.5px] font-medium text-orange-500">{product.category}</p>
                </div>
                <p className="mt-4 text-gray-600 text-[13px] font-light max-w-2xl mx-auto">{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="bg-white max-w-lg w-full p-6 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-gray-100 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-1 font-normal text-2xl bg-orange-500 h-8 w-8 transition cursor-pointer"
                  aria-label="Fermer"
                >
                  ×
                </button>
                <h2 className="text-[24px] font-medium text-gray-700 mb-4">{selectedProduct.name}</h2>
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={600}
                  height={400}
                  className="mb-4 object-cover w-full"
                />
                <p className="text-gray-700 mb-2 text-[15px]">
                  <strong>Catégorie :</strong>{" "}
                  <span className="border-b-[2px] mt-2 border-orange-500 max-w-max text-left text-orange-500">
                    {selectedProduct.category}
                  </span>
                </p>
                <p className="mt-4 text-gray-600 text-[14px] font-light max-w-2xl mx-auto">
                  {selectedProduct.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
