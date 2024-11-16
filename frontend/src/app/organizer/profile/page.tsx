"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OrganizerProfilePage: React.FC = () => {
  const [organizer, setOrganizer] = useState({
    name: 'John Doe',
    dob: '1990-01-01',
    email: 'johndoe@example.com',
    phone: '+628123456789',
    website: 'https://example.com',
    address: '123 Event St, Cityville',
    events: [
      {
        name: 'Tech Conference 2024',
        role: 'Speaker',
        date: '2024-12-10',
        status: 'Confirmed',
      },
      {
        name: 'Community Meetup',
        role: 'Participant',
        date: '2024-11-20',
        status: 'Pending',
      },
    ],
  });

  const router = useRouter();

  // Fetching the organizer data from localStorage if exists
  useEffect(() => {
    const storedOrganizer = localStorage.getItem('organizer');
    if (storedOrganizer) {
      try {
        const parsedOrganizer = JSON.parse(storedOrganizer);
        setOrganizer((prev) => ({
          ...parsedOrganizer,
          events: parsedOrganizer.events || [],
        }));
      } catch (error) {
        console.error("Error parsing organizer data:", error);
      }
    }
  }, []);

  // Handling change of profile fields
  const handleChange = (field: string, value: string) => {
    setOrganizer((prev) => {
      const updatedOrganizer = { ...prev, [field]: value };
      localStorage.setItem('organizer', JSON.stringify(updatedOrganizer)); // Store to localStorage
      return updatedOrganizer;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Organizer Profile</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-lg text-gray-700">Name:</p>
            <input
              type="text"
              value={organizer.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Date of Birth:</p>
            <input
              type="date"
              value={organizer.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Email:</p>
            <input
              type="email"
              value={organizer.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Phone:</p>
            <input
              type="text"
              value={organizer.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Website:</p>
            <input
              type="url"
              value={organizer.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Address:</p>
            <input
              type="text"
              value={organizer.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Upcoming Events:</p>
            <div className="space-y-4">
              {organizer.events && organizer.events.length > 0 ? (
                organizer.events.map((event, index) => (
                  <div key={index} className="border-t border-gray-300 pt-4">
                    <p className="font-semibold text-md text-gray-700">{event.name}</p>
                    <p className="text-gray-600">Role: {event.role}</p>
                    <p className="text-gray-600">Date: {event.date}</p>
                    <p
                      className={`text-sm font-medium ${event.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}
                    >
                      Status: {event.status}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No upcoming events.</p>
              )}
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => router.push('/organizer/edit')}
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>

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

export default OrganizerProfilePage;
