import React, { useState } from 'react';
import {
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Box,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import BATTERY_DATA from '../common/data';
import { FaTrashAlt } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';

const AddNewInvoice = () => {
  const vendors = [
    'Vendor 1',
    'Vendor 2',
    'Vendor 3',
    'Vendor 4',
    'Vendor 5',
    'Vendor 6',
    'Vendor 7',
    'Vendor 8',
    'Vendor 9',
    'Vendor 10',
  ];
  const ITEMS_PER_PAGE = 10;

  const [selectedBattery, setSelectedBattery] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [addedBatteries, setAddedBatteries] = useState([]);
  const { setSelectedComponent } = useStateStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBatteryData, setFilteredBatteryData] = useState(BATTERY_DATA);
  const [battery, setBattery] = useState();
  const [products, setProducts] = useState(BATTERY_DATA);

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
  };

  const handleAddClick = () => {
    if (selectedBattery && quantity) {
      setAddedBatteries([...addedBatteries, { ...selectedBattery, quantity }]);
      setQuantity('');
    }
  };

  const handleDeleteClick = (index) => {
    const newBatteries = [...addedBatteries];
    newBatteries.splice(index, 1);
    setAddedBatteries(newBatteries);
  };

  return (
    <>
      <Box align="center" py="2">
        <HStack w="90%" justifyContent="space-between">
          <HStack>
            <Text fontWeight="600" fontSize="20" color="#4682b4">
              Invoice #
            </Text>
            <Input
              type="text"
              border="1px solid #949494"
              bgColor="white"
              w="24"
            />
            <Text pl="10" fontWeight="600" fontSize="20" color="#4682b4">
              Select Vendor
            </Text>
            <Select
              border="1px solid #949494"
              w="44"
              bgColor="white"
              // rounded="full"
            >
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor}>
                  {vendor}
                </option>
              ))}
            </Select>
          </HStack>
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
                      borderStyle={
                        selectedBattery === battery ? 'solid' : 'none'
                      }
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
            <VStack>
              <Input
                w="32"
                type="number"
                min="1"
                max="99"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                bg="#4682b4"
                color="white"
                _hover={{
                  backgroundColor: '#4682b4',
                  color: 'white',
                }}
                onClick={handleAddClick}
              >
                Add
              </Button>
            </VStack>
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
                      Battery Name
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
        <Box w="90%" display="flex" justifyContent="flex-end">
          <Button
            mr="2"
            onClick={() => setSelectedComponent('LandingPage')}
            bg="#4682b4"
            color="white"
            _hover={{
              backgroundColor: '#4682b4',
              color: 'white',
            }}
          >
            Close
          </Button>
          <Button
            bg="#4682b4"
            color="white"
            _hover={{
              backgroundColor: '#4682b4',
              color: 'white',
            }}
          >
            Save
          </Button>
        </Box>

        <HStack
          pos="absolute"
          bottom="4"
          left="25%"
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            // disabled={currentPage == 1}
            rounded="full"
            bg="#4682b4"
            aria-label="left-icon"
            icon={<SlArrowLeft backgroundColor="red" />}
            fontSize="20"
            color="white"
            onClick={goToPreviousPage}
            _hover={{
              backgroundColor: '#4682b4',
            }}
          />

          <Text>
            Showing
            {startIndex + 1} to {Math.min(endIndex, filteredBatteryData.length)}{' '}
            of {filteredBatteryData.length} entries entries
          </Text>
          <IconButton
            rounded="full"
            bg="#4682b4"
            aria-label="left-icon"
            icon={<SlArrowRight />}
            color="white"
            fontSize="20"
            onClick={goToNextPage}
            _hover={{
              backgroundColor: '#4682b4',
            }}
            // disabled={currentPage == totalPages}
          />
        </HStack>
      </Box>
    </>
  );
};

export default AddNewInvoice;