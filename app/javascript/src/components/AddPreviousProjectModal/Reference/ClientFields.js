// renders the fields for collecting client contact information to validate
// an off platform project.
import React from "react";
import { Padding } from "@advisable/donut";
import TextField from "../../TextField";
import FieldGroup from "../../FieldGroup";

const ClientFields = ({ formik }) => {
  return (
    <>
      <Padding bottom="s">
        <FieldGroup>
          <TextField
            name="contactName"
            placeholder="Contact Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contactName}
            label="What was the name of your contact with this client?"
          />
        </FieldGroup>
      </Padding>
      <Padding bottom="s">
        <FieldGroup>
          <TextField
            name="contactJobTitle"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Contact Job Title"
            label="What was their job title?"
            value={formik.values.contactJobTitle}
          />
        </FieldGroup>
      </Padding>
      <FieldGroup>
        <TextField
          name="contactEmail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Contact email address"
          label="What’s their email address?"
          value={formik.values.contactEmail}
        />
      </FieldGroup>
    </>
  );
};

export default ClientFields;
