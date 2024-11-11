"use client";

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import GoogleIcon from '@/public/icons/google.png';
import Logo from '@/public/logo2.png';
import yogaImage from '@/public/yoga.jpg';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),  
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);  
        } else {
          sessionStorage.setItem('token', data.token);  
        }
        
        console.log('Login successful. Redirecting to dashboard...');
       
        window.location.href = '/user/dashboard';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
        <div className="relative w-full lg:w-1/2">
          <Image 
            src={yogaImage} 
            alt="Login Background"
            layout="fill" 
            objectFit="cover" 
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <Image src={Logo} alt="Logo" width={120} height={120} className="mb-4" /> 
          <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">Login to Your Account</h1>
          
          <form onSubmit={handleLogin} className="w-full max-w-xs">
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
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
            </div>
            
            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300 w-full mb-4">
              Confirm
            </button>
          </form>

          <p className="text-gray-600 mb-4 text-center">or</p>
          <button className="flex items-center bg-white border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-full max-w-xs">
            <Image src={GoogleIcon} alt="Google" width={20} height={20} className="mr-2" />
            Login with Google
          </button>

          <p className="mt-4 text-gray-700 text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-600 underline">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
