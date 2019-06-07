import * as Yup from "yup";

const validationSchema = Yup.object({
  validationMethod: Yup.string(),
  contactName: Yup.string()
    .nullable()
    .when("validationMethod", {
      is: "Client",
      then: Yup.string().required(
        "Please provide a name for your contact with this client"
      ),
    }),
  contactJobTitle: Yup.string()
    .nullable()
    .when("validationMethod", {
      is: "Client",
      then: Yup.string().required(
        "Please provide the title of your contact for this project"
      ),
    }),
  contactEmail: Yup.string()
    .nullable()
    .when("validationMethod", {
      is: "Client",
      then: Yup.string().required(
        "Please provide an email address so that we can contact the client"
      ),
    }),
  validationUrl: Yup.string()
    .nullable()
    .when("validationMethod", {
      is: "URL",
      then: Yup.string().required("Please provide a validation URL"),
    }),
  validationExplanation: Yup.string()
    .nullable()
    .when("validationMethod", {
      is: "URL",
      then: Yup.string().required(
        "Please explain how this URL validates that the project happened."
      ),
    }),
});

export default validationSchema;
