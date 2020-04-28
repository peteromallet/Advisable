import { object, array, string } from "yup";

const validationSchema = object().shape({
  requiredCharacteristics: array()
    .of(string())
    .min(1, "Please add at least one characteristic"),
});

export default validationSchema;
