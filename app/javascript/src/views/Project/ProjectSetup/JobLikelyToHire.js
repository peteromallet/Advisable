import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { useMutation } from "@apollo/client";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { setupProgress } from "./SetupSteps";

export default function JobLikelyToHire({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  if (!setupProgress(data.project).description) {
    return <Redirect to={`/projects/${id}/setup/description`} />;
  }

  const initialValues = {
    likelyToHire: data.project.likelyToHire,
  };

  const handleSubmit = (values) => {
    updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateProject: {
          __typename: "UpdateProjectPayload",
          project: {
            ...data.project,
            likelyToHire: values.likelyToHire,
          },
        },
      },
    });

    history.push(`/projects/${id}/setup/publish`);
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("likelyToHire", val);
    formik.submitForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            If Advisable finds you the perfect specialist for this, how likely
            are you to hire them?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            We&apos;ll share this with potential matches so they know how
            serious you are about this project before applying.
          </JobSetupStepSubHeader>
          <Field
            name="likelyToHire"
            as={RangeSelection}
            onChange={handleSelection(formik)}
            options={[
              { label: "Not Likely", value: 0 },
              { label: "Maybe", value: 1 },
              { label: "Very Likely", value: 2 },
            ]}
          />
        </Form>
      )}
    </Formik>
  );
}
