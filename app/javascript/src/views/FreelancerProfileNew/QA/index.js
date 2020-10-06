import React from "react";
import { Text, Box, Card } from "@advisable/donut";
import Answer from "./Answer";
import AnswerQuestions from "./AnswerQuestions";
import SectionHeader from "../components/SectionHeader";

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

  return (
    <Box mb="xxxl">
      <SectionHeader actionButton={<AnswerQuestions qaHash={qaHash} />}>
        Questions & Answers
      </SectionHeader>
      <Card borderRadius={8} p="xl">
        <Box>{answersList}</Box>
      </Card>
    </Box>
  );
}

export default QA;
