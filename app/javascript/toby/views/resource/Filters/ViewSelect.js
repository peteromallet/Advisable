import React, { useMemo } from "react";
import queryString from "query-string";
import { Card } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { useCreateView } from "../../../queries";
import { useHistory, useLocation } from "react-router";

export default function ViewSelect({ views, resource }) {
  const popover = usePopoverState({ placement: "bottom-start" });
  const history = useHistory();
  const location = useLocation();
  const [createView, createViewState] = useCreateView(resource.type);

  const currentView = useMemo(() => {
    const { view } = queryString.parse(location.search);
    return views.find((v) => v.id === view);
  }, [location.search, views]);

  const handleCreateNewView = async () => {
    const response = await createView();
    const view = response.data.createTobyView.view;
    openView(view.id);
  };

  const openView = (id) => {
    history.push({
      ...location,
      search: `?view=${id}`,
    });
    popover.hide();
  };

  const openMainView = () => {
    history.push({
      ...location,
      search: null,
    });
    popover.hide();
  };

  return (
    <>
      <PopoverDisclosure {...popover}>
        {currentView?.name || "Main View"}
      </PopoverDisclosure>
      <Popover {...popover} aria-label="Welcome" style={{ zIndex: 999 }}>
        <Card padding={4}>
          <div onClick={openMainView}>Main view</div>
          {views.map((view) => (
            <div key={view.id} onClick={() => openView(view.id)}>
              {view.name} ({view.filters.length})
            </div>
          ))}
          <button
            onClick={handleCreateNewView}
            disabled={createViewState.loading}
          >
            + Create a view
          </button>
        </Card>
      </Popover>
    </>
  );
}
