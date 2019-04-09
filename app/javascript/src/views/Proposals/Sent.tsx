import * as React from "react";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Link from "../../components/Link";
import Heading from "../../components/Heading";
import { Padding } from "../../components/Spacing";
import illustration from "./illustration.png";

const Send = ({ application, booking }) => {
  const proposalUrl = `/applications/${application.airtableId}/proposals/${
    booking.airtableId
  }`;

  return (
    <Card>
      <Padding size="l" style={{ textAlign: "center" }}>
        <img src={illustration} width={280} alt="" />
        <Padding bottom="s">
          <Heading level={3}>Your proposal has been sent!</Heading>
        </Padding>
        <Padding bottom="l">
          <Text size="s" style={{ maxWidth: 380, margin: "0 auto" }}>
            Your proposal has been sent to{" "}
            {application.project.user.companyName}. Some text about what the
            freelancer should expect to happen next.
          </Text>
        </Padding>
        <Padding bottom="m">
          <Link to={proposalUrl}>Update proposal</Link>
        </Padding>
      </Padding>
    </Card>
  );
};

export default Send
