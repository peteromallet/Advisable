import { Link } from "react-router-dom";
import { Box, Text, Button } from "@advisable/donut";
import { Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import handshake from "../../illustrations/handshake.png";

function Complete() {
  const viewer = useViewer();

  if (viewer.applicationStage !== "Full Application") {
    return <Redirect to="/apply" />;
  }

  return (
    <Box textAlign="center">
      <img src={handshake} width="320" height="256" />
      <Text
        mb="8px"
        color="blue900"
        fontSize="24px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        Application Submitted
      </Text>
      <Box maxWidth="400px" mx="auto" mb="l">
        <Text fontSize="15px" lineHeight="1.4em" color="neutral700">
          Thanks! We have received your application and we’ll be in touch in the
          coming days.
        </Text>
      </Box>
      <Link to="/apply">
        <Button variant="subtle">Edit Application</Button>
      </Link>
    </Box>
  );
}

export default Complete;
