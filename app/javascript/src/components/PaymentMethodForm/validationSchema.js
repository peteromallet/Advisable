import { object, string } from "yup";

export default object().shape({
  cardholder: string().required(
    "Please enter the full name of the card holder.",
  ),
});
