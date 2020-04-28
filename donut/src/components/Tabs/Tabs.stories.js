import React from "react";
import { List, CheckSquare } from "@styled-icons/feather";
import Tabs from "./";
import Card from "../Card";

export default {
  title: "Tabs",
};

export const tabs = () => {
  return (
    <Card mx="auto" p="xl" maxWidth={500}>
      <Tabs label="The tabs">
        <Tabs.Tab icon={<List />} title="Active Tasks">
          This is the active tasks section
        </Tabs.Tab>
        <Tabs.Tab icon={<CheckSquare />} title="Completed Tasks">
          This is the completed tasks section
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};
