import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import { Button, Card } from "@advisable/donut";
import { DotsHorizontal } from "@styled-icons/heroicons-solid";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";
import Loader from "src/components/Loader";
import { useNotifications } from "src/components/Notifications";
import { useSchema } from "../../../components/schema";
import { generateActionMutation } from "../../../utilities";

function Action({ action, mutation, record, menu, ...props }) {
  const { notify } = useNotifications();
  const [trigger, { loading }] = useMutation(mutation);

  const handle = async () => {
    await trigger({
      variables: {
        id: record.id,
        name: action.name,
      },
    });
    menu.hide();
    notify(`Action ran successfully`);
  };

  return (
    <MenuItem {...props} as={Button} variant="dark" size="s" onClick={handle}>
      {loading && <Loader size="sm" />}
      {action.label}
    </MenuItem>
  );
}

export default function ActionsMenu({ resource, record }) {
  const menu = useMenuState();
  const schemaData = useSchema();
  const mutation = useMemo(() => {
    return generateActionMutation(schemaData, resource);
  }, [schemaData, resource]);

  if (record._actions.length === 0) return null;

  return (
    <>
      <MenuButton marginBottom={6} as={Button} variant="subtle" {...menu}>
        <DotsHorizontal />
      </MenuButton>
      <Menu {...menu} aria-label="Actions">
        <Card padding={4}>
          {record._actions.map((action) => (
            <Action
              key={action.name}
              action={action}
              record={record}
              menu={menu}
              mutation={mutation}
              {...menu}
            />
          ))}
        </Card>
      </Menu>
    </>
  );
}
