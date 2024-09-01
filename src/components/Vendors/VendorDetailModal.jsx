import React, { useState, useEffect } from 'react';
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
  Input,
  useToast
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { updateVendor } from '@/hooks/vendors';


const VendorDetailModal = ({ isOpen, onClose, vendorDetail, refresh, setRefresh }) => {
  const toast = useToast();

  const [brandName, setBrandName] = useState(vendorDetail.brandName || '');
  const [vendorName, setVendorName] = useState(vendorDetail.vendorName || '');
  const [vendorDescription, setVendorDescription] = useState(vendorDetail.vendorDescription || '');
  const [vendorAddress, setVendorAddress] = useState(vendorDetail.vendorAddress || '');
  const [phone, setPhone] = useState(vendorDetail.phone || '');
  const [date, setDate] = useState(vendorDetail.date || '');

  useEffect(() => {
    if (vendorDetail) {
      setBrandName(vendorDetail.brandName || '');
      setVendorName(vendorDetail.vendorName || '');
      setVendorDescription(vendorDetail.vendorDescription || '');
      setVendorAddress(vendorDetail.vendorAddress || '');
      setPhone(vendorDetail.phone || '');
      setDate(vendorDetail.date || '');
    }
  }, [vendorDetail]);

  const validateFields = () => {
    const missingFields = [];

    if (vendorName.length < 3 || vendorName.length > 20) {
      missingFields.push('Vendor Name must be between 3 and 20 characters.');
    }
    if (vendorAddress.length < 7 || vendorAddress.length > 30) {
      missingFields.push('Address must be between 7 and 30 characters.');
    }
    if (phone.length !== 11) {
      missingFields.push('Phone Number must be exactly 11 digits.');
    }

    if (missingFields.length > 0) {
      toast({
        title: 'Validation Error',
        description: missingFields.join(' '),
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return false;
    }
    return true;
  };


  const mutation = useMutation({
    mutationFn: updateVendor,
    onSuccess: () => {
      toast({
        title: 'Vendor updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      setRefresh(!refresh);
      queryClient.invalidateQueries(['vendors']);
    },
    onError: (error) => {
      console.error('Error updating vendor:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to update the vendor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });


  const handleSave = () => {
    if (!validateFields()) return;

    const updatedVendor = {
      brandName,
      vendorName,
      vendorDescription,
      vendorAddress,
      phone,
      date,
    };

    mutation.mutate({ vendorId: vendorDetail.vendorId, updatedVendor });
    onClose();

  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="24" textAlign="center">
          {brandName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="full" gap="4">
            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Vendor Name</Text>
              <Input
                w="40"
                fontSize="20"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Description</Text>
              <Input
                fontSize="20"
                w="40"
                value={vendorDescription}
                onChange={(e) => setVendorDescription(e.target.value)}
              />
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Address</Text>
              <Input
                fontSize="20"
                w="40"
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
              />
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Phone</Text>
              <Input
                fontSize="20"
                w="40"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Flex>

            <Flex w="full" justifyContent="space-between">
              <Text fontSize="20">Date</Text>
              <Text fontSize="20">{date.split('T')[0]}</Text>
            </Flex>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="green"
            color="white"
            _hover={{ bgColor: 'green', color: 'white' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VendorDetailModal;
