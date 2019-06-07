import * as Yup from "yup";

const validationSchema = Yup.object({
  clientName: Yup.string().required("Please enter the clients name"),
  industry: Yup.string().required("Please enter the clients industry"),
  skills: Yup.array().min(1, "Please add at least one skill"),
});

export default validationSchema;
