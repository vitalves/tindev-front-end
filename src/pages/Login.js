import React, { useState } from 'react';

import api from '../services/axios';

import './login.css';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [ username, setUsername ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('devs', {
      username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev"/>
        <input 
          type="text"
          name="github" 
          id="github"
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
