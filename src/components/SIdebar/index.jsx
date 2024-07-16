import React from "react";
import { FaCarBattery } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlinePointOfSale } from "react-icons/md";
import {
  Heading,
  HStack,
  Image,
  Box,
  VStack,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import useStateStore from "../zustand/store";
import CustomerTypeModal from "../Sale/CustomerTypeModal";
import { IoIosMenu } from "react-icons/io";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";

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
      <VStack border="1px solid red">
        <Box w="40" h="20">
          <Image src="/image.png" />
        </Box>
      </VStack>

      <VStack h="full" pt="16" border="1px solid red">
        <HStack w="full" border="1px solid red">
          <IconButton
            aria-label={"name"}
            icon={<IoIosMenu />}
            color="white"
            fontSize="32"
            bg="transparent"
            _hover={{
              backgroundColor: "transparent",
            }}
          />
          <Text w="full" textAlign="flex-start" fontSize="28" fontWeight="500">
            Menu
          </Text>
        </HStack>


<VStack w='full' lineHeight='1' border='1px solid red'>
        {menuItems.map((item) => (
          <Flex
            lineHeight="1"
            w="full"
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
                if (item.name === "Sale") {
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
    name: "Stock",
    icon: <FaCarBattery />,
  },
  {
    name: "Sale",
    icon: <MdOutlinePointOfSale />,
  },
  {
    name: "Purchase",
    icon: <BiSolidPurchaseTagAlt />,
  },
  {
    name: "Report",
    icon: <IoStatsChartSharp />,
  },
];
