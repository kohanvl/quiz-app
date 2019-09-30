import React from "react";
import Answers from "./Answers";
import HeaderInfo from "./HeaderInfo";
import ButtonNext from "./ButtonNext";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCurQuestion: 1
    };
  }

  handleTotalDoneQuestions = () => {
    this.setState({ totalCurQuestion: this.state.totalCurQuestion + 1 });
  };

  handleCleanString = str => {
    if (str.indexOf("&quot;") >= 0) return str.replace(/(&quot;)/g, '"');
    else if (str.indexOf("&#039;") >= 0) return str.replace(/(&#039;)/g, "'");
    else if (str.indexOf("&lt;") >= 0)
      return str.replace(/(&lt;)/g, "<").replace(/(&gt;)/g, ">");
    else return str;
  };

  render() {
    return (
      <div className="quiz">
        <HeaderInfo
          totalCurQuestion={this.state.totalCurQuestion}
          totalQuestions={this.props.questions.length}
        />

        <ul>
          {this.props.questions.map((item, index) => (
            <li className={"none items item-" + index} key={index}>
              <div className="question">
                {this.handleCleanString(item.question)}
              </div>
              <Answers
                question={item}
                onCleanString={this.handleCleanString}
                onTotalCorrectPlusOne={this.props.onTotalCorrectPlusOne}
              />
            </li>
          ))}
        </ul>
        <ButtonNext
          onTestOver={this.props.onTestOver}
          onTotalDoneQuestions={this.handleTotalDoneQuestions}
        />
      </div>
    );
  }
}
