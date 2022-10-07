import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const score = 0;
    const { nome, gravatar } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatar } alt="Profile" />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.login.nome,
  gravatar: state.login.gravatar,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
