import { object, string } from "yup";

const validationSchema = object().shape({
  introduction: string()
    .max(
      280,
      "Please keep your introduction simple. It must be at most 280 characters",
    )
    .required("Please provide a brief one-line description"),
  linkedin: string().url("Please provide a valid LinkedIn URL"),
  availability: string().required(
    "Please select your availability for this project",
  ),
});

export default validationSchema;
