import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  rejectionReason: Yup.string().required(),
  rejectionReasonComment: Yup.string()
    .nullable()
    .when("rejectionReason", {
      is: "I just want to see more candidates",
      then: Yup.string().nullable(),
      otherwise: Yup.string().required("Please provide more information")
    })
});

export default validationSchema;
