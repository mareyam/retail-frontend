import React, { useState } from "react";
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
} from "@chakra-ui/react";
import useStateStore from "../zustand/store";

const CustomerTypeModal = () => {
  const { isOpen, onClose, customerType, setCustomerType } = useStateStore();
  console.log(customerType);

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
                borderBottom: "5px solid #319795",
                transition: "all 0.5s ease",
              }}
              onClick={() => {
                setCustomerType("Retail");
                onClose();
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
                borderBottom: "5px solid #319795",
                transition: "all 0.5s ease",
              }}
              onClick={() => {
                setCustomerType("Wholesale");
                onClose();
              }}
            >
              Wholesale
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomerTypeModal;
