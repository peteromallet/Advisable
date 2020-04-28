import { object, string } from "yup";

const validationSchema = object().shape({
  bio: string().nullable().required("Please add a short bio"),
  city: string().nullable().required("Please set your city"),
  country: string().nullable().required("Please set your country"),
});

export default validationSchema;
