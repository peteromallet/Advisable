import { object, boolean, string } from "yup";

const createValidationSchema = (specialistName, contactName) =>
  object({
    accept: boolean().oneOf(
      [true],
      `We will need to contact you to verify that ${specialistName} worked for you.`,
    ),
    email: string()
      .required(`Please provide an email address for ${contactName}`)
      .email("Please provide a valid email address"),
  });

export default createValidationSchema;
