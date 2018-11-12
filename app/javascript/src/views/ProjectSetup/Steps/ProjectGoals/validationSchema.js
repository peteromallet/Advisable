import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  goals: Yup.array().of(Yup.string()).min(1, "Please add at least one goal")
});

export default validationSchema;
