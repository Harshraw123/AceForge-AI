import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="focus:outline-none"
        aria-label="Toggle profile menu"
      >
        <img
          src={user.profileImageUrl || '/user.jpg'}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border border-black hover:ring-2 hover:ring-amber-400 transition"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-black  text-white rounded-xl shadow-lg z-20 py-4 px-5 space-y-4 backdrop-blur-md

bg-white/10

border border-white/20">
          <div className="text-sm font-medium truncate">{  user.fullName}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-amber-400 hover:text-amber-500 text-sm font-medium"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
