'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

interface Article {
  id: string;
  title: string;
  image?: string; // ✅ changer cover → image
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function RecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const q = query(
          collection(db, "articles"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];

        setArticles(data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticles();
  }, []);

  const formatDate = (timestamp?: { seconds: number }) => {
    if (!timestamp) return "Date inconnue";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-500">Chargement des articles...</p>
      </div>
    );
  }

  return (
    <div className=" bg-white border border-gray-200  w-[41.8rem] rounded-2xl p-8">
      <p className="text-lg font-semibold text-gray-800 mb-6">
        <span className="text-orange-400">•</span> Articles récemment publiés
      </p>

      {articles.length === 0 ? (
        <p className="text-gray-500">Aucun article publié récemment.</p>
      ) : (
        <ul className="space-y-2">
          {articles.map((article) => (
            <li key={article.id} className="flex items-center gap-8 bg-gray-100 p-3 rounded-2xl group border border-gray-200">
              {article.image ? (
                <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded shrink-0">
                  N/A
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium group-hover:underline">{article.title}</p>
                <div className="text-[10.9px] text-gray-500 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {formatDate(article.createdAt)}
                </div>
              </div>

              <Link
                href={`/blog/${article.id}`}
                className="text-sm text-center justify-center py-2 px-3 items-center text-blue-600 flex transition duration-200 gap-2 bg-blue-100 rounded-lg hover:bg-blue-200"
                target="_blank"
              >
                Voir plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
