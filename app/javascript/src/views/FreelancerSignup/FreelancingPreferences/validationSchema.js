import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  primarilyFreelance: Yup.boolean()
    .nullable()
    .required(
      "Please specify wether or not freelancing is your primary occupation."
    ),
  numberOfProjects: Yup.string()
    .nullable()
    .required(
      "Please select how many previous freelance projects you have completed."
    ),
  hourlyRate: Yup.number()
    .nullable()
    .required("Please define your hourly rate in USD."),
});

export default validationSchema;
