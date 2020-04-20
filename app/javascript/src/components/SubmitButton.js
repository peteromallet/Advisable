import React from "react";
import { RoundedButton } from "@advisable/donut";
import { useFormikContext } from "formik";

// The SubmitButton component is a simple wrapper around the Donut RoundedButton component
// that hooks into the formik state and adds the loading indicator based on the formik
// isSubmitting state.
function SubmitButton(props) {
  const formik = useFormikContext();
  return (
    <RoundedButton type="submit" loading={formik.isSubmitting} {...props} />
  );
}

export default SubmitButton;
