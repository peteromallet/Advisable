import * as Yup from "yup";

const validationSchema = Yup.object({
  clientName: Yup.string().required("Please enter the clients name"),
  industry: Yup.string().required("Please enter the clients industry"),
  clientDescription: Yup.string().required("Please add a description of the client"),
});

export default validationSchema;
