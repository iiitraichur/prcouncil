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
      <div className="relative z-10 flex flex-col pt-28 h-[80vh] text-center" id="main">
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
          Building bridges, fostering connections, and shaping the future of public engagement.
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
      <div className="relative z-10 mt-1 w-full px-6 flex flex-col justify-center items-center bg-black text-center py-20" id="events">
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
          className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-gray-900 text-gray-200 rounded-xl shadow-lg p-6 flex flex-col space-y-4 transform hover:scale-105 transition-all relative"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
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
              {Array.isArray(event.pictureCredits) && event.pictureCredits.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm text-gray-400">Picture Credits:</span>
                  {event.pictureCredits.map((credit, idx) => (
                    <span key={idx} className="text-sm text-gray-400">
                      {credit}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 text-center mt-12"
          >
            No events found. Try adjusting your filters.
          </motion.div>
        )}

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
