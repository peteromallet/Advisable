import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  monthlyLimit: Yup.number()
    .required("Please add a monthly limit")
    .max(200, "The montlhy limit cannot exceed 200 hours")
    .min(1, "The monthly limit cannot be 0 hours"),
});

export default validationSchema;
