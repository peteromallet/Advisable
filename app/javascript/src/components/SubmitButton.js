import React from "react";
import { Button } from "@advisable/donut";
import { useFormikContext } from "formik";

// The SubmitButton component is a simple wrapper around the Donut Button component
// that hooks into the formik state and adds the loading indicator based on the formik
// isSubmitting state.
function SubmitButton(props) {
  const formik = useFormikContext();
  return <Button type="submit" loading={formik.isSubmitting} {...props} />;
}

export default SubmitButton;
