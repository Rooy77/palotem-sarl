// app/product/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";

type Product = {
  name: string;
  image: string;
  description: string;
  category: string;
};

const products: Product[] = [
  { name: "Copper Cathods", image: "/img/glod.jpg", description: "Cuivre raffiné pour diverses industries.", category: "Produits miniers" },
  { name: "Or", image: "/img/glod.jpg", description: "Or pur pour l’exportation et l’investissement.", category: "Produits miniers" },
  { name: "Diamant", image: "/img/glod.jpg", description: "Diamants bruts de qualité exceptionnelle.", category: "Produits miniers" },
  { name: "Mahogany", image: "/img/glod.jpg", description: "Bois précieux pour meubles et décoration.", category: "Arbres rares" },
  { name: "Iroko", image: "/img/glod.jpg", description: "Alternative durable au teck.", category: "Arbres rares" },
  { name: "Sapelli", image: "/img/glod.jpg", description: "Bois africain très prisé pour l’ameublement.", category: "Arbres rares" },
  { name: "Café", image: "/img/glod.jpg", description: "Café Arabica de haute altitude.", category: "Produits Agricoles" },
  { name: "Cacao", image: "/img/glod.jpg", description: "Cacao brut pour l’industrie chocolatière.", category: "Produits Agricoles" },
  { name: "Huile", image: "/img/glod.jpg", description: "Huile végétale naturelle et bio.", category: "Produits Agricoles" },
  { name: "Ciment", image: "/img/glod.jpg", description: "Ciment de qualité supérieure.", category: "Matériaux de construction" },
  { name: "Fer à béton", image: "/img/glod.jpg", description: "Fer à béton pour infrastructures durables.", category: "Matériaux de construction" },
];

// Même fonction que dans la page principale
function slugifyLocal(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(
    (p) => slugifyLocal(p.name) === params.slug
  );

  if (!product) {
    return notFound();
  }

  return (
    <div className="px-6 md:px-20 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <Image src={product.image} alt={product.name} width={800} height={450} className="rounded-xl mb-6" />
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      <p className="text-sm text-gray-500">Catégorie : {product.category}</p>
    </div>
  );
}
