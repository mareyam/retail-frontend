import { Box, Flex, Heading, VStack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useStateStore from "../zustand/store";

const ReceiptComponent = () => {
    const { addedBatteries, discount, receivedAmount, setSelectedComponent, returnedProductAmount } = useStateStore();
    const [discountAmount, setDiscountAmount] = useState();

    console.log(receivedAmount)
    const calculateTotalPrice = (quantity, price) => quantity * price;
    const totalAmount = addedBatteries?.reduce((total, item) => total + calculateTotalPrice(item.quantity, item.productPrice), 0);

    useEffect(() => {
        setDiscountAmount(totalAmount * (discount / 100));
    }, [totalAmount, discount]);

    const remainingAmount = totalAmount - discountAmount - receivedAmount - returnedProductAmount;

    const handlePrint = () => {
        window.print();
    };

    const handleClose = () => {
        setSelectedComponent('Product Sale')
        // window.close();
    };

    return (
        <Box position='relative' h='85vh' bgColor='#4682b4' display='flex' alignItems='center' justifyContent='center'>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Box w='400px' h='600px' bgColor='white' p={4} boxShadow='xl' borderRadius='md' overflow='auto'>
                    <VStack spacing={4} align='stretch'>
                        <Heading textAlign='center'>Battery House</Heading>
                        <Box w='full' h='1px' borderBottom='5px dotted black' />
                        <Flex w='full' justifyContent='space-between' fontWeight='bold'>
                            <Text flex='1'>Qty</Text>
                            <Text flex='3'>Item Name</Text>
                            <Text flex='1' textAlign='right'>Price</Text>
                        </Flex>

                        <VStack align='stretch' spacing={2} h='120px' overflowY='auto'>
                            {addedBatteries.map((item, index) => (
                                <Flex w='full' justifyContent='space-between' key={index}>
                                    <Text flex='1'>{item.quantity}</Text>
                                    <Text flex='2'>{item.productModel}</Text>
                                    <Text w='full' flex='1' textAlign='right'>PKR {item.productPrice}</Text>
                                </Flex>
                            ))}
                        </VStack>

                        <Box w='full' h='1px' borderBottom='2px dotted black' />
                        <Flex w='full' justifyContent='space-between' mt={2}>
                            <Text fontWeight='500'>Total</Text>
                            <Text>PKR {totalAmount}</Text>
                        </Flex>
                        <Flex w='full' justifyContent='space-between'>
                            <Text fontWeight='500'>Discount</Text>
                            <Text>PKR {discountAmount ? discountAmount : 0}</Text>
                        </Flex>
                        <Flex w='full' justifyContent='space-between'>
                            <Text fontWeight='500'>Received Goods Amount</Text>
                            <Text>PKR {receivedAmount ? receivedAmount : 0}</Text>
                        </Flex>

                        <Flex w='full' justifyContent='space-between'>
                            <Text fontWeight='500'>Returned Goods Amount</Text>
                            <Text>PKR {returnedProductAmount ? returnedProductAmount : 0}</Text>
                        </Flex>
                        <Box w='full' h='1px' borderBottom='3px dotted black' />
                        <Flex w='full' justifyContent='space-between'>
                            <Text fontWeight='500'>Remaining Amount</Text>
                            <Text fontWeight='500'>PKR {remainingAmount}</Text>
                        </Flex>
                        <Box w='full' h='1px' borderBottom='3px dotted black' />
                        <Text textAlign='center' mt={4} fontSize='20' fontWeight='600'>Thank you</Text>
                    </VStack>
                </Box>
                <Flex position='absolute' right='20px' bottom='20px' flexDirection='row'>
                    <Button onClick={handleClose} mr={4}>Close</Button>
                    <Button onClick={handlePrint}>Print</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default ReceiptComponent;
