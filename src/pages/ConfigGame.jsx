import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pikachuBebe from '../assets/pikachuBebe.png';
import '../styles/config.css';

class ConfigGame extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    return (
      <section className="config-section">
        <img src={ pikachuBebe } alt="pikachu bebe" />
        <div className="config-title">
          <h1 data-testid="settings-title">EM CONSTRUÇÃO</h1>
        </div>
        <button type="button" onClick={ this.handleClick }>VOLTAR</button>
      </section>
    );
  }
}

ConfigGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(ConfigGame);
