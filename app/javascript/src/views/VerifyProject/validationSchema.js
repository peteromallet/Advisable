import * as Yup from "yup";

const createValidationSchema = (specialistName, contactName) =>
  Yup.object({
    accept: Yup.boolean().oneOf(
      [true],
      `We will need to contact you to verify that ${specialistName} worked for you.`
    ),
    email: Yup.string()
      .required(`Please provide an email address for ${contactName}`)
      .email("Please provide a valid email address"),
  });

export default createValidationSchema;
