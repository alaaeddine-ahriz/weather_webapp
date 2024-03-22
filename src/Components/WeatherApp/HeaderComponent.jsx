import React from 'react';
import './HeaderComponent.css'; // Assuming you have a CSS file for styling

import profile_image from "../Assets/profile_1.png";

function Header() {
  return (
    <header className="header_div">
      <div className="logo-container">
        Météo
      </div>
      <div className="profile-container">
        <img src={profile_image} alt="" />
      </div>
    </header>
  );
};

export { Header };
