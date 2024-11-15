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
      const response = await fetch(`/api/v1/event/${params.id}`);
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
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventPage;
