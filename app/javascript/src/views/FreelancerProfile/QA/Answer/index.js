import React from "react";
import { Box, Text, DialogDisclosure, useModal, theme } from "@advisable/donut";
import { Edit } from "@styled-icons/feather";
import EditAnswerModal from "./EditAnswerModal";
import styled from "styled-components";

const AnswerWrapper = styled(Box)`
  position: relative;
  padding-bottom: 16px;
  padding-top: 16px;
  &:first-child {
    padding-top: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.neutral200};
  }
`;
const EditIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
  color: ${theme.colors.neutral600};
  background: ${theme.colors.neutral100};
  border-radius: 50%;
  opacity: 0;
  ${AnswerWrapper}:hover & {
    opacity: 1;
  }
`;

function Answer({ answer, question }) {
  const modal = useModal();
  return (
    <>
      <EditAnswerModal modal={modal} answer={answer} />
      <AnswerWrapper>
        <Box display="flex">
          <Box width="32%" pr="m">
            <Text fontWeight="medium" lineHeight="120%">
              {question.content}
            </Text>
          </Box>
          <Box width="68%">
            <Text lineHeight="120%">{answer.content}</Text>
          </Box>
          <DialogDisclosure as={EditIcon} {...modal}>
            <Edit size={20} />
          </DialogDisclosure>
        </Box>
      </AnswerWrapper>
    </>
  );
}

export default Answer;
