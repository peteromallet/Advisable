import React from "react";
import { get } from "lodash";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import { Button, Text, Box } from "@advisable/donut";
import { useQuery, useMutation } from "react-apollo";
import Select from "../../../components/Select";
import Avatar from "../../../components/Avatar";
import Checkbox from "../../../components/Checkbox";
import TextField from "../../../components/TextField";
import FileUpload from "../../../components/FileUpload";
import UPDATE_PROFILE from "../updateProfile";
import validationSchema from "./validationSchema";

export const GET_COUNTRIES = gql`
  {
    countries {
      value: id
      label: name
    }
  }
`;

const BuildProfile = ({ history, specialist }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const countriesQuery = useQuery(GET_COUNTRIES);
  const [profilePhoto, setProfilePhoto] = React.useState(
    get(specialist, "avatar")
  );

  const handleSubmit = async values => {
    const { data, errors } = await updateProfile({
      variables: {
        input: values,
      },
    });

    history.push("/freelancers/signup/work");
  };

  const initialValues = {
    avatar: null,
    bio: specialist.bio,
    city: specialist.city,
    country: get(specialist, "country.id"),
    publicUse: specialist.publicUse === null ? true : specialist.publicUse,
  };

  if (countriesQuery.loading) {
    return <>loading...</>;
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Text as="h2" size="xxxl" weight="semibold" color="neutral.9" mb="s">
            Build your profile
          </Text>
          <Text size="s" color="neutral.7" lineHeight="m">
            This information will be shared with clients when you apply to
            projects. You can update your profile in your user settings.
          </Text>
          <Box bg="neutral.1" width="100%" height="1px" my="l" />
          <Box mb="m">
            <Text size="s" color="neutral.8" mb="xs" weight="medium">
              Proile photo
            </Text>
            <FileUpload
              onChange={blob => {
                formik.setFieldValue("avatar", blob.signed_id);
              }}
              preview={file => {
                if (file) {
                  const reader = new FileReader();
                  reader.onload = e => setProfilePhoto(e.target.result);
                  reader.readAsDataURL(file);
                }
                return (
                  <Avatar name={specialist.name} url={profilePhoto} size="m" />
                );
              }}
              label="Upload a profile photo"
            />
          </Box>
          <Box mb="m">
            <TextField
              name="bio"
              multiline
              autoHeight
              label="Add a short bio"
              value={formik.values.bio}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Write a short introduction"
              error={formik.touched.bio && formik.errors.bio}
            />
          </Box>
          <Text color="neutral.8" weight="medium" mb="xs">
            Where are you based?
          </Text>
          <Box mb="m" display="flex">
            <Box flex={1} pr="xxs">
              <TextField
                name="city"
                placeholder="City"
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.city && formik.errors.city}
              />
            </Box>
            <Box flex={1} pl="xxs">
              <Select
                name="country"
                placeholder="Country"
                data-testid="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                options={countriesQuery.data.countries}
                error={formik.touched.country && formik.errors.country}
              />
            </Box>
          </Box>
          <Box mb="l">
            <Checkbox
              name="publicUse"
              label="I’m okay with Advisable using my profile to promote me publicly on advisable.com"
              onChange={formik.handleChange}
              value={formik.values.publicUse}
            />
          </Box>
          <Button
            size="l"
            intent="success"
            appearance="primary"
            type="submit"
            iconRight="arrow-right"
            loading={formik.isSubmitting}
          >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BuildProfile;
