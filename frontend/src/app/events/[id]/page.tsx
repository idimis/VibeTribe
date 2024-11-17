// events/[id].tsx
import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  fee: number;
}

const fetchEventDetails = async (id: string): Promise<Event> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  
  console.log(`Fetching event details from: ${baseUrl}/api/v1/events/${id}`);
  
  const res = await fetch(`${baseUrl}/api/v1/events/${id}`);
  
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Event not found");
    }
    throw new Error("Failed to fetch event details");
  }

  return await res.json();
};


const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const event = await fetchEventDetails(id);

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-[1440px] mx-auto p-6">
          <div className="event-detail max-w-3xl mx-auto space-y-6">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-72 object-cover rounded-lg mb-6 shadow-lg"
            />
            <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
            <div className="flex justify-between items-center text-gray-600">
              <p className="text-lg">{event.date}</p>
              <p className="text-sm">{event.location}</p>
            </div>
            <div className="mt-4 text-gray-700">
              <p>{event.description}</p>
            </div>
            <div className="mt-4 text-xl font-bold text-purple-600">
              <span>Fee: </span>${event.fee}
            </div>
            <div className="mt-6 flex justify-center">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching event details:", error);
    return notFound();
  }
};

export default EventPage;
