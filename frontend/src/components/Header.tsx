import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/logo2.png';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // State for user role

  useEffect(() => {
    // Simulate fetching user data from backend or storage
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    const storedRole = localStorage.getItem('role') || sessionStorage.getItem('role'); // Fetch role from storage
    setUsername(storedUsername);
    setRole(storedRole); // Set user role
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    setUsername(null);
    setRole(null);
    window.location.href = '/login';
  };

  return (
    <header className="bg-white text-black shadow">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-5">
        <div className="flex items-center">
          <Image
            src={logoImage}
            alt="Logo Brand"
            width={200}
            height={200}
            className="object-contain w-[100px] h-[auto] md:w-[150px]"
          />
        </div>

        <div className="flex items-center mx-5">
          {username ? (
            <div className="flex items-center">
              <span className="mx-2 text-purple-600 font-semibold hidden md:block">
                Halo, {username}!
              </span>
              {role === 'customer' && (
                <Link href="/find-ticket" className="mx-2 text-black hover:underline hidden md:block">
                  Find My Ticket
                </Link>
              )}
              {role === 'organizer' && (
                <Link href="/create-event" className="mx-2 text-black hover:underline hidden md:block">
                  Create Event
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300 ml-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/create-event" className="mx-2 text-black hover:underline hidden md:block">
                Create Event
              </Link>
              <Link href="/find-ticket" className="mx-2 text-black hover:underline hidden md:block">
                Find My Ticket
              </Link>
              <Link href="/login" className="mx-2 text-black hover:underline hidden md:block">
                Log In
              </Link>
              <Link href="/signup" className="mx-2 text-black hover:underline hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
