import React from "react";
import Paper from "@material-ui/core/Paper";
import Quiz from "./components/Quiz";
import GameOver from "./components/GameOver";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuestions: 5,
      questions: [],
      totalCorrect: 0,
      testOver: false
    };
  }

  componentDidMount() {
    const url = `https://opentdb.com/api.php?amount=${this.state.totalQuestions}&category=18&type=multiple`;
    (async () => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.response_code === 0) {
          this.setState({ questions: json.results });
          this.handleUpdateQuestions();
        } else {
          console.warn(`Empty response. Check url request.`);
        }
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    })();
  }

  handleUpdateQuestions = () => {
    let newQuestions = this.state.questions;
    for (let i = 0; i < newQuestions.length; i++) {
      newQuestions[i].incorrect_answers.push(newQuestions[i].correct_answer); // add correct answer to answers array
      newQuestions[i].incorrect_answers.sort(() => 0.5 - Math.random()); // mix answers array
    }
    this.setState({ questions: newQuestions });
  };

  handleTotalCorrectPlusOne = () => {
    this.setState({ totalCorrect: this.state.totalCorrect + 1 });
  };

  handleTestOver = () => {
    this.setState({ testOver: true });
  };

  handleGetResult = (totalCorrect, totalQuestions) => {
    if (totalCorrect === totalQuestions) {
      return <h4>Excellent!!!</h4>;
    } else if (totalCorrect >= totalQuestions / 2) {
      return <h4>Good one!</h4>;
    } else {
      return <h4>You can do better!</h4>;
    }
  };

  render() {
    const quizComponent = (
      <Quiz
        questions={this.state.questions}
        totalCorrect={this.state.totalCorrect}
        onTotalCorrectPlusOne={this.handleTotalCorrectPlusOne}
        onTestOver={this.handleTestOver}
      />
    );
    const gameOverComponent = (
      <GameOver
        totalCorrect={this.state.totalCorrect}
        totalQuestions={this.state.totalQuestions}
        onGetResult={this.handleGetResult}
      />
    );
    return (
      <div className="main">
        <Paper className="paper-card">
          {!this.state.testOver ? quizComponent : gameOverComponent}
        </Paper>
      </div>
    );
  }
}
