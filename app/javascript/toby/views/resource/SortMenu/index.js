import React from "react";
import styled from "styled-components";
import { useMenuState, Menu, MenuButton } from "reakit/Menu";
import { SwitchVertical } from "@styled-icons/heroicons-solid/SwitchVertical";
import HeaderButton from "../../../components/HeaderButton";
import { Select, Text } from "@advisable/donut";

const StyledDropdown = styled.div`
  width: 280px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
`;

export default function SortMenu({
  resource,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  const menu = useMenuState();
  const sortable = resource.attributes.filter((attr) => attr.sortable);

  return (
    <>
      <HeaderButton {...menu} as={MenuButton} icon={SwitchVertical}>
        Sort
      </HeaderButton>
      <StyledDropdown as={Menu} {...menu}>
        {sortable.length > 0 ? (
          <>
            <Select
              size="sm"
              marginBottom={2}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortable.map((attr) => (
                <option key={attr.columnName} value={attr.columnName}>
                  {attr.columnLabel}
                </option>
              ))}
            </Select>
            <Select
              size="sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </Select>
          </>
        ) : (
          <Text size="xs">
            There are no sortable attributes for this resource.
          </Text>
        )}
      </StyledDropdown>
    </>
  );
}
