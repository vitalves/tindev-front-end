import React from 'react';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
return (
  <div className="main-container">
    <img src={logo} alt="Tindev"/>
    <ul>
      <li>
        <img src="https://avatars3.githubusercontent.com/u/10171839?s=460&v=4" alt="Github"/>
        <footer>
          <strong>Vital Alves</strong>
          <p>Vital AlvesVital AlvesVital Alves Vital AlvesVital Alves Vital Alves Vital Alves Vital AlvesVital Alves Vital Alves</p>
        </footer>
        <div className="buttons">
          <button type="button">
            <img src={dislike} alt="dislike" />
          </button>
          <button type="button">
            <img src={like} alt="like" />
          </button>
        </div>
      </li>
    </ul>
  </div>
);
}