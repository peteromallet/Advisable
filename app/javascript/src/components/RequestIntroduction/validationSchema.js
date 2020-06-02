import { object, array, string } from "yup";

const validationSchema = object().shape({
  availability: array().of(string()).min(5, "Please select at least 5 times."),
});

export default validationSchema;
