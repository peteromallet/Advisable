import { Link as DonutLink, Button } from "@advisable/donut";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function EmailNotAllowed() {
  const location = useLocation();

  return (
    <MotionStack>
      <Title mb="m">Personal emails are not allowed</Title>
      <Description>
        Please try again with your company email address. If you don&apos;t have
        a company email address, you can email us at{" "}
        <DonutLink.External href="mailto:hello@advisable.com">
          hello@advisable.com
        </DonutLink.External>{" "}
        to tell us why you should be considered.
      </Description>
      <Link to={{ pathname: "/clients/signup", state: { ...location.state } }}>
        <Button width={[1, "auto"]}>Try Again</Button>
      </Link>
    </MotionStack>
  );
}

export default EmailNotAllowed;
