import React from "react";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Event {
  id: number;
  image_url: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  fee: number;
}

const fetchEventsByCategory = async (category: string): Promise<Event[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  const encodedCategory = encodeURIComponent(category);

  const res = await fetch(`${baseUrl}/api/v1/events?category=${encodedCategory}`);
  const data = await res.json();

  if (!res.ok) throw new Error(`Failed to fetch events: ${data.message || "Unknown error"}`);
  return data.data.content;
};

// Make sure params are awaited before usage
const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  // Await params first before accessing them
  const { slug } = params;

  const slugToCategoryMap: { [key: string]: string } = {
    music: "Music",
    nightlife: "Nightlife",
    "performance-arts": "Performance & Arts",
    holiday: "Holiday",
    "food-drink": "Food & Drink",
  };

  const categoryName = slugToCategoryMap[slug];

  if (!categoryName) {
    console.error(`Invalid slug: ${slug}`);
    return notFound();
  }

  // Fetch events after category is determined
  const events = await fetchEventsByCategory(categoryName);

  return (
    <div>
      <Header />
      <main className="max-w-[1440px] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{categoryName} Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
