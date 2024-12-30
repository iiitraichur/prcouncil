"use client";
import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const { confirm } = Modal;

function DeleteTestPage() {
  const [eventId, setEventId] = useState(""); // State for the input field

  const handleDelete = (eventId: string) => {
    confirm({
      title: "Are you sure you want to delete this event?",
      content: `Event ID: ${eventId}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        console.log("Attempting to delete event ID:", eventId);
        try {
          const docRef = doc(db, "events", eventId);
          console.log("Document reference:", docRef);
          await deleteDoc(docRef);
          message.success("Event deleted successfully!");
          setEventId(""); // Clear input after successful deletion
        } catch (error) {
          console.error("Error deleting event:", error);
          message.error("Failed to delete event.");
        }
      },
      onCancel() {
        console.log("Deletion canceled.");
        message.info("Event deletion canceled.");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Delete Event by ID</h1>

      {/* Input Field for Event ID */}
      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="p-2 rounded-lg text-black"
        />
        <Button
          type="primary"
          danger
          onClick={() => handleDelete(eventId)}
          disabled={!eventId.trim()}
        >
          Delete Event
        </Button>
      </div>

      <p className="text-gray-400 mt-6">
        Enter an event ID to test the delete functionality.
      </p>
    </div>
  );
}

export default DeleteTestPage;
