import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  VStack,
  Td,
  TableContainer,
  Text,
  HStack,
  IconButton,
  Heading,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import Searchbar from '../common/Searchbar';
import AddNewProduct from '../common/AddNewProduct';
import BatteryDetailModal from './BatteryDetailModal';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;

const BatteryInventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [batteries, setBatteries] = useState([]);
  const [filteredBatteryData, setFilteredBatteryData] = useState(batteries);
  // const [filteredBatteryData, setFilteredBatteryData] = useState(batteryData);

  const [battery, setBattery] = useState();

  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();

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

  useEffect(() => {
    setFilteredBatteryData(
      batteries.filter((battery) =>
        battery.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, batteries]);

  // console.log(filteredBatteryData.length);
  // console.log(currentBatteryData.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Product');
        console.log('Data:', response.data);
        setBatteries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log(batteries);
  return (
    <VStack h="85dvh" bgColor="#F0FFF4" align="center">
      <HStack w="80%">
        <Flex py="8" justifyContent="space-between" w="full">
          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <AddNewProduct />
        </Flex>
      </HStack>
      <TableContainer
        border="1px solid"
        borderColor="gray.400"
        mt="2"
        w="80%"
        pos="relative"
        // h="61dvh"
        h="auto"
        overflowY="auto"
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
                Description
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
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBatteryData.map((battery) => (
              <Tr lineHeight="1" gap="1" key={battery.id}>
                <Td fontSize="16">{battery.productId}</Td>
                <Td
                  fontSize="16"
                  onClick={() => {
                    setBattery(battery);
                    onOpenDetailModal();
                  }}
                >
                  {battery.brand}
                </Td>
                <Td fontSize="16">{battery.model}</Td>
                <Td fontSize="16">{battery.description}</Td>
                <Td fontSize="16" w="20">
                  <Text
                    // p="2"
                    w="28"
                    textAlign="center"
                    rounded="full"
                    // bgColor={
                    //   battery.status === "Available"
                    //     ? "green.200"
                    //     : "red.200"
                    // }
                    color={
                      battery.status === 'Available' ? 'green.800' : 'red.800'
                    }
                  >
                    {battery.status}
                  </Text>
                </Td>
                <Td fontSize="16" isNumeric>
                  {battery.price}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
          Showing {startIndex + 1} to{' '}
          {Math.min(endIndex, filteredBatteryData.length)} of{' '}
          {filteredBatteryData.length} entries
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
          disabled={currentPage == totalPages}
        />
      </HStack>
      {isOpenDetailModal && (
        <BatteryDetailModal
          batteryDetails={battery}
          isOpen={onOpenDetailModal}
          onClose={onCloseDetailModal}
        />
      )}
    </VStack>
  );
};

export default BatteryInventory;

const batteryData = [
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
  },
  {
    id: 3,
    name: 'Battery def',
    modelNumber: 'BC789',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 150,
    salePrice: 200,
    stockLeft: 20,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 4,
    name: 'Battery ghi',
    modelNumber: 'BD246',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 180,
    salePrice: 220,
    stockLeft: 15,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 5,
    name: 'Battery E',
    modelNumber: 'BE135',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 120,
    salePrice: 180,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 6,
    name: 'Battery F',
    modelNumber: 'BF789',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 130,
    salePrice: 190,
    stockLeft: 30,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 7,
    name: 'Battery G',
    modelNumber: 'BG357',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 220,
    salePrice: 270,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 8,
    name: 'Battery H',
    modelNumber: 'BH246',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 140,
    salePrice: 200,
    stockLeft: 25,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 9,
    name: 'Battery I',
    modelNumber: 'BI357',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 160,
    salePrice: 210,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 10,
    name: 'Battery J',
    modelNumber: 'BJ123',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 230,
    salePrice: 280,
    stockLeft: 10,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 11,
    name: 'Battery K',
    modelNumber: 'BK456',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 150,
    salePrice: 200,
    stockLeft: 40,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 12,
    name: 'Battery L',
    modelNumber: 'BL789',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 250,
    salePrice: 300,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 13,
    name: 'Battery M',
    modelNumber: 'BM357',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 170,
    salePrice: 220,
    stockLeft: 18,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 14,
    name: 'Battery N',
    modelNumber: 'BN246',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 180,
    salePrice: 230,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 15,
    name: 'Battery O',
    modelNumber: 'BO135',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 260,
    salePrice: 310,
    stockLeft: 5,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 16,
    name: 'Battery P',
    modelNumber: 'BP789',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 190,
    salePrice: 240,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 17,
    name: 'Battery Q',
    modelNumber: 'BQ357',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 200,
    salePrice: 250,
    stockLeft: 22,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 18,
    name: 'Battery R',
    modelNumber: 'BR246',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 270,
    salePrice: 320,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 19,
    name: 'Battery S',
    modelNumber: 'BS123',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 210,
    salePrice: 260,
    stockLeft: 35,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 20,
    name: 'Battery T',
    modelNumber: 'BT456',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 200,
    salePrice: 250,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 21,
    name: 'Battery U',
    modelNumber: 'BU789',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 280,
    salePrice: 330,
    stockLeft: 8,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 22,
    name: 'Battery V',
    modelNumber: 'BV357',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 220,
    salePrice: 270,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 23,
    name: 'Battery W',
    modelNumber: 'BW246',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 220,
    salePrice: 280,
    stockLeft: 19,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 24,
    name: 'Battery X',
    modelNumber: 'BX135',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 300,
    salePrice: 350,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 25,
    name: 'Battery Y',
    modelNumber: 'BY789',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 230,
    salePrice: 280,
    stockLeft: 28,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 26,
    name: 'Battery Z',
    modelNumber: 'BZ357',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 240,
    salePrice: 290,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 27,
    name: 'Battery AA',
    modelNumber: 'BAA246',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 320,
    salePrice: 370,
    stockLeft: 12,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 28,
    name: 'Battery AB',
    modelNumber: 'BAB123',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 250,
    salePrice: 300,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 29,
    name: 'Battery AC',
    modelNumber: 'BAC456',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 240,
    salePrice: 290,
    stockLeft: 21,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 30,
    name: 'Battery AD',
    modelNumber: 'BAD789',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 340,
    salePrice: 390,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 31,
    name: 'Battery AE',
    modelNumber: 'BAE357',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 260,
    salePrice: 310,
    stockLeft: 17,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 32,
    name: 'Battery AF',
    modelNumber: 'BAF246',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 260,
    salePrice: 310,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 33,
    name: 'Battery AG',
    modelNumber: 'BAG135',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 360,
    salePrice: 410,
    stockLeft: 3,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 34,
    name: 'Battery AH',
    modelNumber: 'BAH789',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 270,
    salePrice: 320,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 35,
    name: 'Battery AI',
    modelNumber: 'BAI357',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 280,
    salePrice: 330,
    stockLeft: 24,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 36,
    name: 'Battery AJ',
    modelNumber: 'BAJ246',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 380,
    salePrice: 430,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 37,
    name: 'Battery AK',
    modelNumber: 'BAK123',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 290,
    salePrice: 340,
    stockLeft: 32,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 38,
    name: 'Battery AL',
    modelNumber: 'BAL456',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 290,
    salePrice: 340,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 39,
    name: 'Battery AM',
    modelNumber: 'BAM789',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 400,
    salePrice: 450,
    stockLeft: 6,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 40,
    name: 'Battery AN',
    modelNumber: 'BAN357',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 300,
    salePrice: 350,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 41,
    name: 'Battery AO',
    modelNumber: 'BAO246',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 300,
    salePrice: 360,
    stockLeft: 14,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 42,
    name: 'Battery AP',
    modelNumber: 'BAP135',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 420,
    salePrice: 470,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 43,
    name: 'Battery AQ',
    modelNumber: 'BAQ789',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 310,
    salePrice: 370,
    stockLeft: 26,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 44,
    name: 'Battery AR',
    modelNumber: 'BAR357',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 320,
    salePrice: 380,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 45,
    name: 'Battery AS',
    modelNumber: 'BAS246',
    variant: 'Premium',
    availability: 'In Stock',
    purchasePrice: 440,
    salePrice: 490,
    stockLeft: 4,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 46,
    name: 'Battery AT',
    modelNumber: 'BAT123',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 330,
    salePrice: 390,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 47,
    name: 'Battery AU',
    modelNumber: 'BAU456',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 330,
    salePrice: 390,
    stockLeft: 23,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 48,
    name: 'Battery AV',
    modelNumber: 'BAV789',
    variant: 'Premium',
    availability: 'Out of Stock',
    purchasePrice: 460,
    salePrice: 510,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 49,
    name: 'Battery AW',
    modelNumber: 'BAW357',
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 350,
    salePrice: 410,
    stockLeft: 11,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
  {
    id: 50,
    name: 'Battery AX',
    modelNumber: 'BAX246',
    variant: 'Standard',
    availability: 'Out of Stock',
    purchasePrice: 360,
    salePrice: 420,
    stockLeft: 0,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
];
