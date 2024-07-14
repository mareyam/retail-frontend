import React from "react";
import { FaCarBattery } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlinePointOfSale } from "react-icons/md";
import { Heading, VStack, Flex, IconButton, Text } from "@chakra-ui/react";
import useStateStore from "../zustand/store";
import CustomerTypeModal from "../Sale/CustomerTypeModal";

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
      <VStack alignItems="left">
        <Heading>Brand Logo</Heading>
        <VStack align="flex-start" mt="8">
          {menuItems.map((item) => (
            <Flex
              py="4"
              alignItems="center"
              cursor="pointer"
              _hover={{
                textDecor: "underline",
              }}
            >
              <IconButton
                aria-label={item.name}
                icon={item.icon}
                color="white"
                fontSize="20"
                bg="transparent"
                _hover={{
                  backgroundColor: "transparent",
                }}
              />
              <Text
                onClick={() => {
                  setSelectedComponent(item.name);
                  onOpen(item.name == "Sale" ? true : false);
                  // setIsCustomerTypeModal(item.name == "Sale" ? true : false);
                }}
                fontSize="20"
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
    name: "All Batteries",
    icon: <FaCarBattery />,
  },
  {
    name: "Sale",
    icon: <MdOutlinePointOfSale />,
  },
  {
    name: "Stats",
    icon: <IoStatsChartSharp />,
  },
];
