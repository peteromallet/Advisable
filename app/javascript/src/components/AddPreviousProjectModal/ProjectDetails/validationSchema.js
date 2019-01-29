import * as Yup from "yup";

const validationSchema = Yup.object({
  requirements: Yup.string().required("Please enter short description of the type of person they were looking for"),
  description: Yup.string().required("Please add a short project description"),
});

export default validationSchema;
