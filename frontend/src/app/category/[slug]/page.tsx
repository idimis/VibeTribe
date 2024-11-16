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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; 
  const encodedCategory = encodeURIComponent(category);
  

  console.log(`Base URL: ${baseUrl}`);
  console.log(`Encoded Category: ${encodedCategory}`);
  
  
  const res = await fetch(`${baseUrl}/api/v1/events?category=${encodedCategory}`);
  const data = await res.json();

 
  console.log("API Response:", data);

  
  if (!res.ok) throw new Error(`Failed to fetch events: ${data.message || "Unknown error"}`);
  return data;
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  
  const slugToCategoryMap: { [key: string]: string } = {
    music: "Music",
    nightlife: "Nightlife",
    "performance-arts": "Performance & Arts",
    holiday: "Holiday",
    "food-drink": "Food & Drink",
  };

  const categoryName = slugToCategoryMap[slug];

  
  console.log(`Slug: ${slug}`);
  console.log(`Category Name: ${categoryName}`);
  
  if (!categoryName) {
    console.error(`Invalid slug: ${slug}`);
    return notFound();
  }

  
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
