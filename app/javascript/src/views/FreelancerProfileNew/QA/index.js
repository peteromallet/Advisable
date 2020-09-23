import React from "react";
import { Stack, Text, Box, Card } from "@advisable/donut";
import Answer from "./Answer";
import Question from "./Question";

function QA({ questions, answers }) {
  const questionsHash = questions.reduce((acc, question) => {
    return { ...acc, [question.id]: { question: question } };
  }, {});

  const qaHash = answers.reduce((acc, answer) => {
    const questionId = answer.question.id;
    return {
      ...acc,
      [questionId]: { ...acc[questionId], answer: answer },
    };
  }, questionsHash);

  const answersList = Object.keys(qaHash)
    .filter((key) => !!qaHash[key].answer)
    .map((key) => (
      <Answer
        key={key}
        answer={qaHash[key].answer}
        question={qaHash[key].question}
      />
    ));

  const questionsList = Object.keys(qaHash)
    .filter((key) => !qaHash[key].answer)
    .map((key) => <Question key={key} question={qaHash[key].question} />);

  return (
    <Box>
      <Text as="h2" fontSize="xl" fontWeight="medium" color="neutral900" mb="m">
        Questions & Answers
      </Text>
      <Card borderRadius={8} p="xl">
        <Box mb="l">{answersList}</Box>
        <Stack spacing="m">{questionsList}</Stack>
      </Card>
    </Box>
  );
}

export default QA;
