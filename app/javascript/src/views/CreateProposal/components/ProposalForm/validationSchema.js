import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  type: Yup.string(),
  startDate: Yup.date().required("Please enter a start date"),
  endDate: Yup.date().nullable()
    .when("type", {
      is: "Fixed",
      then: Yup.date().required("Please enter an end date")
    })
    .when("startDate", {
      is: startDate => startDate !== undefined,
      then: Yup.date().min(
        Yup.ref("startDate"),
        "End date can not be before the start date"
      )
    }),
  rate: Yup.number().required("Please enter an amount"),
  deliverables: Yup.array()
    .of(Yup.string())
    .min(1, "Please define at least on deliverable")
});

export default validationSchema;
