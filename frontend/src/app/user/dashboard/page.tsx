"use client";

import React, { useState } from 'react';
import Footer from '@/components/Footer'; 
import Image from 'next/image'; 
import Logo from '@/public/logo2.png'; 
import userProfileImage from '@/public/dance.jpg';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  // State for profile details
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('******');
  const [referralCode, setReferralCode] = useState('ABC123XYZ');

  // Function to copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied!');
  };

  // Function to open file explorer for profile picture change
  const changeProfilePicture = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <>
      <div className="flex min-h-screen bg-light-gray">
        {/* Sidebar */}
        <aside className="bg-purple-600 text-white w-64 py-4 px-8 flex flex-col items-start">
          <h2 className="text-xl font-bold mb-8">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/user/profile" className="text-pink-200 hover:text-white">
                Account
              </Link>
            </li>
            <li>
              <Link href="/payment" className="text-blue-200 hover:text-white">
                Payment
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-yellow-200 hover:text-white">
                Help
              </Link>
            </li>
            <li>
              <Link href="/review" className="text-green-200 hover:text-white">
                Review
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8">
          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">Welcome, John Doe!</h2>
            <p className="text-gray-700">We're glad to have you here. Below you'll find your recent activity and other details.</p>
          </section>

          {/* User Info */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Your Information</h3>
            <div className="flex items-center">
              <Image src={userProfileImage} alt="User Profile" width={80} height={80} className="rounded-full mr-4" />
              <div>
                <p className="font-semibold text-lg">John Doe</p>
                <p className="text-gray-600">Email: {email}</p>
                <p className="text-gray-600">Password: {password}</p>
                <p className="text-gray-600">Joined: January 1, 2023</p>
              </div>
            </div>
          </section>

          {/* Change Profile Picture */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Change Profile Picture</h3>
            <input 
              type="file" 
              id="fileInput" 
              style={{ display: 'none' }} 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  console.log(e.target.files[0]);
                }
              }} 
            />
            <button 
              onClick={changeProfilePicture}
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300">
              Change Picture
            </button>
          </section>

          {/* Referral Code */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Referral Code</h3>
            <div className="flex items-center">
              <p className="text-gray-600 mr-4">{referralCode}</p>
              <button 
                onClick={copyReferralCode}
                className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-800 transition duration-300">
                Copy
              </button>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Recent Activities</h3>
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">Updated Profile Picture</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-gray-700">Logged in from New Device</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-gray-700">Joined a New Event</span>
              </li>
            </ul>
          </section>

          {/* Logout Section */}
          <section className="text-center">
            <Link href="/" className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-800 transition duration-300">
              Logout
            </Link>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
