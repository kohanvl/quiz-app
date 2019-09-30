import React from "react";

export default function HeaderInfo(props) {
  return (
    <h2>
      {props.totalQuestions === 0
        ? `Loading data...`
        : `Question: ${props.totalCurQuestion} / ${props.totalQuestions}`}
    </h2>
  );
}
