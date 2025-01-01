"use client";
import { useState } from "react";
import { auth, firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <section className="bg-black text-lime-400 min-h-screen grid grid-rows-[20vh_auto] md:grid-rows-[15vh_auto] gap-4">
      {/* Banner Section */}
      <motion.div
        className="bg-lime-600 text-black h-[25vh] text-center mx-4 md:mx-12 lg:mx-32 flex flex-col justify-center items-center rounded-lg shadow-lg p-4 md:p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold uppercase mb-2">Restricted Entry</h1>
        <p className="text-xs md:text-sm lg:text-base">
          Only administrators are allowed. Unauthorized access is strictly prohibited and will be logged.
        </p>
        <p className="text-xs md:text-sm lg:text-base">
          Ensure your credentials are secure and do not share them.
        </p>
        <p className="text-xs md:text-sm lg:text-base">
          Violations may result in disciplinary action.
        </p>
        <p className="text-xs md:text-sm lg:text-base italic mt-2">- Public Relation Council, IIIT Raichur</p>
      </motion.div>

      {/* Sign-In Section */}
      <div className="px-4 md:px-8 lg:px-16 grid place-items-center">
        <motion.div
          className="bg-gray-900 shadow-xl rounded-lg p-6 md:p-8 w-full max-w-sm flex flex-col"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-3 border border-lime-400 bg-black text-lime-400 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 p-3 border border-lime-400 bg-black text-lime-400 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700 text-black font-semibold py-3 rounded-md transition duration-300"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
