import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  niceToHaveCharacteristics: Yup.array().of(Yup.string()).min(1, "Please add at least one characteristic")
});

export default validationSchema;
