import React from "react";
import { Button } from "@material-ui/core/";

export default class ButtonNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextOrFinish: "next"
    };
  }

  handleNextQuestion = () => {
    this.props.onTotalDoneQuestions();

    const nextBtn = document.querySelector(".main-btn");
    const curQuestion = document.querySelector(".show");
    const nextQuestion = curQuestion.nextElementSibling;

    nextBtn.classList.add("disabled");

    if (nextQuestion !== null) {
      const nextNextQuestion =
        curQuestion.nextElementSibling.nextElementSibling;
      if (nextNextQuestion === null) this.setState({ nextOrFinish: "finish" });

      curQuestion.classList.remove("show");
      curQuestion.classList.add("none");
      nextQuestion.classList.remove("none");
      nextQuestion.classList.add("show");
    } else {
      this.props.onTestOver();
    }
  };
  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        className={"main-btn disabled"}
        onClick={this.handleNextQuestion}
      >
        {this.state.nextOrFinish}
      </Button>
    );
  }
}
