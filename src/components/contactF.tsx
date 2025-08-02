"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          show: true,
          message: "Message envoyé avec succès !",
          type: "success"
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error("Échec de l'envoi");
      }
    } catch {
      setNotification({
        show: true,
        message: "Erreur lors de l’envoi du message. Veuillez réessayer.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="border w-full border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="border w-full border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Objet du message"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <textarea
          name="message"
          rows={5}
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-orange-500 text-white font-semibold py-2 px-6 hover:bg-orange-600 transition ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`fixed bottom-[7rem] right-8 p-6 shadow-xl z-50 flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium">{notification.message}</p>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-1 bg-white/30 mt-2 rounded-full"
              />
            </div>
            <button
              onClick={() => setNotification({ ...notification, show: false })}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
