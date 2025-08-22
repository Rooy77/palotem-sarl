"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...(doc.data() as Omit<Product, "id">) });
      });
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[30rem] flex items-center justify-center bg-gray-900 ">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Chargement...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-[30rem] flex items-center justify-center bg-gray-900">
        <p className="text-center py-20 text-gray-200 bg-gray-800">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="relative w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
          <Image
            src="/img/prod-b.jpg"
            fill
            className="object-cover"
            sizes="100vw"
            alt=""
          />
          <div className="absolute bg-gray-800/30 inset-0 flex items-center justify-left text-white text-center">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="max-w-3xl flex md:text-5xl font-semibold text-xl cursor-pointer">
                <div className="col col-xs-12">
                  <h2>Nos Produits</h2>
                  <ol className="text-sm text-center font-light justify-center flex space-x-2">
                    <li className="text-orange-500">
                      <a href="#">Accueil</a> {'>'}
                    </li>
                    <li>Produits</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-orange-500 font-regular uppercase tracking-widest text-sm">
            produits
          </h3>
          <h2 className="text-4xl font-bold text-gray-800">
            Society PALOREM Sarl<br />
            <span className="font-light text-gray-700">nos produits</span>
          </h2>
          <div className="mt-4 w-12 h-1 rounded bg-orange-500 mx-auto" />
          <p className="mt-6 text-gray-600 text-sm font-light max-w-2xl mx-auto">
            En tant qu’entreprise entrepreneuriale enracinée dans la communauté,
            Royal Import Export Sarl crée de la valeur pour les parties
            prenantes à travers une stratégie d’investissement durable.
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key="products-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            {loading ? (
              <p className="text-center py-20 text-gray-600">Chargement des produits...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-[20px] font-medium text-gray-700">{product.name}</h2>
                      <p className="border-b-[2px] mt-2 border-orange-500 max-w-max text-left text-[11.5px] font-medium text-orange-500">{product.category}</p>
                      <p className="mt-4 text-gray-600 text-[13px] font-light max-w-2xl mx-auto">{product.description}</p>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
        </motion.div>
        </AnimatePresence>
      

        {/* Modal détaillé */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="bg-white max-w-lg w-full p-6 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-gray-100 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-1 font-normal text-2xl bg-orange-500 h-8 w-8 transition cursor-pointer items-center justify-center flex"
                  aria-label="Fermer"
                >
                  ×
                </button>

                <h2 className="text-[24px] font-medium text-gray-700 mb-4">{selectedProduct.name}</h2>
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-[4rem] items-center justify-center">
                  <p className="text-gray-700 mb-2 text-[15px]">
                    <span className="border-b-[2px] mt-2 border-orange-500 max-w-max text-left text-orange-500">
                      {selectedProduct.category}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2 ml-[8rem] text-[30px]">
                    <span className="font-bold">
                      ${selectedProduct.price.toFixed(0)}
                    </span>
                  </p>
                </div>
                <p className="text-gray-600 text-[14px] font-light max-w-2xl mx-auto">
                  {selectedProduct.description}
                </p>
                
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </section>
  );
}
