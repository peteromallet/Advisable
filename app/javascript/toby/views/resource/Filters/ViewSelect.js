import React, { useMemo, useState } from "react";
import styled from "styled-components";
import queryString from "query-string";
import {
  Card,
  Box,
  Button,
  Text,
  Modal,
  Input,
  useModal,
  theme,
} from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { Table } from "@styled-icons/heroicons-solid/Table";
import { Home } from "@styled-icons/heroicons-solid/Home";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { ChevronDown } from "@styled-icons/heroicons-solid/ChevronDown";
import { PlusCircle } from "@styled-icons/heroicons-solid/PlusCircle";
import { useCreateView, useDeleteView, useRenameView } from "../../../queries";
import { useHistory, useLocation } from "react-router";

const StyledViewButton = styled.button`
  outline: none;
  font-size: 15px;
  appearance: none;
  background: white;
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 8px 0;
  color: ${theme.colors.neutral800};
  border: 1px solid ${theme.colors.neutral200};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    border: 1px solid ${theme.colors.neutral300};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 16px;
    margin: 0 8px;
    color: ${theme.colors.neutral400};
  }
`;

const StyledView = styled.div`
  display: flex;
  cursor: default;
  font-size: 16px;
  padding: 8px 12px;
  align-items: center;
  letter-spacing: -0.01rem;

  svg {
    width: 20px;
    margin-right: 8px;
    color: ${theme.colors.neutral500};
  }

  &:hover {
    background-color: ${theme.colors.neutral50};
  }
`;

const StyledNewView = styled(StyledView)`
  color: ${theme.colors.neutral500};

  svg {
    color: ${theme.colors.neutral300};
  }

  &:hover {
    color: ${theme.colors.neutral700};

    svg {
      color: ${theme.colors.neutral400};
    }
  }
`;

const StyledHeader = styled.div`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02rem;
  padding: 12px 0 8px 12px;
  text-transform: uppercase;
  color: ${theme.colors.neutral500};
`;

function DeleteView({ resource, view, onDelete }) {
  const modal = useModal();
  const [deleteView, { loading }] = useDeleteView(resource.type, view);

  const handleDelete = async () => {
    await deleteView();
    onDelete();
  };

  return (
    <>
      <Modal modal={modal}>
        <Text fontSize="3xl" mb={4}>
          Are you sure you want to delete this view
        </Text>
        <Button loading={loading} variant="dark" onClick={handleDelete}>
          Confirm
        </Button>
        <Button disabled={loading} onClick={modal.hide} variant="subtle">
          Cancel
        </Button>
      </Modal>
      <StyledViewButton onClick={modal.show}>
        <Trash />
      </StyledViewButton>
    </>
  );
}

function RenameView({ view }) {
  const modal = useModal();
  const [value, setValue] = useState(view?.name || "");
  const [renameView, { loading }] = useRenameView();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await renameView({
      variables: { id: view.id, name: value },
    });
    modal.hide();
  };

  return (
    <>
      <Modal modal={modal}>
        <Text fontSize="3xl" mb={4}>
          Rename view
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
          <Button loading={loading} variant="dark">
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
      <StyledViewButton onClick={modal.show}>
        <Pencil />
      </StyledViewButton>
    </>
  );
}

function CreateView({ resource, onCreate, filters }) {
  const modal = useModal();
  const [value, setValue] = useState("");
  const [createView, { loading }] = useCreateView(resource.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createView({
      variables: {
        name: value,
        resource: resource.type,
        filters,
      },
    });
    onCreate(response);
    modal.hide();
  };

  return (
    <>
      <Modal modal={modal}>
        <Text fontSize="3xl" mb={4}>
          Create a new view
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
          <Button loading={loading} variant="dark">
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
      <StyledNewView onClick={modal.show}>
        <PlusCircle />
        Create a view
      </StyledNewView>
    </>
  );
}

export default function ViewSelect({ views, resource, filters }) {
  const popover = usePopoverState({ placement: "bottom-start" });
  const history = useHistory();
  const location = useLocation();

  const currentView = useMemo(() => {
    const { view } = queryString.parse(location.search);
    return views.find((v) => v.id === view);
  }, [location.search, views]);

  const handleCreateNewView = async (response) => {
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
    <Box display="flex" justifyContent="space-between">
      <PopoverDisclosure {...popover}>
        {(disclosure) => (
          <StyledViewButton {...disclosure}>
            {currentView ? <Table /> : <Home />}
            {currentView?.name || "Main View"}
            <ChevronDown />
          </StyledViewButton>
        )}
      </PopoverDisclosure>
      <Popover
        {...popover}
        aria-label="Welcome"
        style={{ zIndex: 999, outline: "none" }}
      >
        <Card
          minWidth="280px"
          paddingBottom={2}
          borderRadius="12px"
          overflow="hidden"
        >
          <StyledHeader>Views</StyledHeader>
          <StyledView onClick={openMainView}>
            <Home />
            Main view
          </StyledView>
          {views.map((view) => (
            <StyledView key={view.id} onClick={() => openView(view.id)}>
              <Table />
              {view.name}
            </StyledView>
          ))}
          <CreateView
            resource={resource}
            onCreate={handleCreateNewView}
            filters={filters}
          />
        </Card>
      </Popover>
      <Box>
        {currentView && (
          <>
            <Box display="inline" mr={2}>
              <RenameView view={currentView} />
            </Box>
            <DeleteView
              resource={resource}
              view={currentView}
              onDelete={openMainView}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
