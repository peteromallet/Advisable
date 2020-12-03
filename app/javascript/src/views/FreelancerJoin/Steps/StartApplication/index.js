import React from "react";
import { Form, Formik } from "formik";
import queryString from "query-string";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Box, Text, Input, Error } from "@advisable/donut";
import validationSchema from "./validationSchema";
import Description from "./Description";
import { CREATE_FREELANCER_ACCOUNT, GET_PROJECT } from "../queries";
import MotionBox from "../MotionBox";
import HaveAccount from "../HaveAccount";
import VIEWER from "src/graphql/queries/viewer";

export default function StartApplication({ nextStep, forwards }) {
  const history = useHistory();
  const location = useLocation();
  const client = useApolloClient();
  const [createFreelancerAccount] = useMutation(CREATE_FREELANCER_ACCOUNT);
  const project_id = queryString.parse(location.search)?.pid;
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: project_id },
  });

  if (project_id && loading) return <>loading</>;
  // Clean query string if pid is wrong
  if (project_id && error) history.replace(history.pathname);

  const initialValues = {
    fullName: location.state?.fullName || "",
    email: location.state?.email || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    // redirect to set password step, pass values, and preserve query string param
    const splited = values.fullName.split(" ");
    const firstName = splited[0];
    const lastName = splited.slice(1, Infinity).join(" ");
    const res = await createFreelancerAccount({
      variables: {
        input: { firstName, lastName, email: values.email, skills: [] },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    await client.resetStore();
    client.writeQuery({
      query: VIEWER,
      data: {
        viewer: res.data.createFreelancerAccount.viewer,
      },
    });

    const id = res?.data?.createFreelancerAccount?.viewer?.id;
    history.push(
      { ...history.location, pathname: nextStep.path },
      { ...values, id },
    );
  };

  return (
    <MotionBox forwards={forwards}>
      <Box mb={[0, 8]}>
        <Description project={data?.project} />
        {project_id && error && (
          <Text color="red400" pt={2}>
            The project you&apos;ve tried to apply is not available.
          </Text>
        )}
      </Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ status }) => (
          <Form>
            <Box mb="m">
              <FormField
                as={Input}
                name="fullName"
                size={["sm", "md"]}
                placeholder="Dwight Schrutt"
                label="Full Name"
              />
            </Box>
            <Box mb={[4, 5]}>
              <FormField
                as={Input}
                name="email"
                size={["sm", "md"]}
                placeholder="dwight@dundermifflin.com"
                label="Email"
              />
            </Box>
            <Error>{status}</Error>
            <Box
              display="flex"
              flexDirection={{ _: "column", m: "row" }}
              pt={[4, 5]}
            >
              <SubmitButton size={["m", "l"]} variant="dark" mb={{ xs: 3 }}>
                Get Started
              </SubmitButton>
              <HaveAccount />
            </Box>
          </Form>
        )}
      </Formik>
    </MotionBox>
  );
}
