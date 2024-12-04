
export const api = {
    login: async (email: string, password: string) => {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }
  
      return response.json(); 
    },
  
    getUserDetails: async (token: string) => {
      const response = await fetch("http://localhost:8080/api/v1/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }
  
      return response.json(); 
    },
  };
  