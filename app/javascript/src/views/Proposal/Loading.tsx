import * as React from "react";
import { Card } from "@advisable/donut";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { Padding } from "../../components/Spacing";
import SkeletonText from "../../components/SkeletonText";
import SkeletonHeading from "../../components/SkeletonHeading";

export default function LoadingProposal() {
  return (
    <>
      <Header />
      <Layout>
        <Layout.Sidebar>
          <Padding bottom="m">
            <SkeletonHeading />
          </Padding>
          <SkeletonText />
        </Layout.Sidebar>
        <Layout.Main>
          <Card>
            <Padding size="xl">
              <Loading />
            </Padding>
          </Card>
        </Layout.Main>
      </Layout>
    </>
  );
}
