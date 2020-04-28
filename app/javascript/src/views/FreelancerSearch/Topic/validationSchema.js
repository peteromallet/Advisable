import { object, string } from "yup";

const validationSchema = object({
  topic: string().required("Please provide a topic"),
});

export default validationSchema;
