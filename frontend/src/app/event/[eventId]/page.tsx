"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const EventPage = () => {
  const [isMounted, setIsMounted] = useState(false); 
  const [event, setEvent] = useState<any | null>(null);
  const [seatsAvailable, setSeatsAvailable] = useState(50); 
  const [isPaid, setIsPaid] = useState(false);

 
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
  
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (eventId) {
      setEvent({
        id: eventId,
        name: `Event ${eventId}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2024-12-01',
        location: 'Venue XYZ, City ABC',
        price: 100,
      });
    }
  }, [eventId]);

  const handlePayment = () => {
    setIsPaid(true);
    alert('Payment successful!');
  };

  const handleCancel = () => {
    router.push("/"); 
  };

  
  if (!isMounted || !event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">{event.name}</h2>
        <p className="text-gray-600 text-lg mb-4">{event.description}</p>
        <p className="font-semibold text-lg text-gray-700">Date: {event.date}</p>
        <p className="font-semibold text-lg text-gray-700">Location: {event.location}</p>
        <p className="font-semibold text-lg text-gray-700">Price: ${event.price}</p>

        <div className="mt-6">
          <p className="text-gray-600">Seats Available: {seatsAvailable}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Pay Now
          </button>
        </div>

        {isPaid && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            <p>Your payment was successful!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
