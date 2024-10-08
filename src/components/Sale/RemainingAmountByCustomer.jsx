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
    Box,
} from '@chakra-ui/react';
import { FaTruckPlane } from 'react-icons/fa6';
import axios from 'axios'
import useStateStore from '../zustand/store';

const RemainingAmountByCustomer = ({
    invoiceNumber,
    setIsCustomerAdded,
    setSaleMade,
    totalBillAmount, totalDiscountAmount,
    saleMade, customerName, customerId, discount }) => {
    const toast = useToast();
    const { receivedAmount, setReceivedAmount, totalAmountReceived,
        returnedProductAmount, setReturnedProductAmount,
        setSelectedComponent
    } = useStateStore();

    const [finalBillAmount, setFinalBillAmount] = useState();
    const [discountAmount, setDiscountAmount] = useState();
    const [remainingAmount, setRemainingAmount] = useState("");
    const [total, setTotal] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        if (discount > 0) {
            setDiscountAmount(totalBillAmount * (discount / 100));
        }
        else setDiscountAmount(0)

    }, [totalBillAmount, discount]);


    console.log(totalAmountReceived)
    console.log(discountAmount)


    const handlePostRemainingAmount = async () => {
        const remainingAmountData = {
            invoiceNumber: invoiceNumber,
            customerId, customerId,
            totalBillAmount: totalBillAmount,
            totalDiscountAmount: discountAmount,
            receivedAmount: receivedAmount,
            remainingAmount: remainingAmount,
            returnedProductAmount: returnedProductAmount,
            finalBillAmount: finalBillAmount,
        }
        console.log(remainingAmountData);
        try {
            const response = await axios.post('https://localhost:7059/api/BillSummary',
                remainingAmountData
            );
            console.log('Data:', response.data);
            toast({
                title: `Remaining Amount for ${customerName} added`,
                description: "",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            onClose();
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error adding remaining amount:', error);
            // toast({
            //     title: 'An error occurred.',
            //     description: 'Unable to add the record.',
            //     status: 'error',
            //     duration: 3000,
            //     isClosable: true,
            // });
        }
    }


    const handleClearFields = () => {
        setFinalBillAmount(null);
        setReceivedAmount(null);
        setRemainingAmount(null);
        setReturnedProductAmount(null);
    };

    console.log(totalBillAmount + " " + discountAmount + " " + returnedProductAmount + " " + receivedAmount + " " + totalAmountReceived)

    useEffect(() => {
        setFinalBillAmount(totalBillAmount - discountAmount - returnedProductAmount - receivedAmount - totalAmountReceived);
    }, [totalBillAmount, discountAmount, returnedProductAmount, receivedAmount]);


    useEffect(() => {
        setRemainingAmount(finalBillAmount - receivedAmount - totalAmountReceived);
    }, [finalBillAmount, receivedAmount, totalAmountReceived]);



    // useEffect(() => {
    //     setFinalBillAmount(totalBillAmount - discountAmount)
    // }, [totalBillAmount, discountAmount, receivedAmount, returnedProductAmount])

    return (
        <>

            <Button
                fontSize='12'
                zIndex='100'
                w='28'
                onClick={() => {
                    setIsCustomerAdded(true)
                    setSaleMade(false)
                    setSelectedComponent('Receipt')
                }}
                bg="#4682b4"
                color="white"
                _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                }}
                isDisabled={!saleMade}
            >Print Receipt</Button>

            <Button
                bg="#4682b4"
                color="white"
                _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                }}
                onClick={onOpen}
                isDisabled={saleMade}

                w='28'
                fontSize='12'
            >
                Payment
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalOverlay />
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Remaining Amount for {customerName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full">
                            <Flex w="full" justifyContent="space-between">
                                <Text>Total Bill Amount</Text>
                                <Input
                                    value={totalBillAmount}
                                    w="52" />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Total Discount Amount</Text>
                                <Input
                                    value={discountAmount?.toFixed(0)}
                                    w="52" />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Received Goods Amount</Text>
                                <Input
                                    value={totalAmountReceived}
                                    w="52" />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Received Amount</Text>
                                <Input
                                    value={receivedAmount}
                                    onChange={(event) => setReceivedAmount(event.target.value)}
                                    w="52" placeholder="Received Amount" />
                            </Flex>
                            <Flex w="full" justifyContent="space-between">
                                <Text>Returned Product Amount</Text>
                                <Input
                                    value={returnedProductAmount}
                                    onChange={(event) => setReturnedProductAmount(event.target.value)}
                                    w="52" placeholder="Returned Product Amount" />
                            </Flex>




                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent='space-between' w='full'>
                            <Text fontSize='20' fontWeight='700'>PKR. {finalBillAmount?.toFixed(0)}</Text>

                            <Box>
                                <Button
                                    bgColor="#4682b4"
                                    color="white"
                                    onClick={handlePostRemainingAmount}
                                    _hover={{
                                        bgColor: '#4682b4',
                                        color: 'white',
                                    }}
                                >
                                    Add Payable Amount
                                </Button>
                                <Button onClick={onClose}>
                                    Close
                                </Button>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};

export default RemainingAmountByCustomer;
