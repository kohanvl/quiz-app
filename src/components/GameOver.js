import React from "react";
import { Button } from "@material-ui/core/";

export default function GameOver(props) {
  return (
    <div className="game-over">
      <h2>Test is over</h2>
      <h3>
        Your result: {props.totalCorrect} / {props.totalQuestions}
      </h3>
      {props.onGetResult(props.totalCorrect, props.totalQuestions)}
      <Button
        variant="contained"
        color="primary"
        className={"main-btn"}
        onClick={() => window.location.reload()}
      >
        Start new test
      </Button>
      <div>* with new questions</div>
    </div>
  );
}
