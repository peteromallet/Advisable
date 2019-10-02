import * as Yup from "yup";

const validationSchema = Yup.object({
  contactName: Yup.string().required(
    "Please provide a name for your contact with this client"
  ),
  contactJobTitle: Yup.string().required(
    "Please provide the title of your contact for this project"
  ),
});

export default validationSchema;
