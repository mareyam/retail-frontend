import useStateStore from '../zustand/store';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    HStack,
    IconButton,
    Flex,
    Box,
    chakra,
    Button,
    VStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import ViewCart from './ViewCart';
import { FaTrashAlt } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;
const Sale = () => {
    const { customerType, customerName, cart, addToCart, removeFromCart } =
        useStateStore();
    console.log(customerType);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBatteryData, setFilteredBatteryData] = useState(batteryData);
    const [battery, setBattery] = useState();
    const [products, setProducts] = useState(batteryData);
    const [selectedBattery, setSelectedBattery] = useState(null);
    const [addedBatteries, setAddedBatteries] = useState([]);
    const [quantity, setQuantity] = useState('');

    console.log(products.length);

    const totalItems = Object.values(cart).reduce(
        (total, count) => total + count,
        0
    );
    const totalCost = Object.entries(cart).reduce((total, [id, count]) => {
        const product = batteryData.find((product) => product.id === parseInt(id));
        if (product) {
            return total + product.salePrice * count;
        }
        return total;
    }, 0);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBatteryData = filteredBatteryData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredBatteryData.length / ITEMS_PER_PAGE);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleBatteryClick = (battery) => {
        setSelectedBattery(battery);
        if (!addedBatteries.find((item) => item.name === battery.name)) {
            setAddedBatteries([...addedBatteries, { ...battery, quantity: 1 }]);
        }
    };

    const handleAddClick = () => {
        if (selectedBattery && quantity) {
            setAddedBatteries([...addedBatteries, { ...selectedBattery, quantity }]);
            setQuantity('');
        }
    };

    // const handleDeleteClick = (index) => {
    //   const newBatteries = [...addedBatteries];
    //   newBatteries.splice(index, 1);
    //   setAddedBatteries(newBatteries);
    // };

    const handleDeleteClick = (index) => {
        const updatedBatteries = addedBatteries.filter((_, i) => i !== index);
        setAddedBatteries(updatedBatteries);
    };

    useEffect(() => {
        setFilteredBatteryData(
            batteryData.filter((battery) =>
                battery.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [searchQuery, batteryData]);

    return (
        <VStack
            bgColor="#F0FFF4"
            align="center"
            visibility={!customerType ? 'hidden' : 'visible'}
        >
            <HStack py="8" w="80%" justifyContent="space-between">
                <HStack>
                    <Text fontWeight="400">
                        Customer Type:
                        <chakra.span fontWeight="400"> {customerType}</chakra.span>
                    </Text>

                    <Text fontWeight="400">
                        Customer Name:
                        <chakra.span fontWeight="400"> {customerName}</chakra.span>
                    </Text>
                </HStack>
                {/* <Heading color="#4682b4">Sale</Heading> */}

                <Flex>
                    <Searchbar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <ViewCart />
                </Flex>
            </HStack>

            <Box w="90%" py="6">
                <HStack alignItems="start">
                    <Box
                        h="60dvh"
                        w="40%"
                        pos="relative"
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
                        <Table variant="simple" size="sm">
                            <Thead pos="sticky" top="0" zIndex={1} bgColor="#F0FFF4">
                                <Tr bg="#4682b4" color="white" pb="4">
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Battery Name
                                    </Th>
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Model Number
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody size="sm">
                                {currentBatteryData.map((battery, index) => (
                                    <Tr
                                        cursor="pointer"
                                        borderWidth={selectedBattery === battery ? '2px' : '0'}
                                        borderColor={
                                            selectedBattery === battery ? '#4682b4' : 'transparent'
                                        }
                                        borderStyle={selectedBattery === battery ? 'solid' : 'none'}
                                        bgColor={selectedBattery === battery ? 'blue.50' : 'none'}
                                        key={index}
                                        onClick={() => handleBatteryClick(battery)}
                                    >
                                        <Td>{battery.name}</Td>
                                        <Td>{battery.modelNumber}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>

                    <Box
                        overflowY="auto"
                        overflowX="hidden"
                        h="50dvh"
                        w="50%"
                        pos="relative"
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
                        <Table variant="simple" size="sm">
                            <Thead pos="sticky" top="0" zIndex={1} bgColor="#F0FFF4">
                                <Tr bg="#4682b4" color="white" pb="4">
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Quantity
                                    </Th>
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Model Number
                                    </Th>
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Quantity
                                    </Th>
                                    <Th textTransform="capitilize" color="white" fontSize="16">
                                        Actions
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody size="sm">
                                {addedBatteries.map((battery, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Box>
                                                <Text fontSize="12">Enter Quantity</Text>
                                                <NumberInput
                                                    defaultValue={1}
                                                    min={1}
                                                    max={100}
                                                    clampValueOnBlur={false}
                                                    w="32"
                                                >
                                                    <NumberInputField h="12" />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Box>
                                        </Td>
                                        <Td>{battery.name}</Td>
                                        <Td>{battery.modelNumber}</Td>
                                        <Td>{battery.quantity}</Td>
                                        <Td>
                                            <IconButton
                                                onClick={() => handleDeleteClick(index)}
                                                bgColor="transparent"
                                                color="#4682b4"
                                                aria-label="left-icon"
                                                icon={<FaTrashAlt />}
                                                fontSize="20"
                                                _hover={{
                                                    backgroundColor: 'transparent',
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </HStack>
            </Box>
            {/* <TableContainer
        border="1px solid"
        borderColor="gray.400"
        w="80%"
        pos="relative"
        h="auto"
        overflow="hidden"
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
        <Table variant="simple" size="sm">
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
            <Tr bg="#4682b4" color="white" pb="4">
              <Th textTransform="capitilize" color="white" fontSize="16">
                ID
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Battery Name
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Model Number
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Variant
              </Th>
              <Th textTransform="capitilize" color="white" fontSize="16">
                Availability
              </Th>
              <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Quantity
              </Th>
              <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Sale Price
              </Th>
              <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Stock Left
              </Th>
              <Th
                textTransform="capitilize"
                color="white"
                fontSize="16"
                isNumeric
              >
                Total
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBatteryData.map((battery, index) => (
              <Tr
                key={battery.id}
                onClick={() => {
                  setBattery(battery);
                }}
              >
                <Td>{battery.id}</Td>
                <Td>{battery.name}</Td>
                <Td>{battery.modelNumber}</Td>
                <Td>{battery.variant}</Td>
                <Td>
                  <Text
                    textAlign="center"
                    rounded="full"
                    color={
                      battery.availability === 'In Stock'
                        ? 'green.800'
                        : 'red.800'
                    }
                  >
                    {battery.availability}
                  </Text>
                </Td>
                <Td>
                  <Box>
                    <Button
                      onClick={() => removeFromCart(battery.id)}
                      isDisabled={(cart[battery.id] || 0) <= 0}
                    >
                      -
                    </Button>
                    <Text display="inline" mx={2}>
                      {cart[battery.id] || 0}
                    </Text>
                    <Button
                      onClick={() => addToCart(battery.id)}
                      isDisabled={(cart[battery.id] || 0) >= battery.stockLeft}
                    >
                      +
                    </Button>
                  </Box>
                </Td>
                <Td>PKR.{battery.salePrice}</Td>
                <Td isNumeric>{battery.stockLeft}</Td>
                <Td>
                  {cart[battery.id] === 0
                    ? 0
                    : (cart[battery.id] || 0) * battery.salePrice}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer> */}

            <HStack
                pos="absolute"
                bottom="4"
                spacing={4}
                alignItems="center"
                justifyContent="center"
            >
                <IconButton
                    disabled={currentPage == 1}
                    rounded="full"
                    bgColor="#4682b4"
                    aria-label="left-icon"
                    icon={<SlArrowLeft />}
                    fontSize="20"
                    color="white"
                    onClick={goToPreviousPage}
                    _hover={{
                        backgroundColor: '#4682b4',
                    }}
                />

                <Text>
                    Showing {startIndex + 1} to {Math.min(endIndex, batteryData.length)}{' '}
                    of {batteryData.length} entries
                </Text>
                <IconButton
                    rounded="full"
                    bgColor="#4682b4"
                    aria-label="left-icon"
                    icon={<SlArrowRight />}
                    color="white"
                    fontSize="20"
                    onClick={goToNextPage}
                    _hover={{
                        backgroundColor: '#4682b4',
                    }}
                    disabled={currentPage == totalPages}
                />
            </HStack>
        </VStack>
    );
};
export default Sale;



<Flex w='90%' pos='relative' justifyContent='space-between' border='1px solid red'>
          <Box
            border='1px solid red'
            h="auto"
            // w="60%"
            w='full'
            pos="relative"
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
            <Table variant="simple" size="sm">
              <Thead pos="sticky" top="0" zIndex={0} bgColor="#F0FFF4">
                <Tr bg="#4682b4" color="white" pb="4">
                  <Th textTransform="capitilize" color="white" fontSize="16">
                    Battery Name
                  </Th>
                  <Th textTransform="capitilize" color="white" fontSize="16">
                    Model Number
                  </Th>
                </Tr>
              </Thead>
              <Tbody size="sm">
                {batteries.map((battery, index) => (
                  <Tr
                    cursor="pointer"
                    borderWidth={selectedBattery === battery ? '2px' : '0'}
                    borderColor={
                      selectedBattery === battery ? '#4682b4' : 'transparent'
                    }
                    borderStyle={selectedBattery === battery ? 'solid' : 'none'}
                    bgColor={selectedBattery === battery ? 'blue.50' : 'none'}
                    key={battery.productId}
                    onClick={() => handleBatteryClick(battery)}
                  >
                    <Td>{battery.brandName}</Td>
                    <Td>{battery.productModel}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <HStack
              mt='4'
              w='full'
              spacing={4}
              justifyContent="flex-start"
            >
              <IconButton
                disabled={currentPage == 1}
                rounded="full"
                bgColor="#4682b4"
                aria-label="left-icon"
                icon={<SlArrowLeft />}
                fontSize="20"
                color="white"
                onClick={goToPreviousPage}
                _hover={{
                  backgroundColor: '#4682b4',
                }}
              />

              <Text>
                Showing {startIndex + 1} to {Math.min(endIndex, batteries.length)}{' '}
                of {batteries.length} entries
              </Text>
              <IconButton
                rounded="full"
                bgColor="#4682b4"
                aria-label="left-icon"
                icon={<SlArrowRight />}
                color="white"
                fontSize="20"
                onClick={goToNextPage}
                _hover={{
                  backgroundColor: '#4682b4',
                }}
                disabled={currentPage == totalPages}
              />
            </HStack>
          </Box>

          <Box pos='relative' >
            <Box
              border='1px solid red'
              w="full"
              overflowY="auto"
              overflowX="hidden"
              h="45dvh"
              pos="relative"
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
              <Table variant="simple" size="sm" pos='relative'>
                <Thead pos="sticky" top="0" zIndex={0} bgColor="#F0FFF4">
                  <Tr bg="#4682b4" color="white" pb="4">
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Quantity
                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Model Number
                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Price
                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Net Price
                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody size="sm">
                  {addedBatteries.map((battery, index) => (
                    <Tr key={index}>
                      <Td>
                        <NumberInput
                          defaultValue={1}
                          min={1}
                          max={100}
                          clampValueOnBlur={false}
                          w="32"
                        >
                          <NumberInputField h="6" />
                          <NumberInputStepper fontSize="4">
                            <NumberIncrementStepper onClick={() => handleIncreaseQuantity(battery)} />
                            <NumberDecrementStepper onClick={() => handleDecreaseQuantity(battery)} />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td>{battery.productModel}</Td>
                      <Td>{battery.productPrice}</Td>
                      <Td>PKR.{calculateTotalPrice(battery.quantity, battery.productPrice).toFixed(2)}</Td>

                      <Td>
                        <IconButton
                          p="none"
                          onClick={() => handleDeleteClick(index)}
                          bgColor="transparent"
                          color="#4682b4"
                          aria-label="left-icon"
                          icon={<FaTrashAlt />}
                          fontSize="12"
                          _hover={{
                            backgroundColor: 'transparent',
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>


              </Table>

              {/* <Box
            position="fixed"
            top={0}
              left={0}
            width="100%"
            height="100%"
            display={!saleMade ? 'block' : 'none'}
            bg="rgba(0, 0, 0, 0.5)"
            zIndex="1"
          /> */}



            </Box>


            <HStack gap='2' justifyContent='flex-end'>
              <VStack
              >
                <Button
                  zIndex='100'
                  w='full'
                  onClick={onOpen}
                  bg="#4682b4"
                  color="white"
                  _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                  }}
                  isDisabled={isCustomerAdded}
                >Add</Button>
                <Button onClick={handlePostSale}
                  w='full'
                  isDisabled={addedBatteries.length === 0}
                  bg="#4682b4"
                  color="white"
                  _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                  }}
                >Save</Button>
                <ReceiveStock

                />
                <Button onClick={handleCancel}
                  w='full'
                  zIndex='100'
                  bg="#4682b4"
                  color="white"
                  _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                  }}
                >Cancel</Button>
              </VStack>

              <Pricing total={overallTotal} quantity={totalQuantity}
              />
            </HStack>
          </Box>

          <Box
            position="fixed"
            top="44"
            left='18rem'
            width="74rem"
            height="45dvh"
            display={saleMade ? 'block' : 'none'}
            bg="rgba(0, 0, 0, 0.1)"
            zIndex="1" />


        </Flex>