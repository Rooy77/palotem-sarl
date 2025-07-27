"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Fonction locale pour créer un slug propre
function slugifyLocal(str: string): string {
  return str
    .normalize("NFD") // décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // supprime caractères spéciaux
    .replace(/\s+/g, "-") // remplace espaces par tirets
    .replace(/-+/g, "-"); // supprime tirets doublés
}

type Product = {
  name: string;
  image: string;
  description: string;
  category: string;
};

const products: Product[] = [
    {
        name: "Copper Cathods",
        image: "/img/mining/copper.jpg",
        description: "Cuivre raffiné pour diverses industries.",
        category: "Produits miniers"
    },
  { name: "Or", image: "/img/mining/gold.jpg", description: "Or pur pour l’exportation et l’investissement.", category: "Produits miniers" },
  { name: "Diamant", image: "/img/mining/diamond.jpg", description: "Diamants bruts de qualité exceptionnelle.", category: "Produits miniers" },
  { name: "Mahogany", image: "/img/wood/mahogany.jpg", description: "Bois précieux pour meubles et décoration.", category: "Arbres rares" },
  { name: "Iroko", image: "/img/wood/iroko.jpg", description: "Alternative durable au teck.", category: "Arbres rares" },
  { name: "Sapelli", image: "/img/wood/sapelli.jpg", description: "Bois africain très prisé pour l’ameublement.", category: "Arbres rares" },
  { name: "Café", image: "/img/agriculture/cafe.jpg", description: "Café Arabica de haute altitude.", category: "Produits Agricoles" },
  { name: "Cacao", image: "/img/agriculture/cacao.jpg", description: "Cacao brut pour l’industrie chocolatière.", category: "Produits Agricoles" },
  { name: "Huile", image: "/img/agriculture/huile.jpg", description: "Huile végétale naturelle et bio.", category: "Produits Agricoles" },
  { name: "Ciment", image: "/img/construction/ciment.jpg", description: "Ciment de qualité supérieure.", category: "Matériaux de construction" },
  { name: "Fer à béton", image: "/img/construction/fer.jpg", description: "Fer à béton pour infrastructures durables.", category: "Matériaux de construction" },
];

const ITEMS_PER_PAGE = 6;

export default function Produits() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Produits</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {visibleProducts.map((product) => {
          const slug = slugifyLocal(product.name);
          return (
            <div key={product.name} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <Image src={product.image} alt={product.name} width={400} height={250} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <Link href={`/produits/${slug}`}>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    En savoir plus
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-400 rounded hover:bg-gray-400 disabled:opacity-50"
          aria-label="Page précédente"
        >
          <ChevronLeft size={24} />
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          aria-label="Page suivante"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
