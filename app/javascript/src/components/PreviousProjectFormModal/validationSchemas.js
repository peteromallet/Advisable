import * as Yup from "yup";

export const clientDetailsValidationSchema = Yup.object({
  clientName: Yup.string().required("Please provide the company name"),
  companyType: Yup.string().required("Please provide the company type"),
  industries: Yup.array().min(1, "Please select at least one industry"),
});

export const projectOverviewValidationSchema = Yup.object({
  goal: Yup.string().required("Please describe the goal of this project"),
  description: Yup.string().required("Please provide a description"),
  skills: Yup.array().min(1, "Please add at least one skill"),
});

export const verificationValidationSchema = Yup.object({
  contactName: Yup.string().required(
    "Please provide the name of your contact on this project",
  ),
  contactJobTitle: Yup.string().required("Please provide their job title"),
  contactRelationship: Yup.string().required(
    "Please description their relationship on the project",
  ),
});
