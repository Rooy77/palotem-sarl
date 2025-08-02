"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RelativeTime from "@/components/RelativeTime";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  createdAt: import("firebase/firestore").Timestamp;
  content: string;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...(docSnap.data() as Omit<Article, "id">) });
      }

      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-center py-20">Chargement...</p>;
  if (!article) return <p className="text-center py-20">Article introuvable.</p>;

  return (
    <section>
      {/* Bannière */}
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Image
            src="/img/blog-b.jpg"
            fill
            className="object-cover"
            alt=""
            sizes="100vw"
          />
          <div className="absolute bg-gray-800/40 inset-0 flex items-center text-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-semibold">{article.title}</h2>
                <ol className="text-sm font-light flex space-x-2 mt-2 text-center items-center justify-center">
                  <li className="text-orange-500">
                    <Link href="/">Accueil</Link> &gt;
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link> &gt;
                  </li>
                  <li className="text-white">{article.title}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-sm text-orange-500 border-orange-500/20 rounded-full border bg-orange-100">
            {article.category}
          </span>
          <p className="text-sm text-gray-500">
           • Publié <RelativeTime date={article.createdAt.toDate()} />
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>

        <p className="text-gray-700 mb-6">{article.description}</p>

        <div className="prose prose-orange max-w-none">
          {/* Affiche le contenu complet en HTML s’il est stocké ainsi dans Firebase */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </section>
  );
}
