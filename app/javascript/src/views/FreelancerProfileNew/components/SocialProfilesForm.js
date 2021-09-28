import React from "react";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import { Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useNotifications } from "src/components/Notifications";
import { useUpdateProfile } from "../queries";

const validationSchema = object().shape({
  linkedin: string().url(),
  twitter: string().url(),
  instagram: string().url(),
  medium: string().url(),
  website: string().url(),
});

export default function SocialProfilesForm({ specialist, modal }) {
  const [mutate] = useUpdateProfile();
  const notifications = useNotifications();
  const initialValues = {
    linkedin: specialist.linkedin || "",
    twitter: specialist.twitter || "",
    instagram: specialist.instagram || "",
    medium: specialist.medium || "",
    website: specialist.website || "",
  };

  const handleSubmit = (values) => {
    const optimisticResponse = {
      __typename: "Mutation",
      updateProfile: {
        __typename: "UpdateProfilePayload",
        specialist: {
          __typename: "Specialist",
          ...specialist,
          ...values,
        },
      },
    };

    mutate({
      variables: { input: { ...values } },
      optimisticResponse,
    });

    notifications.notify("Your profile has been updated");
    modal.hide();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Text
          as="h2"
          fontSize="xxxl"
          fontWeight="medium"
          color="neutral900"
          mb="l"
        >
          Edit social profiles
        </Text>
        <Box mb="l" mt={5}>
          <FormField
            name="linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/your-name"
            error={null}
          />
        </Box>
        <Box mb="l">
          <FormField
            name="twitter"
            label="Twitter"
            placeholder="https://twitter.com/your-profile"
            error={null}
          />
        </Box>
        <Box mb="l">
          <FormField
            name="instagram"
            label="Instagram"
            placeholder="https://instagram.com/your-profile"
            error={null}
          />
        </Box>
        <Box mb="l">
          <FormField
            name="medium"
            label="Medium"
            placeholder="https://medium.com/@your-profile"
            error={null}
          />
        </Box>
        <Box mb="xl">
          <FormField
            name="website"
            label="Website"
            placeholder="https://your-website.com"
            error={null}
          />
        </Box>
        <SubmitButton>Update</SubmitButton>
      </Form>
    </Formik>
  );
}
