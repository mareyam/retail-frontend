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
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import AddNewProduct from '../common/AddNewProduct';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import EditProduct from './EditProduct';

const ITEMS_PER_PAGE = 7;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [batteries, setBatteries] = useState([]);
  const [filteredBatteryData, setFilteredBatteryData] = useState(batteries);
  const [battery, setBattery] = useState();
  const [refresh, setRefresh] = useState(false);

  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
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
        const response = await axios.get('https://localhost:7059/api/Product');
        console.log('Data:', response.data);
        setBatteries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleEdit = (customer) => {
    onOpenDetailModal();
    setBattery(customer)
  }


  console.log(batteries);
  return (
    <VStack h="85dvh" bgColor="#F0FFF4" align="center">
      <HStack w="80%">
        <Flex py="2" justifyContent="space-between" w="full">
          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* <Heading color="#4682b4">Products</Heading> */}
          <AddNewProduct refresh={refresh} setRefresh={setRefresh} />
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
                ID
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Battery Name
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Model Number
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Description
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Availability
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Stock
              </Th>
              <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Price
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">Edit</Th>
              <Th textTransform="capitilize" color="white" fontSize="16">Delete</Th>

            </Tr>
          </Thead>
          <Tbody>
            {currentBatteryData.map((battery) => (
              <Tr lineHeight="1" gap="1" key={battery.id}>
                <Td fontSize="16">{battery.productId}</Td>
                <Td
                  fontSize="16"
                  onClick={() => {
                    setBattery(battery);
                    onOpenDetailModal();
                  }}
                >
                  {battery.brandName}
                </Td>
                <Td fontSize="16">{battery.productModel}</Td>
                <Td fontSize="16">{battery.productDescription}</Td>
                <Td fontSize="16" w="20">
                  <Text
                    // p="2"
                    w="28"
                    textAlign="center"
                    rounded="full"
                    // bgColor={
                    //   battery.status === "Available"
                    //     ? "green.200"
                    //     : "red.200"
                    // }
                    color={
                      battery.productStatus === 'Available'
                        ? 'green.800'
                        : 'red.800'
                    }
                  >
                    {battery.productStatus}
                  </Text>
                </Td>
                <Td fontSize="16" isNumeric>
                  {battery.quantity}
                </Td>
                <Td fontSize="16" isNumeric>
                  {battery.productPrice}
                </Td>
                <Td>
                  <IconButton
                    p="none"
                    onClick={() => handleEdit(battery)}
                    bgColor="transparent"
                    color="#4682b4"
                    aria-label="left-icon"
                    icon={<FiEdit />}
                    fontSize="12"
                    _hover={{
                      backgroundColor: 'transparent',
                    }}
                  />
                </Td>
                <Td>
                  <IconButton
                    p="none"
                    onClick={() => handleDeleteClick(customer.customerId)}
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
      {isOpenDetailModal && (
        <EditProduct
          productDetails={battery}
          isOpen={onOpenDetailModal}
          onClose={onCloseDetailModal}
          onOpen={onOpenDetailModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </VStack>
  );
};

export default Products;
