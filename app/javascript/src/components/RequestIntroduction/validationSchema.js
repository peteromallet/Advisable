import { object, array, string } from "yup";

const validationSchema = object().shape({
  availability: array()
    .of(string())
    // We require a minimum of 6 so that the user must select 3 time blocks.
    // Each block adds 2 times; on the hour and on the half hour
    .min(
      6,
      "Please select at least three times. Tip: You can click and drag to select multiple times at once.",
    ),
});

export default validationSchema;
