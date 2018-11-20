import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  accpetedTerms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions')
});

export default validationSchema;
