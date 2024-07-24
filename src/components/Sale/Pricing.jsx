import React, { useState } from 'react';
import { Box, VStack, Text, Input } from '@chakra-ui/react';

const Pricing = () => {
    const [discount, setDiscount] = useState(0);
    const total = 5000;
    const received = 3000;
    const finalAmount = total - discount - received;

    return (
        <Box>
            <VStack align="start" spacing={4} border='1px solid red'>
                <Box>
                    <Text>Total</Text>
                    <Text>{total}</Text>
                </Box>
                <Box>
                    <Text>Received</Text>
                    <Text>{received}</Text>
                </Box>
                <Box>
                    <Text>Discount</Text>
                    <Input
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        placeholder="Enter discount"
                    />
                </Box>
                <Box>
                    <Text>Final Amount</Text>
                    <Text>{finalAmount}</Text>
                </Box>


            </VStack>
        </Box>
    );
};

export default Pricing;
