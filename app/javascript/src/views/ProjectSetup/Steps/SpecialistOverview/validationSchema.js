import { object, string } from "yup";

const validationSchema = object().shape({
  specialistDescription: string().required(
    "Please provide a specialist overview",
  ),
});

export default validationSchema;
