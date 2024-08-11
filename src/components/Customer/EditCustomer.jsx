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

const EditCustomer = ({ customerDetails, refresh, setRefresh, onClose, isOpen, onOpen }) => {
  const toast = useToast();

  const [customerName, setCustomerName] = useState(customerDetails.customerName || '');
  const [customerType, setCustomerType] = useState(customerDetails.customerType || 'Retail');
  const [address, setAddress] = useState(customerDetails.address || '');
  const [phoneNumber, setPhoneNumber] = useState(customerDetails.phoneNumber || '');
  const [discountPercent, setDiscountPercent] = useState(customerDetails.discountPercent || 0);
  const [date, setDate] = useState(customerDetails.date || '');

  useEffect(() => {
    if (customerDetails) {
      setCustomerName(customerDetails.customerName);
      setCustomerType(customerDetails.customerType);
      setAddress(customerDetails.address);
      setPhoneNumber(customerDetails.phoneNumber);
      setDiscountPercent(customerDetails.discountPercent);
      setDate(customerDetails.date);
    }
  }, [customerDetails]);

  const validateFields = () => {
    const missingFields = [];

    if (customerName.length < 3 || customerName.length > 20) {
      missingFields.push('Customer Name must be between 3 and 20 characters.');
    }
    if (address.length < 7 || address.length > 30) {
      missingFields.push('Address must be between 7 and 30 characters.');
    }
    if (phoneNumber.length !== 11) {
      missingFields.push('Phone Number must be exactly 11 digits.');
    }
    if (discountPercent < 0 || discountPercent > 100) {
      missingFields.push('Discount Percent must be between 0% and 100%.');
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

  const handleEditCustomer = async () => {
    if (!validateFields()) return;

    const updatedCustomer = {
      date,
      customerName,
      address,
      phoneNumber,
      customerType,
      discountPercent
    };

    try {
      const response = await axios.put(`https://localhost:7059/api/Customer/${customerDetails.customerId}`, updatedCustomer);
      console.log('Data:', response.data);

      toast({
        title: 'Customer updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to update the customer.',
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
        Edit Customer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Flex w="full" justifyContent="space-between">
                <Text>Customer Name</Text>
                <Input
                  w="52"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Customer Type</Text>
                <RadioGroup value={customerType} onChange={setCustomerType}>
                  <Stack spacing='12' direction='row'>
                    <Radio colorScheme='green' value='Retail'>
                      Retail
                    </Radio>
                    <Radio colorScheme='green' value='Wholesale'>
                      Wholesale
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Address</Text>
                <Input
                  w="52"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Phone Number</Text>
                <Input
                  w="52"
                  type='number'
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Discount %</Text>
                <Input
                  w="52"
                  type='number'
                  placeholder="Discount"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{date.split('T')[0]}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4682b4"
              color="white"
              onClick={handleEditCustomer}
              _hover={{
                backgroundColor: "#4682b4",
                color: "white"
              }}
            >
              Update Customer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCustomer;
