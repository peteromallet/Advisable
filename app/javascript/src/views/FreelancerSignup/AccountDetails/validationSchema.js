import { object, string } from "yup";

const validationSchema = object().shape({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  password: string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
});

export default validationSchema;
