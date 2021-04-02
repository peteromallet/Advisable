import React from "react";
import { Button, Link, Box } from "@advisable/donut";
import { Title, Description } from "../styles";
import TryAgainButton from "./TryAgainButton";

function CheapStatus() {
  return (
    <Box>
      <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
      <Description>
        Advisable only provides high-end talent. Since you&apos;re looking for
        cheap talent, we recommend{" "}
        <Link.External href="https://www.upwork.com/">Upwork.com</Link.External>
      </Description>
      <Box display="flex" flexDirection={["column", "row"]}>
        <Button
          as={Link.External}
          href="https://www.upwork.com/"
          width={[1, "auto"]}
          mb={2}
          mr={2}
        >
          Go To Upwork
        </Button>
        <TryAgainButton width={[1, "auto"]} />
      </Box>
    </Box>
  );
}

export default CheapStatus;
