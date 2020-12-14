import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect, useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Form, Formik } from "formik";
import { ChevronRight } from "@styled-icons/feather";
import { Box, Input, Error, useBreakpoint } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import validationSchema from "./validationSchema";
import HaveAccount from "../HaveAccount";
import Description from "./Description";
import MotionCard from "../MotionCard";
import Loading from "./Loading";
import useViewer from "src/hooks/useViewer";
import { GET_PROJECT, useCreateFreelancerAccount } from "../queries";

export default function StartApplication({ nextStep, forwards }) {
  const viewer = useViewer();
  const history = useHistory();
  const location = useLocation();
  const isMobile = useBreakpoint("s");
  const project_id = queryString.parse(location.search)?.pid;
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: project_id },
    skip: !project_id,
  });
  const [createFreelancerAccount] = useCreateFreelancerAccount();

  // Clean query string if pid is wrong
  if (project_id && error) {
    return <Redirect to={location.pathname} />;
  }

  const initialValues = {
    firstName: viewer?.firstName || "",
    lastName: viewer?.lastName || "",
    email: viewer?.email || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    // redirect to set password step, pass values, and preserve query string param
    const res = await createFreelancerAccount({
      variables: {
        input: { ...values, skills: [] },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    const id = res?.data?.createFreelancerAccount?.viewer?.id;
    history.push({ ...history.location, pathname: nextStep.path }, { id });
  };

  return (
    <MotionCard forwards={forwards}>
      {project_id && loading ? (
        <Loading />
      ) : (
        <>
          <Box mb={[0, 8]}>
            <Description project={data?.project} />
          </Box>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ status }) => (
              <Form>
                <Box display="flex" flexDirection={["column", "row"]}>
                  <Box mb={4} mr={[0, 2]} width="100%">
                    <FormField
                      as={Input}
                      name="firstName"
                      size={["sm", "md"]}
                      placeholder="Dwight"
                      label="First Name"
                    />
                  </Box>
                  <Box mb={4} width="100%">
                    <FormField
                      as={Input}
                      name="lastName"
                      size={["sm", "md"]}
                      placeholder="Schrutt"
                      label="Last Name"
                    />
                  </Box>
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
                  <SubmitButton
                    size={["m", "l"]}
                    variant="dark"
                    suffix={<ChevronRight />}
                    mb={{ _: 3, m: 0 }}
                  >
                    {project_id
                      ? isMobile
                        ? "Request Details"
                        : "Request more details"
                      : "Get Started"}
                  </SubmitButton>
                  <HaveAccount />
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </MotionCard>
  );
}
