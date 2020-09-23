import React from "react";
import { Box, Modal, Textarea } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import { useMutation } from "@apollo/client";
import { ANSWER_QUESTION, GET_PROFILE } from "../../queries";
import { Form, Formik } from "formik";
import FormField from "../../../../components/FormField";
import { useParams } from "react-router";
import { object, string } from "yup";

const validationSchema = object().shape({
  content: string().required("Please provide some answer"),
});

function AnswerQuestionModal({ modal, question }) {
  const [mutate] = useMutation(ANSWER_QUESTION);
  const params = useParams();

  const initialValues = {
    content: "",
  };

  const handleSubmit = async (values) => {
    const input = {
      ...values,
      question: question.id,
    };
    await mutate({
      variables: { input },
      refetchQueries: [{ query: GET_PROFILE, variables: { id: params.id } }],
    });
    modal.hide();
  };

  return (
    <Modal modal={modal} p="xxl" label="Answer question">
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box mb="l">
            <FormField
              minRows={8}
              as={Textarea}
              name="content"
              label={question.content}
            />
          </Box>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AnswerQuestionModal;
