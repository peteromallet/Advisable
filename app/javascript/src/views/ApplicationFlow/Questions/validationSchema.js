import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please provide an answer to this question"),
});

export default validationSchema;
