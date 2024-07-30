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

const EditCustomer = ({ customerId, refresh, setRefresh, onClose, isOpen, onOpen }) => {
  const toast = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerType, setCustomerType] = useState('Retail');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (customerId) {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(`https://localhost:7059/api/Customer/${customerId}`);
          const customer = response.data;
          setCustomerName(customer.customerName);
          setCustomerType(customer.customerType);
          setAddress(customer.address);
          setPhoneNumber(customer.phoneNumber);
          setDiscountPercent(customer.discountPercent);
          setDate(customer.date);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      };
      fetchCustomerData();
    }
  }, [customerId]);

  const handleEditCustomer = async () => {
    const updatedCustomer = {
      date,
      customerName,
      address,
      phoneNumber,
      customerType,
      discountPercent
    };

    try {
      const response = await axios.put(`https://localhost:7059/api/Customer/${customerId}`, updatedCustomer);
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
        duration: 5000,
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
