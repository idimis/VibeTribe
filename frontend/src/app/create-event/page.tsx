"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/public/logo2.png';
import EventImage from '@/public/concert.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

const CreateEvent: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isPaidEvent, setIsPaidEvent] = useState(false);
  const [promotion, setPromotion] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleNextStep = () => setStep(2);
  const handleCancel = () => {
    // Reset form values
    setStep(1);
    setIsPaidEvent(false);
    setPromotion('');
  };

  const handleProceed = (event: React.FormEvent) => {
    event.preventDefault();
    // Redirect to /organizer/dashboard after submission
    router.push('/organizer/dashboard');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-light-gray p-4 md:p-8 w-full">
      <header className="flex items-center justify-between w-full max-w-full mb-10">
        <Image src={Logo} alt="Logo" width={120} height={120} />
        <nav className="flex flex-col md:flex-row">
          <Link href="/signup" className="text-purple-600 hover:underline mx-2 md:mx-4">Get Started for Free</Link>
          <Link href="/contact-sales" className="text-purple-600 hover:underline mx-2 md:mx-4">Contact Sales</Link>
        </nav>
      </header>

      {step === 1 ? (
        // Step 1: Intro Section
        <section className="flex flex-col items-center bg-white rounded-lg p-6 w-full max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4 text-center">Where Event Organizers Grow</h1>
          <p className="text-gray-700 text-center mb-6">
            The all-in-one ticketing and discovery platform trusted by millions of organizers and attendees worldwide.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-purple-500 mb-4 text-center">You Are Free To Grow</h2>
          <p className="text-gray-700 mb-6 text-center">
            It’s free to publish unlimited events and sell unlimited tickets.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold text-purple-500 mb-4 text-center">Launch Your Next Event</h3>
          <p className="text-gray-700 text-center mb-6">
            Event hosting made easy. Easily create events for free on a platform that attendees love and trust.
          </p>

          <div className="relative mb-6 w-full">
            <Image src={EventImage} alt="Event Example" layout="responsive" width={500} height={300} className="rounded-lg" />
          </div>

          <button
            onClick={handleNextStep}
            className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Create Event
          </button>
        </section>
      ) : (
        // Step 2: Event Creation Form
        <section className="flex flex-col items-center bg-white rounded-lg p-6 w-full max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4 text-center">Create Your Event</h1>

          <form onSubmit={handleProceed} className="w-full space-y-6">
            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Event Name</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter event name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Date</label>
                <input type="date" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Time</label>
                <input type="time" className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Location</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Event location" />
            </div>

            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Description</label>
              <textarea className="w-full border rounded-lg p-2" placeholder="Event description"></textarea>
            </div>

            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Available Seats</label>
              <input type="number" className="w-full border rounded-lg p-2" placeholder="Number of seats" />
            </div>

            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Event Type</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="eventType" checked={!isPaidEvent} onChange={() => setIsPaidEvent(false)} />
                  <span className="ml-2">Free Event</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="eventType" checked={isPaidEvent} onChange={() => setIsPaidEvent(true)} />
                  <span className="ml-2">Paid Event</span>
                </label>
              </div>
            </div>

            {isPaidEvent && (
              <div className="mb-6">
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Ticket Price (IDR)</label>
                <input type="number" className="w-full border rounded-lg p-2" placeholder="Enter price" />
              </div>
            )}

            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Ticket Types</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g., General, VIP" />
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-purple-500 mb-2">Promotions & Discounts</h4>
              <p className="text-gray-600 mb-2">Apply discount vouchers for specific referrals or date-based discounts.</p>
              <label className="block text-gray-700">Discount Code (optional)</label>
              <input type="text" value={promotion} onChange={(e) => setPromotion(e.target.value)} className="w-full border rounded-lg p-2" placeholder="Enter discount code" />
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              >
                Proceed
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <footer className="mt-10 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Event Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default CreateEvent;
