import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import { Button, Card } from "@advisable/donut";
import { DotsHorizontal } from "@styled-icons/heroicons-solid";
import { useNavigate } from "react-router-dom";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";
import Loader from "src/components/Loader";
import { useNotifications } from "src/components/Notifications";
import { generateActionMutation } from "../../../utilities";
import { useToby } from "../../../components/TobyProvider";

function Action({ action, mutation, record, menu, ...props }) {
  const navigate = useNavigate();
  const { notify, error: notifyError } = useNotifications();
  const [trigger, { loading }] = useMutation(mutation);

  const handle = async () => {
    const response = await trigger({
      variables: {
        id: record.id,
        name: action.name,
      },
    });

    const { url, replace, error } = response.data.action;

    if (error) {
      notifyError(error);
      return;
    }

    menu.hide();
    notify(`Action ran successfully`);

    if (url) {
      window.open(url, "_blank").focus();
    }

    if (replace) {
      navigate(replace, { replace: true })
    }
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
  const toby = useToby();
  const mutation = useMemo(() => {
    return generateActionMutation(toby, resource);
  }, [toby, resource]);

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
