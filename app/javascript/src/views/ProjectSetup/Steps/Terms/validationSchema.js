import { object, boolean } from "yup";

const validationSchema = object().shape({
  acceptedTerms: boolean().oneOf(
    [true],
    "Please accept the terms and conditions",
  ),
});

export default validationSchema;
