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
  const [showShareBox, setShowShareBox] = useState(false);
  const [views, setViews] = useState<number>(0); // compteur utilisé

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

  // Suivi de visite
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch("/api/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleId: id }),
        });
      } catch (err) {
        console.error("Erreur suivi visite:", err);
      }
    };

    if (id) trackVisit();
  }, [id]);

  // Récupération des vues
  useEffect(() => {
    const fetchViews = async () => {
      const viewRef = doc(db, "views", id as string);
      const viewSnap = await getDoc(viewRef);

      if (viewSnap.exists()) {
        const data = viewSnap.data();
        setViews(data.count || 0);
      }
    };

    if (id) fetchViews();
  }, [id]);

  if (loading) return <p className="text-center py-20">Chargement...</p>;
  if (!article) return <p className="text-center py-20">Article introuvable.</p>;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section className="font-barlow">
      {/* Bannière */}
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Image src="/img/blog-b.jpg" fill className="object-cover" alt="" sizes="100vw" />
          <div className="absolute bg-gray-800/40 inset-0 flex items-center text-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="max-w-3xl">
                <ol className="text-sm font-light flex space-x-2 mt-2 text-center items-center justify-center">
                  <li className="text-orange-500"><Link href="/">Accueil</Link> &gt;</li>
                  <li><Link href="/blog">Blog</Link> &gt;</li>
                  <li className="text-white underline">{article.title}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image principale */}
      <div className="relative z-20 -mt-24 sm:-mt-28 md:-mt-32 max-w-4xl mx-auto px-4">
        <div className="overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-sm text-orange-500 border-orange-500/20 rounded-full border bg-orange-100">
              {article.category}
            </span>
            <p className="text-[10px] sm:text-sm text-gray-500">
              • <RelativeTime date={article.createdAt.toDate()} /> • {views} vues
            </p>
          </div>

          {/* Partage */}
          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setShowShareBox(!showShareBox)}
              className="hover:text-gray-100 text-gray-400 hover:bg-orange-500 hover:border-orange-500 px-2 py-2 cursor-pointer transition border-gray-300 border-2"
              title="Partager"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-4">
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
              </svg>
            </button>

            {showShareBox && (
              <div className="absolute right-0 top-10 bg-white border border-gray-300 px-1 py-1 flex gap-1 z-50">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:scale-110 transition flex items-center justify-center text-center gap-1 bg-[#dcf8c6] py-3 px-6">
                  <Image src="/logos/Whatsapp.svg" alt="WhatsApp" width={30} height={30} className="w-5 h-5" />
                  <span className="text-[10px] text-[#128c7e] font-bold">WhatsApp</span>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:scale-110 transition flex items-center justify-center text-center gap-1 bg-[#dde7f0] py-3 px-6">
                  <Image src="/logos/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
                  <span className="text-[10px] text-[#0e76a8] font-bold">LinkedIn</span>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:scale-110 transition flex items-center justify-center text-center gap-1 bg-[#dfe1ee] py-3 px-6">
                  <Image src="/logos/Facebook.svg" alt="Facebook" width={20} height={20} className="w-5 h-5" />
                  <span className="text-[10px] text-[#3b5998] font-bold">Facebook</span>
                </a>
              </div>
            )}
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
