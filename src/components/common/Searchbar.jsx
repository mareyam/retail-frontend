import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup w="60">
      <InputLeftElement
        pointerEvents="none"
        children={<CiSearch color="gray.600" />}
      />
      <Input
        rounded="full"
        type="text"
        placeholder="Search..."
        border="1px solid #949494"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </InputGroup>
  );
};

export default Searchbar;
