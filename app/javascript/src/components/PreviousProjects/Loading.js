import React from "react";
import Card from "src/components/Card";
import SkeletonText from "src/components/SkeletonText";
import SkeletonHeading from "src/components/SkeletonHeading";

export default () => {
  return (
    <React.Fragment>
      <Card marginBottom="m" padding="xl">
        <SkeletonHeading />
        <SkeletonText />
      </Card>
      <Card marginBottom="m" padding="xl">
        <SkeletonHeading />
        <SkeletonText />
      </Card>
    </React.Fragment>
  );
};
