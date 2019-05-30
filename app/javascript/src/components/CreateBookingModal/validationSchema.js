import * as Yup from "yup";

export default Yup.object().shape({
  projectType: Yup.string().required("Please select a project type"),
  monthlyLimit: Yup.number().when("projectType", {
    is: "Flexible",
    then: Yup.number()
      .required("Please add a monthly limit")
      .min(1, "Monthly limit cannot be 0")
      .max(200, "Monthly limit cannot exceed 200 hours"),
  }),
});
