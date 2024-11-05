import React from 'react';
import Image from 'next/image';
import Logo from '@/public/logo2.png';
import EventImage from '@/public/concert.jpg';

const CreateEvent: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-light-gray p-8">
      <header className="flex items-center justify-between w-full max-w-[1440px] mb-10">
        <Image src={Logo} alt="Logo" width={120} height={120} />
        <nav>
          <a href="#" className="text-purple-600 hover:underline mx-4">Get Started for Free</a>
          <a href="#" className="text-purple-600 hover:underline mx-4">Contact Sales</a>
        </nav>
      </header>

      <section className="flex flex-col items-center bg-white rounded-lg p-6 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">Where Event Organizers Grow</h1>
        <p className="text-gray-700 text-center mb-6">
          The all-in-one ticketing and discovery platform trusted by millions of organizers and attendees worldwide.
        </p>

        <h2 className="text-3xl font-semibold text-purple-500 mb-4 text-center">You Are Free To Grow</h2>
        <p className="text-gray-700 mb-6 text-center">
          It’s free to publish unlimited events and sell unlimited tickets.
        </p>

        <h3 className="text-2xl font-semibold text-purple-500 mb-4 text-center">Launch Your Next Event</h3>
        <p className="text-gray-700 text-center mb-6">
          Event hosting made easy. Easily create events for free on a platform that attendees love and trust.
        </p>
        
        <div className="relative mb-6">
          <Image src={EventImage} alt="Event Example" width={500} height={300} className="rounded-lg" />
        </div>

        <h4 className="text-lg font-semibold text-purple-500 mb-4">Event Ticketing</h4>
        <p className="text-gray-700 mb-4">
          Sell more tickets with customizable event pages and a seamless checkout experience for attendees on a trusted platform.
        </p>

        <h4 className="text-lg font-semibold text-purple-500 mb-4">Reporting & Analytics</h4>
        <p className="text-gray-700 mb-4">
          Learn more about your buyers and discover where sales are coming from with real-time analytics.
        </p>

        <h4 className="text-lg font-semibold text-purple-500 mb-4">Organizer App</h4>
        <p className="text-gray-700 mb-6">
          Check guests in, sell tickets at the door, and track data with our easy-to-use Event Organizer App.
        </p>

        <button className="bg-tomato text-white font-semibold py-3 px-6 rounded-full hover:bg-deep-sky-blue transition duration-300">
          Get Started
        </button>

        <footer className="mt-10 text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Event Platform. All rights reserved.
        </footer>
      </section>
    </div>
  );
};

export default CreateEvent;
