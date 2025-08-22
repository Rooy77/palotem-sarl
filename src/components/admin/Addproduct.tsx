"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import UploadImage from "@/components/UploadImage";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ImagePlus } from "lucide-react";

type FormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

// Liste des catégories possibles (à adapter si besoin)
const categories = [
  "Produits miniers",
  "Arbres rares",
  "Produits agricoles",
  "Matériaux de construction",
];

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      image: "",
      category: categories[0],
    },
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imageResetTrigger, setImageResetTrigger] = useState(false);

  const image = watch("image");

  const formatText = (text: string) =>
    text.trim().replace(/^\w/, (c) => c.toUpperCase());

  const onSubmit = async (data: FormData) => {
    if (!data.image) {
      setToastMessage("Une image est requise.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    try {
      const formattedData = {
        ...data,
        name: formatText(data.name),
        category: data.category, // category sélectionnée dans select, pas besoin de format
        description: data.description.trim(),
        price: Number(data.price), // s'assure que c'est un nombre
      };

      await addDoc(collection(db, "products"), formattedData);

      setToastMessage("Produit ajouté avec succès !");
      reset(); // reset form fields
      setImageResetTrigger(true); // déclenche la réinitialisation de l’image
      setTimeout(() => {
        setToastMessage(null);
        setImageResetTrigger(false); // remet à false pour futures soumissions
      }, 3000);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur lors de l'ajout du produit.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return(
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 max-w-2xl mx-auto"
      >
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Nom du produit</label>
          <input
            {...register("name", { required: true })}
            className="w-full border border-gray-900/25 rounded-lg text-gray-400 focus:outline px-3 py-2"
          />
          {errors.name && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm/6 font-medium text-gray-900">Catégorie</label>
                <select
                    {...register("category", { required: true })}
                    className="w-full border border-gray-900/25 text-gray-400 focus:outline text-base sm:text-sm/6 rounded-lg px-3 py-2.5"
                    defaultValue={categories[0]}
                >
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>
                {errors.category && (
                    <span className="text-red-500">Ce champ est requis</span>
                )}
            </div>
            
            <div>
                <label className="block text-sm/6 font-medium text-gray-900">Prix (USD)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price", { required: true, min: 0 })}
                    className="w-full border border-gray-900/25  text-gray-400 focus:outline rounded-lg px-3 py-2"
                />
                {errors.price && (
                    <span className="text-red-500">Ce champ est requis et doit être positif</span>
                )}
            </div>
        </div>

        <div>
            <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Description
            </label>
            <textarea
                {...register("description", { required: true })}
                className="w-full border border-gray-900/25 rounded-lg px-3 py-2 focus:outline text-gray-400"
            />
            {errors.description && (
                <span className="text-red-500">Ce champ est requis</span>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center text-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <ImagePlus 
                        aria-hidden="true" 
                        className="mx-auto size-12 text-gray-300"
                    />
                    <div className="text-sm/6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-transparent  text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                            >
                        
                                <UploadImage
                                    onUpload={(url: string) => {
                                    setValue("image", url, { shouldValidate: true });
                                    }}
                                    resetTrigger={imageResetTrigger}
                                />
                                
                        
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                    </div>
                    {!image && (
                        <p className="text-xs/5 text-gray-400">Une image est requise | PNG, JPG, GIF up to 10MB</p>
                    )}
                  
                </div>
              </div>
            </div>
        
            <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
            >
            Ajouter le produit
            </button>
        </div>
      </form>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
