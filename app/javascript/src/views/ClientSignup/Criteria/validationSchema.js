import * as Yup from "yup";

const validationSchema = Yup.object({
  skill: Yup.string().required("Please select a skill"),
});

export default validationSchema;
