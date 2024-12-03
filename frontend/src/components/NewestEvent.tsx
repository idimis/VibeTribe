import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  locationDetails: string;
  category: string;
  fee: number;
  availableSeats: number;
}

const NewestEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewestEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/events/create" 
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const data = await response.json();
        setEvents(data.data.content); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching newest events:", error);
        setLoading(false);
      }
    };

    fetchNewestEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading events...</p>
      </div>
    );
  }

  return (
    <section className="newest-events-section p-6 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
        Newest Events
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <div
              className="event-card bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
              style={{ minHeight: "200px", maxHeight: "300px" }}
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="rounded-md mb-4 w-full object-cover h-40"
              />
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {event.date} | {event.timeStart} - {event.timeEnd}
              </p>
              <p className="text-sm text-gray-600 mt-2">{event.location}</p>
              <p className="text-sm text-green-500 font-medium">
                Fee: {event.fee === 0 ? "Free" : `Rp ${event.fee}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewestEvent;
