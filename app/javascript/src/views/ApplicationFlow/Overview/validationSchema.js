import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  introduction: Yup.string().required("Please provide a brief one-line description"),
  availability: Yup.string().required("Please select your availability for this project"),
});

export default validationSchema;
