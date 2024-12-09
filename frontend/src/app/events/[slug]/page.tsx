"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { events } from "@/constants/events";
import Link from 'next/link';

interface EventPageProps {
  params: { slug: string };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const EventPage: React.FC<EventPageProps> = ({ params }) => {
  const [slug, setSlug] = useState<string>('');  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [eventId, setEventId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSlug = async () => {
      const paramsData = await params;  
      setSlug(paramsData.slug || '');  
    };
    fetchSlug();
  }, [params]);

  useEffect(() => {
    const fetchEventIdFromTitle = async () => {
      setLoading(true);
      try {
        const foundEvent = events.find(
          (event) =>
            event.title.toLowerCase().replace(/\s+/g, "-") === slug 
        );

        if (foundEvent) {
          const eventIndex = events.indexOf(foundEvent);
          const eventId = eventIndex + 1; 
          setEventId(eventId);
        } else {
          notFound(); 
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchEventIdFromTitle();
  }, [slug]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventId !== null) {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/api/v1/events/${eventId}`);
          const data = await response.json();

          if (data.success && data.data) {
            setEvent(data.data); 
          } else {
            notFound(); 
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          notFound(); 
        } finally {
          setLoading(false);
        }
      }
    };

    if (eventId !== null) {
      fetchEventDetails();
    }
  }, [eventId]);

  const formatDate = (dateString: string) => {
    
    const date = new Date(dateString);  
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-[1440px] mx-auto p-6">
        <div className="event-detail max-w-4xl mx-auto space-y-8">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Category: </span>
              {event.category}
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-600">
              <p>
                <span className="font-medium">Date: </span>
                {formatDate(event.dateTimeStart)}
              </p>
              <p>
                <span className="font-medium">Time: </span>
                {formatTime(event.dateTimeStart)} - {formatTime(event.dateTimeEnd)}
              </p>
            </div>
            <div className="text-gray-600">
              <p>
                <span className="font-medium">Location: </span>
                {event.location} ({event.locationDetails})
              </p>
            </div>
          </div>
          <div className="text-gray-700 space-y-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>{event.description}</p>
          </div>
          <div className="text-gray-600 space-y-4">
            <p>
              <span className="font-medium">Available Seats: </span>
              {event.availableSeats}
            </p>
            <p>
              <span className="font-medium">Fee: </span>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(event.fee)}
            </p>
          </div>
          {/* Buy Button Section */}
          <div className="mt-6">
            <div className="flex justify-center">
              <Link href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}/payment`}>
                <button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-300 transition duration-300">
                  Buy This Ticket
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EventPage;
