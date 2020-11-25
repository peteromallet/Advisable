import { object, string } from "yup";

const validationSchema = object().shape({
  fullName: string().required("Please enter your full name"),
  email: string().required("Please enter your email").email(),
});

export default validationSchema;
