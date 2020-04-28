import { object, string } from "yup";

const validationSchema = object().shape({
  description: string().required("Please provide a project overview"),
});

export default validationSchema;
