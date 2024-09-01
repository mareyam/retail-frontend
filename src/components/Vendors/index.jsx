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
  useToast,
  Badge
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
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchVendors, deleteVendor } from '@/hooks/vendors';



const ITEMS_PER_PAGE = 100;
const Vendors = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [vendor, setVendor] = useState();
  const [refresh, setRefresh] = useState(false);
  const [filteredVendorList, setFilteredVendorList] = useState([]);

  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();


  const { data: vendors, error, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  });

  useEffect(() => {
    if (vendors) {
      setFilteredVendorList(vendors);
    }
  }, [vendors]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVendors = filteredVendorList?.slice(startIndex, endIndex);


  useEffect(() => {
    setFilteredVendorList(
      vendors?.filter((vendor) =>
        vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, vendors]);


  const mutation = useMutation({
    mutationFn: deleteVendor,
    onSuccess: () => {
      toast({
        title: 'Record deleted.',
        description: 'The record has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries(['vendors']);
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete the record.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });


  return (
    <VStack bgColor="#F0FFF4" align="center">
      <HStack py="2" w="100%" justifyContent="space-between">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddNewVendor refresh={refresh} setRefresh={setRefresh} />
      </HStack>

      <TableContainer
        border="1px solid"
        borderColor="gray.400"
        w="100%"
        pos="relative"
        h="auto"
        maxH='70dvh'
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
            marginTop: '30px',
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
              >Actions</Th>

            </Tr>
          </Thead>
          <Tbody>
            {currentVendors?.map((vendor, index) => (
              <Tr
                key={vendor.id}
                onClick={() => {
                  setVendor(vendor);
                }}
              >
                <Td>{vendor.vendorName}</Td>
                <Td>{vendor.vendorDescription}</Td>
                <Td>{vendor.vendorAddress}</Td>
                <Td>{vendor.phone}</Td>

                <Td >
                  <Badge
                    cursor='pointer'
                    colorScheme='green'
                    onClick={onOpenDetailModal}
                    mx='2'
                  >
                    Edit
                  </Badge>

                  <Badge
                    cursor='pointer'
                    colorScheme='red'
                    onClick={() => mutation.mutate(vendor.vendorId)}
                  >
                    Delete
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>


      {
        isOpenDetailModal && (
          <VendorDetailModal
            vendorDetail={vendor}
            isOpen={onOpenDetailModal}
            onClose={onCloseDetailModal}
          />
        )
      }
    </VStack >
  );
};
export default Vendors;


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

// const totalPages = Math.ceil(filteredVendorList?.length / ITEMS_PER_PAGE);

// const goToPreviousPage = () => {
//   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
// };

// const goToNextPage = () => {
//   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
// };