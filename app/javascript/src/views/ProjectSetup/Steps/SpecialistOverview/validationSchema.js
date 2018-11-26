import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  specialistDescription: Yup.string().required("Please provide a specialist overview"),
});

export default validationSchema;
