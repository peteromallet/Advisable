import React from "react";
import { Text, Heading } from "@advisable/donut";
import CreateAccountForm from "./CreateAccountForm";
import { useCreateClientAccount } from "./queries";
import { useApolloClient } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";

export default function RequestConsultationClientSignup({
  specialist,
  setStep,
}) {
  const client = useApolloClient();
  const [createClientAccount] = useCreateClientAccount();

  const handleSubmit = async (values, formik) => {
    formik.setStatus(null);

    const { errors, data } = await createClientAccount({
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
      <Heading marginBottom={2} size="5xl">
        Welcome to Advisable
      </Heading>
      <Text fontSize="l" marginBottom={6} color="neutral700">
        Create an account to connect with {specialist.firstName}.
      </Text>
      <CreateAccountForm onSubmit={handleSubmit} setStep={setStep} />
    </>
  );
}
