import * as Yup from "yup";

export default Yup.object().shape({
  cardholder: Yup.string().required(
    "Please enter the full name of the card holder."
  ),
});
