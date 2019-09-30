import * as Yup from "yup";

const createValidationSchema = contactName =>
  Yup.object({
    email: Yup.string()
      .required(`Please provide an email address for ${contactName}`)
      .email("Please provide a valid email address"),
  });

export default createValidationSchema;
