import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData, getAuthState } = useContext(AppContent);

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!
        <img
          src={assets.hand_wave}
          className="w-8 aspect-square animate-hand-wave"
          alt="wave"
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className="mb-8 max-w-md">
        Let's start with a quick product tour and we will have you up and running
        in no time!
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get started
      </button>

      <style>{`
        @keyframes handWave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          45% { transform: rotate(14deg); }
          60% { transform: rotate(-4deg); }
          75% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-hand-wave {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: handWave 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;
