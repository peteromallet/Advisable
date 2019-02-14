import * as React from "react";
import Link from "../../../components/Link";
import Container from "../../../components/Container";
import { useScreenSize } from "../../../utilities/screenSizes";
import { Card, Padding, Heading, Text } from "../../../components";
import illustration from "./illustration.png";

const ApplicationSent = ({ match }) => {
  const isMobile = useScreenSize("small");
  let { applicationId } = match.params;

  return (
    <Container size="s">
      <Card style={{ textAlign: "center" }}>
        <Padding size={isMobile ? "xl" : "xxl"}>
          <Padding bottom="l">
            <img
              alt=""
              src={illustration}
              style={{ width: "90%", maxWidth: "300px" }}
            />
          </Padding>
          <Padding bottom="s">
            <Heading>Application sent!</Heading>
          </Padding>
          <Padding bottom="m">
            <Text>
              Your application has been sent. We will let you know when you get
              a response.
            </Text>
          </Padding>

          <Padding bottom="m">
            <Text size="xs">
              In the meantime you can review and update your application.
            </Text>
          </Padding>

          <Link to={`/invites/${applicationId}/apply`}>Update Application</Link>
        </Padding>
      </Card>
    </Container>
  );
};

export default ApplicationSent;
