import * as Yup from "yup";

export default Yup.object().shape({
  bankHolderName: Yup.string().required(
    "Please enter the name of the bank holder"
  ),
  bankHolderAddress: Yup.object().shape({
    line1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  }),
});
