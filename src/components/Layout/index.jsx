import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Sidebar from '../SIdebar';
import Navbar from '../Navbar';
import useStateStore from '../zustand/store';
import Products from '../Products';
import Stats from '../Stats';
import Sale from '../Sale';
import Purchase from '../Purchase';
import Vendors from '../Vendors';
import Customer from '../Customer';
import LandingPage from '../LandingPage';
import Stock from '../Stock';
import AddNewInvoice from '../common/AddNewInvoice';

function App() {
  const { selectedComponent, setSelectedComponent } = useStateStore();
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Stock':
        return <Stock />;
      case 'invoice':
        return <AddNewInvoice />;
      case 'Products':
        return <Products />;
      case 'Sale':
        return <Sale />;
      case 'Purchase':
        return <Purchase />;
      case 'Report':
        return <Stats />;
      case 'Vendor':
        return <Vendors />;
      case 'Customers':
        return <Customer />;
      case 'LandingPage':
        return <LandingPage />;
      default:
        return <LandingPage />;
    }
  };
  return (
    <>
      <Flex height="100vh">
        <Box
          width="220px"
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
    </>
  );
}

export default App;
