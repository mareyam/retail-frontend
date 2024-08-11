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
  Stack,
  RadioGroup,
  Radio,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AddNewProduct = ({ refresh, setRefresh }) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [brandId, setBrandId] = useState(0);
  const [productModel, setProductModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(false);

  console.log(status);
  const handleAddProduct = async () => {
    const productData = {
      brandId: 2,
      productModel: productModel,
      productDescription: description,
      productPrice: price,
      productStatus: status,
    };
    console.log(productData);
    try {
      const response = await axios.post(
        'https://localhost:7059/api/Product',
        productData
      );
      console.log('Data:', response.data);
      toast({
        title: 'Record deleted.',
        description: 'The record has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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
        +
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Battery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              {/* <Flex w="full" justifyContent="space-between">
                <Text>Brand ID</Text>
                <Input
                  w="52"
                  placeholder="Brand ID"
                  value={brandId}
                  onChange={(e) => setBrandId(Number(e.target.value))}
                />
              </Flex> */}

              <Flex w="full" justifyContent="space-between">
                <Text>Battery Name</Text>
                <Input
                  value={productModel}
                  onChange={(e) => setProductModel(e.target.value)}
                  w="52"
                  placeholder="Battery Name"
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Description</Text>
                <Input
                  w="52"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Price</Text>
                <Input
                  w="52"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Status</Text>
                <RadioGroup
                  onChange={(value) => setStatus(value === 'true')}
                  value={String(status)}
                >
                  <Stack direction="row">
                    <Radio value="true">Available</Radio>
                    <Radio value="false">Not Available</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>

              {/* <Flex w="full" justifyContent="space-between">
                <Text>Quantity</Text>
                <Input w="52" placeholder="123" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Purchase From</Text>
                <Input w="52" placeholder="ABC" />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Price</Text>
                <Input w="52" placeholder="Rs. 15,000" />
              </Flex> */}

              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{formattedDate}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="#319795"
              color="white"
              onClick={handleAddProduct}
              _hover={{
                bgColor: '#319795',
                color: 'white',
              }}
            >
              Add Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewProduct;
