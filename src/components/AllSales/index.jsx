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
    VStack,
    Tabs,
    TabPanel,
    TabList,
    Tab,
    TabPanels,
    Badge
} from '@chakra-ui/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import EditSale from './EditSale';


const AllSales = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('Overview');
    const [overviewData, setOverviewData] = useState([]);
    const [detailData, setDetailData] = useState([]);
    const [sale, setSale] = useState([]);
    const [saleItem, setSaleItem] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [refresh, setRefresh] = useState();
    const [billSummaries, setBillSummaries] = useState([]);

    useEffect(() => {
        const fetchBillSummary = async () => {
            try {

                const detailResponse = await axios.get('https://localhost:7059/api/BillSummary');
                const detailData = detailResponse.data;
                setDetailData(detailData);

                const overviewResponse = await axios.get('https://localhost:7059/api/Sale');
                const overviewData = overviewResponse.data;
                setOverviewData(overviewData);

                const customersResponse = await axios.get('https://localhost:7059/api/Customer');
                const customersData = customersResponse.data;
                setCustomers(customersData);

                const billCustomerIds = billSummaryData.map((bill) => bill.customerId);
                console.log(billCustomerIds)

                const filteredCustomers = customersData.filter((customer) =>
                    billCustomerIds.includes(customer.customerId)
                );
                console.log(filteredCustomers)

                const updatedBillSummaries = billSummaryData.map((bill) => {
                    const relatedCustomer = filteredCustomers.find(
                        (customer) => customer.customerId === bill.customerId
                    );

                    console.log(relatedCustomer)

                    return {
                        ...bill,
                        customerName: relatedCustomer ? relatedCustomer.customerName : 'Unknown',
                    };
                });

                setBillSummaries(updatedBillSummaries);
                setCustomers(customersData);

                // setBillSummaryData(updatedBillSummaryData);


                // const customerMap = {};
                // customersData.forEach(customer => {
                //     customerMap[customer.customerId] = customer.customerName;
                // });




                // const combinedData = detailData.map(bill => ({
                //     ...bill,
                //     customerName: customerMap[bill.customerId] || 'Unknown Customer'
                // }));

                // setSale(combinedData);
                // console.log(combinedData)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBillSummary();
    }, []);


    console.log(detailData)
    console.log(overviewData)
    console.log(customers)
    console.log(sale)

    const handleEdit = (saleItem) => {
        onOpen();
        setSaleItem(saleItem)
    }

    return (
        <VStack bgColor="#F0FFF4" align="center" >
            <HStack w="100%" justifyContent="space-between" mt='2'>
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </HStack>

            <Tabs
                w='full'
                onChange={(index) => setSelectedTab(index === 0 ? 'Overview' : 'Detail View')}
                variant='soft-rounded' colorScheme='blue'>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Detail View</Tab>
                </TabList>
                <TabPanels >
                    <TabPanel >
                        <TableContainer

                            border="1px solid"
                            borderColor="gray.400"
                            w="100%"
                            overflowY="scroll"
                            h='auto'
                            maxH='70dvh'
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '4px',
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
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Received Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Remaining Amount</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {overviewData?.map((saleItem, index) => (
                                        <Tr key={index}>
                                            <Td>#{saleItem.invoiceNumber}</Td>
                                            <Td>{saleItem.customerId}</Td>
                                            <Td>{saleItem.totalBillAmount}</Td>
                                            <Td>{saleItem.receivedAmount ? saleItem.receivedAmount : 'null'}</Td>
                                            <Td>{saleItem.remainingAmount ? saleItem.remainingAmount : 'null'}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <TableContainer
                            border="1px solid"
                            borderColor="gray.400"
                            w="100%"
                            overflowY="scroll"

                            h='auto'
                            maxH='70dvh'
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '4px',
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
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Customer Name</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Total Bill Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Total Discount Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Received Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Remaining Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Returned Product Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Final Bill Amount</Th>
                                        <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">Action</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {billSummaries?.map((saleItem, index) => (
                                        <Tr key={index}>
                                            <Td>#{saleItem.invoiceNumber}</Td>
                                            <Td>{saleItem.customerId}</Td>
                                            <Td>{saleItem.customerName}</Td>
                                            <Td>{saleItem.totalBillAmount}</Td>
                                            <Td>{saleItem.totalDiscountAmount ? saleItem.totalDiscountAmount : "null"}</Td>
                                            <Td>{saleItem.receivedAmount ? saleItem.receivedAmount : 'null'}</Td>
                                            {/* <Td>{saleItem.remainingAmount ? saleItem.remainingAmount : 'null'}</Td> */}
                                            <Td>
                                                {saleItem.remainingAmount !== null && saleItem.remainingAmount > 0
                                                    ? saleItem.remainingAmount
                                                    : '0'}
                                            </Td>


                                            <Td>{saleItem.returnedProductAmount ? saleItem.returnedProductAmount : 'null'}</Td>
                                            <Td>{saleItem.finalBillAmount}</Td>

                                            <Td>
                                                <Badge
                                                    colorScheme={saleItem.remainingAmount < 1 ? 'red' : 'green'}
                                                    onClick={() => saleItem.remainingAmount < 1 ? "" : handleEdit(saleItem)}
                                                    cursor={saleItem.remainingAmount < 1 ? 'no-drop' : 'pointer'}

                                                >
                                                    Edit
                                                </Badge>
                                            </Td>

                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {
                isOpen && (
                    <EditSale
                        saleDetail={saleItem}
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

export default AllSales;

// {
// "date": "0001-01-01T00:00:00",
//     "billSummaryId": 29,
//         "totalBillAmount": 12127,
//             "totalDiscountAmount": 0,
//                 "finalBillAmount": 11027,
//                     "receivedAmount": 100,
//                         "remainingAmount": 10863,
//                             "returnedProductAmount": 1000,
//                                 "invoiceNumber": "240096",
//                                     "customerId": 0
// },