import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import api from '../services/axios';

import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) {
  const [ users, setUsers] = useState([]);
  const [ matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    (async function loadUsers() {
      const response = await api.get('devs', {
        headers: {
          user: match.params.id,
        }
      });
      setUsers(response.data);
    })();
  }, [match.params.id]);

  /* SOKET.IO */
  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: {
        user: match.params.id
      }
    });

    // Ouvir o evento de 'match' do socket:
    socket.on('match', dev => {
      setMatchDev(dev);
    });

  }, [match.params.id]);

  /* TESTE SOKET.IO
  useEffect(() => {
    const socket = io('http://localhost:3333');
    // lendo mensagem do backend
    socket.on('world', message => {
      console.log(message)
    });
    // enviando mensagem para o backend
    setTimeout(() => {
      socket.emit('tipo', {
        message: 'hello World',
      })
    }, 3000);
  }, [match.params.id]);
  */
  /* SOKET.IO */

  async function handleLike(id) {
    await api.post(`devs/${id}/likes`, null, {
      headers: {
        user: match.params.id,
      }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id,
      }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  const usersLength = useMemo(() => users.length, [users]);

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev"/>
      </Link>
      
      {usersLength > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name}/>
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">ACABOU <br /> =( </div>
      )}

      {
        matchDev && (
          <div className="match-container">
            <img src={itsamatch} alt="it's a match"/>
            <img 
              className="avatar" 
              src={matchDev.avatar} alt="avatar"
            />
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>
            <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
          </div>
        )
      }
    </div>
  );
}