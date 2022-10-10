import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import action, { SAVE_GAME } from '../redux/actions';
import Loading from '../components/Loading';

class Game extends Component {
  state = {
    resultados: [],
    correta: [],
    erradas: [],
    gameindex: 0,
    isloading: true,
    timer: 30,
    answer: null,
  };

  async componentDidMount() {
    await this.fetchTriviaQuestions();
    this.timerStart();
  }

  fetchTriviaQuestions = async () => {
    const { history, token, dispatch } = this.props;
    const { gameindex } = this.state;
    const API = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await API.json();
    if (response.response_code === 0) {
      this.setState({ isloading: false,
        resultados: response.results,
        correta: [response.results[gameindex].correct_answer],
        erradas: [...response.results[gameindex].incorrect_answers],
      });
      dispatch(action(SAVE_GAME, response.results));
    } else {
      this.setState({ isloading: false });
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  timerStart = () => {
    const stopTime = 30000;
    const seconds = 1000;
    const time = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, seconds);
    setTimeout(() => {
      clearInterval(time);
    }, stopTime);
  };

  selectedAnswer = (element) => {
    this.setState(() => ({
      answer: element,
    }));
  };

  nextQuestion = () => {
    const { resultados, gameindex } = this.state;
    this.setState((prevState) => ({
      answer: null,
      gameindex: prevState.gameindex + 1,
      correta: [resultados[gameindex + 1].correct_answer],
      erradas: [...resultados[gameindex + 1].incorrect_answers],
      timer: 30,
    }));
  };

  shuffleArray(array) { // ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; i -= i) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const { resultados,
      gameindex, correta, erradas, isloading, answer, timer } = this.state;
    const todasAsRespostas = [...correta, ...erradas];
    const respostaCorreta = correta[0];
    return (
      <div>
        {isloading
          ? <Loading />
          : (
            <>
              <Header />
              <h1 data-testid="question-text">
                {resultados[gameindex].question}
              </h1>
              <h3 data-testid="question-category">
                {resultados[gameindex].category}
              </h3>
              <label htmlFor="answers" data-testid="answer-options">
                {this.shuffleArray(todasAsRespostas).map((element, index) => (
                  <button
                    key={ index }
                    style={ answer !== null ? { // ref https://stackoverflow.com/questions/70356243/react-js-changing-button-colours-if-user-clicked-on-correct-incorrect-options-fr
                      border: element === respostaCorreta
                        ? '3px solid rgb(6, 240, 15)' : '3px solid red',
                    } : null }
                    type="button"
                    onClick={ () => this.selectedAnswer(element) }
                    data-testid={
                      element === respostaCorreta
                        ? 'correct-answer' : `wrong-answer-${index}`
                    }
                    disabled={ timer === 0 }
                  >
                    { element }
                  </button>))}
              </label>
              {
                (answer !== null)
                  ? (
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.nextQuestion }
                    >
                      Prox
                    </button>)
                  : <h4>{ timer }</h4>
              }
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
