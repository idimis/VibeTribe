"use client";

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import GoogleIcon from '@/public/icons/google.png';
import Logo from '@/public/logo2.png';
import danceImage from '@/public/dance.jpg';
import Link from 'next/link';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Check if the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Signup successful:', data);

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        
        // Redirect to the user's profile page (can be customized)
        window.location.href = '/user/profile';  // Redirect to profile page
      } else {
        throw new Error('Server did not return JSON');
      }
    } catch (error: unknown) {
      console.error('Error during signup:', error);
      if (error instanceof Error) {
        alert(error.message || 'An error occurred during signup');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
        <div className="relative w-full lg:w-1/2">
          <Image
            src={danceImage}
            alt="Signup Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <Image src={Logo} alt="Logo" width={120} height={120} className="mb-4" />
          <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">Create an Account</h1>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="w-full max-w-xs">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300 w-full mb-4"
            >
              Sign Up
            </button>
          </form>

          <p className="text-gray-600 mb-4 text-center">or</p>
          <div className="flex justify-center w-full max-w-xs mb-4">
            <button className="flex items-center bg-white border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-full">
              <Image src={GoogleIcon} alt="Google" width={20} height={20} className="mr-2" />
              Sign up with Google
            </button>
          </div>

          <p className="mt-4 text-gray-700 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 underline">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
