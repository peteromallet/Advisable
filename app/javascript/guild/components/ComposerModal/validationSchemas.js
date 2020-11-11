import { object, string } from "yup";

export const yourPostValidationSchema = object({
  title: string().required("Please add a title for this post").min(8),
});
