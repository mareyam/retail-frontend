import React, { useState } from 'react';
import { FaCarBattery } from 'react-icons/fa';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdOutlinePointOfSale } from 'react-icons/md';
import {
  Heading,
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import CustomerTypeModal from '../Sale/CustomerTypeModal';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import GetCurrentDate from '../common/GetCurrentDate';

const Navbar = () => {
  const {
    selectedComponent,
    setSelectedComponent,
    setIsCustomerTypeModal,
    isCustomerTypeModal,
    isOpen,
    onOpen,
  } = useStateStore();

  const [user, setUser] = useState('Naveed');
  return (
    <>
      <HStack
        px="4"
        py="4"
        justifyContent="space-between"
        // bg="#4A4A4A"
        bg="#4682b4"
      >
        {/* <Text pt="14" color="white">
          Date: <GetCurrentDate />
        </Text> */}

        <VStack>
          <Heading color="white" textAlign="left" w="full" fontSize="40">
            AGS Battery House
          </Heading>
          <Heading
            color="white"
            textAlign="center"
            w="full"
            fontSize="16"
            fontWeight="400"
          >
            123 Steet X Cantt, Quetta{' '}
          </Heading>
        </VStack>

        <Heading
          color="white"
          display={selectedComponent == 'LandingPage' ? 'none' : 'block'}
        >{selectedComponent}</Heading>

        {/* {user ? (
          <VStack w="44" h="20" pt="2">
            <Button onClick={() => setUser(null)}>
              <CiLogout />
              &nbsp; Logout
            </Button>
            <Text color="white" display={user ? 'block' : 'none'}>
              Welcome {user}
            </Text>
          </VStack>
        ) : (
          <VStack w="44" h="20" pt="2">
            <Button onClick={() => setUser('Maryam')}>
              <CiLogin />
              &nbsp; Login
            </Button>
          </VStack>
        )} */}
      </HStack>
    </>
  );
};

export default Navbar;
