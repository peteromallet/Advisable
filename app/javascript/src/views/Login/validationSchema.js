import { object, string } from "yup";

const validationSchema = object().shape({
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  password: string().required("Please enter your password"),
});

export default validationSchema;
