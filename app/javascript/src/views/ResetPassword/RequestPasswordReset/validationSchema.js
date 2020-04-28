import { object, string } from "yup";

const validationSchema = object().shape({
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
});

export default validationSchema;
