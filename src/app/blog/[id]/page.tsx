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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <span className="px-3 py-1 text-sm text-orange-500 border-orange-500/20 rounded-full border bg-orange-100">
            {article.category}
          </span>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <p>
              • Publié <RelativeTime date={article.createdAt.toDate()} />
            </p>

            {/* Bouton partager */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Lien copié !");
              }}
              className="flex items-center px-2 py-2 cursor-pointer transition-all border-gray-300 border-2 hover:text-orange-500"
              title="Partager l'article"
            >
               <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                    />
                </svg>

            </button>

            {/* Bouton imprimer */}
            <button
              onClick={() => window.print()}
              className="hover:text-gray-100 text-gray-400 hover:bg-orange-500 px-2 py-2 cursor-pointer transition border-gray-300 border-2"
              title="Imprimer l'article"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-6">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" 
                    />
                </svg>
                
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>

        <p className="text-gray-700 mb-6">{article.description}</p>

        <div className="prose prose-orange max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </section>
  );
}
