import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  chakra,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  Flex,
  Box,
  Button,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Select,
  Input,
  useToast,
  Radio, RadioGroup,
  Divider
} from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import { FaTrashAlt } from 'react-icons/fa';
import Pricing from './Pricing';
import useStateStore from '../zustand/store';
import axios from 'axios';
import ReceiveStock from './ReceiveStock';
import RemainingAmountByCustomer from './RemainingAmountByCustomer';


const ITEMS_PER_PAGE = 100;
const Sale = () => {
  const { addedBatteries, setAddedBatteries, discount, setDiscount, totalAmountReceived, setSelectedComponent, setTotalAmountReceived, finalAmount, setFinalAmount, setCustomerType, customerType, cart, addToCart, removeFromCart, customers, setCustomers } = useStateStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [batteries, setBatteries] = useState([]);
  const [filteredBatteryData, setFilteredBatteryData] = useState(batteries);
  const [selectedBattery, setSelectedBattery] = useState(null);
  // const [addedBatteries, setAddedBatteries] = useState([]);
  console.log(addedBatteries)

  const [invoiceNumber, setInvoiceNumber] = useState();
  const [refresh, setRefresh] = useState(false);
  const [saleMade, setSaleMade] = useState(true);
  console.log(saleMade)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBatteryData = filteredBatteryData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBatteryData.length / ITEMS_PER_PAGE);
  const [isCustomerAdded, setIsCustomerAdded] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  console.log(selectedCustomer)


  useEffect(() => {
    if (selectedCustomer) {
      setDiscount(selectedCustomer.discountPercent)
      setCustomerName(selectedCustomer.customerName)
    }
  }, [selectedCustomer])

  const [newRow, setNewRow] = useState({
    batteryName: '',
    model: '',
    date: new Date().toLocaleDateString(),
    price: '',
    quantity: '',
  });


  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  const handleBatteryClick = (battery) => {
    setSelectedBattery(battery);
    if (!addedBatteries.find((item) => item.productModel === battery.productModel)) {
      setAddedBatteries([...addedBatteries, { ...battery, quantity: 1 }]);

    }
    setNewRow({
      batteryName: battery.brandName,
      model: battery.productModel,
      date: new Date().toLocaleDateString(),
      price: battery.price || '',
      quantity: 1,
      netPrice: battery.quantity * battery.price
    });
  };

  const handleIncreaseQuantity = (battery) => {
    const updatedBatteries = addedBatteries.map((item) =>
      item.productModel === battery.productModel ? { ...item, quantity: item.quantity + 1 } : item
    );
    setAddedBatteries(updatedBatteries);
    const updatedBattery = updatedBatteries.find((item) => item.productModel === battery.productModel);
    if (updatedBattery) {
      setNewRow({ ...newRow, quantity: updatedBattery.quantity });
    }
  };

  const handleDecreaseQuantity = (battery) => {
    const updatedBatteries = addedBatteries.map((item) =>
      item.productModel === battery.productModel ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    setAddedBatteries(updatedBatteries);
    const updatedBattery = updatedBatteries.find((item) => item.productModel === battery.productModel);
    if (updatedBattery) {
      setNewRow({ ...newRow, quantity: updatedBattery.quantity });
    }
  };

  const calculateTotalPrice = (quantity, price) => quantity * price;
  const overallTotal = addedBatteries?.reduce((total, item) => total + calculateTotalPrice(item.quantity, item.productPrice), 0);
  const totalQuantity = addedBatteries?.reduce((total, item) => total + item.quantity, 0);

  const handleDeleteClick = (index) => {
    const updatedBatteries = addedBatteries.filter((_, i) => i !== index);
    setAddedBatteries(updatedBatteries);
  };


  const handleCancel = () => {
    setAddedBatteries([]);
    setSelectedBattery("");
    setTotalAmountReceived(0)
    setCustomerType("")
    setCustomerName("")
    setFinalAmount("")
    setInvoiceNumber("")
    setIsCustomerAdded(false)
    // setSelectedComponent("LandingPage")
  }
  useEffect(() => {
    setFilteredBatteryData(
      batteries.filter((battery) =>
        battery.productModel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery, batteries]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Customer');
        setCustomers(response.data);
        console.log(customers)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, [refresh]);


  useEffect(() => {
    if (!saleMade) {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7059/api/Product');
          setBatteries(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [refresh, saleMade]);

  const handlePostSale = async () => {
    if (selectedCustomerId) {
      setSaleMade(true)
      try {
        for (const battery of addedBatteries) {
          const postSale = {
            invoiceNumber: invoiceNumber,
            customerId: selectedCustomerId,
            productId: battery.productId,
            quantity: battery.quantity,
            unitPrice: battery.productPrice * battery.quantity
          };

          console.log(postSale)

          const response = await axios.post('https://localhost:7059/api/Sale', postSale);
          console.log('Data:', response.data);

          // toast({
          //   title: `Sale made to ${customerName}`,
          //   description: "",
          //   status: 'success',
          //   duration: 3000,
          //   isClosable: true
          // });
          setRefresh(!refresh);
          onClose();
          // setAddedBatteries([]);
          setSelectedBattery("");
          setTotalAmountReceived("")
          setCustomerType("")
          // setCustomerName("")
          setFinalAmount("")
          // setInvoiceNumber("")
          setIsCustomerAdded(false)
          setSaleMade(true)
          setSelectedComponent("Product Sale")
          setShowReceipt(true)

        }
        toast({
          title: `Sale made to ${customerName}`,
          description: "",
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      }
      catch (error) {
        console.error('Error adding product:', error);
        toast({
          title: 'An error occurred.',
          description: 'Unable to record the sale.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    if (!selectedCustomerId) {
      toast({
        title: "Customer Name is missing",
        description: "",
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
    }

  };

  useEffect(() => {
    if (!saleMade) {
      const fetchInvoiceNumber = async () => {
        try {
          const response = await axios.get('https://localhost:7059/api/Sale/NextOrderNumber');
          console.log('Data:', response.data);
          setInvoiceNumber(String(response.data));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchInvoiceNumber();
    }
  }, [isCustomerAdded]);


  useEffect(() => {
    handleCancel()
  }, [])


  return (
    <>
      <VStack w='full' h='auto' align='center'>
        <Flex pt='1' w="90%" justifyContent="space-between">
          <CustomerTypeRadio
            saleMade={saleMade}
            customers={customers}
            // customerName={customerName}
            // setCustomerName={setCustomerName}
            selectedCustomerId={selectedCustomerId}
            setSelectedCustomerId={setSelectedCustomerId}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />



          <Text fontWeight="500" >
            Invoice Name:
            <chakra.span fontWeight="500">
              <Input w='44' value={invoiceNumber}
                isDisabled={saleMade}
              />
            </chakra.span>
          </Text>


        </Flex>

        <Flex
          gap='4'
          w='90%' pos='relative' justifyContent='space-between' pt='0'>
          <Box
            h="75dvh"
            overflowY='auto'
            w="25%"

            pos="relative"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                marginTop: '40px',

                borderRadius: '10px',
                background: '#f0f0f0',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: '#4682b4',
              },
            }}
          >
            <Table variant="simple" size="sm">
              <Thead pos="sticky" top="0" zIndex={4} bgColor="#F0FFF4">
                <Tr bg="#4682b4" color="white" pb="4">
                  <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                    Battery Name
                  </Th>
                  <Th fontWeight='400' textTransform="capitilize" color="white" fontSize="16">
                    Model
                  </Th>
                </Tr>
              </Thead>
              <Tbody size="sm">
                {currentBatteryData.map((battery, index) => (
                  <Tr
                    visibility={!saleMade ? "visible" : "hidden"}
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

            {/* <HStack
              mt='4'
              w='full'
              spacing={4}
              justifyContent="flex-start"
              display={!saleMade ? 'flex' : "none"}
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
            </HStack> */}
          </Box>

          <Box w='80%' h='80dvh' pos='relative' justifyContent='space-between'>
            <Box
              w="100%"
              overflowY="auto"
              overflowX="hidden"
              h="60dvh"
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
                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                      Quantity
                    </Th>
                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                      Model
                    </Th>
                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                      Price
                    </Th>
                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                      Net Price
                    </Th>
                    <Th fontWeight='400' textTransform="capitalize" color="white" fontSize="16">
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody size="sm">
                  {addedBatteries.map((battery, index) => (
                    <Tr key={index}>
                      <Td>
                        <NumberInput
                          isDisabled={saleMade}
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
                      <Td>PKR.{calculateTotalPrice(battery.quantity, battery.productPrice).toFixed(0)}</Td>

                      <Td>
                        <IconButton
                          isDisabled={saleMade}
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

            </Box>
            <Divider
              borderWidth='2px' // Adjust thickness here
              borderColor='#4682b4' // Adjust color here
            />

            <HStack justifyContent='flex-end'
              w='full'
              pt='2'

            >
              <VStack>
                <HStack align='flex-end'>
                  {/* <Button
                    zIndex='100'
                    w='32'
                    onClick={() => {
                      setIsCustomerAdded(true)
                      setSaleMade(false)
                    }}
                    bg="#4682b4"
                    color="white"
                    _hover={{
                      bgColor: '4682b4',
                      color: 'white',
                    }}
                    isDisabled={!saleMade}


                  >{showReceipt ? "Print Receipt" : "Add"}</Button> */}

                  <Button
                    display={!showReceipt ? 'block' : "none"}
                    fontSize='12'
                    zIndex='100'
                    w='28'
                    onClick={() => {
                      setIsCustomerAdded(true)
                      setSaleMade(false)
                    }}
                    bg="#4682b4"
                    color="white"
                    _hover={{
                      bgColor: '4682b4',
                      color: 'white',
                    }}
                    isDisabled={!saleMade}


                  >Add</Button>





                  <Button onClick={handlePostSale}
                    w='28'
                    isDisabled={addedBatteries.length < 1 || saleMade}
                    bg="#4682b4"
                    color="white"
                    _hover={{
                      bgColor: '4682b4',
                      color: 'white',
                    }}
                    fontSize='12'

                  >Save</Button>

                  <Button onClick={handleCancel}
                    w='28'
                    zIndex='100'
                    bg="#4682b4"
                    color="white"
                    _hover={{
                      bgColor: '4682b4',
                      color: 'white',
                    }}
                    fontSize='12'

                  >Cancel</Button>



                </HStack>

                <Flex gap='2' w='full'>
                  <RemainingAmountByCustomer
                    setIsCustomerAdded={setIsCustomerAdded}
                    setSaleMade={setSaleMade}
                    totalBillAmount={overallTotal}
                    customerName={customerName}
                    saleMade={saleMade}
                    customerId={selectedCustomer?.customerId}
                    invoiceNumber={invoiceNumber}
                    discount={selectedCustomer?.discountPercent}
                  />

                  <ReceiveStock saleMade={saleMade}
                  />
                </Flex>
              </VStack>

              <Pricing total={overallTotal} quantity={totalQuantity} discount={selectedCustomer?.discountPercent}
              />
            </HStack>
          </Box>


        </Flex>

      </VStack >

    </>
  );
};
export default Sale;

const CustomerTypeRadio = ({ customers, saleMade, selectedCustomerId, setSelectedCustomerId, selectedCustomer, setSelectedCustomer }) => {
  const { customerType, setCustomerType } = useStateStore();
  console.log(customers)


  const handleCustomerChange = (event) => {

    const selectedCustomerName = event.target.value;
    const selectedCustomer = customers.find(
      (customer) => customer.customerName === selectedCustomerName
    );

    if (selectedCustomer) {
      setSelectedCustomerId(selectedCustomer.customerId);
      setSelectedCustomer(selectedCustomer);
    }
    console.log(selectedCustomerName)
    console.log(selectedCustomer)
  };

  return (
    // <Flex align='center'>
    //   <Flex gap='2'>
    //     <Button
    //       bgColor="#4682b4"
    //       color='white'
    //       _hover={{
    //         bgColor: "#4682b4"
    //       }}
    //       onClick={() => setCustomerType('Retail')}
    //       isDisabled={saleMade}
    //     >
    //       Retail
    //     </Button>

    //     <Button
    //       bgColor="#4682b4"
    //       color='white'
    //       _hover={{
    //         bgColor: "#4682b4"
    //       }}
    //       onClick={() => setCustomerType('Wholesale')}
    //       isDisabled={saleMade}

    //     >
    //       Wholesale
    //     </Button>

    //     <Box>
    //       {customerType === 'Retail' && (
    //         <Input
    //           h='10'
    //           placeholder='Enter customer name'
    //           isDisabled={saleMade}

    //         />
    //       )}

    //       {customerType === 'Wholesale' && (
    //         <Select
    //           placeholder="Select customer"
    //           onChange={handleCustomerChange}
    //           isDisabled={saleMade}

    //         >
    //           {customers.map((customer) => (
    //             <option key={customer.customerId} value={customer.customerName}>
    //               {customer.customerName}
    //             </option>
    //           ))}
    //         </Select>
    //       )}


    //     </Box>
    //   </Flex>

    //   <Text px='2' fontSize='16' fontWeight='500' >Discount </Text>
    //   <Text >{selectedCustomer?.discountPercent ? selectedCustomer?.discountPercent : 0}%</Text>


    // </Flex>
    <Flex align='center' direction='row'

    >
      <RadioGroup onChange={setCustomerType} value={customerType} >
        <Flex gap='2'>
          <Radio
            value='Retail' isDisabled={saleMade}>

            <chakra.span
              fontWeight='500'

            >Retail</chakra.span>
          </Radio>
          <Radio
            fontWeight='500'

            value='Wholesale' isDisabled={saleMade}>
            <chakra.span
              fontWeight='500'
            >
              Wholesale            </chakra.span>
          </Radio>
        </Flex>
      </RadioGroup>

      <Flex w='full' align='center' gap='2'>
        {customerType === 'Retail' && (
          <Input
            h='10'
            placeholder='Enter customer name'
            isDisabled={saleMade}
          />
        )}

        {customerType === 'Wholesale' && (
          <Select
            placeholder="Select customer"
            onChange={handleCustomerChange}
            isDisabled={saleMade}
          >
            {customers.map((customer) => (
              <option key={customer.customerId} value={customer.customerName}>
                {customer.customerName}
              </option>
            ))}
          </Select>
        )}
        <Flex align='center'>
          <Text px='2' fontSize='16' fontWeight='500'>Discount</Text>
          <Text>{selectedCustomer?.discountPercent ? selectedCustomer?.discountPercent : 0}%</Text>
        </Flex>
      </Flex>


    </Flex>
  );
};


// const CustomerTypeRadio = ({ customers, selectedCustomerId, setSelectedCustomerId }) => {
//   const { customerType, setCustomerType } = useStateStore();

//   const handleCustomerChange = (event) => {
//     const selectedName = event.target.value;
//     const selectedCustomer = customers.find(
//       (customer) => customer.customerName === selectedName
//     );
//     if (selectedCustomer) {
//       setSelectedCustomerId(selectedCustomer.customerId);
//     } else {
//       setSelectedCustomerId(null);
//     }
//   };

//   console.log(selectedCustomerId)

//   return (
//     <Flex>
//       <Button
//         bgColor="white"
//         border="1px solid #4682b"
//         borderBottom="3px solid #4682b"
//         _hover={{
//           borderBottom: '4px solid #4682b',
//           transition: 'all 0.2s ease',
//         }}
//         onClick={() => {
//           setCustomerType('Retail');
//         }}
//       >
//         Retail
//       </Button>

//       <Button
//         bgColor="white"
//         border="1px solid #4682b"
//         borderBottom="3px solid #4682b"
//         _hover={{
//           borderBottom: '4px solid #4682b',
//           transition: 'all 0.2s ease',
//         }}
//         onClick={() => {
//           setCustomerType('Wholesale');
//         }}
//       >
//         Wholesale
//       </Button>

//       <Box>
//         <Input h='10' display={customerType == 'Retail' ? 'block' : "none"} placeholder='enter customer name' />
//         <Select
//           display={customerType == 'Wholesale' ? 'block' : "none"}
//           onChange={handleCustomerChange}>
//           {customers.map((customer) => (
//             <option key={customer.customerId} value={customer.customerName}>
//               {customer.customerName}
//             </option>
//           ))}
//         </Select>
//         {selectedCustomerId && <Box mt={3}>Selected Customer ID: {selectedCustomerId}</Box>}
//       </Box>
//     </Flex >
//   )

// }