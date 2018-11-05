import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  availability: Yup.array()
    .of(Yup.string())
    // We require a minimum of 6 so that the user must select 3 time blocks.
    // Each block adds 2 times; on the hour and on the half hour
    .min(6, "Please select at least three available times")
});

export default validationSchema;
