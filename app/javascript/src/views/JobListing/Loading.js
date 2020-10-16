import { Card } from "@advisable/donut";
import { Layout, SkeletonText, SkeletonHeading } from "src/components";

let Loading = () => {
  return (
    <Layout>
      <Layout.Sidebar>
        <SkeletonHeading />
        <SkeletonText />
      </Layout.Sidebar>
      <Layout.Main>
        <Card padding="xl">
          <SkeletonHeading />
          <SkeletonText marginBottom="xl" />
          <SkeletonText marginBottom="xl" />
          <SkeletonText />
        </Card>
      </Layout.Main>
    </Layout>
  );
};

export default Loading;
