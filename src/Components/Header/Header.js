import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <header className="header-container">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        NXT Quiz
      </div>
      <button type="button" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
