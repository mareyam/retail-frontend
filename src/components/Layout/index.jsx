import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../SIdebar";
import useStateStore from "../zustand/store";
import AllBatteries from "../AllBatteries";
import Stats from "../Stats";
import Sale from "../Sale";

function App() {
  const { selectedComponent, setSelectedComponent } = useStateStore();
  const renderComponent = () => {
    switch (selectedComponent) {
      case "All Batteries":
        return <AllBatteries />;
      case "Sale":
        return <Sale />;
      case "Stats":
        return <Stats />;
      default:
        return <AllBatteries />;
    }
  };
  return (
    <Flex height="100vh">
      <Box
        width="250px"
        bg="teal.500"
        color="white"
        p="4"
        position="fixed"
        height="100vh"
      >
        <Sidebar />
      </Box>

      <Box ml="250px" p="4" width="calc(100% - 250px)" height="full">
        <Box>{renderComponent()}</Box>
      </Box>
    </Flex>
  );
}

export default App;
