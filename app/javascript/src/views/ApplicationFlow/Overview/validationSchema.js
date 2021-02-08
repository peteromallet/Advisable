import { object, string } from "yup";

const validationSchema = object().shape({
  introduction: string().required(
    "Please provide a brief one-line description",
  ),
  linkedin: string().url("Please provide a valid LinkedIn URL"),
  availability: string().required(
    "Please select your availability for this project",
  ),
});

export default validationSchema;
