"use client";

import React, { useState } from 'react';
import Footer from '@/components/Footer'; 
import Image from 'next/image'; 
import Logo from '@/public/logo2.png'; 
import userProfileImage from '@/public/dance.jpg';
import Link from 'next/link';

const CustomerDashboard: React.FC = () => {
  // State for event details
  const [eventName, setEventName] = useState('Dance Festival 2024');
  const [eventDate, setEventDate] = useState('December 15, 2024');
  const [attendeesCount, setAttendeesCount] = useState(150);
  const [eventStatus, setEventStatus] = useState('Upcoming');
  const [activePanel, setActivePanel] = useState('overview');

  // State for profile data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johnny',
    phone: '123-456-7890',
    address: '123 Street, City, Country',
  });

  // State for events
  const [attendedEvents, setAttendedEvents] = useState([
    { name: 'Dance Festival 2024', date: 'December 15, 2024', status: 'Upcoming' },
    { name: 'Music Concert 2024', date: 'January 20, 2025', status: 'Upcoming' },
    { name: 'Tech Expo 2024', date: 'February 25, 2025', status: 'Past' },
  ]);

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert('Profile Updated!');
      } else {
        alert('Error updating profile!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update profile');
    }
  };

  // Placeholder for generating voucher
  const generateVoucher = async () => {
    alert('Generate Voucher function will be implemented!');
  };

  // Function to handle event creation
  const createEvent = async () => {
    try {
      const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: eventName, date: eventDate, status: eventStatus }),
      });

      if (response.ok) {
        alert('Event Created!');
      } else {
        alert('Error creating event!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create event');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-light-gray">
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <aside className="bg-purple-600 text-white w-64 py-4 px-8">
          <h2 className="text-xl font-bold mb-8">Customer Dashboard</h2>
          <ul className="space-y-4">
            <li
              onClick={() => setActivePanel('overview')}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${activePanel === 'overview' ? 'bg-blue-700' : 'hover:bg-blue-600 hover:scale-105'}`}
            >
              Overview
            </li>
            <li
              onClick={() => setActivePanel('events')}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${activePanel === 'events' ? 'bg-blue-700' : 'hover:bg-blue-600 hover:scale-105'}`}
            >
              My Events
            </li>
            <li
              onClick={() => setActivePanel('referral')}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${activePanel === 'referral' ? 'bg-blue-700' : 'hover:bg-blue-600 hover:scale-105'}`}
            >
              Referral
            </li>
            <li
              onClick={() => setActivePanel('profile')}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${activePanel === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-600 hover:scale-105'}`}
            >
              Profile
            </li>
            <li
              onClick={() => setActivePanel('help')}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${activePanel === 'help' ? 'bg-blue-700' : 'hover:bg-blue-600 hover:scale-105'}`}
            >
              Help
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8 overflow-y-auto">
          {/* Overview Panel */}
          {activePanel === 'overview' && (
            <section className="h-full mb-8 bg-white p-6 rounded-lg shadow-md flex flex-col gap-8">
              {/* Upper Row: Left and Right */}
              <div className="flex justify-between gap-8">
                {/* Left: Event List */}
                <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-purple-600 mb-4">Upcoming Events</h3>
                  <ul className="space-y-4 text-gray-700">
                    {attendedEvents.filter(event => event.status === 'Upcoming').map(event => (
                      <li key={event.name} className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">{event.name} - {event.date}</li>
                    ))}
                  </ul>
                </div>

                {/* Right: Customer Profile */}
                <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold text-purple-600 mb-4">Customer Profile</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image src={userProfileImage} alt="Customer Photo" width={80} height={80} className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-700">{profileData.name}</p>
                      <p className="text-gray-600">Email: {profileData.email}</p>
                      <p className="text-gray-600">Phone: {profileData.phone}</p>
                      <p className="text-gray-600">Address: {profileData.address}</p>
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
                    <li><strong>Total Events Attended:</strong> 5</li>
                    <li><strong>Upcoming Events:</strong> 3</li>
                    <li><strong>Average Rating:</strong> 4.5/5</li>
                  </ul>
                </div>

                {/* Right: My Event Reviews */}
                <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-purple-600 mb-4">My Event Reviews</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">"Great experience, can't wait for the next one!" - John D.</li>
                    <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">"Amazing music and vibes!" - Emily R.</li>
                    <li className="cursor-pointer hover:bg-gray-100 p-4 rounded-md">"Loved the venue and the performances. Will attend again!" - Michael B.</li>
                  </ul>
                </div>
              </div>
            </section>

           

          )}

           {/* Event Panel */}
           {activePanel === 'events' && (
            <section className="event-section bg-gray-50 p-8 rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-purple-600">Your Upcoming Events</h2>
            </header>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event List */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Upcoming Events</h3>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left">Event Name</th>
                      <th className="text-left">Date</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Summer Sale 2024</td>
                      <td>July 15, 2024</td>
                      <td>Active</td>
                      <td>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>New Year Gala</td>
                      <td>December 31, 2024</td>
                      <td>Coming Soon</td>
                      <td>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">View Details</button>
                      </td>
                    </tr>
                    {/* Add more events as needed */}
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
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">What Our Attendees Say</h3>
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


          {/* Simplified Referral Panel */}
{activePanel === 'referral' && (
  <section className="referral-section bg-gray-50 p-6 rounded-lg shadow-md">
    <header className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-purple-600">Your Referral Code</h2>
    </header>

    {/* Referral Code Display with Copy Button */}
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm mb-6">
      <span className="text-lg text-gray-700 font-semibold">REF2024XYZ</span>
      <button 
        className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        onClick={() => navigator.clipboard.writeText('REF2024XYZ')}>
        <span>Copy</span>
        <svg className="ml-2 w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8m-6-4h6" />
        </svg>
      </button>
    </div>

    {/* Referral User List */}
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-semibold text-purple-600 mb-2">People Using Your Referral</h3>
      <ul>
        {/* List of referred users - Backend logic would populate this */}
        <li className="flex justify-between text-gray-700 mb-2">
          <span>John Doe</span> <span>2024-11-15</span>
        </li>
        <li className="flex justify-between text-gray-700 mb-2">
          <span>Jane Smith</span> <span>2024-11-14</span>
        </li>
        {/* Add more referred users as necessary */}
      </ul>
    </div>

    {/* Reward Chart */}
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-purple-600 mb-2">Referral Rewards</h3>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Referrals</th>
            <th className="text-left">Reward</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5 Referrals</td>
            <td>10% Discount</td>
          </tr>
          <tr>
            <td>100 Referrals</td>
            <td>$50 Credit</td>
          </tr>
          <tr>
            <td>1,000 Referrals</td>
            <td>$500 Credit</td>
          </tr>
        </tbody>
      </table>
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
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
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
            <textarea className="w-full px-4 py-2 border rounded-lg shadow-sm" placeholder="Tell us about yourself" rows={4}>
            
            </textarea>
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
      <h2 className="text-3xl font-semibold text-blue-600">Customer Help Center</h2>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Contact Support</button>
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
      {/* Left Column: Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Account Settings</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:underline cursor-pointer">Update Profile</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Change Password</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Billing Information</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Subscription Management</li>
        </ul>
      </div>
  
      {/* Center Column: How-to Guides */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">How-to Guides</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:underline cursor-pointer">How to Update Your Profile</li>
          <li className="text-gray-700 hover:underline cursor-pointer">How to Manage Subscriptions</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Navigating Your Dashboard</li>
        </ul>
        
        <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Troubleshooting</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:underline cursor-pointer">Can't Login?</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Payment Issues</li>
          <li className="text-gray-700 hover:underline cursor-pointer">Subscription Billing Questions</li>
        </ul>
      </div>
  
      {/* Right Column: Contact Support */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Contact Support</h3>
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
    
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Submit</button>
        </form>
    
        {/* Live Chat */}
        <div className="mt-8">
          <button className="bg-green-600 text-white w-full px-6 py-2 rounded-lg">Start Live Chat</button>
        </div>
      </div>
    </div>
    
    {/* System Status & Links to Documentation */}
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">System Status</h3>
      <p className="text-gray-700">All systems are operational</p>
  
      <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Documentation</h3>
      <ul className="space-y-4">
        <li className="text-gray-700 hover:underline cursor-pointer">Platform Documentation</li>
        <li className="text-gray-700 hover:underline cursor-pointer">API Reference</li>
        <li className="text-gray-700 hover:underline cursor-pointer">Customer Guide</li>
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

export default CustomerDashboard;
