'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Topbar from "@/components/admin/Topbar";
import StatCard from "@/components/admin/StatCard";
import Image from "next/image";
import { Newspaper, Users, ShoppingCart } from "lucide-react";
import RecentArticles from "@/components/admin/RecentArticles";

interface Product {
  id: string;
  name: string;
  image?: string;
  createdAt?: Date | null;
}

export default function DashboardPage() {
  const [articleCount, setArticleCount] = useState<number>(0);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Articles ---
        const articlesSnap = await getDocs(collection(db, "articles"));
        setArticleCount(articlesSnap.size);

        // --- Visits ---
        const visitsSnap = await getDocs(collection(db, "articleVisits"));
        setTotalVisits(visitsSnap.size);

        // --- Products ---
        const productsSnap = await getDocs(collection(db, "products"));
        setProductCount(productsSnap.size);

        // --- Recent Products ---
        const recentQuery = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recentSnap = await getDocs(recentQuery);
        const productsData: Product[] = [];

        recentSnap.forEach((doc) => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            name: data.name ?? "Sans nom",
            image: data.image ?? undefined,
            createdAt: data.createdAt?.toDate?.() ?? null, // Convert Timestamp → Date
          });
        });

        setRecentProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Topbar />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Articles"
          value={loading ? "..." : articleCount.toString()}
          icon={Newspaper}
          change="+12.5%"
          positive
        />
        <StatCard
          title="Visiteurs"
          value={loading ? "..." : totalVisits.toString()}
          icon={Users}
          change="+8.3%"
          positive
        />
        <StatCard
          title="Produits"
          value={loading ? "..." : productCount.toString()}
          icon={ShoppingCart}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-400">•</span> 5 Produits récemment publiés
          </p>
          <p className="mb-4 font-normal text-gray-500 ml-4 text-[11.5px]">
            Les derniers produits ajoutés sur Palotem Store
          </p>
          {loading ? (
            <p className="text-center text-gray-400">Chargement...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentProducts.length === 0 ? (
                <li className="py-2 text-center text-gray-500">
                  Aucun produit récent.
                </li>
              ) : (
                recentProducts.map((product) => (
                  <li
                    key={product.id}
                    className="py-2 flex justify-start items-center gap-4"
                  >
                    <div className="w-16 h-16 relative rounded overflow-hidden shrink-0">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      {product.createdAt && (
                        <span className="text-xs text-gray-400">
                          {product.createdAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Section articles récents */}
        <RecentArticles />
      </div>
    </>
  );
}
