import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

interface EventPageProps {
  params: { id: string };
}

const EventPage: React.FC<EventPageProps> = ({ params }) => {
  const [event, setEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    const fetchEvent = async () => {
<<<<<<< HEAD
      const response = await fetch(`http://localhost:8080/api/v1/event/${params.id}`);
=======
      const response = await fetch(`/api/v1/event/${params.id}`);
>>>>>>> c9278b0a7b704f943b7eb94a798bd1bb5aeebe46
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-detail">
<<<<<<< HEAD
      <h1>{event.title || "Event Title Not Available"}</h1>
      <p>{event.date || "Date Not Available"}</p>
      <p>{event.location || "Location Not Available"}</p>
      <p>{event.description || "No Description Available"}</p>
=======
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
>>>>>>> c9278b0a7b704f943b7eb94a798bd1bb5aeebe46
    </div>
  );
};

export default EventPage;
