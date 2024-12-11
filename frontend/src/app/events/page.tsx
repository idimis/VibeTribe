"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";  

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/events");
        const result = await response.json();

        if (result.success) {
          const currentDate = new Date();
          const upcomingEvents = result.data.content.filter(
            (event: any) => new Date(event.dateTimeEnd) > currentDate
          );
          const pastEvents = result.data.content.filter(
            (event: any) => new Date(event.dateTimeEnd) <= currentDate
          );

          setEvents(upcomingEvents);
          setPastEvents(pastEvents);
        } else {
          setError(result.message || "Failed to load events.");
        }
      } catch (err) {
        setError("Error fetching events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>
      
      {isLoading ? (
        <div className="text-center">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.title.replace(/\s+/g, '-').toLowerCase()}`}  
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                    <p className="text-gray-700 text-sm mb-4">{event.location}</p>
                    <p className="text-gray-500 text-sm">{event.description}</p>
                    <div className="text-gray-500 text-sm mt-4">
                      <span>Seats: {event.availableSeats}</span> | <span>{new Date(event.dateTimeStart).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          
        </>
      )}
    </div>
  );
};

export default EventsPage;
