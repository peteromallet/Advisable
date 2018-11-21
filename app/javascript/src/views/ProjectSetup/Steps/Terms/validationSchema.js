import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  acceptedTerms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions')
});

export default validationSchema;
