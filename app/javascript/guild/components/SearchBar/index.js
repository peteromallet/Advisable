import React, { useState } from "react";
import { InputGroupAddon, InputGroup } from "reactstrap";
import { Search } from "@guild/icons";
import { Box } from "@advisable/donut";
import { SearchButton, SearchInput } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ handleSubmitSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <Box ml={["0", "xl"]} width={["100%", "375px"]}>
      <InputGroup>
        <SearchInput
          value={query}
          onChange={({ currentTarget }) => setQuery(currentTarget.value)}
          placeholder={"Search Guild ..."}
        />
        <InputGroupAddon addonType="append">
          <SearchButton onClick={handleSubmitSearch}>
            <Search size={20} />
          </SearchButton>
        </InputGroupAddon>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
