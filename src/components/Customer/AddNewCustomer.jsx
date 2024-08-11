import React, { useState } from 'react';
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

const AddNewCustomer = ({ refresh, setRefresh }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerType, setCustomerType] = useState('Retail');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const handleAddCustomer = async () => {
    const missingFields = [];

    if (customerName === "") missingFields.push("Customer Name");
    if (address === "") missingFields.push("Address");
    if (phoneNumber === "") missingFields.push("Phone Number");

    if (customerName && (customerName.length < 3 || customerName.length > 20)) {
      missingFields.push("Customer Name (must be between 3 and 20 characters)");
    }

    if (address && (address.length < 12 || address.length > 30)) {
      missingFields.push("Address (must be between 12 and 30 characters)");
    }

    if (phoneNumber && phoneNumber.length !== 11) {
      missingFields.push("Phone Number (must be exactly 11 digits)");
    }

    if (missingFields.length > 0) {
      toast({
        title: `${missingFields.join(', ')} fields are missing or incorrect`,
        description: `Please check and correct the details.`,
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const newCustomer = {
      date: formattedDate,
      customerName,
      address,
      phoneNumber,
      customerType,
      discountPercent
    };
    console.log(newCustomer)
    try {
      const response = await axios.post('https://localhost:7059/api/Customer', newCustomer);
      console.log('Data:', response.data);

      toast({
        title: 'Customer added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to add the customer.',
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
        Add New Customer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Flex w="full" justifyContent="space-between">
                <Text>Customer Name</Text>
                <Input
                  w="52"
                  minLength='3'
                  maxLength='20'
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
                  minLength='3'
                  maxLength='30'
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Phone Number</Text>
                <Input
                  w="52"
                  minLength='11'
                  maxLength='11'
                  type='number'
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Discount %</Text>
                {/* <Input
                  w="52"
                  type='number'
                  placeholder="Discount"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                /> */}
                <Input
                  w="52"
                  type='number'
                  placeholder="Discount"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                />
              </Flex>



              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{formattedDate.split('T')[0]}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4682b4"
              color="white"
              onClick={handleAddCustomer}
              _hover={{
                backgroundColor: "#4682b4",
                color: "white"
              }}
            >
              Add Customer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewCustomer;
