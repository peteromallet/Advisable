import { Help } from "@styled-icons/ionicons-solid";
import { Box, Button } from "@advisable/donut";

export default function WalkthroughTrigger({ walkthrough }) {
  return (
    <Box position="fixed" zIndex="10" left="20px" bottom="20px">
      <Button onClick={walkthrough.show} variant="subtle">
        <Help />
      </Button>
    </Box>
  );
}
