import React, { useEffect, useState } from "react";
import Link from "next/link"; 

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  fee: number;
}

const MoreEventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:8080/api/v1/events");
      const data = await response.json();
      setEvents(data.data.content);  
    };

    fetchEvents();
  }, []);

  return (
    <section className="more-events-section p-6 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">More Events Around Indonesia</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {events.map((event) => (
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
