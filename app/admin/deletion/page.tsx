"use client"

import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Assume Firebase is initialized in this file
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

interface PhotoDeletionRequest {
  id: string;
  email: string;
  name: string;
  photoLink: string;
  reason: string;
}

export default function Dashboard() {
  const [requests, setRequests] = useState<PhotoDeletionRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PhotoDeletionRequest[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "photoDeletionRequests"), (querySnapshot) => {
      const fetchedRequests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PhotoDeletionRequest[];
      setRequests(fetchedRequests);
      setFilteredRequests(fetchedRequests);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredRequests(
      requests.filter((request) =>
        request.email.toLowerCase().includes(value.toLowerCase()) ||
        request.name.toLowerCase().includes(value.toLowerCase()) ||
        request.reason.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "photoDeletionRequests", id));
    // Firestore will automatically update the UI due to onSnapshot
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Dashboard - Photo Deletion Requests</title>
      </Head>
      <header className="p-4 text-lime-500 text-center rounded-b-md">
        <h1 className="text-2xl font-bold">Photo Deletion Requests Dashboard</h1>
      </header>
      <main className="p-4">
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by email, name, or reason"
            value={filter}
            onChange={handleFilterChange}
            className="w-full max-w-md p-2 border border-lime-500 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto bg-gray-900 text-lime-500 rounded-md shadow-md">
            <thead>
              <tr className="bg-lime-600 text-black">
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Photo</th>
                <th className="p-2 text-left">Reason</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-lime-500">
                  <td className="p-2 break-words">{request.email}</td>
                  <td className="p-2 break-words">{request.name}</td>
                  <td className="p-2">
                    <a
                      href={request.photoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 underline"
                    >
                      View Photo
                    </a>
                  </td>
                  <td className="p-2 break-words">{request.reason}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No requests found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
