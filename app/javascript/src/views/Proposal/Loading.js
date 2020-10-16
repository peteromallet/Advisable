import { Box, Card } from "@advisable/donut";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import SkeletonText from "../../components/SkeletonText";
import SkeletonHeading from "../../components/SkeletonHeading";

export default function LoadingProposal() {
  return (
    <>
      <Header />
      <Layout>
        <Layout.Sidebar>
          <Box paddingBottom="m">
            <SkeletonHeading />
          </Box>
          <SkeletonText />
        </Layout.Sidebar>
        <Layout.Main>
          <Card>
            <Box padding="xl">
              <Loading />
            </Box>
          </Card>
        </Layout.Main>
      </Layout>
    </>
  );
}
