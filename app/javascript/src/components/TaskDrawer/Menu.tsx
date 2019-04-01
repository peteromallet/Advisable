import * as React from "react";
import Menu from "../Menu";

interface Props {
  task: any;
  isClient: boolean;
}

export default (props: Props) => {
  return (
    <Menu>
      <Menu.Item icon="trash">
        Delete...
      </Menu.Item>
    </Menu>
  )
}