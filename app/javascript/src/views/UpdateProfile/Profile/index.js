import React from "react";
import { get, sortBy } from "lodash-es";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Card,
  Text,
  Link,
  InputError,
  Autocomplete,
  Button,
  Checkbox,
  Avatar,
  Textarea,
} from "@advisable/donut";
import Loading from "../../../components/Loading";
import FormField from "../../../components/FormField";
import CurrencyInput from "../../../components/CurrencyInput";
import FileUpload from "../../../components/FileUpload";
import { useNotifications } from "../../../components/Notifications";
import { GET_DATA, UPDATE_PROFILE } from "./queries";

const Profile = () => {
  const { loading, data } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const notifications = useNotifications();

  const [profilePhoto, setProfilePhoto] = React.useState(null);

  const initialValues = {
    firstName: get(data, "viewer.firstName"),
    lastName: get(data, "viewer.lastName"),
    email: get(data, "viewer.email"),
    bio: get(data, "viewer.bio"),
    hourlyRate: get(data, "viewer.hourlyRate") / 100.0,
    publicUse: get(data, "viewer.publicUse"),
    skills: (get(data, "viewer.skills") || []).map((s) => s.name),
  };

  const submitUpdate = async (input) => {
    const { errors } = await updateProfile({
      variables: { input },
    });
    if (!errors) {
      notifications.notify("Your profile has been updated");
    }
  };

  const handleSubmit = async (values, formik) => {
    submitUpdate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      bio: values.bio,
      hourlyRate: values.hourlyRate * 100,
      publicUse: values.publicUse,
      skills: values.skills,
    });

    formik.setSubmitting(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          <Card padding="l" borderRadius={8}>
            <Text
              size="xxl"
              color="neutral900"
              as="h2"
              weight="semibold"
              mb="l"
            >
              Your Profile
            </Text>
            <Box maxWidth={400}>
              <Text size="s" color="neutral800" mb="xs" weight="medium">
                Proile photo
              </Text>
              <FileUpload
                onChange={(blob) => {
                  submitUpdate({ avatar: blob.signed_id });
                }}
                preview={(file) => {
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfilePhoto(e.target.result);
                    reader.readAsDataURL(file);
                  }

                  return (
                    <Avatar
                      size="s"
                      name={data.viewer.name}
                      url={profilePhoto || data.viewer.avatar}
                    />
                  );
                }}
                label="Upload a profile photo"
              />
            </Box>
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              name="firstName"
              label="First Name"
            />
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              name="lastName"
              label="Last Name"
            />
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              name="email"
              label="Email"
            />
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              as={Textarea}
              name="bio"
              minRows={8}
              label="About me"
              description="Add a short 2 - 3 sectence bio to describe who you are."
              placeholder="Add a short 2 - 3 sectence bio to describe who you are."
              caption="A well structured bio demonstrates your experience and expertise by referencing past projects and achievements, including notable clients or numeric results. You will have a chance to customize this each time you apply for a project."
            />
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              multiple
              max={10}
              name="skills"
              as={Autocomplete}
              description="Add up to 10 skill’s that you have used in previously completed projects."
              label="What type of projects are you looking for?"
              placeholder="e.g Online Marketing"
              options={sortBy(data.skills, ["label"])}
              onChange={(skills) => {
                formik.setFieldTouched("skills", true);
                formik.setFieldValue("skills", skills);
              }}
            />
            <ErrorMessage mt="xs" name="skills" component={InputError} />
            {formik.values.skills.length >= 10 && (
              <Text mt="m" size="s" lineHeight="s">
                You can&apos;t add more than 10 primary skills. If you want to
                add more skills to your profile, you can do so by{" "}
                <Link to="/profile/references">adding a previous project.</Link>
              </Text>
            )}
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              as={CurrencyInput}
              prefix="$"
              name="hourlyRate"
              placeholder="Hourly rate"
              label="What is your typical hourly rate in USD?"
              description="This is just to get an idea of your rate. You will be able to set your rate on a per project basis when working with clients on Advisable."
            />
            <Box height={1} bg="neutral100" my="l" />
            <Box mb="l">
              <Field as={Checkbox} type="checkbox" name="publicUse">
                I’m okay with Advisable using my profile to promote me publicly
                on advisable.com
              </Field>
            </Box>
            <Button type="submit" loading={formik.isSubmitting}>
              Save Changes
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
