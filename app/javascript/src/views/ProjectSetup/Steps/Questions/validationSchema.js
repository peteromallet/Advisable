import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  questions: Yup.array().of(Yup.string()).compact().min(1, "Please add at least one question")
});

export default validationSchema;
