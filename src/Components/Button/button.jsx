// Button.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Si vous utilisez React Router
import './button.css'; // Importation du fichier CSS

const Button = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/profile'); // Redirection vers la page de gestion du profil
    } else {
      navigate('/login'); // Redirection vers la page de connexion
    }
  };

  return (
    <button className="round-button" onClick={handleClick}>
      {isLoggedIn ? 'Gérer le profil' : 'Se connecter'}
    </button>
  );
};

export default Button;