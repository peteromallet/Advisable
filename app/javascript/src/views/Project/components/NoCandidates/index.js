import React from "react";
import Icon from "src/components/Icon";
import Text from "src/components/Text";
import Spacing from "src/components/Spacing";
import { Card } from "./styles";

export default ({ text }) => (
  <Card>
    <Spacing bottom="xl">
      <Icon icon="users" width={44} height={44} color="#DBE2EB" />
    </Spacing>
    <Text>{text}</Text>
  </Card>
);
