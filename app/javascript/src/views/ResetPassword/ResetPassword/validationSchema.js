import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string().required("Please enter a password"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match').required('Please confirm your password')
});

export default validationSchema;
