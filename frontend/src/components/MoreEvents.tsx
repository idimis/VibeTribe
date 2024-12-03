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
  paymentUrl: string; // Add this field to the event interface
}

const MoreEventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");

  const getUserLocation = () => {
    return "Bandung"; // You can add geolocation logic here if needed
  };

  useEffect(() => {
    const location = getUserLocation();
    setUserLocation(location);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/events?excludeLocation=Bandung`
        );
        const data = await response.json();
        setEvents(data.data.content); // Set the fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userLocation) {
      fetchEvents(); // Fetch events only after user location is set
    }
  }, [userLocation]);

  return (
    <section className="more-events-section p-6 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        More Events Around Indonesia
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event.id} className="event-card bg-white border rounded-lg p-4 shadow-md transition-transform hover:scale-105">
            <Link href={`/events/${event.title.replace(/\s+/g, '-').toLowerCase()}`}>
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.date}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
            </Link>
            {/* Render Buy button if paymentUrl exists */}
            {event.paymentUrl && (
              <a
                href={event.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Buy Ticket for {event.title}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreEventsSection;
