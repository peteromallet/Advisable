import React from "react";
import { Formik, Field } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Checkbox from "src/components/Checkbox";
import FieldRow from "src/components/FieldRow";
import TextField from "src/components/TextField";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/questions`);

  return (
    <div>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/deposit`);
        }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Text size="s" weight="bold" colour="dark" marginBottom="xs">
              Responsibility for performance
            </Text>
            <Text size="s" marginBottom="l">
              Advisable.com will identify and vet freelance specialists to match
              the above Project Brief on behalf of Your Company. Your Company
              will then be responsible for interviewing and assessing the
              suitability of these candidates. Your Company is responsible for
              making any hiring decisions and Advisable.com will accept no
              responsibility for the performance of hired specialists
            </Text>

            <Text size="s" weight="bold" colour="dark" marginBottom="xs">
              Service fees
            </Text>
            <Text size="s" marginBottom="l">
              If a specialist is hired by your Company on a freelance basis,
              Advisable.com will charge this specialist a service fee. Your
              Company will ensure Advisable.com is made aware of all
              transactions between your Company and this specialist in order for
              Advisable.com to accurately calculate and collect it’s fee
            </Text>

            <Text size="s" weight="bold" colour="dark" marginBottom="xs">
              Specialist payment
            </Text>
            <Text size="s" marginBottom="l">
              Your Company will ensure that all payments between your Company
              and a specialist are made via Advisable.com. Payment terms will be
              agreed directly between your Company and Advisable.com
            </Text>

            <Text size="s" weight="bold" colour="dark" marginBottom="xs">
              Other project terms
            </Text>
            <Text size="s" marginBottom="l">
              All further agreements (i.e. on project pricing and deliverables)
              will be made directly between your Company and a specialist
            </Text>

            <Text size="s" weight="bold" colour="dark" marginBottom="xs">
              Full-time hire
            </Text>
            <Text size="s" marginBottom="xl">
              If a specialist is subsequently hired by your Company in a
              full-time capacity, your Company agrees to pay Advisable.com a
              one-off recruitment fee of 10% of the year 1 salary upon
              commencement of this full-time employment
            </Text>
            <Checkbox label="I accept these terms" name="acceptRFP" marginBottom="xl" />

            <ButtonGroup>
              <Button type="button" size="l" styling="outlined" onClick={goBack}>
                Back
              </Button>
              <Button type="submit" size="l" styling="primary">
                Continue
              </Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </div>
  );
};
