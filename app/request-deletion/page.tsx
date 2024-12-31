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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add date and time stamp
      const timestamp = new Date().toISOString();

      await addDoc(collection(db, "photoDeletionRequests"), {
        ...formData,
        timestamp, // Add timestamp field
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit the request. Please try again.");
    }
  };

  const handleSubmitAnotherRequest = () => {
    setSubmitted(false); // Reset the submitted state
    setFormData({
      name: "",
      email: "",
      photoLink: "",
      reason: "",
    }); // Reset the form data
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
              Photo Deletion Request
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
            <motion.input
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              type="url"
              name="photoLink"
              placeholder="Photo Link"
              className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.photoLink}
              onChange={handleInputChange}
              required
            />
            <motion.textarea
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              name="reason"
              placeholder="Reason for Deletion"
              className="w-full p-4 bg-black text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.reason}
              onChange={handleInputChange}
              rows={6}
              required
            ></motion.textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-lime-400 text-black font-semibold text-lg rounded-xl hover:bg-lime-500 transition-all"
            >
              Submit Request
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
              Thank You for Your Request!
            </h2>
            <p className="text-gray-300 text-lg">
              Our team will review your request and get back to you soon.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-400 text-black font-semibold text-lg rounded-full hover:bg-lime-500 transition-all"
              onClick={handleSubmitAnotherRequest}
            >
              Submit Another Request
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RequestDeletion;
