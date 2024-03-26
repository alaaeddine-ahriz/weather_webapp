import React, { useState } from 'react';
import './CreateUser.css'; // Importation du fichier CSS

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici la logique pour créer un nouvel utilisateur avec les données saisies
    console.log('Utilisateur créé :', { username, phone});
    setUsername('');
    setPhone('');
  };

  return (
    <div className="create-user-container">
      <div className="create-user-title">
        <h2>Créer un nouvel utilisateur</h2>
      </div>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Nom d'utilisateur" 
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="phone"
            value={phone}
            placeholder="Numéro de téléphone" 
            onChange={handlePhoneChange}
            required
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateUser;
