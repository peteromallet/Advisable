import React from "react";
import { Search } from "@styled-icons/feather";
import StyledSearchingIndicator from "./styles";

const SearchingIndicator = () => {
  return (
    <StyledSearchingIndicator>
      <Search size={24} strokeWidth={2} />
    </StyledSearchingIndicator>
  );
};

export default SearchingIndicator;
