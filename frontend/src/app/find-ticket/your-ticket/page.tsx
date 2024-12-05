// src/app/your-ticket/page.tsx

'use client';

import React from "react";
import { useRouter } from "next/navigation";

const YourTicketPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Your Ticket</h1>
        <p className="text-center">Congratulations! Your ticket has been successfully purchased.</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourTicketPage;
