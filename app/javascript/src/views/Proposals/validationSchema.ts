import * as Yup from "yup";

export const rateValidationSchema = Yup.object().shape({
  rate: Yup.number().nullable().required("Please enter your hourly rate for this project")
    .moreThan(0, "Your rate must be greater than 0")
});
