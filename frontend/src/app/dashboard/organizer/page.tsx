"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer'; 
import Image from 'next/image'; 
import Logo from '@/public/logo2.png'; 
import userProfileImage from '@/public/dance.jpg';
import Link from 'next/link';

const OrganizerDashboard: React.FC = () => {
  const [eventName, setEventName] = useState('Dance Festival 2024');
  const [eventDate, setEventDate] = useState('December 15, 2024');
  const [attendeesCount, setAttendeesCount] = useState(150);
  const [eventStatus, setEventStatus] = useState('Upcoming');
  const [activePanel, setActivePanel] = useState('overview');
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johnny',
    phone: '123-456-7890',
    address: '123 Street, City, Country',
  });

  
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      window.location.href = '/login'; 
    } else {
      
      const role = 'organizer'; 
      if (role !== 'organizer') {
        alert('Unauthorized access');
        window.location.href = '/'; 
      }
    }
  }, []);


  return (
    <div className="flex min-h-screen flex-col bg-light-gray">
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <aside className="bg-purple-600 text-white w-64 py-4 px-8">
          <h2 className="text-xl font-bold mb-8">Organizer Dashboard</h2>
          <ul className="space-y-4">
            <li onClick={() => setActivePanel('overview')} className={`cursor-pointer p-2 rounded-lg ${activePanel === 'overview' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}>
              Overview
            </li>
            <li onClick={() => setActivePanel('event')} className={`cursor-pointer p-2 rounded-lg ${activePanel === 'event' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}>
              Event
            </li>
            <li onClick={() => setActivePanel('voucher')} className={`cursor-pointer p-2 rounded-lg ${activePanel === 'voucher' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}>
              Voucher
            </li>
            <li onClick={() => setActivePanel('profile')} className={`cursor-pointer p-2 rounded-lg ${activePanel === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}>
              Profile
            </li>
            <li onClick={() => setActivePanel('help')} className={`cursor-pointer p-2 rounded-lg ${activePanel === 'help' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}>
              Help
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8 overflow-y-auto">
          {/* Overview Panel */}
          {activePanel === 'overview' && (
            // Overview Section for Event Management Organizer Dashboard

<section className="h-full mb-8 bg-white p-6 rounded-lg shadow-md flex flex-col gap-8">
  {/* Upper Row: Left and Right */}
  <div className="flex justify-between gap-8">
    {/* Left: Event List */}
    <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event List</h3>
      <ul className="space-y-4 text-gray-700">
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">Dance Festival 2024</li>
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">Rock Concert 2024</li>
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">Food Expo 2024</li>
      </ul>
    </div>

    {/* Right: Organizer Profile */}
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-purple-600 mb-4">Organizer Profile</h3>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image src={userProfileImage} alt="Organizer Photo" width={80} height={80} className="object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-700">John Doe</p>
          <p className="text-gray-600">Joined: January 2020</p>
          <p className="text-gray-600">Events Held: 12</p>
          <p className="text-gray-600">Attendees: 2,500+</p>
        </div>
      </div>
    </div>
  </div>

  {/* Lower Row: Left and Right */}
  <div className="flex justify-between gap-8">
    {/* Left: Statistics */}
    <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event Statistics</h3>
      <ul className="space-y-4 text-gray-700">
        <li><strong>Total Events:</strong> 12</li>
        <li><strong>Total Attendees:</strong> 2,500+</li>
        <li><strong>Upcoming Events:</strong> 3</li>
        <li><strong>Average Rating:</strong> 4.7/5</li>
      </ul>
    </div>

    {/* Right: Event Reviews */}
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event Reviews</h3>
      <ul className="space-y-4 text-gray-700">
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">
          "Amazing event! The atmosphere was electric!" - Jane D.
        </li>
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">
          "Great experience, well organized and the crowd was awesome!" - Mark T.
        </li>
        <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">
          "I loved the venue and the performances. Will definitely come again!" - Sarah L.
        </li>
      </ul>
    </div>
  </div>
</section>

          )}

          {/* Event Panel */}
          {activePanel === 'event' && (
            <section className="event-section bg-gray-50 p-8 rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-purple-600">Event Management</h2>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">Create New Event</button>
            </header>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event List */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event List</h3>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left">Event Name</th>
                      <th className="text-left">Date</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Summer Sale 2024</td>
                      <td>July 15, 2024</td>
                      <td>Active</td>
                      <td>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>New Year Gala</td>
                      <td>December 31, 2024</td>
                      <td>Inactive</td>
                      <td>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Details</button>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
          
              {/* Event Statistics */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Event Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="stat-box bg-purple-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">Total Attendees</h4>
                    <p className="text-2xl font-bold">1,200</p>
                  </div>
                  <div className="stat-box bg-purple-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">Total Events</h4>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Testimonial Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Audience Reviews</h3>
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <p className="text-lg font-semibold">"Amazing event, will definitely join again!"</p>
                    <p className="text-sm text-gray-600">- John Doe</p>
                  </li>
                  <li className="flex flex-col">
                    <p className="text-lg font-semibold">"Great networking opportunities and fun activities."</p>
                    <p className="text-sm text-gray-600">- Jane Smith</p>
                  </li>
                  {/* Add more reviews as needed */}
                </ul>
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
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">Create New Voucher</button>
            </header>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Voucher Creation Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Create Voucher</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Voucher Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter Voucher Name" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Voucher Code</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter Voucher Code" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Voucher Type</label>
                    <select className="w-full px-4 py-2 border rounded-md">
                      <option value="discount">Discount</option>
                      <option value="free-product">Free Product</option>
                      <option value="event-entry">Event Entry</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Discount Amount</label>
                    <input type="number" className="w-full px-4 py-2 border rounded-md" placeholder="Enter Discount Amount" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Start Date</label>
                    <input type="date" className="w-full px-4 py-2 border rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">End Date</label>
                    <input type="date" className="w-full px-4 py-2 border rounded-md" />
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg w-full">Generate Voucher</button>
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
                    <tr>
                      <td>Summer Sale 2024</td>
                      <td>SUMMER2024</td>
                      <td>Active</td>
                      <td>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Edit</button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>New Year Promo</td>
                      <td>NY2024</td>
                      <td>Inactive</td>
                      <td>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Edit</button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          )}

          {/* Profile Panel */}
          {activePanel === 'profile' && (
            <section className="profile-section bg-gray-50 p-8 rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-purple-600">Profile Settings</h2>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
            </header>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side: Profile Details */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Personal Information</h3>
                <form>
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter your full name" />
                  </div>
          
                  {/* Username */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter your username" />
                  </div>
          
                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter your email" />
                  </div>
          
                  {/* Phone Number */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter your phone number" />
                  </div>
          
                  {/* Bio */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Bio</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Tell us about yourself" rows={4}></textarea>
                  </div>
          
                  {/* Date of Birth */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
                  </div>
          
                  {/* Profile Picture Upload */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Picture</label>
                    <input type="file" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
                  </div>
          
                  {/* Save Button */}
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
                </form>
              </div>
          
              {/* Right Side: Account Settings & Preferences */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Account Settings</h3>
                <form>
                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Enter a new password" />
                  </div>
          
                  {/* Social Media Links */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Social Media</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm mb-2" placeholder="Instagram Link" />
                    <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="LinkedIn Link" />
                  </div>
          
                  {/* Language Preference */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Language Preference</label>
                    <select className="w-full px-4 py-2 border rounded-lg shadow-sm">
                      <option value="en">English</option>
                      <option value="id">Indonesian</option>
                      <option value="es">Spanish</option>
                      {/* Add other language options as needed */}
                    </select>
                  </div>
          
                  {/* Notifications */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Notifications</label>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" id="email-notifications" className="mr-2" />
                      <label htmlFor="email-notifications">Email Notifications</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" id="sms-notifications" className="mr-2" />
                      <label htmlFor="sms-notifications">SMS Notifications</label>
                    </div>
                  </div>
          
                  {/* Account Status */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Account Status</label>
                    <select className="w-full px-4 py-2 border rounded-lg shadow-sm">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
          
                  {/* Save Button */}
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
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
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">Contact Support</button>
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
                  <button className="bg-green-600 text-white w-full px-6 py-2 rounded-lg">Start Live Chat</button>
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
