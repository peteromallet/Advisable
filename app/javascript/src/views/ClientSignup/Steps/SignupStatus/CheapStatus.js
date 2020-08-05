import React from "react";
import { Button, Link } from "@advisable/donut";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";

function CheapStatus() {
  return (
    <MotionStack>
      <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
      <Description>
        Advisable only provides high-end talent. Since you&apos;re looking for
        cheap talent, we recommend{" "}
        <Link.External href="https://www.upwork.com/">Upwork.com</Link.External>
      </Description>
      <Link.External href="https://www.upwork.com/">
        <Button width={[1, "auto"]}>Go To Upwork</Button>
      </Link.External>
    </MotionStack>
  );
}

export default CheapStatus;
