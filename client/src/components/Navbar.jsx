import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setIsLoggedin, setUserData } = useContext(AppContent);

  // Optional: logout on clicking the avatar
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setIsLoggedin(false);             // update auth state
    setUserData(null);                // clear user data
    navigate("/login");               // redirect to login
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img 
        src={assets.Tiffinmitra} 
        alt="logo" 
        className='w-28 sm:w-32 cursor-pointer' 
        onClick={() => navigate('/')} 
      />

      {userData ? (
        // Show first letter of name in a circle
        <div 
          className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold cursor-pointer"
          onClick={handleLogout} // optional: click to logout
          title="Click to logout"
        >
          {userData.name?.[0]?.toUpperCase()}
        </div>
      ) : (
        // Show Login button if not logged in
        <button 
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100'
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
