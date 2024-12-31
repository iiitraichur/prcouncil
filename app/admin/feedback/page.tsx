// pages/feedbackDashboard.tsx
"use client"

import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Assume Firebase is initialized in this file
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

interface Feedback {
  id: string;
  email: string;
  feedback: string;
  name: string;
  rating: number;
  reviewed: boolean;
}

export default function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [reviewedFeedbackList, setReviewedFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "feedback"), (snapshot) => {
      const feedbackData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Feedback[];

      setFeedbackList(feedbackData.filter((item) => !item.reviewed));
      setReviewedFeedbackList(feedbackData.filter((item) => item.reviewed));
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "feedback", id));
  };

  const handleMarkReviewed = async (id: string) => {
    await updateDoc(doc(db, "feedback", id), { reviewed: true });
  };

  const handleSendToPending = async (id: string) => {
    await updateDoc(doc(db, "feedback", id), { reviewed: false });
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Feedback Dashboard</title>
      </Head>
      <header className=" p-4 text-lime-500 text-center rounded-b-md">
        <h1 className="text-3xl font-bold">Feedback Dashboard</h1>
      </header>
      <main className="p-4">
        <section>
          <h2 className="text-xl text-lime-500 font-bold mb-4 text-center">Pending Feedback</h2>
          <div className="overflow-x-auto">
            <table className="w-3/4 mx-auto bg-gray-900 text-lime-500 rounded-md shadow-md">
              <thead>
                <tr className="bg-lime-600 text-black">
                  <th className="p-2">Email</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Feedback</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback) => (
                  <tr key={feedback.id} className="border-b border-lime-500">
                    <td className="p-2 break-words">{feedback.email}</td>
                    <td className="p-2 break-words">{feedback.name}</td>
                    <td className="p-2 break-words">{feedback.rating}</td>
                    <td className="p-2 break-words">{feedback.feedback}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleMarkReviewed(feedback.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {feedbackList.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No pending feedback found.</p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl text-lime-500 font-bold mb-4 text-center">Reviewed Feedback</h2>
          <div className="overflow-x-auto">
            <table className="w-3/4 mx-auto bg-gray-900 text-lime-500 rounded-md shadow-md">
              <thead>
                <tr className="bg-lime-600 text-black">
                  <th className="p-2">Email</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Feedback</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviewedFeedbackList.map((feedback) => (
                  <tr key={feedback.id} className="border-b border-lime-500">
                    <td className="p-2 break-words">{feedback.email}</td>
                    <td className="p-2 break-words">{feedback.name}</td>
                    <td className="p-2 break-words">{feedback.rating}</td>
                    <td className="p-2 break-words">{feedback.feedback}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleSendToPending(feedback.id)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                      >
                        Send to Pending
                      </button>
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reviewedFeedbackList.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No reviewed feedback found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
