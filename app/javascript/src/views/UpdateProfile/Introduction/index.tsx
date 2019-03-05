// Renders the view for updating a freelancer introduction in their profile
// settings

import * as React from "react";
import { Formik, Form } from "formik";
import { compose, graphql } from "react-apollo";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import FieldRow from "../../../components/FieldRow";
import TextField from "../../../components/TextField";
import Padding from "../../../components/Spacing/Padding";
import { useNotifications } from "../../../components/Notifications";
import FETCH_PROFILE from "../fetchProfile.graphql";
import UPDATE_PROFILE from "../updateProfile.graphql";

let Introduction = ({ data, mutate }) => {
  const notifications = useNotifications()

  if (data.loading) return <div>loading...</div>;

  const handleSubmit = async (values, formikBag) => {
    await mutate({
      variables: {
        input: {
          id: data.viewer.airtableId,
          bio: values.bio
        }
      }
    });
    
    notifications.notify("Your profile has been updated")
    formikBag.setSubmitting(false);
  };

  return (
    <Formik initialValues={{ bio: data.viewer.bio }} onSubmit={handleSubmit}>
      {formik => (
        <React.Fragment>
          <Padding bottom="m">
            <Heading level={2}>Introduction</Heading>
          </Padding>
          <Card>
            <Padding size="l">
              <Form>
                <FieldRow>
                  <TextField
                    name="bio"
                    multiline
                    minRows={8}
                    label="About me"
                    value={formik.values.bio}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    subLabel="Add a short 2 - 3 sectence bio to describe who you are."
                    placeholder="Add a short 2 - 3 sectence bio to describe who you are."
                    description="A well structured bio demonstrates your experience and expertise by referencing past projects and achievements, including notable clients or numeric results. You will have a chance to customize this each time you apply for a project."
                  />
                </FieldRow>
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
  graphql(FETCH_PROFILE),
  graphql(UPDATE_PROFILE)
)(Introduction);
