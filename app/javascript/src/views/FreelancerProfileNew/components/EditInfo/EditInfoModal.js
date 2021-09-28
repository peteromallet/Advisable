import React from "react";
import { object, string } from "yup";
import { Form, Formik } from "formik";
// Components
import {
  Modal,
  Text,
  Box,
  Textarea,
  Select,
  useBreakpoint,
} from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
// Queries
import { useUpdateProfile, useCountries } from "../../queries";

const validationSchema = object().shape({
  city: string(),
  country: string(),
  bio: string().max(160, "Must be not more than 160 characters"),
});

function EditInfoModal({ modal, specialist }) {
  const notifications = useNotifications();
  const [mutate] = useUpdateProfile();
  const isWidescreen = useBreakpoint("sUp");
  const initialValues = {
    city: specialist.city || "",
    country: specialist.country?.id || "",
    bio: specialist.bio || "",
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
          country: {
            __typename: "Country",
            id: values.country,
          },
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
  const countriesQuery = useCountries();

  return (
    <Modal modal={modal} p="xxl" label="Edit profile info" width={640}>
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
            Edit profile info
          </Text>
          <Box display={isWidescreen ? "flex" : null} mb="l" mt={5}>
            <Box
              mr={isWidescreen && "s"}
              mb={!isWidescreen && "l"}
              width="100%"
            >
              <FormField
                name="city"
                label="City"
                width="100%"
                placeholder="e.g Berlin"
              />
            </Box>
            <Box width="100%">
              <FormField as={Select} name="country" label="Country">
                {countriesQuery.data?.countries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </FormField>
            </Box>
          </Box>
          <Box mb="l">
            <FormField
              as={Textarea}
              name="bio"
              minRows={4}
              label="About me"
              description="Add a short title to describe who you are"
              placeholder="Add a short title to describe who you are"
              charLimit={160}
            />
          </Box>
          <SubmitButton>Update</SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}

export default EditInfoModal;
