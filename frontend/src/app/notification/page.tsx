// pages/notification.tsx
import React from 'react';
import { useRouter } from 'next/router';

const NotificationPage = () => {
  const router = useRouter();

  const handleGoToProfile = () => {
    router.push('/user/profile'); // Navigate to profile page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Your event has been successfully booked!</p>
        <p className="text-lg text-gray-700 mb-6">You can now view your event details in your profile.</p>
        <button
          onClick={handleGoToProfile}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
