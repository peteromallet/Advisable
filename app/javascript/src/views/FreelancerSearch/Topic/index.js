import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import REQUEST_CONSULTATIONS from "./requestConsultations";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import { Box, Link, Text, Card, Button, Textarea } from "@advisable/donut";
import FormField from "../../../components/FormField";
import ScaleInput from "../../../components/ScaleInput";
import validationSchema from "./validationSchema";
import { ArrowRight, ArrowLeft } from "@styled-icons/feather";

const Topic = ({ data }) => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const selected = location.state?.freelancers || [];
  const [requestConsultations] = useMutation(REQUEST_CONSULTATIONS);

  if (selected.length === 0) {
    return <Redirect to="/freelancer_search/results" />;
  }

  const initialValues = {
    topic: data.search.description || "",
  };

  const handleSubmit = async (values) => {
    await requestConsultations({
      variables: {
        input: {
          specialists: location.state.freelancers,
          skill: data.search.skill.name,
          topic: values.topic,
          likelyToHire: values.likelyToHire,
          search: params.id,
        },
      },
    });

    history.push({
      pathname: `/freelancer_search/${data.search.id}/sent`,
      state: null,
    });
  };

  return (
    <Box maxWidth={700} mx="auto">
      <Link
        mb="s"
        fontSize="l"
        fontWeight="medium"
        letterSpacing="-0.02em"
        to={{
          ...location,
          pathname: `/freelancer_search/${data.search.id}/availability`,
        }}
      >
        <Box display="inline-block" mr="2px">
          <ArrowLeft size={20} strokeWidth={2} />
        </Box>
        Back
      </Link>
      <Text
        mb="xs"
        fontSize="32px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        What would you like to cover during this consultation?
      </Text>
      <Text fontSize="l" lineHeight="m" color="neutral800" mb="l">
        Please describe briefly what you'd like to cover in a 30-minute
        consultation. This is for us to share with freelancers when requesting
        their time.
      </Text>
      <Card padding="m">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <Box mb="l">
                <FormField
                  autoFocus
                  minRows={6}
                  name="topic"
                  as={Textarea}
                  placeholder="What would you like to talk about..."
                />
              </Box>
              <Box mb="l">
                <Text lineHeight="m" color="blue900" mb="xs">
                  If you are impressed by someone you speak to, how likely are
                  you to hire them as a freelancer?
                </Text>
                <Field
                  as={ScaleInput}
                  name="likelyToHire"
                  onChange={(v) => {
                    formik.setFieldValue("likelyToHire", v);
                  }}
                />
              </Box>
              <Button
                type="submit"
                width={["100%", "auto"]}
                loading={formik.isSubmitting}
                suffix={<ArrowRight />}
              >
                Request Consultation
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Topic;
