// Renders the view for updating a freelancer location in their profile
// settings
import * as React from "react";
import { Formik, Form } from "formik";
import { flowRight as compose, get } from "lodash";
import { graphql } from "react-apollo";
import Text from "../../../components/Text";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import FieldRow from "../../../components/FieldRow";
import Checkbox from "../../../components/Checkbox";
import Select from "../../../components/Select";
import TextField from "../../../components/TextField";
import Padding from "../../../components/Spacing/Padding";
import { useNotifications } from "../../../components/Notifications";
import FETCH_PROFILE from "../fetchProfile.graphql";
import UPDATE_PROFILE from "../updateProfile";
import FETCH_COUNTRIES from "./fetchCountries.graphql";

let Location = ({ profileQuery, countriesQuery, mutate }) => {
  const notifications = useNotifications();

  if (profileQuery.loading || countriesQuery.loading) return <Loading />;

  const handleSubmit = async (values, formikBag) => {
    await mutate({
      variables: {
        input: {
          id: profileQuery.viewer.airtableId,
          ...values,
        },
      },
    });

    notifications.notify("Your profile has been updated");
    formikBag.setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        city: profileQuery.viewer.city,
        remote: profileQuery.viewer.remote,
        country: get(profileQuery.viewer, "country.id"),
      }}
    >
      {formik => (
        <React.Fragment>
          <Padding bottom="m">
            <Heading level={2}>Location</Heading>
          </Padding>
          <Card>
            <Padding size="l">
              <Form>
                <FieldRow>
                  <TextField
                    name="city"
                    label="City"
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="e.g Berlin"
                  />
                  <Select
                    name="country"
                    label="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    options={countriesQuery.countries}
                  />
                </FieldRow>
                <Padding bottom="m">
                  <Text weight="semibold" colour="dark">
                    Are you happy to work remotely?
                  </Text>
                </Padding>
                <Padding bottom="m">
                  <Checkbox
                    name="remote"
                    value={formik.values.remote}
                    label="Yes, I’m happy to work remote"
                    onChange={e => {
                      formik.setFieldValue("remote", true);
                    }}
                  />
                </Padding>
                <Padding bottom="xl">
                  <Checkbox
                    name="remote"
                    value={formik.values.remote === false}
                    label="No, I only work with clients in person"
                    onChange={e => {
                      formik.setFieldValue("remote", false);
                    }}
                  />
                </Padding>
                <Button loading={formik.isSubmitting} styling="green">
                  Save Changes
                </Button>
              </Form>
            </Padding>
          </Card>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default compose(
  graphql(FETCH_PROFILE, { name: "profileQuery" }),
  graphql(FETCH_COUNTRIES, { name: "countriesQuery" }),
  graphql(UPDATE_PROFILE)
)(Location);
