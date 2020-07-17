import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../../../../components/SubmitButton";
import { Text } from "@advisable/donut";
import { useLocation } from "react-router";

function ContinueApplication({ pushNextStepPath }) {
  const location = useLocation();

  const handleSubmit = () => {
    console.log("submit");
    pushNextStepPath({ state: location.state });
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      <Form>
        <Text
          as="h2"
          mb="xs"
          color="blue.8"
          fontSize="xxxl"
          lineHeight="xxxl"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          Continue your application
        </Text>
        <Text mb="m">
          As next steps, we need you to answer a few questions in order to
          figure out if you&apos;re a good fit for Advisable
        </Text>
        <SubmitButton>Continue</SubmitButton>
      </Form>
    </Formik>
  );
}

ContinueApplication.propTypes = {
  pushNextStepPath: PropTypes.func,
  pushInitialStepPath: PropTypes.func,
};

export default ContinueApplication;
