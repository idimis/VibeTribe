"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import userProfileImage from "@/public/dance.jpg";
import EventStatisticsWidget from '@/components/EventStatisticsWidget';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Event {
  id: string;
  title: string;
  dateTimeStart: string;
  reviews: Review[];
}

interface Review {
  rating: number;
  review: string;
  customerName: string;
}

const OrganizerDashboard: React.FC = () => {
  const [data, setData] = useState<any>({ events: [], profile: {} });
  const [activePanel, setActivePanel] = useState("overview");
  const [statistics, setStatistics] = useState<any>(null);
  const [chartType, setChartType] = useState<"monthly" | "yearly">("monthly");
  const [review, setReview] = useState<Review | null>(null);
  
  const [voucherList, setVoucherList] = useState<any[]>([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [eventId, setEventId] = useState("");
  const [voucherValue, setVoucherValue] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Token: ", token);
    if (!token) {
      alert("You are not logged in!");
      window.location.href = "/login";
      return;
    }
  
    const fetchData = async () => {
      try {
        
        const [responseEvents, responseProfile] = await Promise.all([
          fetch("http://localhost:8080/api/v1/events/organizer?size=100", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8080/api/v1/user/details", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        if (!responseEvents.ok || !responseProfile.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const eventsData = await responseEvents.json();
        const profileData = await responseProfile.json();
  
        if (eventsData.success && profileData.success) {
          
          setData({
            events: eventsData.data.content,
            profile: profileData.data,
          });
  
          setName(profileData.data.name);
          setEmail(profileData.data.email);
          setWebsite(profileData.data.website);
          setAddress(profileData.data.address);
          setPhoneNumber(profileData.data.phoneNumber);
        } else {
          alert("Failed to load data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/events/statistics", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();

        if (result.success) {
          setStatistics(result.data.content);
        } else {
          alert("Failed to load statistics.");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        alert("An error occurred while fetching statistics.");
      }
    };

    fetchStatistics();
  }, []);  


  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }
  
    const fetchReviewsByOrganizer = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/reviews/by-organizer", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const reviewsData = await response.json();
  
        if (reviewsData.success) {
          setReview(reviewsData.data.content); 
        } else {
          alert("Failed to load reviews.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        alert("An error occurred while fetching reviews.");
      }
    };
  
    fetchReviewsByOrganizer();
  }, []);
  

  const handleVoucherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const voucherData = {
      eventId,
      voucherCode,
      voucherValue,
      description,
      voucherType: "dateRange",
      dateRangeBasedVoucher: {
        startDate,
        endDate,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/vouchers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(voucherData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setVoucherSuccess(result.message);
        setVoucherError(null);
        setEventId("");
        setVoucherCode("");
        setVoucherValue(0);
        setDescription("");
        setStartDate("");
        setEndDate("");
      } else {
        setVoucherError(result.message || "Failed to create voucher.");
        setVoucherSuccess(null);
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
      setVoucherError("An error occurred while creating the voucher.");
      setVoucherSuccess(null);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }
  
    // If a profile picture is selected, convert it to base64
    let photoProfileUrl = data.profile.photoProfileUrl;
    if (profilePicture) {
      try {
        photoProfileUrl = await convertImageToBase64(profilePicture);
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Failed to convert image.");
        return;
      }
    }
  
    const profileData = {
      name,
      email,
      website,
      address,
      phoneNumber,
      photoProfileUrl, 
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  
  
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  


  const { isLoggedIn, login, logout, loggedEmail, isAuthLoaded } = useAuth();
  useAuthRedirect();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    sessionStorage.clear();
    window.location.href = "/logout";
  };


  return (
    <div className="flex min-h-screen flex-col bg-light-gray">
      <Header />
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <aside className="bg-purple-600 text-white w-64 py-4 px-8">
          <h2 className="text-xl font-bold mb-8">Organizer Dashboard</h2>
          <ul className="space-y-4">
            <li
              onClick={() => setActivePanel("overview")}
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "overview" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Overview
            </li>
            <li
              onClick={() => setActivePanel("event")}
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "event" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Event
            </li>
            <li
              onClick={() => setActivePanel("voucher")}
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "voucher" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Voucher
            </li>
            <li
              onClick={() => setActivePanel("profile")}
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "profile" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Profile
            </li>
            <li
              onClick={() => setActivePanel("help")}
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "help" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Help
            </li>

            {/* Logout Button */}
            <li
              onClick={handleLogout} 
              className={`cursor-pointer p-2 rounded-lg ${
                activePanel === "logout" ? "bg-blue-700" : "hover:bg-blue-600"
              }`}
            >
              Logout
            </li>
          </ul>
        </aside>


        {/* Main Content */}
        <main className="flex-grow p-8 overflow-y-auto">
          {/* Overview Panel */}
          {activePanel === "overview" && (
            <section className="h-full mb-8 bg-white p-6 rounded-lg shadow-md flex flex-col gap-8">
            <div className="flex justify-between gap-8">
              {/* Left: Event List */}
              <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event List</h3>
                <ul className="space-y-4 text-gray-700">
                  {data.events.length > 0 ? (
                    data.events.map((event: Event) => (
                      <li
                        key={event.id}
                        className="flex justify-between items-center hover:bg-gray-100 p-4 rounded-md"
                      >
                        <span className="flex-grow text-gray-800">{event.title}</span>
                        <Link
                          href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
                        >
                          <button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-300 transition duration-300">
                            See the Details
                          </button>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p>No events found.</p>
                  )}
                </ul>
              </div>

                {/* Right: Organizer Profile */}
                <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold text-purple-600 mb-4">Organizer Profile</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={data.profile.photoProfileUrl || "/path/to/default-image.jpg"} 
                         alt="Organizer Photo"
                         width={80}
                        height={80}
                         className="object-cover"
                        />

                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-700">{data.profile.name}</p>
                      <p className="text-gray-600">
                        Joined: {new Date(data.profile.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        Website:{" "}
                        <Link
                          href={`https://${data.profile.website}`}
                          target="_blank"
                          className="text-blue-500"
                        >
                          {data.profile.website}
                        </Link>
                      </p>
                      <p className="text-gray-600">Phone: {data.profile.phoneNumber}</p>
                      <p className="text-gray-600">Address: {data.profile.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Statistics */}
              <EventStatisticsWidget statistics={statistics} />
              
            </section>

                

          )}

          {/* Event Panel */}
          {activePanel === 'event' && (
            <section className="event-section bg-gray-50 p-8 rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-purple-600">Event Management</h2>
              
            </header>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Event List */}
  <div className="w-full bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event List</h3>
    <ul className="space-y-4 text-gray-700">
      {data.events.length > 0 ? (
        data.events.map((event: Event) => (
          <li
            key={event.id}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-4 rounded-md"
          >
            <span>{event.title}</span>
            <Link
              href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
            >
              <button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-300 transition duration-300">
                See the Details
              </button>
            </Link>
          </li>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </ul>
  </div>

          
              {/* Event Statistics */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <EventStatisticsWidget statistics={statistics} />
              </div>
            </div>
          
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
  {/* Testimonial Section */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-purple-600 mb-4">Audience Reviews</h3>
    {error ? (
      <p className="text-red-500">Error: {error}</p>
    ) : data.events.length > 0 ? (
      data.events
        .filter((event) => event.reviews.length > 0) 
        .map((event: Event) => (
          <div key={event.id} className="mb-6">
            <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
            <div className="flex flex-col space-y-4">
              {event.reviews.map((review: Review, index: number) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-lg font-semibold">"{review.review}"</p>
                  <p className="text-sm text-gray-600">- {review.customerName}</p>
                  <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
                </div>
              ))}
            </div>
          </div>
        ))
    ) : (
      <p className="text-gray-600">No events found with reviews.</p>
    )}
  </div>
          
              {/* Event Performance Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event Performance</h3>
                {/* You can integrate a chart library like Chart.js or D3.js here */}
                <div className="bg-gray-200 p-4 rounded-lg">
                  <p className="text-center text-xl font-semibold">Performance Data Chart</p>
                  {/* Placeholder for the chart */}
                  <div className="h-64 bg-gray-300 rounded-lg mt-4">
                    <p className="text-center text-gray-600 py-24">Chart Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          )}

         {/* Voucher Panel */}
{activePanel === 'voucher' && (
  <section className="voucher-section bg-gray-50 p-8 rounded-lg shadow-lg">
    <header className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-semibold text-purple-600">Voucher Management</h2>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Voucher Creation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-purple-600 mb-4">Create Voucher</h3>
        {voucherSuccess && <p className="text-green-500 mb-4">{voucherSuccess}</p>}
        {voucherError && <p className="text-red-500 mb-4">{voucherError}</p>}
        <form onSubmit={handleVoucherSubmit}>

        
        <div className="mb-4">
            <label htmlFor="eventID" className="block text-gray-700 font-medium">Event ID</label>
            <input
              type="text"
              id="eventID"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter event ID"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="voucherCode" className="block text-gray-700 font-medium">Voucher Code</label>
            <input
              type="text"
              id="voucherCode"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Voucher Code"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="voucherValue" className="block text-gray-700 font-medium">Voucher Value (%)</label>
            <input
              type="number"
              id="voucherValue"
              value={voucherValue}
              onChange={(e) => setVoucherValue(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Voucher Value"
              required
              min="0"
              max="50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-medium">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700 font-medium">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Generate Voucher
          </button>
        </form>
      </div>

      {/* Voucher List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-purple-600 mb-4">Voucher List</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left">Voucher Name</th>
              <th className="text-left">Voucher Code</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {voucherList.map((voucher) => (
              <tr key={voucher.code}>
                <td>{voucher.name}</td>
                <td>{voucher.code}</td>
                <td>{voucher.active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    onClick={() => handleEditVoucher(voucher)}
                    className="bg-gradient-to-r from-violet-700 to-violet-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}

          
          

{activePanel === "profile" && data?.profile && (
      <section className="profile-section bg-gray-50 p-8 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-purple-600">Profile Settings</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Profile Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Personal Information</h3>
            <form onSubmit={handleUpdateProfile}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Website */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Website</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter your website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Profile Picture Upload */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Picture</label>
  <img
    src={profilePicture ? URL.createObjectURL(profilePicture) : data.profile.photoProfileUrl || "/path/to/default-image.jpg"}
    alt="Profile"
    className="w-16 h-16 rounded-full mb-4"
  />
  <input
    type="file"
    className="w-full px-4 py-2 border rounded-lg shadow-sm"
    onChange={(e) => {
      if (e.target.files) {
        setProfilePicture(e.target.files[0]); 
      }
    }}
  />
</div>


              {/* Save Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
        </form>
      </div>

      {/* Right Side: Account Settings & Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-purple-600 mb-4">
          Account Settings
        </h3>
        <form>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Enter a new password"
            />
          </div>

          {/* Social Media Links */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Social Media</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg shadow-sm mb-2"
              placeholder="Instagram Link"
              defaultValue={data.profile.socialMedia?.instagram}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="LinkedIn Link"
              defaultValue={data.profile.socialMedia?.linkedin}
            />
          </div>

          {/* Language Preference */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Language Preference</label>
            <select
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              defaultValue={data.profile.languagePreference}
            >
              <option value="en">English</option>
              <option value="id">Indonesian</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </section>
)}


           {/* Help Panel */}
           {activePanel === 'help' && (
            <section className="help-section bg-gray-50 p-8 rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-purple-600">Help Center</h2>
              
            </header>
          
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-4 py-2 border rounded-lg shadow-sm"
              />
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Left Column: FAQ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Frequently Asked Questions</h3>
                <ul className="space-y-4">
                  <li className="text-gray-700 hover:underline cursor-pointer">How do I create an event?</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">How can I reset my password?</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">What is the refund policy?</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">How do I cancel my subscription?</li>
                </ul>
              </div>
          
              {/* Center Column: How-to Guides & Troubleshooting */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">How-to Guides</h3>
                <ul className="space-y-4">
                  <li className="text-gray-700 hover:underline cursor-pointer">Creating Your First Event</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">Managing Ticket Sales</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">Understanding Analytics</li>
                </ul>
          
                <h3 className="text-2xl font-semibold text-purple-600 mt-8 mb-4">Troubleshooting</h3>
                <ul className="space-y-4">
                  <li className="text-gray-700 hover:underline cursor-pointer">What to do if your event doesn't load</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">Fixing payment errors</li>
                  <li className="text-gray-700 hover:underline cursor-pointer">How to recover a lost password</li>
                </ul>
              </div>
          
              {/* Right Column: Contact Support & Live Chat */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Contact Support</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter your email" />
                  </div>
          
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg shadow-sm"
                      placeholder="Describe your issue"
                      rows={4}
                    ></textarea>
                  </div>
          
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">Submit</button>
                </form>
          
                {/* Live Chat */}
                <div className="mt-8">
                  <button className="bg-gradient-to-r from-[#FF5A5A] to-[#FF9A9A] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">Start Live Chat</button>
                </div>
              </div>
            </div>
          
            {/* System Status & Links to Documentation */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">System Status</h3>
              <p className="text-gray-700">All systems are operational</p>
          
              <h3 className="text-2xl font-semibold text-purple-600 mt-8 mb-4">Documentation</h3>
              <ul className="space-y-4">
                <li className="text-gray-700 hover:underline cursor-pointer">Platform Documentation</li>
                <li className="text-gray-700 hover:underline cursor-pointer">API Reference</li>
                <li className="text-gray-700 hover:underline cursor-pointer">Event Management Guide</li>
              </ul>
            </div>
          </section>
          
          )}
          
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
