import React from "react";
import Link from "next/link";

interface UserGreetingProps {
  username: string | null;
  role: string | null;
  onLogout: () => void;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ username, role, onLogout }) => {
    console.log("UserGreeting Props:", { username, role }); 
  
    return (
      <div className="flex items-center space-x-4">
        {username ? (
          <>
            <span className="text-purple-600 font-semibold hidden md:block">
              Hello, {username}, welcome back!
            </span>
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
              onClick={onLogout}
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  };
  

export default UserGreeting;
