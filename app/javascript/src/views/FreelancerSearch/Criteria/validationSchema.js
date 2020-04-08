import * as Yup from "yup";

const validationSchema = Yup.object({
  skill: Yup.string().required("Please select a skill"),
  industry: Yup.string().required("Please provide what industry are in"),
  description: Yup.string().required(
    "Please briefly describe what you're looking form",
  ),
});

export default validationSchema;
