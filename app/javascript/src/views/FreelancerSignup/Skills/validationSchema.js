import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please add at least one skill"),
});

export default validationSchema;
