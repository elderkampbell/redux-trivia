import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import action, { EMAIL, GRAVATAR, NOME, fetchAPI } from '../redux/actions';
import pikachuBone from '../assets/pikachuBone.png';
import '../styles/login.css';

class Login extends React.Component {
  state = {
    email: '',
    isloginButtonDisabled: true,
    nome: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.validation(); });
  };

  handleSubmmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email, nome } = this.state;
    const { dispatch } = this.props;
    const gravatarHash = await md5(email);
    const gravatar = (`https://www.gravatar.com/avatar/${gravatarHash}?s=200`);
    dispatch(action(GRAVATAR, gravatar));
    dispatch(action(EMAIL, email));
    dispatch(action(NOME, nome));
    await dispatch(fetchAPI());
    history.push('/game');
  };

  settingsClick = () => {
    const { history } = this.props;
    history.push('/config');
  };

  validation = () => {
    const { email, nome } = this.state;
    const minCaracteres = 0;
    const verifyEmail = /\S+@\S+\.\S+/;
    if (nome.length > minCaracteres && email.match(verifyEmail)) {
      this.setState({ isloginButtonDisabled: false });
    } else {
      this.setState({ isloginButtonDisabled: true });
    }
  };

  render() {
    const { email, isloginButtonDisabled, nome } = this.state;
    return (
      <main className="login-main">
        <form className="login-section" onSubmit={ this.handleSubmmit }>
          <img src={ pikachuBone } alt="Pikachu de Boné" />
          <h1>
            <span>T</span>
            RIVI
            <span>A</span>
          </h1>
          <div className="background-label">
            <label htmlFor="email">
              <input
                placeholder="Qual é o seu e-mail do gravatar?"
                type="text"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                required
              />
            </label>
            <label htmlFor="nome">
              <input
                placeholder="Qual é o seu nome?"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                value={ nome }
                type="text"
                name="nome"
                required
              />
            </label>
            <button
              className="btn-play"
              type="submit"
              disabled={ isloginButtonDisabled }
              data-testid="btn-play"
            >
              Play
            </button>
            <button
              className="btn-settings"
              type="button"
              data-testid="btn-settings"
              onClick={ this.settingsClick }
            >
              Config
            </button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
