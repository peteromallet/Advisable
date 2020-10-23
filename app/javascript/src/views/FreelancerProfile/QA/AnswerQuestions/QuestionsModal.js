import React from "react";
import { Modal, Stack, Text } from "@advisable/donut";
import Question from "./Question";

function QuestionModal({ modal, qaHash }) {
  const questionsList = Object.keys(qaHash)
    .filter((key) => !qaHash[key].answer)
    .map((key) => <Question key={key} question={qaHash[key].question} />);

  return (
    <Modal modal={modal} label="Questions" p="xxl" width={640}>
      <Text
        as="h2"
        fontSize="xxxl"
        fontWeight="medium"
        mb="xs"
        color="neutral900"
      >
        Answer the questions
      </Text>
      <Text lineHeight="120%" mb="l" color="neutral700">
        We prepared a set of questions for you. You don&apos;t have to answer
        them all. Just pick the most related to you.
      </Text>
      <Stack spacing="m">{questionsList}</Stack>
    </Modal>
  );
}

export default QuestionModal;
