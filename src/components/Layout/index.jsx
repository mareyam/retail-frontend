import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Sidebar from '../SIdebar';
import Navbar from '../Navbar';
import useStateStore from '../zustand/store';
import AllBatteries from '../AllBatteries';
import Stats from '../Stats';
import Sale from '../Sale';
import Purchase from '../Purchase';

function App() {
  const { selectedComponent, setSelectedComponent } = useStateStore();
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Stock':
        return <AllBatteries />;
      case 'Sale':
        return <Sale />;
      case 'Purchase':
        return <Purchase />;
      case 'Report':
        return <Stats />;
      default:
        return <AllBatteries />;
    }
  };
  return (
    <Flex height="100vh">
      <Box
        width="220px"
        // bg='#55565B'
        // bg='#393a3f'
        // bg="#F6E05E"
        bg="#4682b4"
        color="white"
        px="2"
        position="fixed"
        height="100vh"
      >
        <Sidebar />
      </Box>

      <Box ml="220px" width="calc(100% - 220px)" height="full">
        <Navbar />
        <Box>{renderComponent()}</Box>
      </Box>
    </Flex>
  );
}

export default App;
