import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
    HStack,
    Flex,
    Badge,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import AddNewProduct from '../common/AddNewProduct';
import axios from 'axios';

const ReceivedCash = () => {
    const toast = useToast();
    const [receivedCashList, setReceivedCashList] = useState([]);
    const [cash, setCash] = useState();
    const [refresh, setRefresh] = useState(false);

    const {
        isOpen: isOpenDetailModal,
        onOpen: onOpenDetailModal,
        onClose: onCloseDetailModal,
    } = useDisclosure();

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7059/api/ReceivedCash');
                console.log('Data:', response.data);
                setReceivedCashList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [refresh]);

    const handleEdit = (cash) => {
        onOpenDetailModal();
        setCash(cash);
    };

    return (
        <VStack h="85dvh" bgColor="#F0FFF4" align="center">
            <HStack w="100%">
                <Flex py="8" gap='2' w="full">
                    <TableContainer
                        border="1px solid"
                        w='100%'
                        borderColor="gray.400"
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
                                    backgroundColor: 'white',
                                }}
                            >
                                <Tr bg="#4682b4" color="white">
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Customer Name
                                    </Th>
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Cash Description
                                    </Th>
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Amount
                                    </Th>
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Cash Type
                                    </Th>
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Date
                                    </Th>
                                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                                        Edit
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {receivedCashList.map((cash) => (
                                    <Tr key={cash.receivedCashId}>
                                        <Td fontSize="16">
                                            {cash.customerId}
                                        </Td>
                                        <Td fontSize="16">
                                            {cash.receivedCashDescription}
                                        </Td>
                                        <Td fontSize="16">
                                            {cash.amount}
                                        </Td>
                                        <Td fontSize="16">
                                            {cash.cashType}
                                        </Td>
                                        <Td
                                            textAlign='left'
                                            fontSize="16"
                                        >
                                            {formatDate(cash.date)}
                                        </Td>
                                        <Td>
                                            <Badge
                                                cursor='pointer'
                                                colorScheme='green'
                                                onClick={() => handleEdit(cash)}
                                            >
                                                Edit
                                            </Badge>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <AddNewProduct refresh={refresh} setRefresh={setRefresh} />
                </Flex>
            </HStack>
            {isOpenDetailModal && (
                <EditProduct
                    productDetails={cash}
                    isOpen={isOpenDetailModal}
                    onClose={onCloseDetailModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </VStack>
    );
};

export default ReceivedCash;
