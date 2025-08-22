"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  deleteDoc,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Addproduct from "@/components/admin/Addproduct";
import Topbar from "@/components/admin/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
};

const PRODUCTS_PER_PAGE = 5;

type EditFormData = {
  name: string;
  category: string;
  description: string;
  price: number;
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [page, setPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 🔍 Recherche et tri
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "price" | "category">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditFormData>();

  const addToast = useCallback((message: string, type: "success" | "error") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = setTimeout(() => setToasts((prev) => prev.slice(1)), 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Compter produits
  useEffect(() => {
    const fetchTotalCount = async () => {
      const col = collection(db, "products");
      const snapshot = await getDocs(col);
      setTotalProducts(snapshot.size);
    };
    fetchTotalCount();
  }, []);

  // Charger produits avec pagination + tri
  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      const col = collection(db, "products");
      let q;
      if (page === 1 || !lastVisible) {
        q = query(col, orderBy(sortField, sortOrder), limit(PRODUCTS_PER_PAGE));
      } else {
        q = query(col, orderBy(sortField, sortOrder), startAfter(lastVisible), limit(PRODUCTS_PER_PAGE));
      }

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const prods: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(prods);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        setProducts([]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [page, sortField, sortOrder, lastVisible]);

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast("Produit supprimé avec succès !", "success");
    } catch (error) {
      console.error(error);
      addToast("Erreur lors de la suppression.", "error");
    }
  };

  const nextPage = () => {
    if (products.length === PRODUCTS_PER_PAGE && page * PRODUCTS_PER_PAGE < totalProducts) {
      setPage((p) => p + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setValue("name", product.name);
    setValue("category", product.category);
    setValue("description", product.description);
    setValue("price", product.price);
    setValue("image", product.image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    reset();
  };

  const onSubmit = async (data: EditFormData) => {
    if (!selectedProduct) return;
    try {
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, { ...data });
      setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? { ...p, ...data } : p)));
      closeModal();
      addToast("Produit mis à jour avec succès !", "success");
    } catch (error) {
      console.error(error);
      addToast("Erreur lors de la mise à jour du produit.", "error");
    }
  };

  // 🔍 Filtrage client-side
  const filteredProducts = products.filter((p) =>
    [p.name, p.category, p.description].some((f) =>
      f.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <main>
      <Topbar />
      <section className="flex mt-12 gap-8">
        <div className="rounded-2xl border border-gray-200 bg-blue-100/10 p-5 md:p-6 mb-8">
          <div className="flex gap-8">
            <p className="ml-4 text-xl text-gray-700 font-bold">Ajouter un produit</p>
          </div>
          <Addproduct />
        </div>

        <section className="max-w-7xl w-auto relative">
          <ToastNotification toasts={toasts} removeToast={removeToast} />

          <p className="text-xl font-bold mb-6">Liste des produits en stock</p>
          <p className="mb-4 text-gray-600 font-medium">
            Total produits : <span className="text-orange-500">{totalProducts}</span>
          </p>

          {/* 🔍 Barre recherche + tri */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-1/3"
            />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as "name" | "price" | "category")}
              className="px-3 py-2 rounded-lg border border-gray-300"
            >
              <option value="name">Nom</option>
              <option value="price">Prix</option>
              <option value="category">Catégorie</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="px-3 py-2 rounded-lg border border-gray-300"
            >
              <option value="asc">Ascendant</option>
              <option value="desc">Descendant</option>
            </select>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_100px] gap-4 bg-gray-100 p-4 rounded-t-lg font-medium text-sm/6 text-gray-700 border border-gray-300">
            <div>Image</div>
            <div>Nom</div>
            <div>Catégorie</div>
            <div>Description</div>
            <div>Prix (USD)</div>
            <div>Actions</div>
          </div>

          {/* Products */}
          {loading ? (
            // ⏳ Skeleton loader
            <div>
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 animate-pulse rounded-b-lg border-x border-b border-gray-300"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center py-10 text-gray-500 text-sm/6">Aucun produit trouvé.</p>
          ) : (
            <div>
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr_100px] gap-4 border-x border-b border-gray-300 p-4 items-center ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="relative w-20 h-16 rounded overflow-hidden border border-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name || "Produit"}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium text-gray-600 text-sm/6">{product.name}</div>
                  <div className="text-gray-600 font-semibold text-sm/6">{product.category}</div>
                  <div className="text-gray-600 truncate text-sm/6">{product.description}</div>
                  <div className="text-orange-500 text-sm/6 text-center bg-orange-100 rounded-full px-4 border border-orange-500">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(product)}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center w-12 h-12 bg-blue-100 cursor-pointer rounded-xl"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      title="Supprimer"
                      className="text-red-600 hover:text-red-800 flex items-center justify-center w-12 h-12 bg-red-100 cursor-pointer rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="self-center">
                  Page {page} / {Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page * PRODUCTS_PER_PAGE >= totalProducts}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Modal édition */}
          <AnimatePresence>
            {showModal && selectedProduct && (
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
                  <h2 className="text-xl font-semibold mb-4">Modifier : {selectedProduct.name}</h2>

                  <label className="block font-semibold mb-1">Nom</label>
                  <input
                    {...register("name", { required: "Nom requis" })}
                    className="w-full border border-gray-900/25 rounded-lg text-gray-400 px-3 py-2"
                  />
                  {errors.name && <p className="text-red-500 mb-2">{errors.name.message}</p>}

                  <label className="block font-semibold mb-1">Catégorie</label>
                  <input
                    {...register("category", { required: "Catégorie requise" })}
                    className="w-full border border-gray-900/25 rounded-lg text-gray-400 px-3 py-2"
                  />
                  {errors.category && <p className="text-red-500 mb-2">{errors.category.message}</p>}

                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    {...register("description", { required: "Description requise" })}
                    className="w-full border border-gray-900/25 rounded-lg text-gray-400 px-3 py-2"
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 mb-2">{errors.description.message}</p>}

                  <label className="block font-semibold mb-1">Prix (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", {
                      required: "Prix requis",
                      valueAsNumber: true,
                      min: { value: 0, message: "Prix doit être positif" },
                    })}
                    className="w-full border border-gray-900/25 rounded-lg text-gray-400 px-3 py-2"
                  />
                  {errors.price && <p className="text-red-500 mb-2">{errors.price.message}</p>}

                  <label className="block font-semibold mb-1">URL image</label>
                  <input
                    {...register("image", { required: "URL image requise" })}
                    className="w-full border border-gray-900/25 rounded-lg text-gray-400 px-3 py-2"
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
                      className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600"
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
    </main>
  );
}
