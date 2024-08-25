import React, { useState } from 'react';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
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
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const { selectedComponent, setSelectedComponent, isCollapsed, setIsCollapsed } = useStateStore();


  console.log(selectedComponent)
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
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
          width={isCollapsed ? "100px" : "220px"}
          bg="#4682b4"
          color="white"
          px="2"
          position="fixed"
          height="100vh"
          transition="all 0.5s ease"
        >
          <IconButton
            icon={<FaBars />}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            size="md"
            variant="ghost"
            color="white"
            _hover={{ bg: "transparent" }}
            position="absolute"
            top="20px"
            right='-20px'
          // right="-15px"
          />
          <Sidebar />
        </Box>

        <Box
          ml={isCollapsed ? "100px" : "220px"}
          width={isCollapsed ? "calc(100% - 100px)" : "calc(100% - 220px)"}
          height="full"
          align="center"
          transition="all 0.5s ease"

        >
          <Navbar />
          <Box w={{ base: "full", lg: "1000px", "2xl": "1100px" }}>
            {renderComponent()}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default App;
