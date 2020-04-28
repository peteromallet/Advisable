import { object, string } from "yup";

const validationSchema = object().shape({
  rejectionReason: string().required(),
  rejectionReasonComment: string()
    .nullable()
    .when("rejectionReason", {
      is: "I just want to see more candidates",
      then: string().nullable(),
      otherwise: string().required("Please provide more information"),
    }),
});

export default validationSchema;
