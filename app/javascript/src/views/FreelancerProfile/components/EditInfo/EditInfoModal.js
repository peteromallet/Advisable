import React from "react";
import { object, string } from "yup";
import { Form, Formik } from "formik";
// Components
import {
  Modal,
  Heading,
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
import GET_PROFILE_DATA from "../../queries/getProfileData.gql";
// Constant values
import { SPECIALIST_BIO_LENGTH } from "src/constants";
import { generatePath, useNavigate, useMatch } from "react-router";
import { useApolloClient } from "@apollo/client";

const validationSchema = object().shape({
  city: string(),
  country: string(),
  username: string()
    .nullable()
    .min(3)
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  bio: string().max(
    SPECIALIST_BIO_LENGTH,
    `Must be not more than ${SPECIALIST_BIO_LENGTH} characters`,
  ),
});

function EditInfoModal({ modal, specialist }) {
  const client = useApolloClient();
  const match = useMatch({ path: "/profile/:username" });
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [mutate] = useUpdateProfile();
  const isWidescreen = useBreakpoint("sUp");
  const initialValues = {
    city: specialist.city || "",
    username: specialist.username || "",
    country: specialist.country?.id || "",
    bio: specialist.bio || "",
  };

  const handleSubmit = async (values, formik) => {
    const response = await mutate({
      variables: {
        input: {
          ...values,
          username: values.username || null,
        },
      },
    });

    if (response.errors) {
      if (/username.*taken/i.test(response.errors[0].message)) {
        formik.setFieldError("username", "Username is already taken.");
      } else {
        notifications.error("Something went wrong, please try again.");
      }
    } else {
      const updatedSpecialist = response.data.updateProfile.specialist;
      client.writeQuery({
        query: GET_PROFILE_DATA,
        variables: {
          id: updatedSpecialist.username || updatedSpecialist.id,
        },
        data: {
          specialist: updatedSpecialist,
        },
      });

      const nextPath = generatePath("/profile/:username", {
        ...match.params,
        username: updatedSpecialist.username || updatedSpecialist.id,
      });

      navigate(nextPath, { replace: true });

      notifications.notify("Your profile has been updated");
      modal.hide();
    }
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
          <Heading as="h2" size="4xl" mb={6}>
            Edit profile
          </Heading>
          <FormField
            name="username"
            label="Username"
            description="This will be used in your profile URL."
            caption="Must be at least 3 characters long and can contain only letters, numbers, and underscores."
          />
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
              charLimit={SPECIALIST_BIO_LENGTH}
            />
          </Box>
          <SubmitButton>Update</SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}

export default EditInfoModal;
