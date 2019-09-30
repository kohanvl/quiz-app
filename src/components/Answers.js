import React from "react";
import { RadioGroup, Radio } from "@material-ui/core/";

export default class Answers extends React.Component {
  componentDidMount() {
    const firstQuestion = document.querySelector(".item-0");
    firstQuestion.classList.remove("none");
    firstQuestion.classList.add("show");
  }

  handleCheckAnswer = e => {
    const userAnswer = e.target.value;
    const corretAnswer = this.props.onCleanString(
      this.props.question.correct_answer
    );
    const formNode =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    const radioBtn = e.target.parentNode;
    const nextBtn = document.querySelector(".main-btn");
    const allAnswers = document.querySelectorAll(".show .main-form li label");

    nextBtn.classList.remove("disabled");
    formNode.classList.add("disabled");

    if (userAnswer === corretAnswer) {
      this.props.onTotalCorrectPlusOne();
      radioBtn.classList.add("correct");
    } else {
      radioBtn.classList.add("wrong");

      allAnswers.forEach(element => {
        if (element.textContent === corretAnswer) {
          element.classList.add("correct");
        }
      });
    }
  };

  render() {
    return (
      <ol>
        <form className="main-form">
          <RadioGroup>
            {this.props.question.incorrect_answers.map((answer, i) => (
              <li key={i}>
                <label>
                  <Radio
                    color="primary"
                    name="answer"
                    type="radio"
                    value={answer}
                    onClick={this.handleCheckAnswer}
                  />
                  {this.props.onCleanString(answer)}
                </label>
              </li>
            ))}
          </RadioGroup>
        </form>
      </ol>
    );
  }
}
