import React from "react";
import { Formik } from "formik";
import { useLocation } from "react-router";
import { GET_CLIENT_APPLICATION } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import { Text } from "@advisable/donut";

function SignupStatus() {
  const location = useLocation();
  const { applicationId } = location.state;
  const { error, data } = useQuery(GET_CLIENT_APPLICATION, {
    variables: { id: applicationId },
  });
  console.log("confirmation data", data, error);

  return (
    <Formik>
      <>
        <Text
          as="h2"
          mb="m"
          color="blue.8"
          fontSize="xxxl"
          lineHeight="xxxl"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          Let’s get started!
        </Text>
        <Text mb="m">
          The final step before being able to access Advisable’s elite pool of
          talent is a ~10-minute with one of our team. On this call, we’ll ask
          you a couple of clarification questions to ensure that you’re a good
          fit for Advisable, give you an overview of how Advisable works and
          make you aware of the expectations for you as a client when dealing
          with our freelancers.
        </Text>
      </>
    </Formik>
  );
}

export default SignupStatus;
