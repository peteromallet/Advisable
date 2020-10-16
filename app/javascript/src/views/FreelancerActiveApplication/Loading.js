// Renders the loading state for the FreelancerActiveApplication view.
import { Box, Card } from "@advisable/donut";
import Layout from "../../components/Layout";
import Divider from "../../components/Divider";
import Skeleton from "../../components/Skeleton";

export default function FreelancerActiveApplicationLoading() {
  return (
    <Layout>
      <Layout.Sidebar>Loading</Layout.Sidebar>
      <Layout.Main>
        <Card elevation={1}>
          <Box padding="m">
            <Skeleton style={{ width: "80%", height: 14 }} />
          </Box>
          <Divider />
          <Box padding="m">
            <Skeleton style={{ width: "40%", height: 14 }} />
          </Box>
          <Divider />
          <Box padding="m">
            <Skeleton style={{ width: "55%", height: 14 }} />
          </Box>
          <Divider />
          <Box padding="m">
            <Skeleton style={{ width: "55%", height: 14 }} />
          </Box>
        </Card>
      </Layout.Main>
    </Layout>
  );
}
