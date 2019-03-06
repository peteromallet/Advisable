import * as React from "react";
import Text from "../../../components/Text";
import Card from "../../../components/Card";
import Link from "../../../components/Link";
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
            <Padding bottom="xl">
              <Text size="xs">
                Whenever relevant opportunities come up that match your
                skillset, we’ll reach out and give you the opportunity to fill
                out a tailored application that we present directly to clients.
              </Text>
            </Padding>
            <Text weight="semibold" colour="dark" size="xs">
              What more projects from Advisable?
            </Text>
            <Padding bottom="s">
              <Text size="xs">
                Request an invitation to be a featured freelancer.
              </Text>
            </Padding>
            <Text size="xs">
              <Link href="mailto:hello@advisable.com?subject=Featured Freelancer Request">
                Become a featured freelancer
              </Link>
            </Text>
          </Styles>
        </Padding>
      </Styles>
    </Card>
  );
};

export default Empty;
