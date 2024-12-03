"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoImage from "@/public/logo2.png";
import { cities } from "@/constants/cities";
import { events } from "@/constants/events";
import LocationSearch from "./LocationSearch";
import EventSearch from "./EventSearch";
import UserGreeting from "./UserGreeting";

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<{ id: number; title: string }[]>([]);
  const router = useRouter();

  const baseUrl = "http://localhost:8080";

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token =
          localStorage.getItem("jwt_token") || sessionStorage.getItem("jwt_token");
  
        if (!token) {
          setUsername(null);
          setRole(null);
          return;
        }
  
        const response = await fetch(`${baseUrl}/api/v1/user/details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);
          setUsername(data.data.name); 
          setRole(data.data.role);
        } else {
          console.error("Failed to fetch user data");
          setUsername(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername(null);
        setRole(null);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/api/v1/logout`, { method: "POST" });
      localStorage.removeItem("jwt_token");
      sessionStorage.removeItem("jwt_token");
      setUsername(null);
      setRole(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-4 md:p-5">
        <div className="flex items-center space-x-4">
          <Image
            src={logoImage}
            alt="Logo Brand"
            width={150}
            height={150}
            className="object-contain w-[100px] h-[auto]"
          />
        </div>

        <LocationSearch
          location={location}
          filteredCities={filteredCities}
          onLocationChange={(e) => {
            const query = e.target.value;
            setLocation(query);
            setFilteredCities(
              query
                ? cities.filter((city) =>
                    city.toLowerCase().includes(query.toLowerCase())
                  )
                : []
            );
          }}
        />
        <EventSearch
          searchQuery={searchQuery}
          filteredEvents={filteredEvents}
          onSearchQueryChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
            setFilteredEvents(
              query
                ? events.filter((event) =>
                    event.title.toLowerCase().includes(query.toLowerCase())
                  )
                : []
            );
          }}
          onEventSelect={(eventTitle) => {
            router.push(`/event/${eventTitle}`);
            setSearchQuery("");
            setFilteredEvents([]);
          }}
        />

        <UserGreeting username={username} role={role} onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
