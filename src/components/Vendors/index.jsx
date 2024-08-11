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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import AddNewVendor from './AddNewVendor';
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import VendorDetailModal from './VendorDetailModal';
import { FaTrashAlt } from 'react-icons/fa';


const ITEMS_PER_PAGE = 100;
const Vendors = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [vendor, setVendor] = useState();
  const [vendors, setVendors] = useState([]);
  const [filteredVendorList, setFilteredVendorList] = useState(vendors);
  const [refresh, setRefresh] = useState(false);
  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVendors = filteredVendorList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredVendorList.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    setFilteredVendorList(
      vendors.filter((vendor) =>
        vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, vendors]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Vendor');
        console.log('Data:', response.data);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDeleteClick = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`https://localhost:7059/api/Vendor/${id}`);
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


  return (
    <VStack bgColor="#F0FFF4" align="center">
      <HStack py="2" w="80%" justifyContent="space-between">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddNewVendor refresh={refresh} setRefresh={setRefresh} />
      </HStack>

      <TableContainer
        border="1px solid"
        borderColor="gray.400"
        w="80%"
        pos="relative"
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
                ID
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Vendor Name
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Description
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Address
              </Th>
              <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                Phone Number
              </Th>
              <Th
                textTransform="capitilize" color="white" fontSize="16"
              >Edit</Th>
              <Th
                textTransform="capitilize" color="white" fontSize="16"
              >Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentVendors.map((vendor, index) => (
              <Tr
                key={vendor.id}
                onClick={() => {
                  setVendor(vendor);
                }}
              >
                <Td>{vendor.vendorId}</Td>
                <Td>{vendor.vendorName}</Td>
                <Td>{vendor.vendorDescription}</Td>
                <Td>{vendor.vendorAddress}</Td>
                <Td>{vendor.phone}</Td>
                <Td>
                  <IconButton
                    onClick={onOpenDetailModal}
                    bgColor='transparent'
                    color="#4682b4"

                    _hover={{
                      bgColor: "transparent"
                    }}
                    aria-label='edit' icon={<FiEdit size="14" />} />
                </Td>
                <Td>
                  <IconButton
                    onClick={() => handleDeleteClick(vendor.vendorId)}
                    bgColor='transparent'
                    aria-label='delete' icon={<FaTrashAlt size="14" />}
                    _hover={{
                      bgColor: "transparent"
                    }}
                    color="#4682b4"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* <HStack
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
          Showing {startIndex + 1} to {Math.min(endIndex, vendors.length)}{' '}
          of {vendors.length} entries
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
      </HStack> */}
      {isOpenDetailModal && (
        <VendorDetailModal
          vendorDetail={vendor}
          isOpen={onOpenDetailModal}
          onClose={onCloseDetailModal}
        />
      )}
    </VStack>
  );
};
export default Vendors;

const VendorList = [
  {
    id: 1,
    name: 'vendor abc',
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
    name: 'abc vendor B',
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
    name: 'vendor def',
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
