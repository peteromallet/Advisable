import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { Lock } from "@styled-icons/feather";
import { Card, Box, Text, Stack, Circle } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useCreateUserFromLinkedin } from "./queries";
import MoreSpecialists from "./MoreSpecialists";

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
      <MoreSpecialists specialists={previousProject.similarSpecialists}>
        <Card
          mx="auto"
          padding="l"
          as={motion.div}
          maxWidth="460px"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          <Box textAlign="center">
            <Circle bg="blue900" color="white.9" mb="20px">
              <Lock size={24} strokeWidth={2} />
            </Circle>
            <Text
              mb="xs"
              color="blue900"
              fontSize="20px"
              fontWeight="medium"
              letterSpacing="-0.02em"
            >
              Unlock acccess to world-class talent
            </Text>
            <Text fontSize="15px" lineHeight="m" mb="l" color="neutral700">
              Across 600+ different marketing skills, get instant
              recommendations of top talent with experience in the{" "}
              {previousProject.primaryIndustry.name} space, backed by a no
              questions asked money-back guarantee.
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Stack spacing="m">
                  <FormField name="email" placeholder="Email address" />
                  <SubmitButton variant="dark" width="100%" size="l">
                    Get Started
                  </SubmitButton>
                </Stack>
              </Form>
            </Formik>
          </Box>
        </Card>
      </MoreSpecialists>
    </>
  );
}

export default ValidationComplete;
