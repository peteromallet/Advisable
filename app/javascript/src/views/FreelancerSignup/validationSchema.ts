import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string().required("Please enter your password").min(8, "Your password must be at least 8 characaters long"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match').required('Please confirm your password')
});

export default validationSchema;
