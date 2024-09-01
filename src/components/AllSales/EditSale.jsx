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
    RadioGroup,
    Stack,
    Radio,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';

const EditSale = ({ saleDetail, refresh, setRefresh, onClose, isOpen, onOpen }) => {
    const toast = useToast();

    const [remainingAmount, setRemainingAmount] = useState();

    useEffect(() => {
        if (saleDetail) {
            setRemainingAmount(saleDetail.remainingAmount);
        }
    }, [saleDetail]);



    const handleEditSale = async () => {
        const updatedSale = {
            invoiceNumber: saleDetail.invoiceNumber,
            customerId: saleDetail.customerId,
            totalBillAmount: saleDetail.totalBillAmount,
            totalDiscountAmount: saleDetail.totalDiscountAmount,
            finalBillAmount: saleDetail.finalBillAmount,
            receivedAmount: saleDetail.receivedAmount,
            remainingAmount: remainingAmount,
            returnedProductAmount: saleDetail.returnedProductAmount
        };
        console.log(updatedSale)
        try {
            const response = await axios.put(`https://localhost:7059/api/BillSummary/${saleDetail.billSummaryId}/TotalBillAmount=${saleDetail.totalBillAmount}`, updatedSale);
            console.log('Data:', response.data);
            console.log(response)

            toast({
                title: 'Sale record updated successfully',
                status: 'success',
                duration: 3000,
                isClosable: true
            });

            setRefresh(!refresh);
            onClose();
            setRemainingAmount()
        } catch (error) {

            console.error('Error updating sale record:', error);
            toast({
                title: 'An error occurred.',
                description: 'Unable to update the sale record.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

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
                Edit Sale Record
            </Button >
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Sale Record</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full">
                            <Flex w="full" justifyContent="space-between">
                                <Text>Bill Summary ID</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.billSummaryId}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Invoice Number</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.invoiceNumber}
                                />
                            </Flex>
                            <Flex w="full" justifyContent="space-between">
                                <Text>Customer ID</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.customerId}
                                />
                            </Flex>
                            <Flex w="full" justifyContent="space-between">
                                <Text>Total Bill Amount</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.totalBillAmount}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Total Discount Amount</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.totalDiscountAmount}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Final Bill Amount</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.finalBillAmount}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Returned Product Amount</Text>
                                <Input
                                    w="52"
                                    value={saleDetail.returnedProductAmount}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Remaining Bill Amount PKR {saleDetail.remainingAmount}</Text>
                                <Input
                                    w="52"
                                    placeholder="Remaining Bill Amount"

                                    onChange={(e) => setRemainingAmount(e.target.value)}
                                />
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent='space-between'>
                        <Text>New Amount Pending: {(saleDetail.remainingAmount - remainingAmount).toFixed(0)}</Text>
                        <Button
                            bg="#4682b4"
                            color="white"
                            onClick={handleEditSale}
                            _hover={{
                                backgroundColor: "#4682b4",
                                color: "white"
                            }}
                        >
                            Update Bill Record
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditSale;
