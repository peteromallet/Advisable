import React, { useState, useEffect } from "react";
import find from "lodash/find";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import {
  Box,
  Text,
  Textarea,
  useModal,
  DialogDisclosure,
  Button,
} from "@advisable/donut";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";
import useScrollRestore from "../../../utilities/useScrollRestore";
import { updateApplication as UPDATE_APPLICATION } from "../queries";
import validationSchema from "./validationSchema";
import PromptBox from "./PromptBox";
import ConfirmationModal from "./ConfirmationModal";
import StepCard from "../StepCard";

const Questions = ({
  application,
  match,
  history,
  steps,
  currentStep,
  location,
}) => {
  const [updateApplication, { loading }] = useMutation(UPDATE_APPLICATION);
  const [prompt, setPrompt] = useState(false);
  const [numOfWords, setNumOfWords] = useState(0);
  const confirmationModal = useModal();
  const step = steps[currentStep];
  const { applicationId } = match.params;
  const number = parseInt(match.params.number);
  useScrollRestore(null, [number]);
  const questions = application.project.questions || [];
  const question = questions[number - 1];
  const applicationQuestion = find(application.questions, { question }) || {};
  const previousQuestion =
    find(application.questions, {
      question: questions[number - 2],
    }) || {};

  useEffect(() => {
    const answer = applicationQuestion.answer;
    answer && setNumOfWords(answer.match(/\S+/g)?.length || 0);
  }, [applicationQuestion.answer]);

  // if the step is hidden then redirect to the references step.
  if (step.hidden) {
    let referencesStep = {
      ...location,
      pathname: `/invites/${applicationId}/apply/references`,
    };
    return <Redirect to={referencesStep} />;
  }

  // If the number is outside the range of number of questions then redirect to
  // the first questions as the URL is invalid
  if (!number || number > questions.length || number < 0) {
    let firstQuestion = {
      ...location,
      pathname: `/invites/${applicationId}/apply/questions/1`,
    };
    return <Redirect to={firstQuestion} />;
  }

  // If the previous question has not been answered yet then redirect back to it.
  if (number > 1 && !previousQuestion.answer) {
    return (
      <Redirect
        to={{
          ...location,
          pathname: `/invites/${applicationId}/apply/questions/${number - 1}`,
        }}
      />
    );
  }

  const handleSubmit = (values, formikBag) => {
    const optimisticQuestions = (answer) => {
      const answered = { __typename: "ApplicationQuestion", answer, question };
      const index = application.questions.findIndex(
        (q) => q.question === question,
      );
      let questions = [...application.questions];
      if (index !== -1) {
        questions[index] = answered;
      } else {
        questions = [...questions, answered];
      }
      return questions;
    };

    updateApplication({
      variables: {
        input: {
          id: applicationId,
          questions: [
            {
              question,
              answer: values.answer,
            },
          ],
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          application: {
            __typename: "Application",
            ...application,
            questions: optimisticQuestions(values.answer),
          },
        },
      },
    });

    formikBag.resetForm();
    const nextQuestion = application.questions[number] || {};
    formikBag.setFieldValue("answer", nextQuestion.answer || "");

    let url;
    if (number === questions.length) {
      url = `/invites/${applicationId}/apply/references`;
    } else {
      url = `/invites/${applicationId}/apply/questions/${number + 1}`;
    }

    history.push({ ...location, pathname: url });
  };

  const initialValues = {
    answer: applicationQuestion.answer || "",
  };

  const handleChange = (setFieldValue) => (e) => {
    const value = e.target.value;
    setFieldValue("answer", value);
    value && setNumOfWords(value.match(/\S+/g)?.length || 0);
  };

  return (
    <StepCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <ConfirmationModal
              formik={formik}
              modal={confirmationModal}
              loading={loading}
              numOfWords={numOfWords}
            />
            <Box>
              <Text
                fontSize="30px"
                mb={3}
                as="h1"
                color="blue900"
                fontWeight="semibold"
                letterSpacing="-0.03em"
              >
                Application Questions
              </Text>
              <Text
                mb={6}
                as="h6"
                fontSize="xxs"
                color="neutral700"
                fontWeight="semibold"
                style={{ textTransform: "uppercase" }}
              >
                Question {number} of {questions.length}
              </Text>
              <Box mb={4}>
                <Box position="relative">
                  <FormField
                    name="answer"
                    minRows={10}
                    as={Textarea}
                    widget={PromptBox}
                    label={question}
                    placeholder={question}
                    onChange={handleChange(formik.setFieldValue)}
                    onClick={() => setPrompt(true)}
                    widgetIsActive={prompt && numOfWords < 10}
                  />
                </Box>
              </Box>
              {numOfWords >= 100 || !formik.isValid || !formik.dirty ? (
                <SubmitButton mt={4} size="l" suffix={<ArrowRight />}>
                  Next
                </SubmitButton>
              ) : (
                <DialogDisclosure
                  as={Button}
                  suffix={<ArrowRight />}
                  mt={4}
                  size="l"
                  {...confirmationModal}
                >
                  Next
                </DialogDisclosure>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </StepCard>
  );
};

export default Questions;
