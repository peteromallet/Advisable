import { object, array, string } from "yup";

const validationSchema = object().shape({
  skills: array().of(string()).min(1, "Please add at least one skill"),
});

export default validationSchema;
