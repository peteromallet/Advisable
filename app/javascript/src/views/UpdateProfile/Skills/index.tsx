import * as React from "react";
import { Formik, Form } from "formik";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { RouteComponentProps } from "react-router";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import FieldRow from "../../../components/FieldRow";
import Padding from "../../../components/Spacing/Padding";
import SuggestedSelect from "../../../components/SuggestedSelect";
import { useNotifications } from "../../../components/Notifications";
import { SpecialistType } from "../../../types";
import FETCH_SKILLS from "./fetchSkills.graphql";
import FETCH_PROFILE from "../fetchProfile.graphql";
import UPDATE_PROFILE from "../updateProfile";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Props extends RouteComponentProps {
  skillsQuery: {
    loading: boolean;
    skills: Option[];
  };
  profileQuery: {
    loading: boolean;
    viewer: SpecialistType;
  };
  mutate: (props: any) => void;
}

// Renders the view for updating a freelancers skills inside their "profile".
const Skills = ({ skillsQuery, profileQuery, mutate }: Props) => {
  const notifications = useNotifications();

  if (skillsQuery.loading || profileQuery.loading) return <Loading />;

  const handleSubmit = async (values, formikBag) => {
    await mutate({
      variables: {
        input: {
          id: profileQuery.viewer.airtableId,
          skills: values.skills,
        },
      },
    });

    notifications.notify("Your profile has been updated");
    formikBag.setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Padding bottom="m">
        <Heading level={2}>Your Skills</Heading>
      </Padding>
      <Card>
        <Padding size="l">
          <Formik
            initialValues={{ skills: profileQuery.viewer.skills }}
            onSubmit={handleSubmit}
          >
            {formik => (
              <Form>
                <FieldRow>
                  <SuggestedSelect
                    isMulti
                    name="skills"
                    isClearable={false}
                    closeMenuOnSelect={false}
                    label="Your freelancing skills"
                    subLabel="Please add the skills that you have previously successfully completed projects in. We will use your skillset to suggest opportunities for you to apply to."
                    options={skillsQuery.skills}
                    onBlur={formik.handleBlur}
                    value={formik.values.skills}
                    placeholder="e.g Facebook Marketing"
                    error={formik.touched.skills && formik.errors.skills}
                    onChange={skill => {
                      formik.setFieldTouched("skills", true);
                      formik.setFieldValue("skills", skill);
                    }}
                  />
                </FieldRow>
                <Button loading={formik.isSubmitting} styling="green">
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Padding>
      </Card>
    </React.Fragment>
  );
};

export default compose(
  graphql(FETCH_SKILLS, { name: "skillsQuery" }),
  graphql(FETCH_PROFILE, { name: "profileQuery" }),
  graphql(UPDATE_PROFILE)
)(Skills);
