import { object, string } from "yup";

export const yourPostValidationSchema = object({
  title: string()
    .required("Please add a title for this post")
    .min(8)
    .nullable(),
  body: string()
    .required("Please add some content for this post")
    .min(16)
    .nullable(),
});
