import React from "react";
import { Layout, SkeletonText, SkeletonHeading, Card } from "src/components";

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
