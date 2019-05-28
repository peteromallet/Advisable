import * as Yup from "yup";

const validationSchema = Yup.object({
  projectType: Yup.string().required("You must select a type"),
});

export default validationSchema;
