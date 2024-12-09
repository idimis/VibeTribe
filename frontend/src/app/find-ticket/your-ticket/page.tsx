'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const YourTicket: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get email from localStorage/sessionStorage
    const storedEmail = localStorage.getItem('userEmail'); // Or sessionStorage
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError('No email found. Please log in again.');
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tickets?email=${encodeURIComponent(storedEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets.');
        }
        const data = await response.json();
        setTickets(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light-gray p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">Your Tickets</h1>

          {loading && <p className="text-gray-500">Loading tickets...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && tickets.length === 0 && (
            <p className="text-gray-500">No tickets found for the provided email.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{ticket.eventName}</h2>
                <p className="text-gray-700"><strong>Date:</strong> {ticket.date}</p>
                <p className="text-gray-700"><strong>Seat:</strong> {ticket.seat}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${ticket.price}</p>
                <p className="text-gray-700"><strong>Status:</strong> {ticket.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YourTicket;
