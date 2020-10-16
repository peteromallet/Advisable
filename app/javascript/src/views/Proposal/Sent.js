import Text from "../../components/Text";
import { Box, Card } from "@advisable/donut";
import Link from "../../components/Link";
import Heading from "../../components/Heading";
import illustration from "./illustration.png";

const Send = ({ application }) => {
  const proposalUrl = `/applications/${application.airtableId}/proposal`;

  return (
    <Card>
      <Box padding="l" style={{ textAlign: "center" }}>
        <img src={illustration} width={280} alt="" />
        <Box paddingBottom="s">
          <Heading level={3}>Your proposal has been sent!</Heading>
        </Box>
        <Box paddingBottom="l">
          <Text size="s" style={{ maxWidth: 380, margin: "0 auto" }}>
            Your proposal has been sent to{" "}
            {application.project.user.companyName}. We&apos;ll try to get a
            response from them ASAP.
          </Text>
        </Box>
        <Box paddingBottom="m">
          <Link to={proposalUrl}>Update proposal</Link>
        </Box>
      </Box>
    </Card>
  );
};

export default Send;
