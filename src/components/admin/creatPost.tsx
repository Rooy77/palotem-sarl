"use client";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import UploadImage from "@/components/UploadImage";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

type FormData = {
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
};

export default function CreateArticle() {
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
        title: formatText(data.title),
        category: formatText(data.category),
        description: data.description.trim(),
        content: data.content.trim(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "articles"), formattedData);

      setToastMessage("Article publié avec succès !");
      reset(); // reset form fields
      setImageResetTrigger(true); // déclenche la réinitialisation de l’image
      setTimeout(() => {
        setToastMessage(null);
        setImageResetTrigger(false); // remet à false pour futures soumissions
      }, 3000);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur lors de la publication.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 max-w-2xl mx-auto"
      >
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Titre</label>
          <input
            {...register("title", { required: true })}
            className="w-full border border-gray-900/25  text-gray-400 focus:outline rounded-lg px-3 py-2"
          />
          {errors.title && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Catégorie</label>
          <input
            {...register("category", { required: true })}
            className="w-full border border-gray-900/25  text-gray-400 focus:outline rounded-lg px-3 py-2"
          />
          {errors.category && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border border-gray-900/25  text-gray-400 focus:outline rounded-lg px-3 py-2"
          />
          {errors.description && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Contenu</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full border border-gray-900/25  text-gray-400 focus:outline rounded-lg px-3 py-2"
          />
          {errors.content && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Image</label>
          <UploadImage
            onUpload={(url: string) => {
              setValue("image", url, { shouldValidate: true });
            }}
            resetTrigger={imageResetTrigger}
          />
          {!image && (
            <span className="text-red-500">Une image est requise</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publier l’article
        </button>
      </form>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
