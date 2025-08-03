"use client";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RelativeTime from "@/components/RelativeTime";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  createdAt: import("firebase/firestore").Timestamp;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      const ref = collection(db, "articles");
      const q = query(ref, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Article, "id">),
      }));
      setArticles(data);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentArticles = articles.slice(startIndex, startIndex + pageSize);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section>
        <div className="relative w-full h-[40vh]">
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
                <Image
                src="/img/blog-b.jpg"
                fill
                className="object-cover"
                sizes="100vw" alt={""}          />
                <div className="absolute bg-gray-800/30 inset-0 flex items-center justify-left text-white text-center">
                <div  className="max-w-6xl mx-auto px-4 py-16">
                    <div className="max-w-3xl flex md:text-5xl font-semibold text-xl cursor-pointer">
                    <div className="col col-xs-12">
                        <h2>Notre Blog</h2>
                        <ol className="text-sm text-center font-light justify-center flex space-x-2">
                            <li className="text-orange-500">
                                <Link href="/">
                                Home
                                </Link>  &gt;
                            </li>
                            <li>Blog</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-center mb-12">
            <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">Blog</h3>
            <h2 className="text-4xl font-semibold text-gray-800">
              <span className="font-light">Nos dernières</span>  actualités
            </h2>
            <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          </div>
            <AnimatePresence mode="wait">
                <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8"
                >
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    currentArticles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/blog/${article.id}`}
                        className="relative group overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <Image
                        src={article.image}
                        alt={article.title}
                        width={700}
                        height={400}
                        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 text-white p-6 flex flex-col justify-end">
                        <div className="self-start px-4 py-2 mb-3 text-orange-500 rounded-md bg-white/10 backdrop-blur-md border border-orange-500/20 text-sm font-medium shadow-sm">
                            {article.category}
                        </div>
                        <h2 className="text-2xl font-bold mt-1">{article.title}</h2>
                        <p className="text-base text-gray-200 mt-2 line-clamp-3">
                            {article.description}
                        </p>
                        <p className="text-sm text-gray-400 mt-4 font-bold">
                            • Publié <RelativeTime date={article.createdAt.toDate()} />
                        </p>
                        </div>
                    </Link>
                    ))
                )}
                </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all ${
                    currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-500 hover:scale-105"
                    }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-semibold">
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all ${
                    currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-500 hover:scale-105"
                    }`}
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
                </div>
            )}
        </div>
    </section>
  );
}
