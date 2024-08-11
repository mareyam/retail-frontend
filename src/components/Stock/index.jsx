import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  VStack,
  Td,
  TableContainer,
  Text,
  HStack,
  IconButton,
  Heading,
  Flex,
  useDisclosure,
  Button,
  useToast
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import axios from 'axios';
import useStateStore from '../zustand/store';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import EditStock from './EditStock';

const ITEMS_PER_PAGE = 7;

const Stock = () => {
  const toast = useToast()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [batteries, setBatteries] = useState([]);
  const [filteredBatteryData, setFilteredBatteryData] = useState(batteries);
  const [battery, setBattery] = useState();
  const [refresh, setRefresh] = useState(false);
  const [selectedStock, setSelectedStock] = useState();

  const { setSelectedComponent } = useStateStore();

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

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
      batteries.filter((battery) =>
        battery.productModel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, batteries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Stock');
        console.log('Data:', response.data);
        setBatteries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);


  const handleDeleteClick = async (invoiceNumber) => {
    console.log(invoiceNumber)
    try {
      const response = await axios.delete(`https://localhost:7059/api/Stock/${invoiceNumber}`);
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
  const handleEdit = (stock) => {
    onOpen();
    setSelectedStock(stock)
  }
  return (
    <VStack h="85dvh" bgColor="#F0FFF4" align="center">
      <HStack w="80%">
        <Flex py="2" justifyContent="space-between" w="full">
          {/* <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          /> */}
          {/* <Heading color="#4682b4">Inventory Details</Heading> */}
          <Button
            bg="#4682b4"
            color="white"
            _hover={{
              bgColor: '4682b4',
              color: 'white',
            }}
            onClick={() => setSelectedComponent('invoice')}
          >
            Receive Stock
          </Button>
        </Flex>
      </HStack>
      <TableContainer
        border="1px solid"
        borderColor="gray.400"
        w="80%"
        pos="relative"
        // h="61dvh"
        h="auto"
        overflowY="auto"
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
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white',
            }}
          >
            <Tr bg="#4682b4" color="white" pb="4">
              <Th textTransform="capitilize" color="white" fontSize="16">
                Product Id
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Product Model
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Description
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Invoice Number
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Quantity
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Vendor Name
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Actions
              </Th>
              {/* <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Price
              </Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {currentBatteryData.map((battery) => (
              <Tr lineHeight="1" gap="1" key={battery.id}>
                <Td fontSize="16">{battery.productId}</Td>
                <Td fontSize="16">{battery.productModel}</Td>
                <Td fontSize="16">{battery.productDescription ? battery.productDescription : 'null'}</Td>
                <Td fontSize="16">{battery.invoiceNumber}</Td>
                <Td fontSize="16">{battery.quantity}</Td>
                <Td fontSize="16">{battery.vendorName}</Td>
                <Td>
                  <IconButton
                    p="none"
                    onClick={() => handleEdit(battery)}
                    bgColor="transparent"
                    color="#4682b4"
                    aria-label="left-icon"
                    icon={<FiEdit />}
                    fontSize="14"
                    _hover={{
                      backgroundColor: 'transparent',
                    }}
                  />
                  <IconButton
                    p="none"
                    onClick={() => handleDeleteClick(battery.invoiceNumber)}
                    _hover={{
                      bgColor: "transparent"
                    }}
                    aria-label='delete' icon={<FaTrashAlt size="14" />}
                    bgColor="transparent"
                    color="#4682b4"
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
          bg="#4682b4"
          aria-label="left-icon"
          icon={<SlArrowLeft backgroundColor="red" />}
          fontSize="20"
          color="white"
          onClick={goToPreviousPage}
          _hover={{
            backgroundColor: '#4682b4',
          }}
        />

        <Text>
          Showing {startIndex + 1} to{' '}
          {Math.min(endIndex, filteredBatteryData.length)} of{' '}
          {filteredBatteryData.length} entries
        </Text>
        <IconButton
          rounded="full"
          bg="#4682b4"
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
      {isOpen && (
        <EditStock
          stockDetails={selectedStock}
          refresh={refresh}
          setRefresh={setRefresh}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </VStack>
  );
};

export default Stock;
