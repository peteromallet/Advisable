import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Please enter your company name."),
  email: Yup.string()
    .required("Please enter your email.")
    .email("Please enter a valid email address."),
  cardholder: Yup.string().required(
    "Please enter the full name of the card holder."
  ),
});
