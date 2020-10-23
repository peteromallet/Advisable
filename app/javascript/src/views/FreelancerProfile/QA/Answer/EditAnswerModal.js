import React from "react";
import { Modal, Textarea, Box, Text, Button } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import {
  ANSWER_QUESTION,
  deleteAnswerOptimisticResponse,
  deleteAnswerUpdateCache,
  DELETE_ANSWER,
  editAnswerOptimisticResponse,
  editAnswerUpdateCache,
} from "../../queries";
import { Form, Formik } from "formik";
import FormField from "src/components/FormField";
import { useParams } from "react-router";
import SubmitButton from "src/components/SubmitButton";
import { object, string } from "yup";
import { flow } from "lodash-es";

const validationSchema = object().shape({
  content: string().required("Please provide some answer"),
});

function AnswerQuestionModal({ modal, answer }) {
  const params = useParams();
  const [update] = useMutation(ANSWER_QUESTION);
  const [remove] = useMutation(DELETE_ANSWER, {
    variables: { input: { id: answer.id } },
    optimisticResponse: deleteAnswerOptimisticResponse,
    update: deleteAnswerUpdateCache(params.id),
  });
  const initialValues = {
    content: answer.content,
  };

  const handleSubmit = (values) => {
    const input = { ...values, question: answer.question.id };
    const optimisticResponse = editAnswerOptimisticResponse(answer, values);
    update({
      variables: { input },
      optimisticResponse,
      update: editAnswerUpdateCache(params.id),
    });
    modal.hide();
  };

  const handleDelete = flow([remove, modal.hide]);

  return (
    <Modal modal={modal} p="xxl" label="Update answer" width={540}>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text fontSize="xl" fontWeight="medium" mb="s" color="neutral900">
            {answer.question.content}
          </Text>
          <Box mb="l">
            <FormField minRows={8} as={Textarea} name="content" />
          </Box>
          <Box display="flex">
            <SubmitButton>Update</SubmitButton>
            <Button
              onClick={handleDelete}
              type="button"
              variant="subtle"
              ml="auto"
            >
              Delete
            </Button>
          </Box>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AnswerQuestionModal;
