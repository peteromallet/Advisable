import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Your password must be at least 8 characters long"),
});

export default validationSchema;
