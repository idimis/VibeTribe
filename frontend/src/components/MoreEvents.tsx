"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const MoreEventSection: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Format date function (from EventPage)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time function (from EventPage)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/v1/events`);
        const data = await response.json();
        if (data.success && data.data) {
          setEvents(data.data.content); 
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="event-section p-6 max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="event-card bg-gray-200 animate-pulse border rounded-lg p-4"
              style={{ minHeight: "150px", maxHeight: "200px" }}
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          events.map((event: any) => (
            <Link
              key={event.id}
              href={`/events/${event.title.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="event-card bg-white border rounded-lg p-4 shadow-md transition-transform hover:scale-105">
                {/* Image or Placeholder */}
                <img
                  src={event.imageUrl}
                  alt={event.title || "Event Image"}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                
                <h3 className="font-bold">{event.title || "Untitled Event"}</h3>
                <p>{formatDate(event.dateTimeStart) || "No Date Available"}</p>
                <p className="text-sm text-gray-500">
                  {event.locationDetails || "No Address Available"}
                </p>
                {event.dateTimeStart && event.dateTimeEnd && (
                  <p className="text-sm text-gray-500">
                    {formatTime(event.dateTimeStart)} - {formatTime(event.dateTimeEnd)}
                  </p>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default MoreEventSection;
