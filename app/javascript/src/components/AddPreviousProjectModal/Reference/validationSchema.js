import * as Yup from "yup";

const validationSchema = Yup.object({
  contactName: Yup.string().required("Please provide the name of your contact for this project"),
  contactJobTitle: Yup.string().required("Please provide the title of your contact for this project"),
});

export default validationSchema;
