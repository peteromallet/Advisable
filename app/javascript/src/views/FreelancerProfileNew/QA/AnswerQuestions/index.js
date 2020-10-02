import React from "react";
import { Box, Button, useModal, DialogDisclosure } from "@advisable/donut";
import { Plus } from "@styled-icons/feather";
import QuestionsModal from "./QuestionsModal";

function AnswerQuestions({ qaHash }) {
  const modal = useModal();

  return (
    <Box ml="auto" display="flex">
      <DialogDisclosure
        as={Button}
        size="m"
        {...modal}
        variant="minimal"
        prefix={
          <Box mb="3px">
            <Plus />
          </Box>
        }
      >
        Answer Questions
      </DialogDisclosure>
      <QuestionsModal qaHash={qaHash} modal={modal} />
    </Box>
  );
}

export default AnswerQuestions;
