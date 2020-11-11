import { object, string } from "yup";

export const yourPostValidationSchema = object({
  title: string().required("Please add a title for this post"),
  body: string().required("Please add some content for this post"),
});
