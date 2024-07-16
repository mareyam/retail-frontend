import React, { useState } from "react";
import { FaCarBattery } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlinePointOfSale } from "react-icons/md";
import {
  Heading,
  HStack,
  Button,
  VStack,
  Box, 
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import useStateStore from "../zustand/store";
import CustomerTypeModal from "../Sale/CustomerTypeModal";

const Navbar = () => {
  const {
    selectedComponent,
    setSelectedComponent,
    setIsCustomerTypeModal,
    isCustomerTypeModal,
    isOpen,
    onOpen,
  } = useStateStore();

  const [user, setUser] = useState("Naveed");
  return (
    <>
      <HStack
        px="4"
        py="4"
        justifyContent="space-between"
        // bg="#4A4A4A"
        bg="#4682b4"
      >
             <Text pt='14'color="white">Date: {getCurrentDate()}</Text>


        <VStack>
          <Heading color="white" textAlign="left" w="full" fontSize="40">
            Exide Battery House
          </Heading>
          <Heading color="white" textAlign='center' w="full" fontSize="16" fontWeight="400">
            123 Steet X Cantt, Quetta{" "}
             </Heading>

        </VStack>

        {user ? (
          <VStack>
            <Button onClick={() => setUser(null)}>Logout</Button>
            <Text color="white" display={user ? "block" : "none"}>
              Welcome {user}
            </Text>
          </VStack>
        ) : (
          <VStack>
            <Button onClick={() => setUser("Maryam")}>Login</Button>
          </VStack>
        )}
      </HStack>
      {isOpen && <CustomerTypeModal />}
    </>
  );
};

export default Navbar;

const menuItems = [
  {
    name: "Battery Inventory",
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

const getCurrentDate = () => {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

const currentDate = getCurrentDate();
console.log(currentDate);
