import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  VStack,
  Text,
  Flex,
  HStack,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

const VendorDetailModal = ({ isOpen, onClose, vendorDetail }) => {

  console.log(vendorDetail)
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState({
    ...vendorDetail,
  });
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails({ ...editableDetails, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="24" textAlign="center">
          {editableDetails.brandName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="full" gap="4">


            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Vendor Name</Text>
              {isEditing ? (
                <Input
                  w="40"
                  fontSize="20"
                  name="brandName"
                  value={editableDetails.vendorName}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.vendorName}</Text>
              )}
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Description</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="productModel"
                  value={editableDetails.vendorDescription}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.vendorDescription}</Text>
              )}
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Address</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="vendorAddress"
                  value={editableDetails.vendorAddress}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.vendorAddress}</Text>
              )}
            </Flex>

            {/* <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Variant</Text>
              <Text fontSize='20'>{vendorDetail.variant}</Text>
            </Flex> */}

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Phone</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="phone"
                  value={editableDetails.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.phone}</Text>
              )}
            </Flex>


            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Date</Text>
              <Text fontSize="20">{vendorDetail.date}</Text>
            </Flex>


          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack gap="4">
            <Button
              onClick={onOpenDelete}
              bgColor="red"
              color="white"
              _hover={{
                bgColor: 'red',
                color: 'white',
              }}
            >
              Delete
            </Button>
            <Button
              bgColor={isEditing ? "green" : "orange"}
              color="white"
              _hover={{
                color: 'white',
              }}
              onClick={handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
            <Button
              bgColor="#319795"
              color="white"
              onClick={onClose}
              _hover={{
                bgColor: '#319795',
                color: 'white',
              }}
            >
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>

    </Modal>
  );
};

export default VendorDetailModal;
