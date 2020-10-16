import PropTypes from "prop-types";
// Hooks
import { useField } from "formik";
// Components
import { Text, Box } from "@advisable/donut";
import StarRatingInput from "../../../components/StarRatingInput";

function StarRatingField({ name, label }) {
  const [field, , helpers] = useField(name);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text color="blue900" fontWeight="medium">
        {label}
      </Text>
      <Box>
        <StarRatingInput
          name={name}
          value={field.value}
          label={label}
          onChange={(rating) => helpers.setValue(rating)}
        />
      </Box>
    </Box>
  );
}

StarRatingField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default StarRatingField;
