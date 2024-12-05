"use client";

import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { events } from "@/constants/events"; 

interface PaymentPageProps {
  params: { slug: string };
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const [slug, setSlug] = useState<string>(""); 
  const [event, setEvent] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    paymentMethod: "",
  });
  const router = useRouter();

  // Use useEffect to load the slug
  useEffect(() => {
    setSlug(params.slug || "");
  }, [params]);

  // Fetch event based on slug
  useEffect(() => {
    const fetchEvent = async () => {
      const foundEvent = events.find(
        (event) => event.title.toLowerCase().replace(/\s+/g, "-") === slug
      );

      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        notFound(); 
      }
      setLoading(false);
    };
    fetchEvent();
  }, [slug]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const paymentResponse = { success: true };

      if (paymentResponse.success) {
        router.push(`/find-ticket/your-ticket`);
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
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
                {event.date}
              </p>
              <p>
                <span className="font-medium">Time: </span>
                {event.timeStart} - {event.timeEnd}
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
            <h2 className="text-2xl font-semibold">Confirm Your Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p>
                  <span className="font-medium">Event Fee: </span>${event.fee.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-300 transition duration-300"
                >
                  Confirm Payment
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
