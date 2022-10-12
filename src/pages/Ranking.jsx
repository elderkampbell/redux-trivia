import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pikachuBebe from '../assets/pikachuBebe.png';
import '../styles/ranking.css';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    return (
      <section className="ranking-section">
        <img src={ pikachuBebe } alt="" />
        <div className="ranking-title">
          <h1 data-testid="ranking-title">EM CONSTRUÇÃO!</h1>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          VOLTAR
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
