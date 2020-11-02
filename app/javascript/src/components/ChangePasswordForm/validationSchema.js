import { object, string, ref } from "yup";

const validationSchema = object({
  currentPassword: string().required("Please enter your current password"),
  password: string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characaters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default validationSchema;
