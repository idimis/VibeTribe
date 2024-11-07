"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo2.png';

const OrganizerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="flex items-center justify-between w-full max-w-7xl mb-8">
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <nav className="flex gap-4">
          <Link href="/create-event" className="text-purple-600 hover:underline">Create New Event</Link>
          <Link href="/events" className="text-purple-600 hover:underline">My Events</Link>
          <Link href="/analytics" className="text-purple-600 hover:underline">Analytics</Link>
        </nav>
      </header>

      {/* Event Creation Section */}
      <section className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Quick Event Creation</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 font-semibold">Event Name</label>
            <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Enter event name" />
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Location</label>
            <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Event location" />
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Date</label>
            <input type="date" className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Time</label>
            <input type="time" className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div className="col-span-full">
            <label className="text-gray-700 font-semibold">Description</label>
            <textarea className="w-full border rounded-lg p-2 mt-1" placeholder="Event description"></textarea>
          </div>
          <button type="submit" className="col-span-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-lg transition mt-4">
            Create Event
          </button>
        </form>
      </section>

      {/* Dashboard Section */}
      <section className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statistics Panel */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Event Statistics</h2>
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Views</span>
                <span className="text-lg font-semibold">1,238</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Purchases</span>
                <span className="text-lg font-semibold">542</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Likes</span>
                <span className="text-lg font-semibold">421</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shares</span>
                <span className="text-lg font-semibold">84</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Recent Transactions</h2>
            <ul className="text-gray-700 space-y-3">
              <li className="flex justify-between">
                <span>Order #1234</span>
                <span className="font-semibold">IDR 250,000</span>
              </li>
              <li className="flex justify-between">
                <span>Order #1235</span>
                <span className="font-semibold">IDR 180,000</span>
              </li>
              <li className="flex justify-between">
                <span>Order #1236</span>
                <span className="font-semibold">IDR 300,000</span>
              </li>
              <li className="flex justify-between">
                <span>Order #1237</span>
                <span className="font-semibold">IDR 75,000</span>
              </li>
            </ul>
          </div>

          {/* Buttons for Interactions */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center space-y-4">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition">Like</button>
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition">Share</button>
            <button className="bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-orange-600 transition">View Details</button>
          </div>
        </div>
      </section>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Event Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default OrganizerDashboard;
