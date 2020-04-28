import { object, string } from "yup";

const validationSchema = object().shape({
  companyDescription: string().required("Please provide a company overview"),
});

export default validationSchema;
