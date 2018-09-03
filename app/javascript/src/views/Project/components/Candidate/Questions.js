import React from "react";
import Text from "src/components/Text";
import { Question, QuestionTitle } from "./styles";

const Questions = ({ questions = [] }) => (
  <React.Fragment>
    {questions.map((data, i) => (
      <Question key={i}>
        <QuestionTitle>
          <Text size='s' variation="strong">
            {data.question}
          </Text>
        </QuestionTitle>
        <Text size='s' >
          {/* Render line breaks in answers */}
          {data.answer.replace(/<br\s\/>/g, "\n").split('\n').map((item, key) => {
            return <React.Fragment key={key}>{item}<br/></React.Fragment>
          })}
        </Text>
      </Question>
    ))}
  </React.Fragment>
);

export default Questions;
