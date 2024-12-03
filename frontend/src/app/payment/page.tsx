"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  if (!eventId) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold text-red-600 text-center">Event ID is missing</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Payment Page</h1>
        <div className="text-center text-gray-600 space-y-4">
          <p className="text-lg">You are booking for Event ID: <span className="font-semibold">{eventId}</span></p>
          <p>Fill in your payment details below to complete your booking.</p>
        </div>
        <form className="max-w-md mx-auto mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              Pay Now
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;