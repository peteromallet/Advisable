import { object, string, array } from "yup";

export const clientDetailsValidationSchema = object({
  clientName: string().required("Please provide the company name"),
  companyType: string().required("Please provide the company type"),
  industries: array().min(1, "Please select at least one industry"),
});

export const projectOverviewValidationSchema = object({
  goal: string().required("Please describe the goal of this project"),
  description: string().required("Please provide a description"),
  skills: array().min(1, "Please add at least one skill"),
});

export const verificationValidationSchema = object({
  contactName: string().required(
    "Please provide the name of your contact on this project",
  ),
  contactJobTitle: string().required("Please provide their job title"),
  contactRelationship: string().required(
    "Please description their relationship on the project",
  ),
});
