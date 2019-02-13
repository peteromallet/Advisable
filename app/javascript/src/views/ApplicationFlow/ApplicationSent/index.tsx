import * as React from "react";
import Container from "../../../components/Container";
import { useScreenSize } from "../../../utilities/screenSizes";
import { Card, Padding, Heading, Text } from "../../../components";
import illustration from "./illustration.png";

const ApplicationSent = ({ application }) => {
  const isMobile = useScreenSize("small");

  return (
    <Container size="s">
      <Card style={{ textAlign: 'center' }}>
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
          <Text>
            We have sent your application to{" "}
            {application.project.user.companyName} and we will let you know when
            they respond.
          </Text>
        </Padding>
      </Card>
    </Container>
  );
};

export default ApplicationSent;
