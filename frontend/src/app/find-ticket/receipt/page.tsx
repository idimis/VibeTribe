"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const ConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("id");
  const quantity = parseInt(searchParams.get("quantity") || "");
  const transactionId = searchParams.get("transactionId");
  const voucher = parseInt(searchParams.get("voucher") || "");
  const points = parseInt(searchParams.get("points") || "");
  const fee = parseFloat(searchParams.get("fee") || "");
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/v1/events/${eventSlug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setEvent(data.data);
        } else {
          console.error("Event not found or API error");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventSlug) {
      fetchEventDetails();
    }
  }, [eventSlug]);

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
        <div className="receipt max-w-4xl mx-auto space-y-8">
          {/* Confirmation Page Header */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-blue-600">Payment Success!</h1>
            <p className="mt-4 text-lg text-gray-700">Thank you for your payment! Here are your ticket details:</p>
          </div>

          {/* Event Title */}
          <div className="text-center my-4">
            <h2 className="text-3xl font-semibold text-gray-800">{event.title}</h2>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Event Details</h3>
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

          {/* Transaction Details */}
          <div className="bg-gray-100 p-4 rounded-lg space-y-4 my-4">
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
            <span>Voucher Applied:</span>
            <span>{voucher ? `${voucher}% Off` : '0% Off'}</span>
            </div>
            <div className="flex justify-between">
              <span>Points Used:</span>
              <span>{points ? `${points} Points` : 'No Points Used'}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Event Fee:</span>
              <span>{fee ? fee : 'N/A'}</span>
            </div>
            <div className="flex justify-between font-semibold">
  <span>Total:</span>
  <span>
    {Number(fee) * Number(quantity) - (points ? Number(points) : 0)}
  </span>
</div>

          </div>

          {/* Payment Confirmation */}
<div className="text-center mt-8">
  <p className="text-lg text-gray-700 mt-4">
    <span className="font-bold text-xl">Thank you for trusting us!</span><br />
    We appreciate your support and are excited to have you as part of this event!<br /><br />

    <span className="text-lg font-medium">Transaction ID:</span> <strong>{transactionId}</strong><br /><br />

    <span className="text-sm text-gray-600">
      You can use this Transaction ID for tracking, future references, or customer support inquiries.<br />
      Please keep this information safe, as it may be helpful in case of any issues related to your booking.
    </span>
  </p>

  <div className="mt-6">
    <a href="/" className="text-blue-600 font-semibold hover:underline">Return to Homepage</a>
  </div>
</div>
</div>
</main>
<Footer />
</div>
);
};

export default ConfirmationPage;
