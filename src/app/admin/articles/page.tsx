// app/admin/articles/page.tsx
// app/admin/articles/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Topbar from "@/components/admin/Topbar";
import CreatPost from "@/components/admin/creatPost";
import { CalendarDays, ArrowLeft, ArrowRight, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
  createdAt: Date | null; // ✅ UI = Date JS
}

type EditFormData = {
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
};

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

function ToastNotification({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: number) => void;
}) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`rounded px-4 py-2 shadow-lg text-white ${
              type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={() => removeToast(id)}
            role="alert"
          >
            {message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  // Modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditFormData>();

  // Toast helpers
  const addToast = useCallback((message: string, type: "success" | "error") => {
    setToasts((prev) => {
      const id = Date.now();
      return [...prev, { id, message, type }];
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auto-remove toast
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Modal
  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setValue("title", article.title);
    setValue("category", article.category);
    setValue("description", article.description);
    setValue("content", article.content);
    setValue("image", article.image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
    reset();
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      await deleteDoc(doc(db, "articles", id));
      setArticles((prev) => prev.filter((article) => article.id !== id));
      addToast("Article supprimé avec succès !", "success");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      addToast("Erreur lors de la suppression de l'article.", "error");
    }
  };

  // Update
  const onSubmit = async (data: EditFormData) => {
    if (!selectedArticle) return;

    try {
      const articleRef = doc(db, "articles", selectedArticle.id);
      await updateDoc(articleRef, {
        title: data.title.trim(),
        category: data.category.trim(),
        description: data.description.trim(),
        content: data.content,
        image: data.image.trim(),
      });

      setArticles((prev) =>
        prev.map((p) => (p.id === selectedArticle.id ? { ...p, ...data } : p))
      );

      closeModal();
      addToast("Article mis à jour avec succès !", "success");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      addToast("Erreur lors de la mise à jour de l'article.", "error");
    }
  };

  // Fetch articles ✅ typage sans any
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const ref = collection(db, "articles");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data: Article[] = snapshot.docs.map(
          (docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const raw = docSnap.data();

            let createdAt: Date | null = null;
            const ts = raw?.createdAt;

            if (ts instanceof Timestamp) {
              createdAt = ts.toDate();
            } else if (typeof ts === "number") {
              createdAt = new Date(ts);
            } else if (typeof ts === "string") {
              createdAt = new Date(ts);
            } else if (ts instanceof Date) {
              createdAt = ts;
            }

            return {
              id: docSnap.id,
              title: raw?.title ?? "",
              category: raw?.category ?? "",
              description: raw?.description ?? "",
              content: raw?.content ?? "",
              image: raw?.image ?? "",
              createdAt,
            };
          }
        );

        setArticles(data);
      } catch (err) {
        console.error("Erreur lors du chargement des articles :", err);
        addToast("Impossible de charger les articles.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [addToast]);

  // Pagination
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
      <Topbar />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="rounded-2xl border border-gray-200 bg-blue-100/10 p-5 md:p-6 mb-8">
          <p className="ml-4 text-xl text-gray-700 font-bold">Ajouter un article</p>
          <CreatPost />
        </div>

        <div key={currentPage}>
          <ToastNotification toasts={toasts} removeToast={removeToast} />
          <p className="text-2xl font-bold mb-6">Liste des articles</p>
          <ul className="space-y-2">
            {loading ? (
              <p className="text-gray-500">Chargement des articles...</p>
            ) : (
              currentArticles.map((article) => (
                <li
                  key={article.id}
                  className="flex items-center gap-8 bg-gray-100 p-3 rounded-2xl group border border-gray-200"
                >
                  {article.image ? (
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
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
                      {article.createdAt && (
                        <span className="text-xs text-gray-400">
                          {article.createdAt.toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(article)}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center w-12 h-12 bg-blue-100 cursor-pointer rounded-xl"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      title="Supprimer"
                      className="text-red-600 hover:text-red-800 flex items-center justify-center w-12 h-12 bg-red-100 cursor-pointer rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

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

        {/* Modal avec formulaire d'édition */}
        <AnimatePresence>
          {showModal && selectedArticle && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg max-w-lg w-full p-6 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Modifier : {selectedArticle.title}</h2>

                <label className="block font-semibold mb-1">Titre</label>
                <input
                  {...register("title", { required: "titre requis" })}
                  className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
                />
                {errors.title && <p className="text-red-500 mb-2">{errors.title.message}</p>}

                <label className="block font-semibold mb-1">Catégorie</label>
                <input
                  {...register("category", { required: "Catégorie requise" })}
                  className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
                />
                {errors.category && <p className="text-red-500 mb-2">{errors.category.message}</p>}

                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  {...register("description", { required: "Description requise" })}
                  className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
                  rows={3}
                />
                {errors.description && <p className="text-red-500 mb-2">{errors.description.message}</p>}

                <label className="block font-semibold mb-1">Contenu </label>
                <textarea
                  {...register("content", { required: "Contenu requis" })}
                  className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
                  rows={3}
                />
                {errors.content && <p className="text-red-500 mb-2">{errors.content.message}</p>}

                <label className="block font-semibold mb-1">URL image</label>
                <input
                  {...register("image", { required: "URL image requise" })}
                  className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
                />
                {errors.image && <p className="text-red-500 mb-2">{errors.image.message}</p>}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </section>
  );
}
