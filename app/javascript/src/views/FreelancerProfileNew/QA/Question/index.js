import React from "react";
import { Box, Text, useModal, DialogDisclosure } from "@advisable/donut";
import styled from "styled-components";
import AnswerQuestionModal from "./AnswerQuestionModal";

const QuestionBox = styled(Box)`
  display: flex;
`;

const AnswerLabel = styled(Text)`
  display: none;

  ${QuestionBox}:hover & {
    display: block;
  }
`;

function Question({ question }) {
  const modal = useModal();
  return (
    <>
      <AnswerQuestionModal modal={modal} question={question} />
      <DialogDisclosure
        as={QuestionBox}
        alignItems="center"
        bg="neutral100"
        p="l"
        borderRadius={12}
        {...modal}
      >
        <Text fontSize="xl" color="neutral900">
          {question.content}
        </Text>
        <AnswerLabel ml="auto" color="blue600">
          Answer
        </AnswerLabel>
      </DialogDisclosure>
    </>
  );
}

export default Question;
