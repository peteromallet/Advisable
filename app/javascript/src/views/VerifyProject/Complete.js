import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { Lock } from "@styled-icons/feather";
import { Container, Card, Box, Text, Stack, Circle } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useCreateUserFromProjectVerification } from "./queries";
import MoreSpecialists from "./MoreSpecialists";
import { alphanumeric } from "../../utilities/generateID";
import useScrollToTop from "../../hooks/useScrollToTop";

function ValidationComplete({ data }) {
  useScrollToTop();
  const { oauthViewer, previousProject } = data;
  const [createUser] = useCreateUserFromProjectVerification();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    const fid = alphanumeric(7);
    const { data, errors } = await createUser({
      variables: {
        input: {
          previousProject: previousProject.id,
          email: values.email,
          fid,
        },
      },
    });

    if (errors) {
      formik.setStatus("Something went wrong");
    } else {
      const {
        firstName,
        lastName,
        companyName,
        companyType,
        industry,
      } = data.createUserFromProjectVerification.user;
      const url = `https://advisable.com/clients/signup?fid=${fid}&fn=${firstName}&ln=${lastName}show_contact_page=0&email=${values.email}&field90540872=${companyName}&field90540873=${industry.name}&field90540874=${companyType}`;
      window.location.href = url;
    }
  };

  return (
    <Container>
      <Box textAlign="center" maxWidth="520px" mx="auto">
        <Text
          mb="12px"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.02em"
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
        >
          Thanks {oauthViewer.firstName}!
        </Text>
        <Text
          fontSize="16px"
          lineHeight="24px"
          color="neutral900"
          marginBottom="50px"
        >
          We have hundreds more world-class freelancers with experience working
          with {previousProject.companyType} companies in the{" "}
          {previousProject.primaryIndustry.name} industry
        </Text>
      </Box>
      <MoreSpecialists specialists={previousProject.similarSpecialists}>
        <Card
          mx="auto"
          elevation="l"
          as={motion.div}
          maxWidth="460px"
          padding={["m", "l"]}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          <Box textAlign="center">
            <Circle bg="blue900" color="white" mb="20px">
              <Lock size={24} strokeWidth={2} />
            </Circle>
            <Text
              mb="xs"
              color="blue900"
              fontSize="20px"
              lineHeight="24px"
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
    </Container>
  );
}

export default ValidationComplete;
