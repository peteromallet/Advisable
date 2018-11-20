import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Please provide a project overview"),
});

export default validationSchema;
