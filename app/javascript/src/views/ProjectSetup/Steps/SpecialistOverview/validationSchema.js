import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  specialistOverview: Yup.string().required("Please provide a specialist overview"),
});

export default validationSchema;
