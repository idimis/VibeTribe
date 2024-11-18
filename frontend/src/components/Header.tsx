"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImage from "@/public/logo2.png";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { debounce } from "lodash";

interface Event {
  id: string;
  title: string;
  location: string;
}

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cities, setCities] = useState<string[]>([
    "Jakarta", "Surabaya", "Bandung", "Bali", "Yogyakarta", "Medan", "Makassar", "Semarang", "Malang",
  ]);
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const router = useRouter();

  // Initialize cities and user data
  useEffect(() => {
    const storedUsername =
      localStorage.getItem("username") || sessionStorage.getItem("username");
    const storedRole =
      localStorage.getItem("role") || sessionStorage.getItem("role");

    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Search events function (debounced)
  const handleSearch = debounce((query: string) => {
    if (query.trim()) {
      fetch(`/api/v1/events?search=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
          setIsSearchVisible(true);
        })
        .catch(() => {
          setSearchResults([]);
          setIsSearchVisible(false);
        });
    } else {
      setSearchResults([]);
      setIsSearchVisible(false);
    }
  }, 500);

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocation(query);
    // Filter cities based on user input
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setLocation(city);
    router.push(`/events/${city}`);
    setFilteredCities(cities); // Reset the city filter
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    setUsername(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-4 md:p-5">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src={logoImage}
            alt="Logo Brand"
            width={150}
            height={150}
            className="object-contain w-[100px] h-[auto]"
          />
        </div>

        {/* Location Search Bar */}
        <div className="relative hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Search by city..."
            className="outline-none text-sm px-2 py-1 w-60"
            value={location}
            onChange={handleLocationChange}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FaMapMarkerAlt className="text-gray-600" />
          </button>

          {/* Popup with filtered city results */}
          {location && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-60 mt-2 shadow-lg max-h-64 overflow-y-auto">
              <ul>
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="relative hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Search events..."
              className="outline-none text-sm px-2 py-1 w-60"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-600" />
            </button>

            {/* Popup with search results */}
            {isSearchVisible && searchResults.length > 0 && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-60 mt-2 shadow-lg max-h-64 overflow-y-auto">
                <ul>
                  {searchResults.map((event) => (
                    <li key={event.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm">{event.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Profile and Links */}
          {username ? (
            <div className="flex items-center space-x-4">
              <span className="text-purple-600 font-semibold hidden md:block">Hello, {username}!</span>
              {role === "customer" && (
                <Link href="/find-ticket" className="text-black hover:underline">
                  Find My Ticket
                </Link>
              )}
              {role === "organizer" && (
                <Link href="/create-event" className="text-black hover:underline">
                  Create Event
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/create-event" className="text-black hover:underline">
                Create Event
              </Link>
              <Link href="/find-ticket" className="text-black hover:underline">
                Find My Ticket
              </Link>
              <Link href="/login" className="text-black hover:underline">
                Log In
              </Link>
              <Link href="/signup" className="text-black hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
