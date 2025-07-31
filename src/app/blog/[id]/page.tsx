import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelativeTime from "@/components/RelativeTime";

// Définissez explicitement l'interface pour les props
interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: BlogPostPageProps) {
  const docRef = doc(db, "articles", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return notFound();
  }

  const article = docSnap.data() as {
    title: string;
    category: string;
    description: string;
    content: string;
    image: string;
    createdAt?: { toDate: () => Date };
  };

  const date = article.createdAt?.toDate?.() || new Date();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover rounded-xl shadow"
          priority // Ajouté pour améliorer le LCP
        />
      </div>

      <div className="mb-4">
        <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded">
          {article.category}
        </span>
        <p className="text-gray-500 text-sm mt-1">
          Publié <RelativeTime date={date} />
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {article.content || article.description}
      </p>
    </div>
  );
}