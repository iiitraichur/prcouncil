'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import StarRating from ".//StarRating";
type FormData = {
  name: string;
  email: string;
  feedback: string;
  rating: number;
};

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    feedback: "",
    rating: 3, 
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "feedback"), formData);
      setSubmitted(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to submit. Please try again.");
    }
  };

  const handleSubmitAnotherRequest = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      feedback: "",
      rating: 2,  // Reset to default rating
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full max-w-4xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 lg:p-12"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold text-lime-400 text-center"
            >
              Submit Feedback
            </motion.h1>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.input
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <motion.input
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1 }}
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <motion.textarea
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              name="feedback"
              placeholder="Feedback"
              className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.feedback}
              onChange={handleInputChange}
              rows={6}
              required
            ></motion.textarea>
            <div className="flex justify-center items-center">
              <StarRating
                rating={formData.rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-lime-400 text-black font-semibold text-lg rounded-xl hover:bg-lime-500 transition-all"
            >
              Submit
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-lime-400">
              Thank You for Your Feedback!
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-400 text-black font-semibold text-lg rounded-full hover:bg-lime-500 transition-all"
              onClick={handleSubmitAnotherRequest}
            >
              Submit Another Feedback
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Feedback;
