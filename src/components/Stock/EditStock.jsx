import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    ModalCloseButton,
    VStack,
    Text,
    Input,
    Flex,
    useToast,
    Select
} from '@chakra-ui/react';
import axios from 'axios';

const EditStock = ({ stockDetails, refresh, setRefresh, onClose, isOpen, onOpen }) => {
    const toast = useToast();

    const [productId, setProductId] = useState(stockDetails.productId || 0);
    const [quantity, setQuantity] = useState(stockDetails.quantity || 0);
    const [invoiceNumber, setInvoiceNumber] = useState(stockDetails.invoiceNumber || '');
    const [lotNumber, setLotNumber] = useState(stockDetails.lotNumber || '');
    const [date, setDate] = useState(stockDetails.date || new Date().toISOString().split('T')[0]);
    const [vendorId, setVendorId] = useState(stockDetails.vendorId || 0);
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        if (stockDetails) {
            setProductId(stockDetails.productId);
            setQuantity(stockDetails.quantity);
            setInvoiceNumber(stockDetails.invoiceNumber);
            setLotNumber(stockDetails.lotNumber);
            setDate(stockDetails.date.split('T')[0]);
            setVendorId(stockDetails.vendorId);
        }
    }, [stockDetails]);

    const validateFields = () => {
        const missingFields = [];

        if (productId <= 0) {
            missingFields.push('Product ID is required and must be greater than 0.');
        }
        if (quantity < 0) {
            missingFields.push('Quantity cannot be negative.');
        }
        if (!invoiceNumber) {
            missingFields.push('Invoice Number is required.');
        }
        if (!lotNumber) {
            missingFields.push('Lot Number is required.');
        }
        if (vendorId <= 0) {
            missingFields.push('Vendor is required.');
        }
        if (missingFields.length > 0) {
            toast({
                title: 'Validation Error',
                description: missingFields.join(' '),
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return false;
        }
        return true;
    };

    const handleEditStock = async () => {
        if (!validateFields()) return;

        const updatedStock = {
            productId,
            quantity,
            invoiceNumber,
            lotNumber,
            date,
            vendorId
        };
        console.log(updatedStock)

        try {
            const response = await axios.put(`https://localhost:7059/api/Stock/${stockDetails.productId}`, updatedStock);
            console.log('Data:', response.data);

            toast({
                title: 'Stock updated successfully',
                status: 'success',
                duration: 3000,
                isClosable: true
            });

            setRefresh(!refresh);
            onClose();
        } catch (error) {
            console.error('Error updating stock:', error);
            toast({
                title: 'An error occurred.',
                description: 'Unable to update the stock.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7059/api/Vendor');
                setVendorList(response.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Button
                bg="#4682b4"
                color="white"
                _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                }}
                onClick={onOpen}
            >
                Edit Stock
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Stock</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full" spacing={4}>
                            <Flex w="full" justifyContent="space-between">
                                <Text>Product ID</Text>
                                <Input
                                    w="52"
                                    type='number'
                                    placeholder="Product ID"
                                    value={productId}
                                    readOnly
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Quantity</Text>
                                <Input
                                    w="52"
                                    type='number'
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Invoice Number</Text>
                                <Input
                                    w="52"
                                    placeholder="Invoice Number"
                                    value={invoiceNumber}
                                // onChange={(e) => setInvoiceNumber(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Lot Number</Text>
                                <Input
                                    w="52"
                                    placeholder="Lot Number"
                                    value={lotNumber}
                                    onChange={(e) => setLotNumber(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Date</Text>
                                <Input
                                    w="52"
                                    type='date'
                                    placeholder="Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Vendor</Text>
                                <Select
                                    w='52'
                                    h="12"
                                    placeholder="Select Vendor"
                                    onChange={(event) => setVendorId(event.target.value)}
                                    value={vendorId}
                                >
                                    {vendorList.map((item) => (
                                        <option key={item.vendorId} value={item.vendorId}>
                                            {item.vendorName}
                                        </option>
                                    ))}
                                </Select>
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg="#4682b4"
                            color="white"
                            onClick={handleEditStock}
                            _hover={{
                                backgroundColor: "#4682b4",
                                color: "white"
                            }}
                        >
                            Update Stock
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditStock;
