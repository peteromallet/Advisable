import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  reason: Yup.string().required('Please select a reason for rejection'),
});

export default validationSchema;
