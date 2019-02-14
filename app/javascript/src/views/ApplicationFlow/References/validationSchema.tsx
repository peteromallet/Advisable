import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  references: Yup.array().min(1, "Please select at least one previous project to include with your application"),
});

export default validationSchema;
