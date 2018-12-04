import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required("Please enter your email").email("Please enter a valid email address"),
  password: Yup.string().required("Please enter your password"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match').required('Please confirm your password')
});

export default validationSchema;
