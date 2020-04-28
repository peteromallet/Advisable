import { object, string, ref } from "yup";

const validationSchema = object({
  password: string().required("Please enter a password"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default validationSchema;
