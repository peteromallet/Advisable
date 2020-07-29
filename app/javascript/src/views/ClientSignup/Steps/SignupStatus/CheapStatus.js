import React from "react";
import { Button, Link } from "@advisable/donut";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";

function CheapStatus() {
  return (
    <MotionStack>
      <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
      <Description>
        Advisable isn&apos;t suitable for companies like you. For people like
        you, we recommend Upwork.com.
      </Description>
      <Link.External href="https://www.upwork.com/">
        <Button width={[1, "auto"]}>Go To Upwork</Button>
      </Link.External>
    </MotionStack>
  );
}

export default CheapStatus;
