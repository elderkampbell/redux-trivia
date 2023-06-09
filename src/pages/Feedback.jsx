import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import action, { SAVE_POINTS, ASSERTIONS } from '../redux/actions';
import '../styles/feedback.css';
import '../styles/feedbackAcerto.css';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  initialPage = () => {
    const { history, dispatch } = this.props;
    history.push('/game');
    dispatch(action(SAVE_POINTS, 0));
    dispatch(action(ASSERTIONS, 0));
  };

  render() {
    const { assertions, score, gravatar } = this.props;
    const numberOfAssertions = 3;
    return (
      <div>
        <Header />
        {assertions < numberOfAssertions ? (
          <div className="div-feedbacks">
            <img src={ gravatar } alt="Imagem gravatar" />
            <div className="feedbacks-background">
              <div>
                <h1 data-testid="feedback-text">PODIA SER MELHOR...</h1>
                <h3>Continue tentando 😁!</h3>
                <p data-testid="feedback-total-question">
                  {`Você acertou: ${assertions} questões!`}
                </p>
                <p data-testid="feedback-total-score">
                  {`Um total de: ${score} pontos`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="div-feedbacks-acerto">
              <img src={ gravatar } alt="Imagem gravatar" />
              <div className="feedbacks-background-acerto">
                <div>
                  <h1 data-testid="feedback-text">MANDOU BEM!</h1>
                  <h3>Parabéns 🤯!</h3>
                  <p data-testid="feedback-total-question">
                    {`Você acertou: ${assertions} questões!`}
                  </p>
                  <p data-testid="feedback-total-score">
                    {`Um total de: ${score} pontos`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="feedback-buttons">
          <button
            type="button"
            className="button-ranking"
            data-testid="btn-ranking"
            onClick={ this.handleClick }
          >
            VER RANKING
          </button>
          <button
            type="button"
            className="button-play-again"
            onClick={ this.initialPage }
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  gravatar: state.login.gravatar,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
