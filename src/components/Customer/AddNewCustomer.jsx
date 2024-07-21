import React from 'react';
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
  Flex,RadioGroup,Stack, Radio
} from '@chakra-ui/react';

const AddNewCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
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
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Flex w="full" justifyContent="space-between">
                <Text>Customer Name</Text>
                <Input w="52" placeholder="Customer Name" />
              </Flex>

            <Flex w="full"  justifyContent="space-between">
                <Text>Customer Type</Text>
                <RadioGroup defaultValue='Retail'>
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
                <Input w="52" placeholder="ABC" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Phone Number</Text>
                <Input w="52" placeholder="032342342342" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{formattedDate}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4682b4"
        color="white"
              onClick={onClose}
              _hover={{
                backgroundColor:"#4682b4", 
                color:"white"
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
