"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// Define interfaces for type safety
interface User {
  displayName: string;
  email: string;
  uid: string;
}

interface Change {
  id: string;
  description: string;
  username: string;
  email: string;
  timestamp: any;
}

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [description, setDescription] = useState("");
  const [changes, setChanges] = useState<Change[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          let username = currentUser.displayName;

          if (!username && userDoc.exists()) {
            username = userDoc.data().username;
          }

          setUser({
            ...currentUser,
            displayName: username || "Unknown User",
            email: currentUser.email || "Unknown Email",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            ...currentUser,
            displayName: "Unknown User",
            email: currentUser.email || "Unknown Email",
          });
        }
      } else {
        setUser(null);
      }
    });

    const changesQuery = query(
      collection(db, "changes"),
      orderBy("timestamp", "desc")
    );
    const unsubscribeFirestore = onSnapshot(changesQuery, (snapshot) => {
      const fetchedChanges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Change[];
      setChanges(fetchedChanges);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) return;

    try {
      await addDoc(collection(db, "changes"), {
        description,
        username: user?.displayName || "Unknown User",
        email: user?.email || "Unknown Email",
        timestamp: serverTimestamp(),
      });
      setDescription("");
    } catch (error) {
      console.error("Error logging change:", error);
    }
  };

  const filteredChanges = changes.filter((change) => {
    const matchesSearch = searchTerm
      ? [
          change.description,
          change.username,
          change.email,
          new Date(change.timestamp?.toDate()).toLocaleDateString(),
          new Date(change.timestamp?.toDate()).toLocaleTimeString(),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesDate = filterDate
      ? new Date(change.timestamp?.toDate()).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      : true;

    return matchesSearch && matchesDate;
  });

  const displayedChanges = filteredChanges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredChanges.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-black min-h-screen text-lime-300 flex flex-col items-center p-4 animate-slide-in">
      <div className="w-full max-w-4xl">
        <h1 className="text-lime-400 text-4xl font-bold text-center animate-fade-in">
          Welcome to the Admin Panel
        </h1>

        {user ? (
          <p className="text-center text-lime-300 mt-4">
            Welcome, {user.displayName} ({user.email})
          </p>
        ) : (
          <p className="text-center text-lime-300 mt-4">Loading user information...</p>
        )}

        <div className="bg-gray-800 p-4 rounded-md shadow-md mt-6">
          <h2 className="text-lime-400 text-xl font-semibold">Instructions</h2>
          <ul className="list-disc list-inside mt-2 space-y-2 text-lime-300">
            <li>Provide a valid reason for any changes.</li>
            <li>File deletion limits: 2 files/hour, 10 files/day.</li>
            <li>Maintain professional conduct.</li>
            <li>Update the team regularly.</li>
          </ul>
        </div>

        <div className="bg-gray-700 p-4 rounded-md shadow-md mt-8">
          <h3 className="text-lime-400 text-xl font-semibold">Submit Changes</h3>
         
          <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-800 text-lime-300 border-2 border-gray-600 rounded-md"
            placeholder="Describe the change..."
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="w-full mt-4 bg-lime-400 text-black py-2 rounded-md hover:bg-lime-500 transition duration-200"
          >
            Submit Change
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lime-400 text-xl font-semibold">Change Log</h3>

        <div className="mt-4 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search changes..."
            className="p-2 bg-gray-800 text-lime-300 border-2 border-gray-600 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="p-2 bg-gray-800 text-lime-300 border-2 border-gray-600 rounded-md"
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {displayedChanges.length > 0 ? (
          <div>
            {displayedChanges.map((change: Change) => (
              <details
                key={change.id}
                className="bg-gray-900 p-4 mt-4 rounded-md"
              >
                <summary className="cursor-pointer text-lime-300 font-medium">
                  {change.description.slice(0, 50)}...
                </summary>

                <p className="text-lime-400 mt-2">
                   {change.description} 
                </p>

                <p className="text-lime-400 mt-2">
                  By: {change.username} ({change.email})
                </p>
                <p className="text-lime-400">
                  On: {new Date(change.timestamp?.toDate()).toLocaleString()}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <p className="text-center text-lime-300">No changes to display</p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            className="bg-lime-400 text-black py-2 px-4 rounded-md hover:bg-lime-500 transition duration-200"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-lime-400 text-black py-2 px-4 rounded-md hover:bg-lime-500 transition duration-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default AdminPanel;
