import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Input, Flex } from '@chakra-ui/react';
import ReceiveStock from './ReceiveStock';
import useStateStore from '../zustand/store';


const Pricing = ({ total, quantity }) => {
  const { totalAmountReceived, finalAmount, setFinalAmount, discount, setDiscount, } = useStateStore();
  const tr = total - totalAmountReceived;

  // const discountAmount = (tr * discount) / 100;

  useEffect(() => {
    setDiscount((tr * discount) / 100)
  }, [total])

  useEffect(() => {
    setFinalAmount(tr - discount)
  }, [discount])
  console.log(finalAmount)

  return (
    <VStack align="end" spacing={0} w='50%' >
      <Flex >
        <Text fontSize='20' px='4' fontWeight='500'>Total</Text>
        <Text fontSize='20'>PKR: {total}</Text>
      </Flex>

      <Flex>
        <Text fontSize='20' px='4' fontWeight='500'>Received</Text>
        <Text fontSize='20'>PKR: {totalAmountReceived}</Text>
      </Flex>
      <Flex justifyContent='flex-end'>
        <Text fontSize='20' px='4' fontWeight='500'>Discount %</Text>
        <Input
          w='20%'
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Enter discount"
        />
      </Flex>
      <Flex>
        <Text fontSize='20' px='4' fontWeight='500'>Net Amount</Text>
        <Text fontSize='20'>PKR:{finalAmount && finalAmount?.toFixed(1)}</Text>
      </Flex>
    </VStack>
  );
};

export default Pricing;
