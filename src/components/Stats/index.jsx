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
import DailyProfit from "./DailyProfit";
import MonthlyProfitChart from "./MonthlyProfitChart";
import Top3Products from "./Top3Products";
import MonthlyProfit from "./MonthlyProfit";

const Stats = () => {
  return (
    <>
      {/* <Heading> Stats </Heading> */}
      <Flex flexWrap="wrap" mt="4" gap="4" w='full'
       justifyContent='space-around'
      >
        <DailyProfit />
        <MonthlyProfit />
        <Top3Products />
        <MonthlyProfitChart />
      </Flex>
    </>
  );
};

export default Stats;
