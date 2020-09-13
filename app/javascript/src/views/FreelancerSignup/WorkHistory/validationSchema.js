import { object, string } from "yup";

const validationSchema = object().shape({
  linkedin: string().nullable().url("Please provide a valid URL"),
  website: string().nullable().url("Please provide a valid URL"),
  resume: string()
    .nullable()
    .when(["linkedin", "website"], {
      is: (linkedin, website) => !linkedin && !website,
      then: string().required(
        "Please provide at least one of the above so that we can see your work history.",
      ),
    }),
});

export default validationSchema;
