import React from "react";
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
} from "@chakra-ui/react";

const BatteryDetailModal = ({ isOpen, onClose, batteryDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="24" textAlign="center">
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="full" gap="4">
            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">ID</Text>
              <Text>{batteryDetails.id}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Modal Number</Text>
              <Text>{batteryDetails.modelNumber}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Description</Text>
              <Text>{batteryDetails.description}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Variant</Text>
              <Text>{batteryDetails.variant}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Purchase Price</Text>
              <Text>{batteryDetails.purchasePrice}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Discount</Text>
              <Text>{batteryDetails.profit}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Sale Price</Text>
              <Text>{batteryDetails.salePrice}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Stock Left</Text>
              <Text>{batteryDetails.stockLeft}</Text>
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Date Received</Text>
              <Text>{batteryDetails.date}</Text>
            </Flex>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="#319795"
            color="white"
            onClick={onClose}
            _hover={{
              bgColor: "#319795",
              color: "white",
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BatteryDetailModal;
