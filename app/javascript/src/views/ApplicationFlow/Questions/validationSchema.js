import { object, string } from "yup";

const validationSchema = object().shape({
  answer: string().required("Please provide an answer to this question"),
});

export default validationSchema;
