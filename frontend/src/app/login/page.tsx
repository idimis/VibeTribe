import React from 'react';

import Footer from '@/components/Footer'; 
import Image from 'next/image'; 
import GoogleIcon from '@/public/icons/google.png'; 
import LogoIcon from '@/public/logo2.png';
import yogaImage from '@/public/yoga.jpg'


const Login: React.FC = () => {
  return (
    <>
      
      <div className="flex min-h-screen bg-light-gray">
        {/* Left Side: Login Information */}
        <div className="flex flex-col items-center justify-center w-1/2 p-8">
          <Image src={LogoIcon} alt="Logo" width={120} height={120} className="mb-4" /> 
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Login to Your Account</h1>
          
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg p-2 w-64 mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 w-64 mb-4"
            required
          />
          <button className="bg-tomato text-white font-semibold py-2 px-4 rounded-full hover:bg-deep-sky-blue transition duration-300 w-64 mb-4"> 
            Login
          </button>
          <p className="text-gray-600 mb-4">or</p>
          <button className="flex items-center bg-white border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-64">
            <Image src={GoogleIcon} alt="Google" width={20} height={20} className="mr-2" />
            Login with Google
          </button>
          <p className="mt-4 text-gray-700">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-600 underline">Sign up</a>
          </p>
        </div>

        {/* Right Side: Full Height Image */}
        <div className="relative w-1/2">
          <Image 
            src={yogaImage} 
            alt="Login Background"
            layout="fill" 
            objectFit="cover" 
            className="absolute inset-0"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
