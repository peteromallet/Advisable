import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  linkedin: Yup.string()
    .nullable()
    .url("Please provide a valid URL"),
  website: Yup.string()
    .nullable()
    .url("Please provide a valid URL"),
  resume: Yup.string()
    .nullable()
    .when(["linkedin", "website"], {
      is: (linkedin, website) => !Boolean(linkedin) && !Boolean(website),
      then: Yup.string().required(
        "Please provide at least one of the above so that we can see your work history."
      ),
    }),
});

export default validationSchema;
