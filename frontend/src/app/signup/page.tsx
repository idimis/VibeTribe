"use client";

import React from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import GoogleIcon from '@/public/icons/google.png';
import Logo from '@/public/logo2.png';
import danceImage from '@/public/dance.jpg';
import Link from 'next/link';

const Signup: React.FC = () => {
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
          
          {/* Confirm Button */}
          <Link
            href="/account"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300 w-full max-w-xs mb-4 block text-center"
          >
            Confirm
          </Link>

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
