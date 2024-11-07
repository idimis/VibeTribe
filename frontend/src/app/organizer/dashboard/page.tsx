"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface EventData {
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch event data on mount
  useEffect(() => {
    const storedData = localStorage.getItem('eventData');
    if (storedData) {
      setEventData(JSON.parse(storedData));
      setLoading(false);
    } else {
      setLoading(false);
      router.push('/organizer'); // Redirect to organizer page if no event data
    }
  }, [router]);

  if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;
  if (!eventData) return <div className="text-center p-10 text-xl text-red-500">Error: Event data not found.</div>;

  const renderEventDetail = (label: string, value: any) => {
    return (
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-lg font-medium text-gray-800">{value || 'Not provided'}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">Event Dashboard</h1>

      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Event Details</h2>

        {/* Dynamically render event details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(eventData).map(([key, value]) => (
            key !== 'id' && (
              <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                {renderEventDetail(
                  key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the label
                  value
                )}
              </div>
            )
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-8 flex justify-center space-x-6">
          <button
            onClick={() => alert('Coming soon!')}
            className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Edit Event
          </button>
          <button
            onClick={() => router.push('/organizer')}
            className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300"
          >
            Go to Organizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
