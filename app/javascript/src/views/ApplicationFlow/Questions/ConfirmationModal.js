import PropTypes from "prop-types";
import { Box, Text, Button, Modal } from "@advisable/donut";
import pluralize from "../../../utilities/pluralize";

const ConfirmationModal = ({ modal, formik, loading, numOfWords }) => {
  return (
    <Modal modal={modal} label="Are you sure?">
      <Box padding="l">
        <Text
          fontSize="24px"
          color="blue900"
          mb="xs"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          Are you sure?
        </Text>

        <Text color="neutral800" fontSize="s" lineHeight="m" mb="l">
          The average successful response to a qualifying question is 100 words.
          Yours is {pluralize(numOfWords, "word", "words")}. Try to add more
          content to describing your experience in order to make the best
          possible impression on the client!
        </Text>

        <Box display="flex" flexDirection={["column", "row"]}>
          <Button
            variant="subtle"
            type="button"
            loading={loading}
            onClick={formik.submitForm}
            mr={["0", "m"]}
            mb={["m", "0"]}
          >
            Ignore
          </Button>
          <Button
            variant="dark"
            type="button"
            onClick={modal.hide}
            mr={["0", "m"]}
            mb={["m", "0"]}
          >
            Add More Detail
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  modal: PropTypes.object,
  loading: PropTypes.bool,
  numOfWords: PropTypes.number,
  formik: PropTypes.object,
};

export default ConfirmationModal;
