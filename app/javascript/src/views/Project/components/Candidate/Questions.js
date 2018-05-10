import React from "react";
import Text from "src/components/Text";
import { Question, QuestionTitle } from "./styles";

const Questions = ({ questions = [] }) => (
  <React.Fragment>
    {questions.map((data, i) => (
      <Question key={i}>
        <QuestionTitle>
          <Text variation="strong">
            {data.question}
          </Text>
        </QuestionTitle>
        <Text>
          {data.answer}
        </Text>
      </Question>
    ))}
  </React.Fragment>
);

export default Questions;
