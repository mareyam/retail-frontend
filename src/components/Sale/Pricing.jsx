import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Input, Flex } from '@chakra-ui/react';
import ReceiveStock from './ReceiveStock';
import useStateStore from '../zustand/store';


const Pricing = ({ total, quantity, discount }) => {
  const { totalAmountReceived, finalAmount, setFinalAmount } = useStateStore();
  const tr = total - totalAmountReceived;
  const [calcDiscount, setCalcDiscount] = useState(0)


  console.log(total)
  console.log(totalAmountReceived)
  console.log(finalAmount)
  console.log(calcDiscount)



  useEffect(() => {
    const discountValue = (total * discount) / 100;
    setCalcDiscount(discountValue);
  }, [total, discount]);

  console.log(calcDiscount)

  useEffect(() => {
    const amountAfterDiscount = total - calcDiscount;
    const netAmount = amountAfterDiscount - totalAmountReceived;
    setFinalAmount(netAmount);
  }, [total, calcDiscount, totalAmountReceived, setFinalAmount]);



  // useEffect(() => {
  //   setCalcDiscount((tr * discount) / 100)
  // }, [total, discount])

  // useEffect(() => {
  //   if (calcDiscount) {
  //     setFinalAmount(tr - calcDiscount)
  //   } else {
  //     setFinalAmount(tr)
  //   }
  // }, [discount, calcDiscount])
  // console.log(finalAmount)
  // console.log(calcDiscount)

  return (
    <VStack align="flex-start" spacing={2} w='full'  >
      <Flex w='full' justifyContent='space-between'>
        <Text px='4' fontSize='20' fontWeight='500'>Total</Text>
        <Text fontSize='20'>PKR: {total}</Text>
      </Flex>

      <Flex w='full' justifyContent='space-between'>
        <Text fontSize='20' px='4' fontWeight='500'>Discount Amount </Text>
        <Text align='flex-end' fontSize='20'>PKR. {calcDiscount ? calcDiscount : 0}</Text>
      </Flex>


      <Flex w='full' justifyContent='space-between'>
        <Text fontSize='20' px='4' fontWeight='500'>Returned Goods </Text>
        <Text align='flex-end' fontSize='20'>PKR: {totalAmountReceived ? totalAmountReceived : 0}</Text>
      </Flex>

      {/* <Input
          w='20%'
          value={discount}
        /> */}
      <Flex w='full' justifyContent='space-between'>
        <Text fontSize='20' px='4' fontWeight='500' >Net Amount</Text>
        <Text align='flex-end' fontSize='20'>PKR:{finalAmount ? finalAmount?.toFixed(1) : 0}</Text>
      </Flex>
    </VStack>
  );
};

export default Pricing;
