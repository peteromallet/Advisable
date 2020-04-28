import { object, number, boolean } from "yup";

const noRate = "Please specify your hourly rate for a project like this.";

const validationSchema = object().shape({
  rate: number().nullable().moreThan(0, noRate).required(noRate),
  acceptsFee: boolean().oneOf([true], "You must accept our fee's to continue"),
  acceptsTerms: boolean().oneOf(
    [true],
    "You must accept our term's to continue",
  ),
  trialProgram: boolean().oneOf(
    [true],
    "You must agree to participate in our guaranteed trial program",
  ),
});

export default validationSchema;
