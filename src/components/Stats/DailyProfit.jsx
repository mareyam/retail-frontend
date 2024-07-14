import React from "react";
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
  Flex,
} from "@chakra-ui/react";

const DailyProfit = () => {
  return (
    <Card w="xl">
      <CardBody>
        <Text py="4" fontSize="20" fontWeight="500">
          Daily
        </Text>
        <hr />
        <Stack divider={<StackDivider />} spacing="4">
          <Flex justifyContent="space-between" w="full">
            <Text fontSize="20" fontWeight="400" textTransform="uppercase">
              Total Sales today
            </Text>
            <Text fontSize="20">42 pieces</Text>
          </Flex>
          <Flex justifyContent="space-between" w="full">
            <Text fontSize="20" fontWeight="400" textTransform="uppercase">
              Total Profit
            </Text>
            <Text fontSize="20">Rs. 25,000</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
export default DailyProfit;
