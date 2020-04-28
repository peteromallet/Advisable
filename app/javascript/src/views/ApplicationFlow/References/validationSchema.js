import { object, array } from "yup";

const validationSchema = object().shape({
  references: array().min(
    1,
    "Please select at least one previous project to include with your application",
  ),
});

export default validationSchema;
