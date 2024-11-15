"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const dummyEvents = [
  { id: 1, title: "Concert at Bandung Convention Center", date: "November 10, 2024" },
  { id: 2, title: "Food Festival at Braga Street", date: "November 12, 2024" },
  { id: 3, title: "Art Exhibition at Saung Angklung Udjo", date: "November 14, 2024" },
  { id: 4, title: "Theater Performance at Taman Budaya", date: "November 15, 2024" },
  { id: 5, title: "Live Music Night at Riau Street", date: "November 16, 2024" },
  { id: 6, title: "Jazz Festival in Jakarta", date: "November 17, 2024" },
  { id: 7, title: "Culinary Fair in Yogyakarta", date: "November 18, 2024" },
  { id: 8, title: "Tech Conference in Surabaya", date: "November 19, 2024" },
];

const EventSection: React.FC = () => {
  const [location, setLocation] = useState<string>("Bandung");
  const [events, setEvents] = useState(dummyEvents);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Simulasi request event ke server
        setTimeout(() => setEvents(dummyEvents), 1000); // Placeholder delay
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation("Bandung"); // Atur lokasi berdasarkan hasil geolocation
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [location]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setEvents(
      dummyEvents.filter((ev) =>
        ev.title.toLowerCase().includes(searchTerm)
      )
    );
  };

  return (
    <section className="event-section p-6 max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Events in {location}</h2>
      
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder={`Search events in ${location}`}
          className="border rounded-md p-2 w-full"
          onChange={handleSearch}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
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
          events.map((event) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <div
                className="event-card bg-white border rounded-lg p-4 shadow-md transition-transform hover:scale-105"
                style={{ minHeight: "150px", maxHeight: "200px" }}
              >
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.date}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default EventSection;
