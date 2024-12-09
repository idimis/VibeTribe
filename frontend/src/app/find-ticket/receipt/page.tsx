"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const ConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const quantity = searchParams.get("quantity");
  const transactionId = searchParams.get("transactionId");
  const fee = searchParams.get("fee");

  const [event, setEvent] = useState<any>(null);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [points, setPoints] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/api/v1/events/${eventId}`);
          const data = await response.json();

          if (data.success && data.data) {
            setEvent(data.data);
          } else {
            alert("Event not found");
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          alert("Error fetching event details");
        } finally {
          setLoading(false);
        }
      };

      fetchEventDetails();
    }

    if (transactionId) {
      const fetchTransactionDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/v1/transactions/${transactionId}`);
          const data = await response.json();

          if (data.success && data.data) {
            setVoucher(data.data.voucher || null);
            setPoints(data.data.points || null);
          } else {
            alert("Transaction not found");
          }
        } catch (error) {
          console.error("Error fetching transaction details:", error);
          alert("Error fetching transaction details");
        }
      };

      fetchTransactionDetails();
    }
  }, [eventId, transactionId]);

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
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">Ticket Purchase Receipt</h1>
            <p className="mt-4 text-lg text-gray-700">
              Your ticket purchase was successful. Below are the details of your transaction.
            </p>
          </div>

          {/* Event Details */}
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-semibold text-gray-800">Event Details</h2>
            <div className="flex justify-between text-gray-700 mt-4">
              <div>
                <p><span className="font-medium">Event Title:</span> {event.title}</p>
                <p><span className="font-medium">Category:</span> {event.category}</p>
                <p>
                  <span className="font-medium">Date & Time:</span>{" "}
                  {new Date(event.dateTimeStart).toLocaleDateString("id-ID")}{" "}
                  {new Date(event.dateTimeStart).toLocaleTimeString("id-ID")} -{" "}
                  {new Date(event.dateTimeEnd).toLocaleTimeString("id-ID")}
                </p>
                <p><span className="font-medium">Location:</span> {event.location}</p>
                <p><span className="font-medium">Location Details:</span> {event.locationDetails}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-semibold text-gray-800">Payment Summary</h2>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="font-medium">Voucher Applied:</span>
                <span>{voucher || "None"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Points Used:</span>
                <span>{points || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span>{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Original Fee:</span>
                <span>Rp {fee}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2">
                <span className="font-medium">Total Fee:</span>
                <span>
                  Rp{" "}
                  {parseFloat(fee) -
                    (parseInt(points || "0") * 0.1) -
                    (parseInt(voucher || "0") * 0.1)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Thank you for your purchase. We hope you enjoy the event!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
