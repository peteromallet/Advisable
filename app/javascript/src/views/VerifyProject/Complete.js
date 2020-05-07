import React from "react";
import { Formik, Form } from "formik";
import { Text, Stack } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";

function ValidationComplete({ data }) {
  const { oauthViewer, previousProject } = data;

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values) => {};

  return (
    <>
      <Text
        mb="xs"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="semibold"
      >
        Thanks {oauthViewer.firstName}!
      </Text>
      <Text fontSize="l" lineHeight="l" color="neutral700">
        We have hundreds of more world-class freelancers with experience working
        with {previousProject.companyType} companies in the{" "}
        {previousProject.primaryIndustry.name} industry.
      </Text>
      <Text fontSize="l" fontWeight="medium" mb="xxs">
        Want instant access to them?
      </Text>
      <Text lineHeight="m" mb="m" color="neutral700">
        Enter your email below to create an Advisable account and gain instant
        access to hundreds more {previousProject.primaryIndustry.name}{" "}
        freelancers.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Stack spacing="m">
            <FormField label="Email Address" name="email" />
            <SubmitButton>Continue</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </>
  );
}

export default ValidationComplete;
