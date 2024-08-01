import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  HStack,
  Text,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import useStateStore from '../zustand/store';

const CustomerTypeModal = ({ isOpen, onOpen, onClose, isCustomerAdded, setIsCustomerAdded, customers }) => {
  const { customerName, setCustomerName, customerType, setCustomerType } = useStateStore();
  console.log(customerType);
  console.log(customerName);
  console.log(customers);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="24" fontWeight="600" textAlign="center">
          Select Customer Type
        </ModalHeader>
        <ModalBody>
          <Box display="flex" justifyContent="space-between" w="full">
            <Button
              w="44"
              h="20"
              fontSize="20"
              bgColor="white"
              border="1px solid #319795"
              borderBottom="3px solid #319795"
              _hover={{
                borderBottom: '5px solid #319795',
                transition: 'all 0.5s ease',
              }}
              onClick={() => {
                setCustomerType('Retail');
                // onClose();
              }}
            >
              Retail
            </Button>
            <Button
              w="44"
              h="20"
              fontSize="20"
              bgColor="white"
              border="1px solid #319795"
              borderBottom="3px solid #319795"
              _hover={{
                borderBottom: '5px solid #319795',
                transition: 'all 0.5s ease',
              }}
              onClick={() => {
                setCustomerType('Wholesale');
                // onClose();
              }}
            >
              Wholesale
            </Button>
          </Box>

          <Box>
            <HStack pt='4' display={customerType == 'Retail' ? 'block' : 'none'}>
              <Text fontSize="14">Enter retail customer name</Text>
              <Input onChange={(event) => setCustomerName(event.target.value)} h="12" w="full" placeholder="Naveed" />
              <Box w='full'
                display='flex'
                justifyContent='flex-end' >
                <Button isDisabled={!customerName}
                  bg="#4682b4"
                  mt='2'
                  color="white"
                  _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                  }}
                  onClick={() => {
                    {
                      setIsCustomerAdded(true)
                      onClose()
                    }
                  }}
                >Proceed</Button>
              </Box>
            </HStack>

            <HStack pt='4' display={customerType == 'Wholesale' ? 'block' : 'none'}>
              <Text fontSize="14">Select wholesale customer name</Text>
              <Select onChange={(event) => setCustomerName(event.target.value)} h="12" w="full" placeholder="Select customer">
                {customers.map((item, index) => (
                  <option key={index} value={item.customerName}>
                    {item.customerName}
                  </option>
                ))}
              </Select>
              <Box w='full'
                display='flex'
                justifyContent='flex-end' >
                <Button isDisabled={!customerName}
                  bg="#4682b4"
                  mt='2'
                  color="white"
                  _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                  }}
                  onClick={() => {
                    {
                      setIsCustomerAdded(true)
                      onClose()
                    }
                  }}
                >Proceed</Button>
              </Box>

            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal >
  );
};

export default CustomerTypeModal;

const wholesaleNames = [
  'Name 1',
  'Name 2',
  'Name 3',
  'Name 4',
  'Name 5',
  'Name 6',
  'Name 7',
  'Name 8',
  'Name 9',
  'Name 10',
];
