import React, { useState } from 'react';
import { FaCarBattery } from 'react-icons/fa';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdOutlinePointOfSale } from 'react-icons/md';
import {
  Heading,
  HStack,
  Image,
  Box,
  VStack,
  Flex,
  IconButton,
  Text,
  Button,
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import CustomerTypeModal from '../Sale/CustomerTypeModal';
import { IoIosMenu } from 'react-icons/io';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { FaShop } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import GetCurrentDate from '../common/GetCurrentDate';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';

const Sidebar = () => {
  const [user, setUser] = useState('Naveed');

  const {
    selectedComponent,
    setSelectedComponent,
    setIsCustomerTypeModal,
    isCustomerTypeModal,
    isOpen,
    onOpen,
  } = useStateStore();

  return (
    <>
      <Box px="4" h="full">
        <Box w="40" h="20" onClick={() => setSelectedComponent('LandingPage')}>
          <Image src="/image.png" alt='landing page' />
        </Box>

        <VStack h="full" gap="8">
          <HStack mt="14" w="full" alignItems="center">
            <IconButton
              pt="1"
              aria-label={'name'}
              icon={<IoIosMenu />}
              color="white"
              fontSize="32"
              bg="transparent"
              _hover={{
                backgroundColor: 'transparent',
              }}
            />
            <Text
              w="full"
              textAlign="flex-start"
              fontSize="28"
              fontWeight="700"
            >
              Menu
            </Text>
          </HStack>

          <VStack
            w="full"
            gap="0"
            h="45dvh"
            overflow="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
                borderRadius: '10px',
              },
              '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'white',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {menuItems.map((item, index) => (
              <Flex
                key={index}
                w="full"
                py="0.5"
                alignItems="center"
                cursor="pointer"
                _hover={{
                  textDecor: 'underline',
                }}
              >
                <IconButton
                  aria-label={item.name}
                  icon={item.icon}
                  color="white"
                  fontSize="20"
                  bg="transparent"
                  _hover={{
                    backgroundColor: 'transparent',
                  }}
                />
                <Text
                  onClick={() => {
                    setSelectedComponent(item.name);
                    if (item.name === 'Sale') {
                      onOpen();
                    }
                  }}
                  fontSize="18"
                >
                  {item.name}
                </Text>
              </Flex>
            ))}
          </VStack>

          {/* <VStack w="full" gap="0"
            h='50dvh'
            overflow='auto'
            border='1px solid red'

          >
            {menuItems.map((item, index) => (
              <Flex
                key={index}
                w="full"
                py="0.5"
                alignItems="center"
                cursor="pointer"
                _hover={{
                  textDecor: 'underline',
                }}
              >
                <IconButton
                  aria-label={item.name}
                  icon={item.icon}
                  color="white"
                  fontSize="20"
                  bg="transparent"
                  _hover={{
                    backgroundColor: 'transparent',
                  }}
                />
                <Text
                  onClick={() => {
                    setSelectedComponent(item.name);
                    if (item.name === 'Sale') {
                      onOpen();
                    }
                  }}
                  fontSize="18"
                >
                  {item.name}
                </Text>
              </Flex>
            ))}
          </VStack> */}

          <VStack>
            <Text color="white">
              Date: <GetCurrentDate />
            </Text>

            {user ? (
              <VStack w="44" h="20" pt="2" gap="0">
                <Button onClick={() => setUser(null)}>
                  <CiLogout />
                  &nbsp; Logout
                </Button>
                <Text color="white" display={user ? 'block' : 'none'}>
                  Welcome {user}
                </Text>
              </VStack>
            ) : (
              <VStack w="44" h="20">
                <Button onClick={() => setUser('Maryam')}>
                  <CiLogin />
                  &nbsp; Login
                </Button>
              </VStack>
            )}
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;

const menuItems = [
  {
    name: 'Inventory',
    icon: <FaTruck />,
  },
  {
    name: 'Products',
    icon: <FaCarBattery />,
  },
  {
    name: 'Product Sale',
    icon: <MdOutlinePointOfSale />,
  },
  {
    name: 'Purchase',
    icon: <BiSolidPurchaseTagAlt />,
  },
  {
    name: 'Report',
    icon: <IoStatsChartSharp />,
  },
  {
    name: 'Vendor',
    icon: <FaShop />,
  },
  {
    name: 'Customers',
    icon: <MdPeopleAlt />,
  },
  {
    name: 'All Sales',
    icon: <MdOutlinePointOfSale />,
  },
];
