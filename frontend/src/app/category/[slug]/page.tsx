import React from "react";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";


interface Event {
  id: number;
  image_url: string;
  title: string;
  date: string;
  location: string;
  category: string;
}


const fetchEventsByCategory = async (category: string): Promise<Event[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""; 
  const res = await fetch(`${baseUrl}/api/v1/events?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1); 

  
  const validCategories = ["Music", "Nightlife", "Performing & Visual Arts", "Holidays", "Food & Drinks"];
  if (!validCategories.includes(categoryName)) return notFound(); 

  
  const events = await fetchEventsByCategory(categoryName);

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{categoryName} Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
