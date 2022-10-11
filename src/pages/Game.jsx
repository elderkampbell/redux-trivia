import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import action, { SAVE_GAME, SAVE_POINTS, ASSERTIONS } from '../redux/actions';
import Loading from '../components/Loading';
import pikachuBone from '../assets/pikachuBone.png';
import '../styles/game.css';

class Game extends Component {
  state = {
    resultados: [],
    correta: [],
    erradas: [],
    gameindex: 0,
    isloading: true,
    timer: 30,
    answer: null,
    dificuldade: '',
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
        dificuldade: response.results[gameindex].difficulty,
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
    const { dispatch } = this.props;
    let { score, assertions } = this.props;
    const { dificuldade, timer, correta } = this.state;
    const minPoints = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const respostaCorreta = correta[0];
    if (element === respostaCorreta && dificuldade === 'easy') {
      score += minPoints + (timer * easy);
      assertions += 1;
      dispatch(action(SAVE_POINTS, score));
      dispatch(action(ASSERTIONS, assertions));
    } else if (element === respostaCorreta && dificuldade === 'medium') {
      score += minPoints + (timer * medium);
      assertions += 1;
      dispatch(action(SAVE_POINTS, score));
      dispatch(action(ASSERTIONS, assertions));
    } else if (element === respostaCorreta && dificuldade === 'hard') {
      score += minPoints + (timer * hard);
      assertions += 1;
      dispatch(action(SAVE_POINTS, score));
      dispatch(action(ASSERTIONS, assertions));
    }
    this.setState({
      answer: element,
    });
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { resultados, gameindex } = this.state;
    const gameIndexLength = 4;
    this.setState((prevState) => ({
      answer: null,
      dificuldade: resultados[gameindex + 1].difficulty,
      gameindex: prevState.gameindex + 1,
      correta: [resultados[gameindex + 1].correct_answer],
      erradas: [...resultados[gameindex + 1].incorrect_answers],
      timer: 30,
    }));
    if (gameindex === gameIndexLength) history.push('/feedback');
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
              <section className="section-game">
                <div className="section-questions">
                  <img src={ pikachuBone } alt="foto do pikachu" />
                  <h1 data-testid="question-category">
                    {resultados[gameindex].category}
                  </h1>
                  <h4 data-testid="question-text">
                    {resultados[gameindex].question}
                  </h4>
                </div>
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
              </section>
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
