import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string().required("Please add a short project description"),
});

export default validationSchema;
