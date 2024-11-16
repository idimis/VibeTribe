
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  fee: number;
}

const EventPage: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const response = await fetch(`/api/event/${id}`); 
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.error("Event not found");
        }
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-detail p-6 max-w-[800px] mx-auto">
      <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-xl text-gray-600">{event.date}</p>
      <p className="text-sm text-gray-500">{event.location}</p>
      <p className="mt-4">{event.description}</p>
      <p className="mt-4 text-lg font-semibold">Fee: ${event.fee}</p>
    </div>
  );
};

export default EventPage;
