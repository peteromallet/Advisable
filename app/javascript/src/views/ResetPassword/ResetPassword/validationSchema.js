import { object, string, ref } from "yup";

const validationSchema = object({
  password: string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default validationSchema;
