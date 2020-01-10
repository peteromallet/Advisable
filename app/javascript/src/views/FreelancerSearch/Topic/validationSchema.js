import * as Yup from "yup";

const validationSchema = Yup.object({
  topic: Yup.string().required("Please provide a topic"),
});

export default validationSchema;
