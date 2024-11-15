// src/services/authService.ts
interface LoginCredentials {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export const loginUser = async ({ email, password, rememberMe }: LoginCredentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: 'Error connecting to server' };
    }
  };
  