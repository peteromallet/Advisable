import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email").email("Please enter a valid email address"),
});

export default validationSchema;
