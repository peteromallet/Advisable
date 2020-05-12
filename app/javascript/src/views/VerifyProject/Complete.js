import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { Card, Box, Text, Stack } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useCreateUserFromLinkedin } from "./queries";
import SimilarSpecialists from "./SimilarSpecialists";

function ValidationComplete({ data }) {
  const { oauthViewer, previousProject } = data;
  const [createUser] = useCreateUserFromLinkedin();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    const { data, errors } = await createUser({
      variables: {
        input: {
          email: values.email,
        },
      },
    });

    if (errors) {
      formik.setStatus("Something went wrong");
    } else {
      const uid = data.createUserFromLinkedin.user.id;
      window.location = `https://advisable.com/clients/signup?uid=${uid}&contactdetails=yes`;
    }
  };

  return (
    <>
      <Box textAlign="center" maxWidth="520px" mx="auto">
        <Text
          mb="12px"
          color="blue900"
          fontSize="28px"
          lineHeight="32px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Thanks {oauthViewer.firstName}!
        </Text>
        <Text mb="50px" fontSize="l" lineHeight="l" color="neutral800">
          We have hundreds more world-class freelancers with experience working
          with {previousProject.companyType} companies in the{" "}
          {previousProject.primaryIndustry.name} industry.
        </Text>
      </Box>
      <SimilarSpecialists specialists={previousProject.similarSpecialists} />
      <Card
        as={motion.div}
        padding="l"
        maxWidth="500px"
        mx="auto"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.24 }}
      >
        <Text
          mb="xs"
          color="blue900"
          fontSize="22px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Apply to acccess world-class talent
        </Text>
        <Text lineHeight="m" mb="m" color="neutral700">
          Across 600+ different marketing skills, get instant recommendations of
          top talent with experience in the{" "}
          {previousProject.primaryIndustry.name} space, backed by a no questions
          asked money-back guarantee.
        </Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Stack spacing="l">
              <FormField label="Email Address" name="email" />
              <SubmitButton size="l">Get Started</SubmitButton>
            </Stack>
          </Form>
        </Formik>
      </Card>
    </>
  );
}

export default ValidationComplete;
