"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditOrganizerProfilePage: React.FC = () => {
  const router = useRouter();

  // Define the organizer profile state, initialized with example data or fetched data
  const [user, setUser] = useState({
    name: 'John Doe',
    dob: '1990-01-01',
    email: 'johndoe@example.com',
    phone: '+628123456789',
    website: 'https://example.com',
    address: 'Jl. Example No. 123, Jakarta',
    events: [
      { name: 'Tech Conference 2024', role: 'Speaker', date: '2024-12-10', status: 'Confirmed' },
      { name: 'Community Meetup', role: 'Participant', date: '2024-11-20', status: 'Pending' },
    ],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('organizer');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...user, ...parsedUser, events: parsedUser.events || [] });
      } catch (error) {
        console.error("Error parsing organizer data:", error);
      }
    }
  }, []);

  // Handle input changes for each profile field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle event status change
  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedEvents = user.events?.map((event, i) =>
      i === index ? { ...event, status: newStatus } : event
    ) || [];
    setUser((prevUser) => ({ ...prevUser, events: updatedEvents }));
  };

  // Save profile to local storage or backend (for simplicity, using local storage)
  const handleSaveProfile = () => {
    localStorage.setItem('organizer', JSON.stringify(user));
    alert("Organizer profile updated successfully!");
    router.push('/organizer/profile'); // Redirect to the profile page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Edit Organizer Profile</h2>

        {/* Profile form */}
        <div className="space-y-6">
          {['name', 'dob', 'email', 'phone', 'website', 'address'].map((field, idx) => (
            <div key={idx}>
              <label htmlFor={field} className="font-semibold text-lg text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'dob' ? 'date' : 'text'}
                id={field}
                name={field}
                value={user[field as keyof typeof user] as string}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Event participation details */}
          <div>
            <p className="font-semibold text-lg text-gray-700">Manage Events:</p>
            <div className="space-y-4">
              {user.events?.map((event, index) => (
                <div key={index} className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-md text-gray-700">{event.name}</p>
                  <p className="text-gray-600">Role: {event.role}</p>
                  <p className="text-gray-600">Date: {event.date}</p>
                  <label htmlFor={`status-${index}`} className="text-gray-600">Status:</label>
                  <select
                    id={`status-${index}`}
                    value={event.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="ml-2 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSaveProfile}
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>

          {/* Cancel button */}
          <button
            onClick={() => router.push('/organizer/profile')}
            className="w-full py-3 mt-2 bg-gray-400 text-white text-lg font-semibold rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>

          {/* Create Event button */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/create-event')}
              className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrganizerProfilePage;
