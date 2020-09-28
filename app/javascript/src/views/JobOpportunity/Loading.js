import React from "react";
import { Card } from "@advisable/donut";
import { Layout, SkeletonText, SkeletonHeading } from "src/components";

let Loading = () => {
  return (
    <Layout>
      <Layout.Sidebar>
        <SkeletonHeading mb="xl" />
        <SkeletonText />
      </Layout.Sidebar>
      <Layout.Main>
        <Card padding="xl">
          <SkeletonHeading mb="xl" />
          <SkeletonText mb="xl" />
          <SkeletonText mb="xl" />
          <SkeletonText mb="xl" />
        </Card>
      </Layout.Main>
    </Layout>
  );
};

export default Loading;
