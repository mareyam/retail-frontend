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

const ITEMS_PER_PAGE = 6;

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
                const response = await axios.get('https://localhost:7059/api/Sale');
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
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f0f0f0',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#ccc',
                        borderRadius: '10px',
                    },
                    '&:hover::-webkit-scrollbar-thumb': {
                        background: '#888',
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
                            <Th textTransform="capitilize" color="white" fontSize="16">Sale ID</Th>
                            <Th textTransform="capitilize" color="white" fontSize="16">Invoice Number</Th>
                            <Th textTransform="capitilize" color="white" fontSize="16">Customer Id</Th>
                            <Th textTransform="capitilize" color="white" fontSize="16">Product Id</Th>
                            <Th textTransform="capitilize" color="white" fontSize="16">Quantity</Th>
                            <Th textTransform="capitilize" color="white" fontSize="16">Unit Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentSales?.map((saleItem, index) => (
                            <Tr key={index}>
                                <Td>{saleItem.saleId}</Td>
                                <Td>{saleItem.invoiceNumber}</Td>
                                <Td>{saleItem.customerId}</Td>
                                <Td>{saleItem.productId}</Td>
                                <Td>{saleItem.quantity}</Td>
                                <Td>{saleItem.unitPrice}</Td>
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
        </VStack>
    );
};

export default AllSales;
