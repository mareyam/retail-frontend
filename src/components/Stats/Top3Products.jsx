import React, { useState } from 'react';
import {
  Heading,
  Stack,
  StackDivider,
  Text,
  Card,
  CardHeader,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from '@chakra-ui/react';
import BatteryDetailModal from '../AllBatteries/BatteryDetailModal';

const Top3Products = () => {
  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();
  const [battery, setBattery] = useState();

  return (
    <>
      <Card w="xl" h="auto">
        <CardBody>
          <Text py="4" fontSize="20" fontWeight="500">
            Top 3 products
          </Text>
          <hr /> 
          <Table pt='4' variant="simple" size="sm">
            <Thead
              pos="sticky"
              top="0"
              zIndex="1"
              bgColor="white"
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundcolor: 'white',
              }}
            >
              <Tr>
                <Th>ID</Th>
                <Th>Battery Name</Th>
                <Th>Model Number</Th>
                <Th isNumeric>Stock</Th>
                <Th isNumeric>Unit Sold</Th>
              </Tr>
            </Thead>
            <Tbody>
              {top3BatteryData.map((battery) => (
                <Tr
                  key={battery.id}
                  onClick={() => {
                    setBattery(battery);
                    onOpenDetailModal();
                  }}
                >
                  <Td>{battery.id}</Td>
                  <Td>{battery.name}</Td>
                  <Td>{battery.modelNumber}</Td>
                  <Td isNumeric>{battery.stockLeft}</Td>
                  <Td isNumeric>{battery.unitSold}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {isOpenDetailModal && (
        <BatteryDetailModal
          batteryDetails={battery}
          isOpen={onOpenDetailModal}
          onClose={onCloseDetailModal}
        />
      )}
    </>
  );
};

export default Top3Products;

const top3BatteryData = [
  {
    id: 1,
    name: 'Battery A',
    modelNumber: 'A123',
    unitSold: 34,
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
    name: 'Battery B',
    modelNumber: 'B456',
    unitSold: 34,
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
    id: 3,
    name: 'Battery C',
    modelNumber: 'C789',
    unitSold: 34,
    variant: 'Standard',
    availability: 'In Stock',
    purchasePrice: 100,
    salePrice: 150,
    stockLeft: 50,
    description: 'abc',
    date: '15-12-2023',
    profit: '5%',
  },
];
