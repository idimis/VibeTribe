"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
}

const LocationEventsPage: React.FC = () => {
  const router = useRouter();
  const { location } = router.query;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!location) return; // Do nothing if location is not available

    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/v1/events?location=${location}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Events in {location}</h1>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </li>
          ))
        ) : (
          <p>No events found for this location.</p>
        )}
      </ul>
    </div>
  );
};

export default LocationEventsPage;
