import { object, string, boolean, number } from "yup";

const validationSchema = object().shape({
  primarilyFreelance: boolean()
    .nullable()
    .required(
      "Please specify wether or not freelancing is your primary occupation.",
    ),
  numberOfProjects: string()
    .nullable()
    .required(
      "Please select how many previous freelance projects you have completed.",
    ),
  hourlyRate: number()
    .nullable()
    .required("Please define your hourly rate in USD."),
});

export default validationSchema;
