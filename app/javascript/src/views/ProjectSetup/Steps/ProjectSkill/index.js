import React, { Fragment } from "react";
import find from "lodash/find";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Loading from "src/components/Loading";
import FieldRow from "src/components/FieldRow";
import ButtonGroup from "src/components/ButtonGroup";
import SuggestedSelect from "src/components/SuggestedSelect";
import SKILLS from "./skills.graphql";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ history, match, project }) => {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const query = useQuery(SKILLS);

  if (query.loading) return <Loading />;

  let initialValues = {
    primarySkill: "",
  };

  if (project) {
    initialValues.id = project.airtableId;
    initialValues.primarySkill = project.primarySkill || "";
  }

  const getSelectedOption = (skills, id) => {
    if (!id) return null;
    return find(skills, { value: id });
  };

  return (
    <Fragment>
      <Text marginBottom="l">
        Select the primary skill you require from a freelancer in the list
        below.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await mutate({
            variables: { input: values },
          });

          let id = match.params.projectID;
          if (response.data.createProject) {
            id = response.data.createProject.project.airtableId;
          }
          history.push(`/project_setup/${id}/company_overview`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <FieldRow>
              <SuggestedSelect
                name="skills"
                options={query.data.skills}
                value={getSelectedOption(
                  query.data.skills,
                  formik.values.primarySkill,
                )}
                onBlur={formik.handleBlur}
                onChange={(skill) =>
                  formik.setFieldValue("primarySkill", skill)
                }
              />
            </FieldRow>
            <ButtonGroup>
              <Button
                type="submit"
                size="l"
                styling="primary"
                loading={formik.isSubmitting}
              >
                Continue
              </Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
