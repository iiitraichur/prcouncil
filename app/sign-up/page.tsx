"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firebaseAuth, db } from "@/lib/firebase"; // Import firestore

import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import PrivateRoute from "../components/PrivateRoute";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // State for username
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        createdAt: new Date(),
      });

      router.push("/admin"); // Redirect to the protected page after successful sign-up
    } catch (err: any) {
      setError(err.message || "Sign-up failed. Please try again.");
    }
  };

  return (
    <section>

    <PrivateRoute>
    <section className="bg-black h-[80vh] text-black flex flex-col">
      <div className="flex flex-grow items-center justify-center px-6 py-12">
        <div className="bg-black shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-lime-500 mb-6">Sign Up</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-lime-500">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full mt-1 p-2 bg-black text-lime-500 border rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-lime-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 text-lime-500 bg-black border rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-lime-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 text-lime-500 p-2 border bg-black rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-lime-500">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full mt-1 text-lime-500 bg-black p-2 border rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
              >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{' '}
            <a href="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </section>
        </PrivateRoute>
    </section>
  );
}