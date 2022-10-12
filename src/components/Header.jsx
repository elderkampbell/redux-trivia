import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import configuração from '../assets/configuração.png';
import fave from '../assets/fave.png';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { nome, gravatar, score } = this.props;
    return (
      <header className="header-game">
        <div className="header-gravatar">
          <img
            className="header-img"
            data-testid="header-profile-picture"
            src={ gravatar }
            alt="Profile"
          />
          <p
            className="header-element"
            data-testid="header-player-name"
          >
            { nome }
          </p>
        </div>
        <div className="header-points">
          <img
            className="header-img"
            src={ fave }
            alt="Imagem Pontos"
          />
          <p
            className="header-element"
            data-testid="header-score"
          >
            {`Pontos: ${score}`}
          </p>
        </div>
        <div>
          <Link to="/config/header">
            <img className="header-img" src={ configuração } alt="" />
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.login.nome,
  gravatar: state.login.gravatar,
  score: state.player.score,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
