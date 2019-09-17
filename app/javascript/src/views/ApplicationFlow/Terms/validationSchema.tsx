import * as Yup from "yup";

const noRate = "Please specify your hourly rate for a project like this.";

const validationSchema = Yup.object().shape({
  rate: Yup.number()
    .moreThan(0, noRate)
    .required(noRate),
  acceptsFee: Yup.boolean().oneOf(
    [true],
    "You must accept our fee's to continue"
  ),
  acceptsTerms: Yup.boolean().oneOf(
    [true],
    "You must accept our term's to continue"
  ),
  trialProgram: Yup.boolean().oneOf(
    [true],
    "You must aggree to participate in our guaranteed trial program"
  ),
});

export default validationSchema;
