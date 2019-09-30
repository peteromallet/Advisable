import * as Yup from "yup";

const createValidationSchema = project =>
  Yup.object({
    accept: Yup.boolean().oneOf(
      [true],
      `We will need to contact you to verify that ${project.specialist.name} worked for you.`
    ),
    email: Yup.string()
      .required(
        `Please provide an email address for ${project.contactFirstName} ${project.contactLastName}`
      )
      .email("Please provide a valid email address"),
  });

export default createValidationSchema;
