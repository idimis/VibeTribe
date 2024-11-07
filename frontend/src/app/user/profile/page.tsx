"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    dob: '1990-01-01',
    email: 'johndoe@example.com',
    phone: '+628123456789',
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        setUser({
          ...parsedUser,
          events: parsedUser.events || [],
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">User Profile</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-lg text-gray-700">Name:</p>
            <p className="text-gray-600">{user.name}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Date of Birth:</p>
            <p className="text-gray-600">{user.dob}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Phone:</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">Upcoming Events:</p>
            <div className="space-y-4">
              {user.events && user.events.length > 0 ? (
                user.events.map((event, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-300 pt-4"
                  >
                    <p className="font-semibold text-md text-gray-700">{event.name}</p>
                    <p className="text-gray-600">Role: {event.role}</p>
                    <p className="text-gray-600">Date: {event.date}</p>
                    <p
                      className={`text-sm font-medium ${
                        event.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
                      }`}
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

          <div className="text-center">
            <button
              onClick={() => router.push('/user/edit')}
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
