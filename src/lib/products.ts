import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // ton fichier firebase config

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
};

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products: Product[] = [];

  querySnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    } as Product);
  });

  return products;
}
