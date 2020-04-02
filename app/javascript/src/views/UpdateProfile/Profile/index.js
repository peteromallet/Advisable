import React from "react";
import { get, sortBy } from "lodash";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Box,
  Card,
  Text,
  Link,
  Autocomplete,
  Button,
  Checkbox,
  Avatar,
} from "@advisable/donut";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import FileUpload from "../../../components/FileUpload";
import { useNotifications } from "../../../components/Notifications";
import GET_DATA from "./getData";
import UPDATE_PROFILE from "../updateProfile";

const numberMask = createNumberMask({
  prefix: "",
});

const Profile = () => {
  const { loading, data } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const notifications = useNotifications();

  const [profilePhoto, setProfilePhoto] = React.useState(null);

  const initialValues = {
    bio: get(data, "viewer.bio"),
    avatar: null,
    hourlyRate: get(data, "viewer.hourlyRate") / 100.0,
    publicUse: get(data, "viewer.publicUse"),
    skills: (get(data, "viewer.skills") || []).map((s) => s.name),
  };

  const handleSubmit = async (values, formik) => {
    let input = {
      bio: values.bio,
      hourlyRate: values.hourlyRate * 100,
      publicUse: values.publicUse,
      skills: values.skills,
    };

    if (values.avatar) {
      input.avatar = values.avatar;
    }

    await updateProfile({
      variables: { input },
    });

    notifications.notify("Your profile has been updated");
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
            <Text size="xxl" color="neutral.9" as="h2" weight="semibold" mb="l">
              Your Profile
            </Text>
            <Box maxWidth={400}>
              <Text size="s" color="neutral.8" mb="xs" weight="medium">
                Proile photo
              </Text>
              <FileUpload
                onChange={(blob) => {
                  formik.setFieldValue("avatar", blob.signed_id);
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
            <Box height={1} bg="neutral.1" my="l" />
            <TextField
              name="bio"
              multiline
              autoHeight
              minRows={8}
              label="About me"
              value={formik.values.bio}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              subLabel="Add a short 2 - 3 sectence bio to describe who you are."
              placeholder="Add a short 2 - 3 sectence bio to describe who you are."
              description="A well structured bio demonstrates your experience and expertise by referencing past projects and achievements, including notable clients or numeric results. You will have a chance to customize this each time you apply for a project."
            />
            <Box height={1} bg="neutral.1" my="l" />
            <Autocomplete
              multiple
              max={10}
              name="skills"
              description="Add up to 10 skill’s that you have used in previously completed projects."
              label="What type of projects are you looking for?"
              placeholder="e.g Online Marketing"
              options={sortBy(data.skills, ["label"])}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
              error={formik.touched.skills && formik.errors.skills}
              onChange={(skills) => {
                formik.setFieldTouched("skills", true);
                formik.setFieldValue("skills", skills);
              }}
            />
            {formik.values.skills.length >= 10 && (
              <Text mt="m" size="s" lineHeight="s">
                You can't add more than 10 primary skills. If you want to add
                more skills to your profile, you can do so by{" "}
                <Link to="/profile/references">adding a previous project.</Link>
              </Text>
            )}
            <Box height={1} bg="neutral.1" my="l" />
            <TextField
              prefix="$"
              name="hourlyRate"
              mask={numberMask}
              placeholder="Hourly rate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  const amount = Number(e.target.value.replace(/\,/, ""));
                  formik.setFieldValue(e.target.name, amount);
                } else {
                  formik.setFieldValue(e.target.name, null);
                }
              }}
              value={formik.values.hourlyRate}
              label="What is your typical hourly rate in USD?"
              description="This is just to get an idea of your rate. You will be able to set your rate on a per project basis when working with clients on Advisable."
              error={formik.touched.hourlyRate && formik.errors.hourlyRate}
            />
            <Box height={1} bg="neutral.1" my="l" />
            <Box mb="l">
              <Field as={Checkbox} type="checkbox" name="publicUse">
                I’m okay with Advisable using my profile to promote me publicly
                on advisable.com
              </Field>
            </Box>
            <Button
              type="submit"
              appearance="primary"
              intent="success"
              loading={formik.isSubmitting}
            >
              Save Changes
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
