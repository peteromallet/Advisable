import { object, string } from "yup";

export const yourPostValidationSchema = object({
  title: string().required("Please add a title for this post").min(8),
  body: string()
    .required("Please add some text for the body of this post")
    .min(4),
});
