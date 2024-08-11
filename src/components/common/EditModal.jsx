import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const EditModal = ({ isOpen, onClose, batteryDetails }) => {
  const toast = useToast();
  console.log(batteryDetails);
  const handleDeleteRecord = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7059/api/Product/${batteryDetails.productId}`
      );
      console.log('Data:', response.data);
      toast({
        title: 'Record deleted.',
        description: 'The record has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete the record.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="28" textAlign="center">
          {batteryDetails.brandName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="20">
            Are you sure you want to delete
            <chakra.span fontWeight="600">
              &nbsp;{batteryDetails.brandName}
            </chakra.span>{' '}
            with Modal Number
            <chakra.span fontWeight="600">
              &nbsp; {batteryDetails.productModel}?
            </chakra.span>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleDeleteRecord}
            w="full"
            bgColor="red"
            color="white"
            _hover={{
              bgColor: 'red',
              color: 'white',
            }}
          >
            Confirm Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
