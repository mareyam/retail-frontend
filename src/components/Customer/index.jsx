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
  useToast, useDisclosure,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import AddNewCustomer from './AddNewCustomer';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import EditCustomer from './EditCustomer';
import { CiEdit } from "react-icons/ci";
import { FiEdit } from 'react-icons/fi';

const ITEMS_PER_PAGE = 100;
const Customer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customerType, cart, addToCart, removeFromCart, customers, setCustomers } = useStateStore();
  console.log(customerType);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setBattery] = useState();
  const [refresh, setRefresh] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [isActive, setIsActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Retail');

  const [billSummary, setBillSummary] = useState({});
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  console.log(selectedCustomer)
  console.log(customers.length);
  console.log(billSummary

  )
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);


  const rCustomers = customers.filter(customer => customer.customerType === 'Retail');
  const wCustomers = customers.filter(customer => customer.customerType === 'Whole');



  // useEffect(() => {
  //   setFilteredBatteryData(
  //     batteryData.filter((customer) =>
  //       customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  //   setCurrentPage(1);
  // }, [searchQuery, batteryData]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Customer');
        console.log('Data:', response.data);
        setCustomers(response.data);
        console.log(customers)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, [refresh]);

  console.log(customers)

  const handleDeleteClick = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`https://localhost:7059/api/Customer/${id}`);
      console.log('Data:', response.data);
      toast({
        title: 'Record deleted.',
        description: 'The record has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete the record.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (customer) => {
    onOpen();
    setSelectedCustomer(customer)
  }

  useEffect(() => {
    const fetchBillSummary = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/BillSummary');
        const billData = response.data;
        setBillSummary(billData.reduce((acc, bill) => {
          acc[bill.customerId] = bill;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching bill summary:', error);
      }
    };

    fetchBillSummary();
  }, [refresh]);

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, customers]);
  // useEffect(() => {
  //   const fetchBillSummary = async () => {
  //     try {
  //       const response = await axios.get('https://localhost:7059/api/BillSummary');
  //       setBillSummary(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchBillSummary();
  // }, [refresh]);



  const handleToggleStatus = async (customer) => {
    // try {
    const updatedStatus = !customer.isActive;
    toast({
      title: `Customer ${updatedStatus ? 'enabled' : 'disabled'}.`,
      description: `The customer has been successfully ${updatedStatus ? 'enabled' : 'disabled'}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setRefresh(!refresh);
    // } catch (error) {
    //   console.error('Error updating status:', error);
    //   toast({
    //     title: 'An error occurred.',
    //     description: 'Unable to update the customer status.',
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };


  console.log(selectedTab)
  return (
    <VStack bgColor="#F0FFF4" align="center" w='100%'
    >
      <HStack py="2" w="100%" justifyContent="space-between">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddNewCustomer refresh={refresh} setRefresh={setRefresh} />
      </HStack>

      <Box w='full'



      >
        <Tabs



          onChange={(index) => setSelectedTab(index === 0 ? 'Wholesale' : 'Retail')}

          variant='soft-rounded' colorScheme='blue'>
          <TabList>
            <Tab>Wholesale</Tab>
            <Tab>Retail</Tab>
          </TabList>
          <TabPanels

          >
            <TabPanel

            >
              {wCustomers.length > 0 && (
                <TableContainer
                  border="1px solid"

                  overflowY='auto'
                  borderColor="gray.400"
                  w="100%"
                  pos="relative"
                  h='auto'
                  maxH="70dvh"
                  overflow="hidden"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '10px',
                      height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '10px',
                      marginTop: '40px',
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
                        {/* <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Customer ID
              </Th> */}
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Customer Name
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Address
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Phone Number
                        </Th>
                        {/* <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Type
              </Th> */}
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Discount %
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Edit</Th>


                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Received Cash
                        </Th>

                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Enable/Disable</Th>

                      </Tr>
                    </Thead>
                    <Tbody>
                      {wCustomers.map((customer) => (
                        <Tr
                          key={customer.id}
                          onClick={() => {
                            setBattery(customer);
                          }}
                        >
                          {/* <Td>{customer.customerId}</Td> */}
                          <Td>{customer.customerName}</Td>
                          <Td>{customer.address}</Td>
                          <Td>{customer.phoneNumber}</Td>
                          {/* <Td>{customer.customerType}</Td> */}
                          <Td>{customer.discountPercent ? customer.discountPercent : 0}%</Td>
                          {/* <Td>{customer.sales}</Td>
                <Td>{customer.billSummary}</Td>
                <Td>{customer.receivedCashProfiles}</Td> */}

                          {/* <Td>{billSummary[customer.id]?.invoiceNumber || '-'}</Td>
                <Td>{billSummary[customer.id]?.remainingAmount || '-'}</Td>
                <Td>{billSummary[customer.id]?.receivedAmount || '-'}</Td> */}

                          <Td>
                            <Badge
                              cursor='pointer'
                              colorScheme='green'
                              onClick={() => handleEdit(customer)}

                            >
                              Edit
                            </Badge>
                          </Td>

                          <Td>received cash </Td>

                          <Td>
                            <Badge
                              cursor='pointer'
                              colorScheme={isActive ? 'red' : 'blue'}
                              onClick={() => setIsActive(!isActive)}
                            >
                              {isActive ? 'Disable' : 'Enable'}
                            </Badge>
                          </Td>
                        </Tr>


                      ))}

                    </Tbody>
                  </Table>
                </TableContainer>

              )}



            </TabPanel>
            <TabPanel >
              {rCustomers.length > 0 && (
                <TableContainer
                  border="1px solid"
                  overflowY='auto'
                  borderColor="gray.400"
                  w="100%"
                  pos="relative"
                  h='auto'
                  maxH="70dvh"
                  overflow="hidden"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '10px',
                      height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '10px',
                      marginTop: '40px',
                      background: '#f0f0f0',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '10px',
                      background: '#ccc',
                    },
                  }}
                >
                  <Table variant="simple" size="sm"

                  >
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
                        {/* <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Customer ID
              </Th> */}
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Customer Name
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Address
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Phone Number
                        </Th>
                        {/* <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Type
              </Th> */}
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Discount %
                        </Th>
                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Edit</Th>


                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                          Received Cash
                        </Th>

                        <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Enable/Disable</Th>

                      </Tr>
                    </Thead>
                    <Tbody>
                      {rCustomers.map((customer) => (
                        <Tr
                          key={customer.id}
                          onClick={() => {
                            setBattery(customer);
                          }}
                        >
                          {/* <Td>{customer.customerId}</Td> */}
                          <Td>{customer.customerName}</Td>
                          <Td>{customer.address}</Td>
                          <Td>{customer.phoneNumber}</Td>
                          {/* <Td>{customer.customerType}</Td> */}
                          <Td>{customer.discountPercent ? customer.discountPercent : 0}%</Td>
                          {/* <Td>{customer.sales}</Td>
                <Td>{customer.billSummary}</Td>
                <Td>{customer.receivedCashProfiles}</Td> */}

                          {/* <Td>{billSummary[customer.id]?.invoiceNumber || '-'}</Td>
                <Td>{billSummary[customer.id]?.remainingAmount || '-'}</Td>
                <Td>{billSummary[customer.id]?.receivedAmount || '-'}</Td> */}

                          <Td>
                            <Badge
                              cursor='pointer'
                              colorScheme='green'
                              onClick={() => handleEdit(customer)}

                            >
                              Edit
                            </Badge>
                          </Td>

                          <Td>received cash </Td>

                          <Td>
                            <Badge
                              cursor='pointer'
                              colorScheme={isActive ? 'red' : 'blue'}
                              onClick={() => setIsActive(!isActive)}
                            >
                              {isActive ? 'Disable' : 'Enable'}
                            </Badge>
                          </Td>
                        </Tr>


                      ))}

                    </Tbody>
                  </Table>
                </TableContainer>

              )}

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* <TableContainer
        border="1px solid"

        overflowY='auto'
        borderColor="gray.400"
        w="100%"
        pos="relative"
        h='auto'
        maxH="70dvh"
        overflow="hidden"
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
            marginTop: '40px',
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

              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Customer Name
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Address
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Phone Number
              </Th>

              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Discount %
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Edit</Th>


              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Received Cash
              </Th>

              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">Enable/Disable</Th>

            </Tr>
          </Thead>
          <Tbody>
            {currentCustomers?.map((customer, index) => (
              <Tr
                key={customer.id}
                onClick={() => {
                  setBattery(customer);
                }}
              >
                <Td>{customer.customerName}</Td>
                <Td>{customer.address}</Td>
                <Td>{customer.phoneNumber}</Td>
                <Td>{customer.discountPercent ? customer.discountPercent : 0}%</Td>

                <Td>
                  <Badge
                    cursor='pointer'
                    colorScheme='green'
                    onClick={() => handleEdit(customer)}

                  >
                    Edit
                  </Badge>
                </Td>

                <Td>received cash </Td>

                <Td>
                  <Badge
                    cursor='pointer'
                    colorScheme={isActive ? 'red' : 'blue'}
                    onClick={() => setIsActive(!isActive)}
                  >
                    {isActive ? 'Disable' : 'Enable'}
                  </Badge>
                </Td>



              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer> */}


      {
        isOpen && (
          <EditCustomer
            customerDetails={selectedCustomer}
            refresh={refresh}
            setRefresh={setRefresh}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        )
      }
    </VStack >
  );
};
export default Customer;


