import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css'; // Assuming you have a CSS file for styling
import { useCookies } from 'react-cookie';
import profile_image from "../Assets/profile_1.png";

function Header() {

  const [cookies] = useCookies(['userData']);

  const userData = cookies.userData;
  return (
    <header className="header_div">
      <div className="logo-container">
        Météo
      </div>
      <div className="profile-container">
        {/* Wrap the image with Link component */}
        <Link to={userData.username ? "/dashboard" : "/login"}>
          <img src={profile_image} alt="Profile" />
        </Link>
      </div>
    </header>
  );
};

export { Header };
