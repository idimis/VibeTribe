// events/[id].tsx
import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  locationDetails: string;
  category: string;
  fee: number;
  availableSeats: number;
  createdAt: string;
  updatedAt: string;
}

const fetchEventDetails = async (id: string): Promise<Event> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  const res = await fetch(`${baseUrl}/api/v1/events/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Event not found");
    }
    throw new Error("Failed to fetch event details");
  }

  const data = await res.json();
  return data.data; // Adjusted to match JSON response structure
};

const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const event = await fetchEventDetails(id);

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-[1440px] mx-auto p-6">
          <div className="event-detail max-w-4xl mx-auto space-y-8">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Category: </span>
                {event.category}
              </p>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-600">
                <p>
                  <span className="font-medium">Date: </span>
                  {event.date}
                </p>
                <p>
                  <span className="font-medium">Time: </span>
                  {event.timeStart} - {event.timeEnd}
                </p>
              </div>
              <div className="text-gray-600">
                <p>
                  <span className="font-medium">Location: </span>
                  {event.location} ({event.locationDetails})
                </p>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <h2 className="text-2xl font-semibold">Description</h2>
              <p>{event.description}</p>
            </div>
            <div className="text-gray-600 space-y-4">
              <p>
                <span className="font-medium">Available Seats: </span>
                {event.availableSeats}
              </p>
              <p>
                <span className="font-medium">Fee: </span>${event.fee.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-center">
              <Link href={`/payment?id=${event.id}`}>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300">
                  Book Now
                </button>
              </Link>
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
