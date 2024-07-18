import React from 'react';
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
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import CustomerTypeModal from '../Sale/CustomerTypeModal';
import { IoIosMenu } from 'react-icons/io';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { FaShop } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';

const Sidebar = () => {
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
      <VStack>
        <Box w="40" h="20" onClick={() => setSelectedComponent('LandingPage')}>
          <Image src="/image.png" />
        </Box>
      </VStack>

      <VStack px="4" h="full" pt="16">
        <HStack w="full" alignItems="center">
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
          <Text w="full" textAlign="flex-start" fontSize="28" fontWeight="500">
            Menu
          </Text>
        </HStack>

        <VStack w="full" gap="0" pt="4">
          {menuItems.map((item, index) => (
            <Flex
              key={index}
              w="full"
              py="1"
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
      </VStack>
      {isOpen && <CustomerTypeModal />}
    </>
  );
};

export default Sidebar;

const menuItems = [
  {
    name: 'Stock',
    icon: <FaCarBattery />,
  },
  {
    name: 'Sale',
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
    name:'Vendor',
    icon:<FaShop/>
  },
  {
    name:'Customers',
    icon:<MdPeopleAlt/>
  }
];
