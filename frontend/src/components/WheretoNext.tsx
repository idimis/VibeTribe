"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const cities = [
  { name: "Jakarta", image: "/images/jakarta.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g294229-Activities-Jakarta_Java.html" },
  { name: "Bali", image: "/images/bali.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g294226-Activities-Bali.html" },
  { name: "Yogyakarta", image: "/images/yogyakarta.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g294230-Activities-Yogyakarta_Java.html" },
  { name: "Bandung", image: "/images/bandung.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297704-Activities-Bandung_West_Java_Java.html" },
  { name: "Surabaya", image: "/images/surabaya.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297715-Activities-Surabaya_East_Java_Java.html" },
  { name: "Lombok", image: "/images/lombok.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297733-Activities-Lombok_West_Nusa_Tenggara.html" },
  { name: "Medan", image: "/images/medan.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297725-Activities-Medan_Sumatra.html" },
  { name: "Makassar", image: "/images/makassar.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297720-Activities-Makassar_South_Sulawesi_Sulawesi.html" },
  { name: "Semarang", image: "/images/semarang.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297712-Activities-Semarang_Central_Java_Java.html" },
  { name: "Malang", image: "/images/malang.jpg", tripAdvisorUrl: "https://www.tripadvisor.com/Attractions-g297699-Activities-Malang_East_Java_Java.html" },
];

const WhereToNext: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000); 
    return () => clearInterval(interval); 
  }, []);

  
  const extendedCities = [...cities, ...cities];

  return (
    <div className="flex flex-col items-center w-full py-10">
      <h2 className="text-3xl font-bold mb-6">Where to Next?</h2>

      <div className="relative w-full max-w-[1440px] overflow-hidden">
       
        <div
          className="flex animate-slide transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * (100 / cities.length))}%)`,
            display: 'flex',
          }}
        >
          {extendedCities.map((city, index) => (
            <Link key={index} href={city.tripAdvisorUrl} passHref>
              <div className="relative min-w-[200px] max-w-[200px] h-[250px] mx-2 rounded-lg shadow-lg hover:brightness-75 transition duration-300 cursor-pointer">
                <Image
                  src={city.image}
                  alt={city.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-lg"></div>
                <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{city.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${(100 / cities.length) * cities.length}%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-slide {
            animation: none; /* Disable animation on smaller screens for better performance */
          }
        }
      `}</style>
    </div>
  );
};

export default WhereToNext;
