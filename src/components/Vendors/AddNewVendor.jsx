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
  useToast,
} from '@chakra-ui/react';
import { FaTruckPlane } from 'react-icons/fa6';
import axios from 'axios'

const AddNewVendor = ({ refresh, setRefresh }) => {
  const toast = useToast();
  const [vendorName, setVendorName] = useState("");
  const [vendorDescription, setVendorDescription] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();

  console.log(vendorName)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handlePostVendor = async () => {
    const vendorData = {
      vendorName: vendorName,
      vendorDescription: vendorDescription,
      vendorAddress: vendorAddress,
      phone: vendorPhone,
    }
    console.log(vendorData);
    try {
      const response = await axios.post('https://localhost:7059/api/Vendor',
        vendorData
      );
      console.log('Data:', response.data);
      toast({
        title: "vendor added",
        description: "",
        status: 'success',
        duration: 3000,
        isClosable: FaTruckPlane
      })
      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to add the record.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

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
        +
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Flex w="full" justifyContent="space-between">
                <Text>Vendor Name</Text>
                <Input
                  value={vendorName}
                  onChange={(event) => setVendorName(event.target.value)}
                  w="52" placeholder="Vendor Name" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Description</Text>
                <Input
                  value={vendorDescription}
                  onChange={(event) => setVendorDescription(event.target.value)}
                  w="52" placeholder="Descripion" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Address</Text>
                <Input w="52"
                  value={vendorAddress}
                  onChange={(event) => setVendorAddress(event.target.value)}
                  placeholder="ABC" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Phone Number</Text>
                <Input w="52"
                  value={vendorPhone}
                  onChange={(event) => setVendorPhone(event.target.value)}
                  placeholder="032342342342" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{formattedDate}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="#4682b4"
              color="white"
              onClick={handlePostVendor}
              _hover={{
                bgColor: '#4682b4',
                color: 'white',
              }}
            >
              Add Vendor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewVendor;
