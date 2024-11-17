"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const EventSection: React.FC = () => {
  const [location, setLocation] = useState<string>("Bandung");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/events?location=Bandung`
        );
        const data = await response.json();
        console.log(data); 
        setEvents(data.data.content); 
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        
        setLocation("Bandung");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [location]);

  return (
    <section className="event-section p-6 max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        Nearby Events in {location}
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
            <Link key={event.id} href={`/event/${event.id}`}>
              <div
                className="event-card bg-white border rounded-lg p-4 shadow-md transition-transform hover:scale-105"
                style={{ minHeight: "150px", maxHeight: "200px" }}
              >
                <h3 className="font-bold">{event.title || "Untitled Event"}</h3>
                <p>{event.date || "No Date Available"}</p>
            
                <p className="text-sm text-gray-500">{event.locationDetails || "No Address Available"}</p>
                <p className="text-sm text-gray-500">{event.timeStart || "No Time Available"}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default EventSection;
