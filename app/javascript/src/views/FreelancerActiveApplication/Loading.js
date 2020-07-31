// Renders the loading state for the FreelancerActiveApplication view.
import React from "react";
import { Card } from "@advisable/donut";
import Layout from "../../components/Layout";
import Divider from "../../components/Divider";
import Skeleton from "../../components/Skeleton";
import { Padding } from "../../components/Spacing";

export default function FreelancerActiveApplicationLoading() {
  return (
    <Layout>
      <Layout.Sidebar>Loading</Layout.Sidebar>
      <Layout.Main>
        <Card elevation={1}>
          <Padding size="m">
            <Skeleton style={{ width: "80%", height: 14 }} />
          </Padding>
          <Divider />
          <Padding size="m">
            <Skeleton style={{ width: "40%", height: 14 }} />
          </Padding>
          <Divider />
          <Padding size="m">
            <Skeleton style={{ width: "55%", height: 14 }} />
          </Padding>
          <Divider />
          <Padding size="m">
            <Skeleton style={{ width: "55%", height: 14 }} />
          </Padding>
        </Card>
      </Layout.Main>
    </Layout>
  );
}
