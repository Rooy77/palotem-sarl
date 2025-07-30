import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelativeTime from "@/components/RelativeTime";

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  content: string; // tu peux ajouter ce champ pour le contenu complet
  createdAt: import("firebase/firestore").Timestamp | Date | undefined;
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return notFound();

  const data = docSnap.data() as Omit<Article, "id">;
  const article: Article = {
    id: docSnap.id,
    ...data,
  };

  const date =
    article.createdAt instanceof Date
      ? article.createdAt
      : article.createdAt
      ? (article.createdAt as import("firebase/firestore").Timestamp).toDate()
      : new Date();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover rounded-xl shadow"
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
