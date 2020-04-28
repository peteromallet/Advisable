import { object, string } from "yup";

export default object().shape({
  bankHolderName: string().required("Please enter the name of the bank holder"),
  bankHolderAddress: object().shape({
    line1: string().required("Required"),
    city: string().required("Required"),
  }),
});
