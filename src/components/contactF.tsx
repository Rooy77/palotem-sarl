"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border w-full border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="subject"
          placeholder="Contact Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <textarea
        name="message"
        rows={5}
        placeholder="Case Description"
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
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {submitStatus === 'success' && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          Message sent successfully!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          Error sending message. Please try again.
        </div>
      )}
    </form>
  );
}