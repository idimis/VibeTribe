"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";

interface PaymentPageProps {
  params: { slug: string };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const { getJwtToken } = useAuth();
  const [slug, setSlug] = useState<string>('');
  const [event, setEvent] = useState<any>(null);
  const [eventId, setEventId] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);

  const [eventVouchers, setEventVouchers] = useState<any[]>([]); 
  const [customerVouchers, setCustomerVouchers] = useState<any[]>([]); 
  const [voucherValue, setVoucherValue] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [transactionId, setTransactionId] = useState<number | null>(null); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    voucher: '',
    points: '',
    paymentMethod: 'credit-card',
    quantity: '',
  });

  const [fee, setFee] = useState<number>(0);
 

  useEffect(() => {
    const fetchSlug = async () => {
      const paramsData = await params;
      setSlug(paramsData.slug || '');
    };
    fetchSlug();
  }, [params]);

  useEffect(() => {
    const fetchEventFromTitle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/v1/events/${slug}`);
        const data = await response.json();
        
        
        console.log("API Response:", data);
        
        if (data.success && data.data) {
          setEvent(data.data);
          setFee(data.data.fee);
          setEventId(data.data.id);
        } else {
          notFound(); 
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        notFound(); 
      } finally {
        setLoading(false);
      }
    };
  
    if (slug) {
      fetchEventFromTitle();
    }
  }, [slug]);
  
  
  useEffect(() => {
    fetchUserDetails();
    fetchEventVoucherDetails();
    fetchCustomerVoucherDetails();
  }, [slug, getJwtToken]);

  
  const fetchUserDetails = async () => {
    try {
      const token = getJwtToken();
      const response = await fetch("http://localhost:8080/api/v1/user/details", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success && data.data) {
        setUserPoints(data.data.pointsBalance || 0);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchEventVoucherDetails = async () => {
    try {
      const token = getJwtToken();
      if (!eventId) return; 
      const response = await fetch(`${BASE_URL}/api/v1/vouchers/by-event?eventId=${eventId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      
      if (data.success && data.data.content.length > 0) {
        const voucherCodes = data.data.content.map((voucher: any) => voucher.voucherCode);
        setEventVouchers(voucherCodes); 
        setVoucherValue(data.data.voucherValue || 0); 
      } else {
        setEventVouchers([]); 
        setVoucherValue(0);
      }
    } catch (error) {
      console.error("Error fetching event voucher details:", error);
    }
  };
  
  const fetchCustomerVoucherDetails = async () => {
    try {
      const token = getJwtToken();
      const response = await fetch(`${BASE_URL}/api/v1/vouchers/my-vouchers`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      if (data.success && data.data.content.length > 0) {
        const voucherCodes = data.data.content.map((voucher: any) => voucher.code);
        setCustomerVouchers(voucherCodes); 
      } else {
        setCustomerVouchers([]); 
      }
    } catch (error) {
      console.error("Error fetching customer voucher details:", error);
    }
  };
  

 

  const calculateTotal = () => {
    const total = event?.price || 0;
    const discountedPrice = (fee - userPoints) * (1 - (voucherValue / 100));
    return Math.max(0, discountedPrice);
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = async () => {
    console.log("Event object before submitting:", event);
  
  
    if (formData.voucher === 'event' && formData.points > 0) {
      alert("You cannot use both event voucher and individual points at the same time.");
      return;
    }
  
    try {
      const token = getJwtToken();
      const response = await fetch(`${BASE_URL}/api/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventSlug: event.slug,
          eventId: eventId,  
          fullName: formData.fullName,
          email: formData.email,
          voucher: formData.voucher,
          points: Number(formData.points),
          paymentMethod: formData.paymentMethod,
          quantity: Number(formData.quantity),
          isUsePoints: !!formData.points,
        }),
      });
  
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
  
      if (!responseText) {
        throw new Error("Empty response from server");
      }
  
      const data = JSON.parse(responseText);
  
      if (data.success) {
        const transactionId = data.data.id;
        const pointsApplied = data.data.pointsApplied;
        const voucher = data.data.voucher;
  
        if (transactionId) {
          setTransactionId(transactionId);
          window.location.href = `/find-ticket/receipt?id=${event.slug}&voucher=${voucher}&points=${pointsApplied}&quantity=${formData.quantity}&transactionId=${transactionId}&fee=${fee}`;
        } else {
          console.error("Transaction creation failed: Transaction ID is null");
          alert("Failed to create transaction. Please try again.");
        }
      } else {
        console.error("Transaction creation failed:", data.message);
        alert("Failed to create transaction. Please try again.");
      }
    } catch (error) {
      console.error("Transaction creation failed:", error);
      alert("An error occurred while creating the transaction.");
    }
  };
  
  const handleCancel = () => {
    window.history.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow max-w-[1440px] mx-auto p-6">
        <div className="event-detail max-w-4xl mx-auto space-y-8 bg-white shadow-lg rounded-lg p-6">
          {/* Confirmation Page Header */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-blue-600">Confirmation Page</h1>
            <p className="mt-4 text-lg text-gray-700">Please complete your payment within the next 1 hour to confirm your booking.</p>
          </div>

          {/* Payment Reminder */}
          <div className="bg-yellow-100 p-4 rounded-lg my-6 text-center">
            <p className="text-xl text-gray-700 font-semibold">
              Reminder: To secure your ticket, please complete the payment within 1 hour.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              If payment is not received within the specified time frame, your booking will be canceled.
            </p>
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

          {/* Quantity Input */}
          <div className="space-y-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Points Input */}
          <div className="space-y-4">
            {userPoints > 0 ? (
              <div>
                <label htmlFor="points" className="block text-sm font-medium text-gray-700">Use Points</label>
                <select
                  name="points"
                  id="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={userPoints}>{`Use ${userPoints} Points`}</option>
                </select>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">You don't have any points available.</p>
            )}
          </div>

          <div className="space-y-4">



          <div className="space-y-4">
    {/* Voucher Input */}
<div>
  <label htmlFor="voucher" className="block text-sm font-medium text-gray-700">Apply Voucher</label>
</div>

{(eventVouchers.length > 0 || customerVouchers.length > 0) ? (
  <select
    name="voucher"
    id="voucher"
    value={formData.voucher}
    onChange={handleInputChange}
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="">{`Use Voucher (${voucherValue}% Off)`}</option>
    
   
    {eventVouchers.length > 0 && (
      <optgroup label="Event Vouchers">
        {eventVouchers.map((voucherCode, index) => (
          <option key={`event-${index}`} value={voucherCode}>
            {voucherCode} 
          </option>
        ))}
      </optgroup>
    )}

    
    {customerVouchers.length > 0 && (
      <optgroup label="Customer Vouchers">
        {customerVouchers.map((code, index) => (
          <option key={`customer-${index}`} value={code}>
            {code} 
          </option>
        ))}
      </optgroup>
    )}

  </select>
) : (
  <button
    onClick={() => alert("No vouchers available for this event or your account.")}
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
  >
    Apply Voucher
  </button>
)}


          {/* Fee and Total Calculation */}
          <div className="bg-gray-100 p-4 rounded-lg space-y-4 my-4">
            <div className="flex justify-between">
              <span>Event Fee:</span>
              <span>{fee.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
            </div>
            <div className="flex justify-between">
              <span>Voucher:</span>
              <span>{voucherValue} %</span>
            </div>
            <div className="flex justify-between">
              <span>Points:</span>
              <span>Rp. {userPoints}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{calculateTotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
            </div>
          </div>

          {/* Confirmation Button */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleConfirm}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Payment
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;

