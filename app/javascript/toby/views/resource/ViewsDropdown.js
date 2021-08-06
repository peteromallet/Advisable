import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { DialogDisclosure } from "reakit/Dialog";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { DotsVertical } from "@styled-icons/heroicons-solid/DotsVertical";
import { theme, useModal, Modal, Text, Input, Button } from "@advisable/donut";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";
import queryString from "query-string";
import { Table } from "@styled-icons/heroicons-solid/Table";
import { PlusCircle } from "@styled-icons/heroicons-solid/PlusCircle";
import HeaderButton, {
  StyledHeaderButtonGroup,
} from "../../components/HeaderButton";
import { useHistory, useLocation } from "react-router-dom";
import { useCreateView, useDeleteView, useRenameView } from "../../queries";

const StyledDropdown = styled.div`
  width: 280px;
  padding: 4px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
`;

const StyledMenuItem = styled.button`
  width: 100%;
  border: none;
  height: 32px;
  display: flex;
  font-size: 15px;
  appearance: none;
  text-align: left;
  background: white;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 4px;

  svg {
    margin-right: 4px;
    color: ${theme.colors.neutral500};
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${theme.colors.neutral100};
  }

  &[data-active="true"] {
    background: ${theme.colors.blue100};
  }
`;

const CreateView = React.forwardRef(function CreateViewModal(
  { resource, onCreate, filters, ...props },
  ref,
) {
  const modal = useModal();
  const [value, setValue] = useState("");
  const [createView, { loading }] = useCreateView(resource.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length === 0) return;
    const response = await createView({
      variables: {
        name: value,
        resource: resource.type,
        filters,
      },
    });
    onCreate(response);
    setValue("");
    modal.hide();
  };

  return (
    <>
      <Modal modal={modal} label="Create a new view">
        <Text fontSize="4xl" fontWeight={600} mb={4} letterSpacing="-0.02rem">
          Create a new view
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
          <Button loading={loading} variant="dark" marginRight={2}>
            Confirm
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={modal.hide}
            variant="subtle"
          >
            Cancel
          </Button>
        </form>
      </Modal>
      <StyledMenuItem as={DialogDisclosure} ref={ref} {...modal} {...props}>
        <PlusCircle size={20} /> Create view
      </StyledMenuItem>
    </>
  );
});

const DeleteView = React.forwardRef(function DeleteView(
  { resource, view, ...props },
  ref,
) {
  const modal = useModal();
  const [deleteView, { loading }] = useDeleteView(resource, view);

  return (
    <>
      <StyledMenuItem as={DialogDisclosure} ref={ref} {...modal} {...props}>
        <Trash size={20} />
        Delete view
      </StyledMenuItem>
      <Modal modal={modal}>
        <Text fontSize="4xl" fontWeight={600} mb={2} letterSpacing="-0.02rem">
          Are you sure?
        </Text>
        <Text marginBottom={6}>This can not be undone.</Text>
        <Button marginRight={2} loading={loading} onClick={deleteView}>
          Delete View
        </Button>
        <Button variant="subtle" onClick={modal.hide}>
          Cancel
        </Button>
      </Modal>
    </>
  );
});

function RenameViewForm({ view, modal }) {
  const [value, setValue] = useState(view.name);
  const [renameView, { loading }] = useRenameView();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length === 0) return;
    await renameView({
      variables: {
        id: view.id,
        name: value,
      },
    });

    modal.hide();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text fontSize="4xl" fontWeight={600} mb={2} letterSpacing="-0.02rem">
        Rename view
      </Text>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        marginBottom={8}
      />
      <Button loading={loading} variant="dark" marginRight={2}>
        Save
      </Button>
      <Button
        type="button"
        disabled={loading}
        onClick={modal.hide}
        variant="subtle"
      >
        Cancel
      </Button>
    </form>
  );
}

const RenameView = React.forwardRef(function RenameView(
  { view, ...props },
  ref,
) {
  const modal = useModal();

  return (
    <>
      <StyledMenuItem as={DialogDisclosure} ref={ref} {...modal} {...props}>
        <Pencil size={20} />
        Rename view
      </StyledMenuItem>
      <Modal modal={modal}>
        <RenameViewForm view={view} modal={modal} />
      </Modal>
    </>
  );
});

function ViewOptions({ resource, view }) {
  const menu = useMenuState();

  return (
    <>
      <StyledDropdown as={Menu} {...menu} aria-label="Views">
        <MenuItem {...menu} as={RenameView} view={view} />
        <MenuItem {...menu} as={DeleteView} resource={resource} view={view} />
      </StyledDropdown>
      <HeaderButton icon={DotsVertical} {...menu} as={MenuButton} />
    </>
  );
}

export default function ViewsDropdown({ views, resource, filters }) {
  const history = useHistory();
  const location = useLocation();
  const menu = useMenuState();

  const currentView = useMemo(() => {
    const { view } = queryString.parse(location.search);
    return views.find((v) => v.id === view);
  }, [location.search, views]);

  const openMainView = () => {
    menu.hide();
    history.push({
      ...location,
      search: null,
    });
  };

  const openView = (id) => {
    menu.hide();
    history.push({
      ...location,
      search: `?view=${id}`,
    });
  };

  const handleCreateNewView = async (response) => {
    const view = response.data.createTobyView.view;
    openView(view.id);
  };

  return (
    <>
      <StyledHeaderButtonGroup>
        <HeaderButton {...menu} as={MenuButton} icon={Table}>
          {currentView?.name || "Main View"}
        </HeaderButton>
        {currentView && <ViewOptions resource={resource} view={currentView} />}
      </StyledHeaderButtonGroup>
      <StyledDropdown as={Menu} {...menu} aria-label="Views">
        <StyledMenuItem
          as={MenuItem}
          {...menu}
          onClick={openMainView}
          data-active={!currentView}
        >
          <Table size={20} />
          Main view
        </StyledMenuItem>
        {views.map((view) => (
          <StyledMenuItem
            {...menu}
            as={MenuItem}
            key={view.id}
            onClick={() => openView(view.id)}
            data-active={currentView?.id === view.id}
          >
            <Table size={20} />
            {view.name}
          </StyledMenuItem>
        ))}
        <MenuItem
          {...menu}
          as={CreateView}
          resource={resource}
          filters={filters}
          onCreate={handleCreateNewView}
        />
      </StyledDropdown>
    </>
  );
}
