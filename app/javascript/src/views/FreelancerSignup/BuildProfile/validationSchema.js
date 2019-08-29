import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  bio: Yup.string()
    .nullable()
    .required("Please add a short bio"),
  city: Yup.string()
    .nullable()
    .required("Please set your city"),
  country: Yup.string()
    .nullable()
    .required("Please set your country"),
});

export default validationSchema;
