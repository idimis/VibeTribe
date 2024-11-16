// EventPage.tsx (Server-side rendering)

import React from "react";
import { notFound } from "next/navigation";

// Define the Event interface
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  fee: number;
}

// Function to fetch event details
const fetchEventDetails = async (id: string): Promise<Event> => {
  // Use the full URL for the API endpoint
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; 
  const res = await fetch(`${baseUrl}/api/event/${id}`);

  // If the response is not okay, throw an error
  if (!res.ok) {
    throw new Error("Event not found");
  }

  return await res.json(); // Return the event data
};

const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Fetch the event details
    const event = await fetchEventDetails(id);

    // Return the JSX for the event page
    return (
      <div className="event-detail p-6 max-w-[800px] mx-auto">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-xl text-gray-600">{event.date}</p>
        <p className="text-sm text-gray-500">{event.location}</p>
        <p className="mt-4">{event.description}</p>
        <p className="mt-4 text-lg font-semibold">Fee: ${event.fee}</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound(); 
  }
};

export default EventPage;
