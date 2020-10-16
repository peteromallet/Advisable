import { Box, Text } from "@advisable/donut";
import illustration from "./illustration.png";

const MoreTimesRequested = ({ clientName }) => (
  <Box textAlign="center">
    <img width={250} src={illustration} alt="" />
    <Text lineHeight="m" color="neutral800">
      We have requested more times from {clientName} and will let you know when
      they respond.
    </Text>
  </Box>
);

export default MoreTimesRequested;
