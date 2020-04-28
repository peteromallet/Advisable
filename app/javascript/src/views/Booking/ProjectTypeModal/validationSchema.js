import { object, string, boolean, number } from "yup";

export default object().shape({
  projectType: string().required("Please select a project type"),
  acceptCharges: boolean().oneOf([true]),
  acceptUpfrontCharges: boolean().when("projectType", {
    is: "Flexible",
    then: boolean().oneOf([true]),
  }),
  monthlyLimit: number()
    .nullable()
    .when("projectType", {
      is: "Flexible",
      then: number()
        .required("Please add a monthly limit")
        .min(1, "Monthly limit cannot be 0")
        .max(200, "Monthly limit cannot exceed 200 hours"),
    }),
});
