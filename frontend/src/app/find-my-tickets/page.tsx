import React from 'react';
import Footer from '@/components/Footer'; 
import Image from 'next/image'; 
import Logo from '@/public/logo2.png'; 
import artsImage from '@/public/arts.jpg';

const FindMyTicket: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
      
        <div className="relative w-full lg:w-1/2">
          <Image 
            src={artsImage} 
            alt="Find My Ticket Background"
            layout="fill" 
            objectFit="cover" 
            className="absolute inset-0"
          />
        </div>

        
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8 lg:p-16">
          <Image src={Logo} alt="Logo" width={120} height={120} className="mb-4" /> 
          <h1 className="text-3xl lg:text-5xl font-bold text-purple-600 mb-6 text-center">
            What email did you use to buy tickets?
          </h1>
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg p-3 w-full max-w-xs mb-6"
            required
          />
          <button className="bg-tomato text-white font-semibold py-3 px-6 rounded-full hover:bg-deep-sky-blue transition duration-300 w-full max-w-xs mb-6">
            Continue
          </button>
          <p className="mt-4 text-gray-700 text-center">
            <a href="/" className="text-purple-600 underline">Back</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindMyTicket;
