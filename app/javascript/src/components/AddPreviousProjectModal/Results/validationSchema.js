import * as Yup from "yup";

const validationSchema = Yup.object({
  results: Yup.string().required("Please describe the results that you achieved during this project"),
});

export default validationSchema;
