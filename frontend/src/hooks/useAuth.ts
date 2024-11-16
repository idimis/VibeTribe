// src/hooks/useAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '@/services/authService';

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password, rememberMe });

      if (response.success) {
        const { token, role } = response.data;

        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        // Redirect based on role
        if (role === 'organizer') {
          router.push('/dashboard/organizer');
        } else if (role === 'customer') {
          router.push('/');
        } else {
          router.push('/');
        }
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleLogin,
    error,
  };
};

export default useAuth;
