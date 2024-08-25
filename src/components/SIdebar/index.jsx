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
  chakra
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import CustomerTypeModal from '../Sale/CustomerTypeModal';
import { IoIosMenu } from 'react-icons/io';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { FaShop } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { GetCurrentDate, GetShortCurrentDate } from '../common/GetCurrentDate';
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
    onOpen, isCollapsed, setIsCollapsed

  } = useStateStore();

  return (
    <>
      <Box px="4" h="full">
        <Box
          transition='all 0.5s ease'
          mt={isCollapsed ? "12" : "0"}
          pr={isCollapsed ? "4" : "0"}

          w={isCollapsed ? "20" : "40"}
          h={isCollapsed ? "12" : "20"} onClick={() => setSelectedComponent('LandingPage')}>
          <Image src="/image.png" alt='landing page' />
        </Box>

        <VStack h="full" gap="8">
          <HStack

            mt={isCollapsed ? "8" : "14"} w="full" alignItems="center">
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
              fontWeight="400"
              display={isCollapsed ? "none" : "block"}
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

                  display={isCollapsed ? "none" : "block"}

                  onClick={() => {
                    setSelectedComponent(item.name);
                    if (item.name === 'Sale') {
                      onOpen();
                    }
                  }}
                  fontSize="16"
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
              {isCollapsed ? (
                <>{GetShortCurrentDate()}</>
              ) : (
                <>{`Date: ${GetCurrentDate()}`}</>

              )}
            </Text>



            {user ? (
              <VStack w="44" h="20" gap="0">
                <Button onClick={() => setUser(null)}>
                  <CiLogout />
                  &nbsp;
                  <chakra.span display={isCollapsed ? "none" : "block"}> Logout</chakra.span>
                </Button>
                <Flex align='center' flexDir={isCollapsed ? "column" : "row"}>
                  <Text color="white" >
                    Welcome &nbsp;
                  </Text>
                  <Text>{user}</Text>
                </Flex>


              </VStack>
            ) : (
              <VStack w="44" h="20">
                <Button
                  h='8'
                  onClick={() => setUser('Maryam')}>
                  <CiLogin />
                  &nbsp;

                  <chakra.span display={isCollapsed ? "none" : "block"}> Login</chakra.span>
                </Button>
              </VStack>
            )}
          </VStack>
        </VStack>
      </Box >
    </>
  );
};

export default Sidebar;

const menuItems = [
  {
    name: 'Customer',
    icon: <MdPeopleAlt />,
  },
  {
    name: 'Vendor',
    icon: <FaShop />,
  },
  {
    name: 'Inventory',
    icon: <FaTruck />,
  },
  {
    name: 'Product',
    icon: <FaCarBattery />,
  },
  {
    name: 'Product Sale',
    icon: <MdOutlinePointOfSale />,
  },
  {
    name: 'Received Cash',
    icon: <MdOutlinePointOfSale />,
  },

  {
    name: 'Report',
    icon: <IoStatsChartSharp />,
  },


  {
    name: 'All Sales',
    icon: <MdOutlinePointOfSale />,
  },

  // {
  //   name: 'Purchase',
  //   icon: <BiSolidPurchaseTagAlt />,
  // },
];
