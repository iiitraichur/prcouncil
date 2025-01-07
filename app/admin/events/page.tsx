"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineLink } from "react-icons/ai";
import { DatePicker, Input, message } from "antd";
import '@ant-design/v5-patch-for-react-19';
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Event {
  id: string;
  eventTitle: string;
  user: string;
  date: string;
  session: string;
  time: string;
  driveLink: string;
  pictureCredits?: string[];
}

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [deleteEvent, setDeleteEvent] = useState<Event | null>(null);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [deleteAttempts, setDeleteAttempts] = useState<number>(0);
  const [lastDeleteTime, setLastDeleteTime] = useState<Date | null>(null);

  useEffect(() => {
    const eventsQuery = query(
      collection(db, "events"),
      orderBy("date", "desc"),
      orderBy("time", "desc")
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

  const handleDelete = async () => {
    const now = new Date();

    if (deleteAttempts >= 2) {
      if (lastDeleteTime && now.getTime() - lastDeleteTime.getTime() < 3600000) {
        message.error("You can only delete 2 events per hour. Please try again later.");
        return;
      } else {
        setDeleteAttempts(0); // Reset attempts after 1 hour
      }
    }

    if (deleteEvent && confirmationInput === deleteEvent.eventTitle) {
      try {
        await deleteDoc(doc(db, "events", deleteEvent.id));
        setDeleteAttempts((prev) => prev + 1);
        setLastDeleteTime(now);
        message.success(`Event deleted successfully! Attempts left: ${1 - deleteAttempts}`);
      } catch (error) {
        console.error("Error deleting event: ", error);
        message.error("Failed to delete event.");
      } finally {
        setDeleteEvent(null);
        setConfirmationInput("");
      }
    } else {
      message.error("Event title does not match. Please try again.");
    }
  };

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
          className="flex-1 p-3 rounded-lg bg-gray-800 focus:ring-2 focus:ring-lime-500 outline-none"
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

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {filteredEvents.map((event, index) => (
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
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setDeleteEvent(event)}
                className="p-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-400 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {deleteEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-lime-400 mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              To confirm deletion, type the event title <span className="font-bold">{deleteEvent.eventTitle}</span> below:
            </p>
            {deleteAttempts >= 2 && lastDeleteTime && new Date().getTime() - lastDeleteTime.getTime() < 3600000 ? (
              <p className="text-red-500 text-sm mb-4">
                You can only delete 2 events per hour. Please try again later.
              </p>
            ) : null}
            <Input
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder="Enter event title"
              className="mb-4 p-3 rounded-lg bg-gray-800 text-gray-600"
              disabled={deleteAttempts >= 2 && lastDeleteTime !== null && new Date().getTime() - lastDeleteTime.getTime() < 3600000}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteEvent(null)}
                className="p-2 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-400"
                disabled={deleteAttempts >= 2 && lastDeleteTime !== null && new Date().getTime() - lastDeleteTime.getTime() < 3600000}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
