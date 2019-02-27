import * as React from "react";
import Text from "../../../components/Text";
import Card from "../../../components/Card";
import Styles from "../../../components/Styles";
import Padding from "../../../components/Spacing/Padding";
import illustration from "./illustration.png";

const Empty = () => {
  return (
    <Card>
      <Styles textAlign="center">
        <Padding size="xxl">
          <img src={illustration} alt="" width={300} />
          <Padding bottom="xs">
            <Text weight="semibold" colour="dark">
              You have not applied to any projects yet
            </Text>
          </Padding>
          <Styles maxWidth="450px" display="inline-block">
            <Text size="xs">
              Whenever relevant opportunities come up that match your skillset,
              we’ll reach out and give you the opportunity to fill out a
              tailored application that we present directly to clients.
            </Text>
          </Styles>
        </Padding>
      </Styles>
    </Card>
  );
};

export default Empty;
