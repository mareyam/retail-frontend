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
import DeleteModal from '../common/DeleteModal';

const BatteryDetailModal = ({ isOpen, onClose, batteryDetails }) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState({
    ...batteryDetails,
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
              <Text fontSize="20">ID</Text>
              <Text fontSize="20">{editableDetails.productId}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Brand Name</Text>
              {isEditing ? (
                <Input
                  w="40"
                  fontSize="20"
                  name="brandName"
                  value={editableDetails.brandName}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.brandName}</Text>
              )}
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Modal Number</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="productModel"
                  value={editableDetails.productModel}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.productModel}</Text>
              )}
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Description</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="productDescription"
                  value={editableDetails.productDescription}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.productDescription}</Text>
              )}
            </Flex>

            {/* <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Variant</Text>
              <Text fontSize='20'>{batteryDetails.variant}</Text>
            </Flex> */}

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Product Price</Text>
              {isEditing ? (
                <Input
                  fontSize="20"
                  w="40"
                  name="productPrice"
                  value={editableDetails.productPrice}
                  onChange={handleInputChange}
                />
              ) : (
                <Text fontSize="20">{editableDetails.productPrice}</Text>
              )}
            </Flex>

            {/* <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Discount</Text>
              <Text fontSize='20'>{batteryDetails.profit}</Text>
            </Flex> */}

            {/* <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Sale Price</Text>
              <Text fontSize='20'>{batteryDetails.salePrice}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Stock Left</Text>
              <Text fontSize='20'>{batteryDetails.stockLeft}</Text>
            </Flex> */}

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Date Received</Text>
              <Text fontSize="20">{batteryDetails.date}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Status</Text>

              {/* {isEditing ? (
                <Input
                  w='40'
                  fontSize="20"
                  name="productStatus"
                  value={editableDetails.productStatus}
                  onChange={handleInputChange}
                />
              ) : (
                <Text
                  fontSize="20"
                  color={
                    editableDetails.productStatus === 'Available'
                      ? 'green.600'
                      : 'red'
                  }
                >
                  {editableDetails.productStatus}
                </Text>
              )} */}
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
                // bgColor: {isEditing ? "green" : "orange"},
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
      {isOpenDelete && (
        <DeleteModal
          onClose={onCloseDelete}
          isOpen={isOpenDelete}
          batteryDetails={batteryDetails}
        />
      )}
    </Modal>
  );
};

export default BatteryDetailModal;
