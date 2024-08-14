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
import AddNewInvoice from '../Stock/AddNewInvoice';
import ReceiptComponent from '../Receipt';
import AllSales from '../AllSales';
import ReceivedCash from '../ReceivedCash';

function App() {
  const { selectedComponent, setSelectedComponent } = useStateStore();
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Inventory':
        return <Stock />;
      case 'invoice':
        return <AddNewInvoice />;
      case 'Product':
        return <Products />;
      case 'Product Sale':
        return <Sale />;
      case 'Purchase':
        return <Purchase />;
      case 'Report':
        return <Stats />;
      case 'Vendor':
        return <Vendors />;
      case 'Customer':
        return <Customer />;
      case 'LandingPage':
        return <LandingPage />;
      case 'Receipt':
        return <ReceiptComponent />;
      case 'All Sales':
        return <AllSales />;
      case 'Received Cash':
        return <ReceivedCash />;
      default:
        return <LandingPage />;
    }
  };
  return (
    <>
      <Flex height="100vh" bgColor="#F0FFF4">
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

        <Box ml="220px" width="calc(100% - 220px)" height="full"
          align='center'
        >
          <Navbar />
          <Box
            w={{ base: "full", lg: "1000px", "2xl": "1100px" }}
          >{renderComponent()}</Box>
        </Box>
      </Flex>
    </>
  );
}

export default App;
