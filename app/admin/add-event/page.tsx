"use client"
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Assuming you export your firebase config as `db`
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; // For better error handling and notifications
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlus, AiOutlineCloseCircle } from 'react-icons/ai';
import moment from 'moment-timezone';

function Page() {
  const [formData, setFormData] = useState({
    user: '',
    eventTitle: '',
    session: 'Morning',
    driveLink: '',
    pictureCredits: [''],
  });
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.user.trim()) errors.user = 'User is required';
    if (!formData.eventTitle.trim()) errors.eventTitle = 'Event title is required';
    if (!formData.driveLink.trim()) errors.driveLink = 'Drive link is required';

    formData.pictureCredits.forEach((credit, index) => {
      if (!credit.trim()) errors[`pictureCredits-${index}`] = 'Picture credit is required';
    });

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Dynamically setting the current date and time in Asia/Kolkata timezone
    const currentDate = moment().tz('Asia/Kolkata');
    const date = currentDate.format('YYYY-MM-DD');
    const time = currentDate.format('HH:mm:ss');

    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...formData,
        date, // Set the dynamically updated date
        time, // Set the dynamically updated time
      });
      toast.success('Event added successfully!');
      console.log('Document written with ID: ', docRef.id);

      setFormData({
        user: '',
        eventTitle: '',
        session: 'Morning',
        driveLink: '',
        pictureCredits: [''],
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Failed to add event');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCredit = () => {
    setFormData({ ...formData, pictureCredits: [...formData.pictureCredits, ''] });
  };

  const handleCreditChange = (index: number, value: string) => {
    const credits = [...formData.pictureCredits];
    credits[index] = value;
    setFormData({ ...formData, pictureCredits: credits });
  };

  const handleRemoveCredit = (index: number) => {
    const credits = formData.pictureCredits.filter((_, i) => i !== index);
    setFormData({ ...formData, pictureCredits: credits });
  };

  return (
    <div className="bg-black p-8">
      <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-gray-200 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Add Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">User</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {error.user && <p className="text-red-500 text-sm">{error.user}</p>}
          </div>

          <div>
            <label className="block">Event Title</label>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {error.eventTitle && <p className="text-red-500 text-sm">{error.eventTitle}</p>}
          </div>

          <div>
            <label className="block">Session</label>
            <select
              name="session"
              value={formData.session}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>

          <div>
            <label className="block">Drive Link</label>
            <input
              type="url"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {error.driveLink && <p className="text-red-500 text-sm">{error.driveLink}</p>}
          </div>

          <div>
            <label className="block">Picture Credits</label>
            {formData.pictureCredits.map((credit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={credit}
                  onChange={(e) => handleCreditChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCredit(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineCloseCircle size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCredit}
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 mt-2"
            >
              <AiOutlinePlus />
              <span>Add Credit</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
