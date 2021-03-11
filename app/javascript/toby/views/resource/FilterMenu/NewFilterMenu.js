import React from "react";
import { Card, Button } from "@advisable/donut";
import NewFilterSelection from "./NewFilterSelection";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

export default function NewFilterMenu({ resource, onFinalize }) {
  const menu = usePopoverState({ placement: "bottom-start" });

  const handleNewFilter = (filter) => {
    onFinalize(filter);
    menu.hide();
  };

  return (
    <>
      <PopoverDisclosure {...menu}>
        {(disclosure) => (
          <Button size="s" variant="subtle" {...disclosure}>
            Add filter
          </Button>
        )}
      </PopoverDisclosure>
      <Popover {...menu} style={{ outline: "none" }}>
        <Card
          borderRadius="12px"
          minWidth="320px"
          css={`
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
          `}
        >
          <NewFilterSelection
            resource={resource}
            onFinalize={handleNewFilter}
          />
        </Card>
      </Popover>
    </>
  );
}
