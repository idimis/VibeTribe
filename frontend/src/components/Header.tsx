"use client";  

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/logo2.png';
import party1Image from '@/public/party1.jpg';
import party2Image from '@/public/party2.jpg';
import party3Image from '@/public/party3.jpg';
import party4Image from '@/public/party4.jpg';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white text-black shadow">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-5">
        
        {/* Logo - hidden on mobile */}
        <div className="flex items-center md:flex">
          <Image 
            src={logoImage} 
            alt="Logo Brand"  
            width={200}
            height={200}
            className="object-contain w-[100px] h-[auto] md:w-[150px]" 
          />
        </div>

        {/* Search Bar and Location Selector - hidden on mobile */}
        <div className="hidden md:flex items-center flex-grow mx-5">
          <input 
            type="text" 
            placeholder="Search events..." 
            className="border border-gray-300 rounded-l p-2 w-1/2 focus:outline-none"
          />
          <input 
            type="text" 
            placeholder="Choose location..." 
            className="border border-gray-300 rounded-l p-2 w-1/3 mx-2 focus:outline-none"
          />
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center">
            🔍
          </button>
        </div>

        {/* Links always visible, including on mobile */}
        <div className="flex items-center mx-5">
          <Link href="/create-event" className="mx-2 text-black hover:underline hidden md:block">
            Create Event
          </Link>
          <Link href="/find-my-tickets" className="mx-2 text-black hover:underline hidden md:block">
            Find My Tickets
          </Link>

          {/* Always visible on mobile */}
          <Link href="/create-event" className="mx-2 text-black hover:underline md:hidden">
            Create Event
          </Link>
          <Link href="/find-my-tickets" className="mx-2 text-black hover:underline md:hidden">
            Find My Tickets
          </Link>

          <Link href="/login" className="mx-2 text-black hover:underline hidden md:block">
            Log In
          </Link>
          <Link href="/signup" className="mx-2 text-black hover:underline hidden md:block">
            Sign Up
          </Link>

          {/* Burger Button - visible only on mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="p-2 focus:outline-none"
            >
              {/* Burger Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center p-4">
            <Link href="/create-event" className="py-2 text-black hover:underline">
              Create Event
            </Link>
            <Link href="/find-my-tickets" className="py-2 text-black hover:underline">
              Find My Tickets
            </Link>
            <Link href="/login" className="py-2 text-black hover:underline">
              Log In
            </Link>
            <Link href="/signup" className="py-2 text-black hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
