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
    respostas: [],
    correta: '',
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
      const respostas = [
        response.results[gameindex].correct_answer,
        ...response.results[gameindex].incorrect_answers];
      this.setState({ isloading: false,
        dificuldade: response.results[gameindex].difficulty,
        resultados: response.results,
        correta: response.results[gameindex].correct_answer,
        respostas: this.shuffleArray(respostas),
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
    const respostaCorreta = correta;
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
    if (gameindex === gameIndexLength) {
      history.push('/feedback');
    } else {
      const respostas = [
        resultados[gameindex + 1].correct_answer,
        ...resultados[gameindex + 1].incorrect_answers];

      this.setState((prevState) => ({
        answer: null,
        dificuldade: resultados[gameindex + 1].difficulty,
        correta: resultados[gameindex + 1].correct_answer,
        gameindex: prevState.gameindex + 1,
        respostas: this.shuffleArray(respostas),
        timer: 30,
      }));
    }
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
      gameindex, correta, isloading, answer, timer, respostas } = this.state;
    return (
      <div>
        {isloading
          ? <Loading />
          : (
            <>
              <Header />
              <section className="section-game">
                <div className="section-questions">
                  <img className="pikachu" src={ pikachuBone } alt="foto do pikachu" />
                  <div className="question-background">
                    <h1 className="category" data-testid="question-category">
                      {resultados[gameindex].category}
                    </h1>
                    <h4 data-testid="question-text">
                      {resultados[gameindex].question}
                    </h4>
                  </div>
                </div>
                <div className="label-answers">
                  <label
                    // className="label-label"
                    htmlFor="answers"
                    data-testid="answer-options"
                  >
                    {respostas.map((element, index) => (
                      <div key={ index }>
                        <button
                          className="button-answers"
                          style={ answer !== null ? { // ref https://stackoverflow.com/questions/70356243/react-js-changing-button-colours-if-user-clicked-on-correct-incorrect-options-fr
                            border: element === correta
                              ? '3px solid rgb(6, 240, 15)' : '3px solid red',
                          } : null }
                          type="button"
                          onClick={ () => this.selectedAnswer(element) }
                          data-testid={
                            element === correta
                              ? 'correct-answer' : `wrong-answer-${index}`
                          }
                          disabled={ timer === 0 }
                        >
                          { element }
                        </button>
                      </div>))}
                    {
                      (answer !== null)
                        ? (
                          <button
                            type="button"
                            data-testid="btn-next"
                            onClick={ this.nextQuestion }
                            className="button-next"
                          >
                            PRÓXIMA
                          </button>)
                        : <h4 className="timer">{ `Tempo: ${timer}` }</h4>
                    }
                  </label>
                </div>
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
