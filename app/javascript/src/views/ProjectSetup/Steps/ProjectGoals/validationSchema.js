import { object, array, string } from "yup";

const validationSchema = object().shape({
  goals: array().of(string()).min(1, "Please add at least one goal"),
});

export default validationSchema;
