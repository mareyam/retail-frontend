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
    IconButton,
    useToast,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const ITEMS_PER_PAGE = 11;

const AllSales = () => {
    const toast = useToast();
    const [sale, setSale] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSale, setFilteredSale] = useState([]);
    // const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://localhost:7059/api/BillSummary');
                setSale(response.data);
                setFilteredSale(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        setFilteredSale(
            sale?.filter((saleItem) =>
                saleItem.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [searchQuery, sale]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSales = filteredSale?.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredSale?.length / ITEMS_PER_PAGE);

    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));


    return (
        <VStack bgColor="#F0FFF4" align="center" spacing="8">
            <HStack w="80%" justifyContent="space-between" mt='4'>
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </HStack>

            <TableContainer
                border="1px solid"
                borderColor="gray.400"
                w="80%"
                overflow="auto"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '2px',
                        height: '4px',
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '10px',
                    },
                    '&:hover::-webkit-scrollbar-thumb': {
                        backgroundColor: '#4682b4',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <Table variant="simple" size="sm">
                    <Thead
                        pos="sticky"
                        top="0"
                        bgColor="#F0FFF4"
                        zIndex="1"
                    >
                        <Tr bg="#4682b4" color="white">
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Invoice Number</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Customer ID</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Total Bill Amount</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Total Discount Amount</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Received Amount</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Remaining Amount</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Returned Product Amount</Th>
                            <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Final Bill Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentSales?.map((saleItem, index) => (
                            <Tr key={index}>
                                <Td>#{saleItem.invoiceNumber}</Td>
                                <Td>{saleItem.customerId}</Td>
                                <Td>{saleItem.totalBillAmount}</Td>
                                <Td>{saleItem.totalDiscountAmount ? saleItem.totalDiscountAmount : "null"}</Td>
                                <Td>{saleItem.receivedAmount ? saleItem.receivedAmount : 'null'}</Td>
                                <Td>{saleItem.remainingAmount ? saleItem.remainingAmount : 'null'}</Td>
                                <Td>{saleItem.returnedProductAmount ? saleItem.returnedProductAmount : 'null'}</Td>
                                <Td>{saleItem.finalBillAmount}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>


            <HStack spacing={4} alignItems="center">
                <IconButton
                    disabled={currentPage === 1}
                    bgColor="#4682b4"
                    aria-label="Previous page"
                    icon={<SlArrowLeft />}
                    color="white"
                    onClick={goToPreviousPage}
                    _hover={{ backgroundColor: '#4682b4' }}
                />
                <Text>
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredSale?.length)} of {filteredSale?.length} entries
                </Text>
                <IconButton
                    disabled={currentPage === totalPages}
                    bgColor="#4682b4"
                    aria-label="Next page"
                    icon={<SlArrowRight />}
                    color="white"
                    onClick={goToNextPage}
                    _hover={{ backgroundColor: '#4682b4' }}
                />
            </HStack>
        </VStack >
    );
};

export default AllSales;
