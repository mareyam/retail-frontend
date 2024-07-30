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
  RadioGroup,
  Stack,
  Radio,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const AddNewCustomer = ({ refresh, setRefresh }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerType, setCustomerType] = useState('Retail');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const handleAddCustomer = async () => {
    const newCustomer = {
      date: formattedDate,
      customerName,
      address,
      phoneNumber,
      customerType,
      discountPercent
    };

    try {
      const response = await axios.post('https://localhost:7059/api/Customer', newCustomer);
      console.log('Data:', response.data);

      toast({
        title: 'Customer added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to add the customer.',
        status: 'error',
        duration: 5000,
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
        Add New Customer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Flex w="full" justifyContent="space-between">
                <Text>Customer Name</Text>
                <Input
                  w="52"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Customer Type</Text>
                <RadioGroup value={customerType} onChange={setCustomerType}>
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
                <Input
                  w="52"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Phone Number</Text>
                <Input
                  w="52"
                  type='number'
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Discount %</Text>
                <Input
                  w="52"
                  type='number'
                  placeholder="Discount"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                />
              </Flex>

              <Flex w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Text w="52">{formattedDate.split('T')[0]}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4682b4"
              color="white"
              onClick={handleAddCustomer}
              _hover={{
                backgroundColor: "#4682b4",
                color: "white"
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

// import React from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   useDisclosure,
//   Button,
//   ModalCloseButton,
//   VStack,
//   Text,
//   Input,
//   Flex, RadioGroup, Stack, Radio
// } from '@chakra-ui/react';

// const AddNewCustomer = ({ refresh, setRefresh }) => {

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const currentDate = new Date();

//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//   const day = String(currentDate.getDate()).padStart(2, '0');

//   const formattedDate = `${year}-${month}-${day}`;
//   return (
//     <>
//       <Button
//         bg="#4682b4"
//         color="white"
//         _hover={{
//           bgColor: '4682b4',
//           color: 'white',
//         }}
//         onClick={onOpen}
//       >
//         Add New Customer
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose} size="xl">
//         <ModalOverlay />
//         <ModalOverlay />
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add New Customer</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack w="full">
//               <Flex w="full" justifyContent="space-between">
//                 <Text>Customer Name</Text>
//                 <Input w="52" placeholder="Customer Name" />
//               </Flex>

//               <Flex w="full" justifyContent="space-between">
//                 <Text>Customer Type</Text>
//                 <RadioGroup defaultValue='Retail'>
//                   <Stack spacing='12' direction='row'>
//                     <Radio colorScheme='green' value='Retail'>
//                       Retail
//                     </Radio>
//                     <Radio colorScheme='green' value='Wholesale'>
//                       Wholesale
//                     </Radio>
//                   </Stack>
//                 </RadioGroup>
//               </Flex>

//               <Flex w="full" justifyContent="space-between">
//                 <Text>Address</Text>
//                 <Input w="52" placeholder="ABC" />
//               </Flex>

//               <Flex w="full" justifyContent="space-between">
//                 <Text>Phone Number</Text>
//                 <Input w="52" placeholder="032342342342" />
//               </Flex>

//               <Flex w="full" justifyContent="space-between">
//                 <Text>Date</Text>
//                 <Text w="52">{formattedDate}</Text>
//               </Flex>
//             </VStack>
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               bg="#4682b4"
//               color="white"
//               onClick={onClose}
//               _hover={{
//                 backgroundColor: "#4682b4",
//                 color: "white"
//               }}
//             >
//               Add Customer
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default AddNewCustomer;
