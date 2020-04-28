import { object, string } from "yup";

const validationSchema = object({
  skill: string().required("Please select a skill"),
  industry: string().required("Please provide what industry are in"),
  description: string().required(
    "Please briefly describe what you're looking form",
  ),
});

export default validationSchema;
