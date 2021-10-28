import React from "react";
import { Text, Heading } from "@advisable/donut";
import CreateAccountForm from "./CreateAccountForm";
import { useCreateFreelancerAcccount } from "./queries";
import { useApolloClient } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";

export default function RequestConsultationFreelancerSignup({
  specialist,
  setStep,
}) {
  const client = useApolloClient();
  const [createAccount] = useCreateFreelancerAcccount();

  const handleSubmit = async (values, formik) => {
    formik.setStatus(null);

    const { errors, data } = await createAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      },
    });

    if (errors) {
      formik.setStatus(errors[0]?.message);
    } else {
      await client.resetStore();

      client.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.login.viewer,
        },
      });
    }
  };

  return (
    <>
      <Heading marginBottom={2} letterSpacing="-0.03em">
        Welcome to Advisable
      </Heading>
      <Text fontSize="l" marginBottom={6}>
        Create an account to connect with {specialist.firstName}.
      </Text>
      <CreateAccountForm onSubmit={handleSubmit} setStep={setStep} />
    </>
  );
}
