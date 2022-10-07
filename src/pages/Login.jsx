import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import action, { EMAIL, GRAVATAR, NOME, fetchAPI } from '../redux/actions';

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
    const gravatar = (`https://www.gravatar.com/avatar/${gravatarHash}`);
    dispatch(action(GRAVATAR, gravatar));

    dispatch(action(EMAIL, email));
    dispatch(action(NOME, nome));
    history.push('/game');
    
    await dispatch(fetchAPI());
    history.push('/play');
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
      <main>
        <section>
          <form onSubmit={ this.handleSubmmit }>
            <h1>Login</h1>
            <label htmlFor="email">
              <h4>Email:</h4>
              <input
                placeholder="Insira seu Email"
                type="text"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                required
              />
            </label>
            <label htmlFor="nome">
              <h4>nome:</h4>
              <input
                placeholder="Insira seu Nome"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                value={ nome }
                type="text"
                name="nome"
                required
              />
            </label>
            <button
              type="submit"
              disabled={ isloginButtonDisabled }
              data-testid="btn-play"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.settingsClick }
            >
              Config
            </button>
          </form>
        </section>
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
