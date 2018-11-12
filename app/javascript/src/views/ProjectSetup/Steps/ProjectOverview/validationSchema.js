import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  projectOverview: Yup.string().required("Please provide a project overview"),
});

export default validationSchema;
