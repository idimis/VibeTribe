"use client";

import React from "react";
import Link from "next/link"; // Use Next.js Link for routing

const moreEventsData = [
  { id: 6, title: "Jazz Festival in Jakarta", date: "November 17, 2024" },
  { id: 7, title: "Culinary Fair in Yogyakarta", date: "November 18, 2024" },
  { id: 8, title: "Tech Conference in Surabaya", date: "November 19, 2024" },
  { id: 9, title: "Film Screening in Bali", date: "November 20, 2024" },
  { id: 10, title: "Outdoor Music Fest in Medan", date: "November 21, 2024" },
  { id: 11, title: "Book Fair in Jakarta", date: "November 22, 2024" },
  { id: 12, title: "Fashion Show in Bandung", date: "November 23, 2024" },
  { id: 13, title: "Gaming Expo in Bali", date: "November 24, 2024" },
];

const MoreEventsSection: React.FC = () => {
  const displayedEvents = moreEventsData.slice(0, 8);

  return (
    <section className="more-events-section p-6 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">More Events Around Indonesia</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedEvents.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <div
              className="event-card bg-white border rounded-lg p-4 shadow-md transition-transform hover:scale-105"
              style={{ minHeight: "150px", maxHeight: "200px" }}
            >
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MoreEventsSection;
