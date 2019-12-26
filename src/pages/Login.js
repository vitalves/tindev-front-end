import React from 'react';

import './login.css';

import logo from '../assets/logo.svg';

export default function Login() {
  return (
    <div className="login-container">
      <form>
        <img src={logo} alt="Tindev"/>
        <input 
          type="text"
          name="github" 
          id="github"
          placeholder="Digite seu usuário no Github"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
