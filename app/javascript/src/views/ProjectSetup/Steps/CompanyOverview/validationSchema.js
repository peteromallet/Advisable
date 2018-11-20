import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  companyDescription: Yup.string().required("Please provide a company overview"),
});

export default validationSchema;
