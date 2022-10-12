import React, { Component } from 'react';
import gif from '../assets/gif.gif';
import '../styles/loading.css';

class Loading extends Component {
  render() {
    return (
      <section className="loading-section">
        <img src={ gif } alt="gif do pikachu" />
        <h1>LOADING...</h1>
      </section>
    );
  }
}

export default Loading;
