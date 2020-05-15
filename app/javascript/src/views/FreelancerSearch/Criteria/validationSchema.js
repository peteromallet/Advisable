import { object, string } from "yup";

const validationSchema = object({
  skill: string().required("Please select a skill"),
  industry: string().required("Please provide what industry are in"),
});

export default validationSchema;
