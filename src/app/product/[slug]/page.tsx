import { notFound } from "next/navigation";
import Image from "next/image";

// Fonction locale pour créer un slug propre
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

const products = [
  { name: "Copper Cathods", image: "/images/mining/copper.jpg", description: "Cuivre raffiné pour diverses industries.", category: "Produits miniers" },
  { name: "Or", image: "/images/mining/gold.jpg", description: "Or pur pour l’exportation et l’investissement.", category: "Produits miniers" },
  { name: "Diamant", image: "/images/mining/diamond.jpg", description: "Diamants bruts de qualité exceptionnelle.", category: "Produits miniers" },
  { name: "Mahogany", image: "/images/wood/mahogany.jpg", description: "Bois précieux pour meubles et décoration.", category: "Arbres rares" },
  { name: "Iroko", image: "/images/wood/iroko.jpg", description: "Alternative durable au teck.", category: "Arbres rares" },
  { name: "Sapelli", image: "/images/wood/sapelli.jpg", description: "Bois africain très prisé pour l’ameublement.", category: "Arbres rares" },
  { name: "Café", image: "/images/agriculture/cafe.jpg", description: "Café Arabica de haute altitude.", category: "Produits Agricoles" },
  { name: "Cacao", image: "/images/agriculture/cacao.jpg", description: "Cacao brut pour l’industrie chocolatière.", category: "Produits Agricoles" },
  { name: "Huile", image: "/images/agriculture/huile.jpg", description: "Huile végétale naturelle et bio.", category: "Produits Agricoles" },
  { name: "Ciment", image: "/images/construction/ciment.jpg", description: "Ciment de qualité supérieure.", category: "Matériaux de construction" },
  { name: "Fer à béton", image: "/images/construction/fer.jpg", description: "Fer à béton pour infrastructures durables.", category: "Matériaux de construction" },
];

export async function generateStaticParams() {
  return products.map(product => ({
    slug: slugifyLocal(product.name),
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(
    (p) => slugifyLocal(p.name) === params.slug
  );

  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-500 italic mb-2">{product.category}</p>
      <Image
        src={product.image}
        alt={product.name}
        width={800}
        height={500}
        className="rounded-xl mb-6"
      />
      <p className="text-xl text-gray-700">{product.description}</p>
    </div>
  );
}
