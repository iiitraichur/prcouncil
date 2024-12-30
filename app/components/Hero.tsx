"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase"; // Assuming you export your firebase config as `db`
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineLink,
} from "react-icons/ai";

const Hero: React.FC = () => {
  const [events, setEvents] = useState<Array<{ id: string; [key: string]: any }>>([]);

  useEffect(() => {
    const eventsQuery = query(
      collection(db, "events"),
      orderBy("date", "desc"),
      orderBy("time", "desc"), // Ensure "time" is part of your Firestore document
      limit(3)
    );

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col pt-28 min-h-screen text-center"
        id="main"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-lime-400 tracking-tight drop-shadow-lg"
        >
          Welcome to
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl md:text-5xl font-bold text-white mt-4"
        >
          Public Relations Council
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-sm md:text-base text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Building bridges, fostering connections, and shaping the future of
          public engagement.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="mt-10"
        >
          <button className="px-6 py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition-all transform hover:scale-105">
            <a href="#events">Latest Events</a>
          </button>
        </motion.div>
      </div>

      {/* Events Section */}
      <div
        className="relative z-10 mt-12 w-full px-6 flex-1 bg-black text-center py-20"
        id="events"
      >
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-lime-400 mb-6"
        >
          Latest Events
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {events.map((event: any, index) => (
            <motion.div
              key={event.id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 rounded-xl shadow-xl p-4 flex flex-col space-y-4 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-lime-500 hover:-translate-y-2 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-lime-600 to-transparent opacity-5"></div>
              <h4 className="text-xl font-bold text-lime-400 truncate">{event.eventTitle}</h4>
              <div className="flex items-center space-x-2">
                <AiOutlineUser className="text-lime-400" />
                <span className="text-sm">{event.user}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineCalendar className="text-lime-400" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineClockCircle className="text-lime-400" />
                <span className="text-sm">{event.session}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineLink className="text-lime-400" />
                <a
                  href={event.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Drive Link
                </a>
              </div>
              {event.pictureCredits && (
                <div className="text-sm text-gray-400">
                  Picture Credits: {event.pictureCredits.join(", ")}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Browse All CTA */}
        <div className="mt-12">
          <button className="px-6 py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition-all transform hover:scale-105">
            <a href="/events">Browse All Events</a>
          </button>
        </div>

      </div>
      
    </div>
  );
};

export default Hero;
