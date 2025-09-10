import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, setIsLoggedin, setUserData } = useContext(AppContent)

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="logo" className='w-28 sm:w-32 cursor-pointer' onClick={() => navigate('/')} />

      {userData ? (
        <div className="flex items-center gap-3">
          {/* First letter of name in circle */}
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {userData.name[0].toUpperCase()}
          </div>
          <span className="text-gray-800 font-medium">Hey {userData.name}!</span>
        </div>
      ) : (
        <button 
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100'
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  )
}

export default Navbar
