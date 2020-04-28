import { object, string } from "yup";

const validationSchema = object().shape({
  reason: string().required("Please select a reason for rejection"),
});

export default validationSchema;
