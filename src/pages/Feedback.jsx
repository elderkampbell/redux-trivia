import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const numberOfAssertions = 3;
    return (
      <div>
        {
          assertions < numberOfAssertions
            ? (
              <div>
                <h1 data-testid="feedback-text">Could be better...</h1>
                <h3>
                  você acertou:
                </h3>
                <p data-testid="feedback-total-question">{assertions}</p>
                <h3>
                  perguntas! Continue tentando 😁!
                </h3>
                <h4>Pontuação Final:</h4>
                <p data-testid="feedback-total-score">{score}</p>
              </div>
            )
            : (
              <div>
                <h1 data-testid="feedback-text">Well Done!</h1>
                <h3>
                  Parabéns! você acertou:
                </h3>
                <p data-testid="feedback-total-question">{assertions}</p>
                <h3>
                  perguntas 🤯
                </h3>
                <h4>Pontuação Final:</h4>
                <p data-testid="feedback-total-score">{score}</p>
              </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
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
