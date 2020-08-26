import React, { useState, useEffect } from "react";
import { find } from "lodash-es";
import { ArrowRight, Info, Feather } from "@styled-icons/feather";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import {
  Box,
  Text,
  Card,
  Textarea,
  useModal,
  Circle,
  DialogDisclosure,
  Button,
  useBreakpoint,
  theme,
} from "@advisable/donut";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";
import useScrollRestore from "../../../utilities/useScrollRestore";
import { updateApplication as UPDATE_APPLICATION } from "../queries";
import validationSchema from "./validationSchema";
import useVariants from "../../../components/VariantSystem/useVariants";
import Helper from "../Helper";
import ConfirmationModal from "./ConfirmationModal";
import { motion, AnimatePresence } from "framer-motion";

const cardAnimations = {
  enter: ({ largeScreen, forwards }) => {
    return {
      x: largeScreen ? 0 : forwards ? 80 : -80,
      y: largeScreen ? (forwards ? 80 : -80) : 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -80 : 80) : 0,
      x: largeScreen ? 0 : forwards ? -80 : 80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

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
  const { variant } = useVariants();
  const largeScreen = useBreakpoint("lUp");
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

  const goBack = (formik) => {
    let url;
    if (number > 1) {
      formik.resetForm();
      formik.setFieldValue("answer", previousQuestion.answer || "");
      url = `/invites/${applicationId}/apply/questions/${number - 1}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }

    history.replace({
      ...location,
      pathname: url,
    });
  };

  const handleSubmit = async (values, formikBag) => {
    await updateApplication({
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
  console.log("variant", variant);

  const handleChange = (setFieldValue) => (e, formikBag) => {
    const value = e.target.value;
    console.log("on change vakue", value);
    console.log("fornik bag", formikBag);
    setFieldValue("answer", value);
    value && setNumOfWords(value.match(/\S+/g)?.length || 0);
  };

  return (
    <Card
      custom={{ largeScreen, forwards: true }}
      as={motion.div}
      // padding={{ _: "0", m: "52px" }}
      elevation={{ _: "none", m: "m" }}
      variant={["transparent", "default"]}
      transition={{ duration: 0.4 }}
      variants={cardAnimations}
      initial="enter"
      animate="center"
      exit="exit"
    >
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
            <Box
              px={["0", "52px"]}
              pt={["0", "52px"]}
              pb={variant === 0 ? ["0", "52px"] : ["0", "32px"]}
            >
              <Text
                fontSize="30px"
                mb="s"
                as="h1"
                color="blue.9"
                fontWeight="semibold"
                letterSpacing="-0.03em"
              >
                Application Questions
              </Text>
              <Text
                mb="l"
                as="h6"
                fontSize="xxs"
                color="neutral.7"
                fontWeight="semibold"
                style={{ textTransform: "uppercase" }}
              >
                Question {number} of {questions.length}
              </Text>
              <Box mb="m">
                <Box position="relative">
                  <FormField
                    name="answer"
                    minRows={10}
                    as={Textarea}
                    label={question}
                    placeholder={question}
                    onChange={handleChange(formik.setFieldValue)}
                    onClick={() => setPrompt(true)}
                  />
                  <AnimatePresence>
                    {variant === 0 && prompt && numOfWords <= 5 && (
                      <Box
                        // bg="blue50"
                        as={motion.div}
                        initial={{ y: 48, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 5, opacity: 0 }}
                        style={{ originX: "0px", originY: "0px" }}
                        transition={{ duration: 0.3 }}
                        width="calc(100% - 4px)"
                        borderTop={`2px solid ${theme.colors.neutral200}`}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        left="2px"
                        // opacity={formik.dirty ? "0" : "1"}
                        // borderRadius="0 0 8px 8px"
                        // borderRadius="2px"
                        bottom={
                          formik.errors.answer && formik.touched.answer
                            ? "30px"
                            : "3px"
                        }
                        pt="s"
                        pb="xs"
                        px="s"
                        css={`
                          pointer-events: none;
                        `}
                      >
                        <Box
                          as={motion.div}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          color="blue400"
                          borderWidth="2px"
                          borderStyle="solid"
                          borderRadius="100%"
                          mr="20px"
                          ml="0"
                          mb="xs"
                          p="xs"
                        >
                          <Feather size="24" strokeWidth={2} />
                        </Box>
                        {/* <Box
                          as={motion.div}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          color="blue400"
                          mr="m"
                          ml="xs"
                          mb="xs"
                        >
                          <Feather size="28px" strokeWidth={2} />
                        </Box> */}
                        <Box
                          as={motion.div}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18 }}
                        >
                          <Text
                            fontSize="s"
                            fontWeight="medium"
                            mb="xxs"
                            color="blue900"
                          >
                            Please try to be informative
                          </Text>
                          <Text
                            color="blue900"
                            fontSize="xs"
                            lineHeight="125%"
                            pr="l"
                          >
                            Provide substance when answering this question —
                            it&apos;s one of the most influential factors for
                            clients when making their selection.
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
              {numOfWords >= 100 ? (
                <SubmitButton mt="m" size="l" suffix={<ArrowRight />}>
                  Next
                </SubmitButton>
              ) : (
                <DialogDisclosure
                  as={Button}
                  suffix={<ArrowRight />}
                  mt="m"
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
      {variant === 1 && (
        <Box
          // bg="blue50"
          borderTop={`1px solid ${theme.colors.neutral100}`}
          display="flex"
          alignItems="center"
          // opacity={formik.dirty ? "0" : "1"}
          borderRadius="0 0 8px 8px"
          // borderRadius="8px"
          py="m"
          px="52px"
        >
          <Box
            color="blue400"
            borderWidth="2px"
            borderStyle="solid"
            borderRadius="100%"
            mr="20px"
            ml="0"
            mb="xs"
            p="xs"
          >
            <Feather size="24" strokeWidth={2} />
          </Box>
          <Box>
            <Text fontSize="s" fontWeight="medium" mb="xxs">
              Please try to be informative
            </Text>
            <Text color="blue900" fontSize="xs" lineHeight="125%">
              Provide substance when answering this question — it's one of the
              most influential factors for clients when making their selection.
            </Text>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Questions;
