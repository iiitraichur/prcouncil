"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineLink } from "react-icons/ai";
import { DatePicker} from "antd";
import '@ant-design/v5-patch-for-react-19';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Event {
  id: string;
  eventTitle: string;
  user: string;
  date: string; // ISO 8601 formatted
  session: string; // Could be "Morning", "Afternoon", "Evening"
  time: string; // Add time field to Firestore (e.g., '14:00' for 2 PM)
  driveLink: string;
  pictureCredits?: string[];
}

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  useEffect(() => {
    const eventsQuery = query(
      collection(db, "events"),
      orderBy("date", "desc"),   // Sort events by date in descending order (latest first)
      orderBy("time", "desc")    // Sort events by time in descending order (latest first)
    );

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.eventTitle.toLowerCase().includes(search.toLowerCase());
    const matchesSession = selectedSession ? event.session === selectedSession : true;
    const matchesDate = selectedDate
      ? new Date(event.date).toDateString() === new Date(selectedDate).toDateString()
      : true;
    return matchesSearch && matchesSession && matchesDate;
  });

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-lime-400 mb-12"
      >
        Explore Events
      </motion.h1>

      {/* Filters */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 mb-12">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 text-gray-200 focus:ring-2 focus:ring-lime-500 outline-none"
        />
        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 text-gray-200 focus:ring-2 focus:ring-lime-500 outline-none"
        >
          <option value="">All Sessions</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <DatePicker
          onChange={(date) => setSelectedDate(date ? date.toDate() : null)}
          placeholder="Select Date"
          className="flex-1 p-3 rounded-lg bg-gray-800  focus:ring-2 focus:ring-lime-500 outline-none"
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
        />
        <button
          onClick={() => {
            setSearch("");
            setSelectedSession("");
            setSelectedDate(null);
          }}
          className="p-3 rounded-lg bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
        >
          Reset
        </button>
      </div>

      {/* Event List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-gray-900 text-gray-200 rounded-xl shadow-lg 
            p-6 flex flex-col space-y-4 transform hover:scale-105 transition-all relative"
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
                <span
                  key={idx}
                  className="text-sm text-gray-400"
                >
                  {credit}
                </span>
              ))}
            </div>
          )}
            
          </motion.div>
        ))}
      </motion.div>

      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-center mt-12"
        >
          No events found. Try adjusting your filters.
        </motion.div>
      )}

    </div>
  );
}

export default EventsPage;
