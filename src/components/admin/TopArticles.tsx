'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Article {
  id: string;
  title: string;
  image: string;
  views: number;
}

export default function TopArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [minViewsInTop5, setMinViewsInTop5] = useState<number | null>(null);

  useEffect(() => {
    const fetchTopArticles = async () => {
      const q = query(collection(db, "articles"), orderBy("views", "desc"), limit(5));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Article, 'id'>),
      })) as Article[];

      setArticles(data);

      if (data.length === 5) {
        // Le seuil est le nombre de vues du 5e article
        setMinViewsInTop5(data[4].views);
      } else if (data.length > 0) {
        // Si moins de 5 articles, on prend le minimum parmi eux
        const minViews = Math.min(...data.map(a => a.views));
        setMinViewsInTop5(minViews);
      } else {
        // Pas d'article
        setMinViewsInTop5(null);
      }
    };

    fetchTopArticles();
  }, []);

  return (
    <div className="mt-10 bg-white border border-gray-200  w-[50rem] rounded-xl p-6">
      <p className="text-lg font-semibold text-gray-800">Top 5 Articles les plus lus</p>

      {minViewsInTop5 !== null && (
        <p className="mb-4 text-sm text-gray-600">
          Pour entrer dans le Top 5, un article doit avoir au moins <strong>{minViewsInTop5}</strong> vues.
        </p>
      )}
      

      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative rounded overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium group-hover:underline">{article.title}</p>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views} vues
              </div>
            </div>
            <Link
              href={`/blog/${article.id}`}
              className="text-sm text-blue-600 hover:underline"
              target="_blank"
            >
              Voir
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
