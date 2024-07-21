import React, { useRef, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';

const ViewCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customerType, cart, addToCart, removeFromCart } = useStateStore();
  console.log(cart);
  const btnRef = React.useRef();

  return (
    <>
      <Button
        bg="#4682b4"
        color="white"
        _hover={{
          bg: '#4682b4',
          color: 'white',
        }}
        onClick={onOpen}
        ref={btnRef}
      >
        View Cart
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Check out</DrawerHeader>

          <DrawerBody>
            <TableContainer
              pos="relative"
              h="80dvh"
              css={{
                '&::-webkit-scrollbar': {
                  width: '10px',
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  borderRadius: '10px',
                  background: '#f0f0f0',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '10px',
                  background: '#ccc',
                },
              }}
            >
              <Table variant="striped" colorScheme="teal">
                <Thead
                  pos="sticky"
                  top="0"
                  zIndex="1"
                  bgColor="white"
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'white',
                  }}
                >
                  <Tr>
                    <Th>ID</Th>
                    <Th>Battery Name</Th>
                    <Th>Model Number</Th>
                    <Th>Variant</Th>
                    {/* <Th isNumeric>Quantity</Th> */}
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Total</Th>
                    <Th isNumeric>Remove Item</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentBatteryData.map((battery) => (
                    <Tr
                      key={battery.id}
                      onClick={() => {
                        // setBattery(battery);
                      }}
                    >
                      <Td>{battery.id}</Td>
                      <Td>{battery.name}</Td>
                      <Td>{battery.modelNumber}</Td>
                      <Td>{battery.variant}</Td>

                      {/* <Td>
                        <NumberInput
                          value={quantity}
                          // onChange={handleQuantityChange}
                          min={0}
                          max={battery.stockLeft}
                          step={1}
                          size="sm"
                          width="100px"
                          isDisabled={battery.stockLeft === 0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td> */}
                      <Td>PKR.{battery.salePrice}</Td>
                      {/* <Td>{quantity * battery.salePrice}</Td> */}
                      <Td>
                        <Button
                          bgColor="#319795"
                          color="white"
                          _hover={{
                            backgroundColor: '#319795',
                            color: 'white',
                          }}
                        >
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewCart;

const currentBatteryData = [
  {
    id: 1,
    name: 'Battery abc',
    modelNumber: 'BA123',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 100,
    salePrice: 150,
    stockLeft: 50,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
    quantity: 0,
  },
  {
    id: 2,
    name: 'abc Battery B',
    modelNumber: 'BB456',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 200,
    salePrice: 250,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
    quantity: 0,
  },
];
