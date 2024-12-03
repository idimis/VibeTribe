"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { cities } from "@/constants/cities";
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

interface LocationPageProps {
  params: { slug: string }; // This will contain the dynamic slug parameter
}

const LocationPage: React.FC<LocationPageProps> = ({ params }) => {
  const { slug } = params;  // Access the slug from params
  const [locationEvents, setLocationEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      setLoading(true);
      try {
        console.log('Fetching events for location:', slug);  // Debug: Log slug

        // Check if the location exists in the cities array
        const foundLocation = cities.find(
          (city) => city.toLowerCase().replace(/\s+/g, "-") === slug
        );

        console.log('Found location:', foundLocation);  // Debug: Log foundLocation

        if (foundLocation) {
          // Make the request to get the location events by name (slug)
          const response = await fetch(`${BASE_URL}/api/v1/events?location=${foundLocation}`);
          const data = await response.json();

          console.log('API response:', data);  // Debug: Log API response

          if (data.success && data.data) {
            setLocationEvents(data.data); // Set the location events
          } else {
            notFound(); // If location events not found, show a 404
          }
        } else {
          notFound(); // If location is not found in cities, show a 404
        }
      } catch (error) {
        console.error("Error fetching location events:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchLocationDetails();
    }
  }, [slug]); // Re-run the effect when the slug changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (locationEvents.length === 0) {
    return <div>No events found for this location</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-[1440px] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Events in {slug}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locationEvents.map((event) => (
            <div
              key={event.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-500">{event.locationDetails}</p>
              <p className="text-sm text-blue-600">
                {new Date(event.date).toLocaleDateString()} | {event.timeStart} - {event.timeEnd}
              </p>
              <Link href={`/event/${event.id}`} passHref>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">See Details</button>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LocationPage;
