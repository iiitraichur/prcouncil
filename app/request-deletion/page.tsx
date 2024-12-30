'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const RequestDeletion: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoLink: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "photoDeletionRequests"), formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit the request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 lg:p-12"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <h1 className="text-4xl font-extrabold text-lime-400 text-center">
              Photo Deletion Request
            </h1>
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="url"
              name="photoLink"
              placeholder="Photo Link"
              className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.photoLink}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="reason"
              placeholder="Reason for Deletion"
              className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.reason}
              onChange={handleInputChange}
              rows={6}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-4 bg-lime-400 text-black font-semibold text-lg rounded-xl hover:bg-lime-500 transition-all"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-lime-400">
              Thank You for Your Request!
            </h2>
            <p className="text-gray-300 text-lg">
              Our team will review your request and get back to you soon.
            </p>
            <button
              className="px-8 py-4 bg-lime-400 text-black font-semibold text-lg rounded-full hover:bg-lime-500 transition-all"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RequestDeletion;
