// renders the fields for the url needed to validate an external project
import React from "react";
import { Padding } from "@advisable/donut";
import TextField from "../../TextField";
import FieldGroup from "../../FieldGroup";

const URLFields = ({ formik }) => {
  return (
    <>
      <Padding bottom="s">
        <FieldGroup>
          <TextField
            name="validationUrl"
            placeholder="https://"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.validationUrl}
            label="Please share the relevant URL for us to review"
          />
        </FieldGroup>
      </Padding>
      <FieldGroup>
        <TextField
          multiline
          minRows={2}
          name="validationExplanation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.validationExplanation}
          label="How does this URL validate that the project happened?"
        />
      </FieldGroup>
    </>
  );
};

export default URLFields;
