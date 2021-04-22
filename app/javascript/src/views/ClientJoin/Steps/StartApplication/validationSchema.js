import { object, string } from "yup";

const validationSchema = object().shape({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
});

export default validationSchema;
