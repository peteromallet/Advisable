import React from "react";
import Text from "src/components/Text";
import illustration from "./illustration.png";
import { Centered } from "./styles";

const MoreTimesRequested = ({ clientName }) => (
  <Centered>
    <img width={250} src={illustration} alt="" />
    <Text>
      We have requested more times from {clientName} and will let you know when
      they respond.
    </Text>
  </Centered>
);

export default MoreTimesRequested;
