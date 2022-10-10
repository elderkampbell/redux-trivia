import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const numberOfAssertions = 3;
    return (
      <div>
        {
          assertions < numberOfAssertions
            ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            )
            : <h1 data-testid="feedback-text">Well Done!</h1>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
