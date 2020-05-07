import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Stack, Avatar } from "@advisable/donut";
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
      <Text fontSize="l" lineHeight="l" color="neutral700" mb="l">
        We have hundreds more world-class freelancers with experience working
        with {previousProject.companyType} companies in the{" "}
        {previousProject.primaryIndustry.name} industry.
      </Text>
      <Stack spacing="s" mb="l">
        {previousProject.similarSpecialists.map((specialist) => (
          <Box display="flex" alignItems="center" key={specialist.id}>
            <Avatar url={specialist.avatar} name={specialist.name} />
            <Box pl="s">
              <Text fontSize="l" fontWeight="medium" mb="xxs">
                {specialist.name}
              </Text>
              <Text color="neutral500">{specialist.location}</Text>
            </Box>
          </Box>
        ))}
      </Stack>
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
          <Stack spacing="l">
            <FormField label="Email Address" name="email" />
            <SubmitButton size="l">Continue</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </>
  );
}

export default ValidationComplete;
