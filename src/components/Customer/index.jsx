import useStateStore from '../zustand/store';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  HStack,
  Flex,
  Box,
  chakra,
  Button,
  VStack,
  Heading,
  IconButton, 
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import AddNewCustomer from './AddNewCustomer';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';


const ITEMS_PER_PAGE = 6;
const Customer = () => {
  const { customerType, cart, addToCart, removeFromCart, customers, setCustomers } = useStateStore();
  console.log(customerType);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBatteryData, setFilteredBatteryData] = useState(batteryData);
  const [battery, setBattery] = useState();
  const [refresh, setRefresh] = useState();

  console.log(customers.length);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBatteryData = filteredBatteryData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredBatteryData.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    setFilteredBatteryData(
      batteryData.filter((battery) =>
        battery.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, batteryData]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Customer');
        console.log('Data:', response.data);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, [refresh]);

  console.log(customers)

    const handleDeleteClick = (index) => {
    const updated = customers.filter((_, i) => i !== index);
    setCustomers(updated);
  };

  const handleEdit = (index) => {

  }


  return (
    <VStack bgColor="#F0FFF4" align="center">
      <HStack py="8" w="80%" justifyContent="space-between">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddNewCustomer refresh={refresh} setRefresh={setRefresh} />
      </HStack>

      <TableContainer
        border="1px solid"
        borderColor="gray.400"
        w="80%"
        pos="relative"
        h="auto"
        overflow="hidden"
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
            background: '#f0f0f0',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#ccc',
          },
        }}
      >
        <Table variant="simple" size="sm">
          <Thead
            pos="sticky"
            top="0"
            zIndex="1"
            bgColor="white"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white',
            }}
          >
            <Tr bg="#4682b4" color="white" pb="4">
              <Th textTransform="capitilize" color="white" fontSize="16">
                Customer ID
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Customer Name
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Addres
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Phone Number
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Type
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Discount %
              </Th>
              <Th>Edit</Th>
              <Th>Delete</Th>

              {/* <Th textTransform="capitilize" color="white" fontSize="16">
                Sales
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Bill Summary
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Received Cash
              </Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {customers?.map((battery, index) => (
              <Tr
                key={battery.id}
                onClick={() => {
                  setBattery(battery);
                }}
              >
                <Td>{battery.customerId}</Td>
                <Td>{battery.customerName}</Td>
                <Td>{battery.address}</Td>
                <Td>{battery.phoneNumber}</Td>
                <Td>{battery.customerType}</Td>
                <Td>{battery.discoutPercent}</Td>
                {/* <Td>{battery.sales}</Td>
                <Td>{battery.billSummary}</Td>
                <Td>{battery.receivedCashProfiles}</Td> */}
                
                <Td>
                  <IconButton
                    p="none"
                    onClick={() => handleEdit(index)}
                    bgColor="transparent"
                    color="#4682b4"
                    aria-label="left-icon"
                    icon={<FaTrashAlt />}
                    fontSize="12"
                    _hover={{
                      backgroundColor: 'transparent',
                    }}
                  />
                </Td>
                 <Td>
                        <IconButton
                          p="none"
                          onClick={() => handleDeleteClick(index)}
                          bgColor="transparent"
                          color="#4682b4"
                          aria-label="left-icon"
                          icon={<FaTrashAlt />}
                          fontSize="12"
                          _hover={{
                            backgroundColor: 'transparent',
                          }}
                        />
                      </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack
        pos="absolute"
        bottom="4"
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          disabled={currentPage == 1}
          rounded="full"
          bgColor="#4682b4"
          aria-label="left-icon"
          icon={<SlArrowLeft />}
          fontSize="20"
          color="white"
          onClick={goToPreviousPage}
          _hover={{
            backgroundColor: '#4682b4',
          }}
        />

        <Text>
          Showing {startIndex + 1} to {Math.min(endIndex, batteryData.length)}{' '}
          of {batteryData.length} entries
        </Text>
        <IconButton
          rounded="full"
          bgColor="#4682b4"
          aria-label="left-icon"
          icon={<SlArrowRight />}
          color="white"
          fontSize="20"
          onClick={goToNextPage}
          _hover={{
            backgroundColor: '#4682b4',
          }}
          disabled={currentPage == totalPages}
        />
      </HStack>
    </VStack>
  );
};
export default Customer;

const batteryData = [
  {
    id: 1,
    name: 'Battery abc',
    modelNumber: 'BA123',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 100,
    salePrice: 150,
    stockLeft: 50,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
    quantity: 0,
  },
  {
    id: 2,
    name: 'abc Battery B',
    modelNumber: 'BB456',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 200,
    salePrice: 250,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
    quantity: 0,
  },
  {
    id: 3,
    name: 'Battery def',
    modelNumber: 'BC789',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 150,
    salePrice: 200,
    stockLeft: 20,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
    quantity: 0,
  },
];
