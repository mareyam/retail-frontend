import React, { useState, useEffect } from 'react';
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
  useToast,
  chakra,
} from '@chakra-ui/react';
import axios from 'axios';
import useStateStore from '../zustand/store';
import BATTERY_DATA from '../common/data';
import { FaTrashAlt } from 'react-icons/fa';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

const AddNewInvoice = () => {
  const toast = useToast();
  const ITEMS_PER_PAGE = 10;
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [vendors, setVendors] = useState();
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [addedBatteries, setAddedBatteries] = useState([]);
  const { setSelectedComponent } = useStateStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [battery, setBattery] = useState();
  const [products, setProducts] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBatteryData, setFilteredBatteryData] = useState([]);
  const [netPrice, setNetPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBatteries = products?.slice(startIndex, endIndex);



  const totalPages = Math.ceil(filteredBatteryData?.length / ITEMS_PER_PAGE);

  console.log(products)

  // {
  //   productId: 1,
  //     brandName: 'AGS',
  //       productModel: 'WS 900',
  //         productDescription: 'Plates 90',
  //           productPrice: 158211,
  //             productStatus: 'Available',
  //               availabletock: 0,
  //                 quantity: 142
  // },
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
    } else {
      toast({
        title: 'Select Battery and Add Quantity.',
        description: 'Fields missing.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (index) => {
    const newBatteries = [...addedBatteries];
    newBatteries.splice(index, 1);
    setAddedBatteries(newBatteries);
  };

  const handleSaveClick = async () => {
    if (invoiceNumber) {
      try {
        // Replace this URL with the actual API endpoint to save the invoice
        await axios.post('https://localhost:7059/api/Sale/SaveInvoice', {
          invoiceNumber,
          addedBatteries,
          // Add other necessary data here
        });
        alert('Invoice saved successfully!');
      } catch (error) {
        console.error('Error saving invoice:', error);
        alert('Failed to save the invoice.');
      }
    }
  };

  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Sale/NextOrderNumber');
        setInvoiceNumber(String(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInvoiceNumber();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Vendor');
        console.log('Data:', response.data);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Product');
        console.log('Data:', response.data);
        setProducts(response.data);
        setFilteredBatteryData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = addedBatteries.reduce((acc, battery) => acc + (battery.quantity * battery.productPrice), 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [addedBatteries]);



  return (
    <>
      <Box align="center" py="2">
        <HStack w="90%" justifyContent="space-between">
          <HStack>
            <Text fontWeight="600" fontSize="20" color="#4682b4">
              Invoice #
            </Text>
            <Input
              border="1px solid #949494"
              bgColor="white"
              w="24"
              value={invoiceNumber}
              readOnly
            />
            <Text pl="10" fontWeight="600" fontSize="20" color="#4682b4">
              Select Vendor
            </Text>
            <Select
              border="1px solid #949494"
              w="44"
              bgColor="white"
              isDisabled={!invoiceNumber}
            >
              {vendors?.map((vendor, index) => (
                <option key={index} value={vendor.vendorName}>
                  {vendor.vendorName}
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
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Battery Model                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Price
                    </Th>
                  </Tr>
                </Thead>
                <Tbody size="sm">
                  {currentBatteries?.map((battery, index) => (
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
                      <Td>{battery.productModel}</Td>
                      <Td>PKR.{" "}{battery.productPrice}</Td>
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
                isDisabled={!invoiceNumber}
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
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Battery Model
                    </Th>
                    <Th textTransform="capitalize" color="white" fontSize="16">
                      Quantity
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
                      <Td>{battery.productModel}</Td>
                      <Td>{battery.quantity}</Td>
                      <Td>PKR. {" "}{(battery.quantity * battery.productPrice).toFixed(2)}</Td>
                      <Td>
                        <IconButton
                          onClick={() => handleDeleteClick(index)}
                          bgColor="transparent"
                          color="#4682b4"
                          aria-label="delete-icon"
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
        <Box w="90%" display="flex" justifyContent="flex-end" align='center'>
          <HStack >
            <Text fontSize="20" fontWeight="600">
              Total Price: PKR.{" "}{totalPrice.toFixed(0)} &nbsp;
            </Text>
          </HStack>
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
            mr="2"
            onClick={handleSaveClick}
            bg="#4682b4"
            color="white"
            _hover={{
              backgroundColor: '#4682b4',
              color: 'white',
            }}
            isDisabled={!invoiceNumber}
          >
            Add Record
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
            rounded="full"
            bg="#4682b4"
            aria-label="previous-page"
            icon={<SlArrowLeft />}
            fontSize="20"
            color="white"
            onClick={goToPreviousPage}
            _hover={{
              backgroundColor: '#4682b4',
            }}
            isDisabled={currentPage === 1}
          />
          <Text>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredBatteryData?.length)} of {filteredBatteryData?.length} entries
          </Text>
          <IconButton
            rounded="full"
            bg="#4682b4"
            aria-label="next-page"
            icon={<SlArrowRight />}
            color="white"
            fontSize="20"
            onClick={goToNextPage}
            _hover={{
              backgroundColor: '#4682b4',
            }}
            isDisabled={currentPage === totalPages}
          />
        </HStack>
      </Box >
    </>
  );
};

export default AddNewInvoice;

// import React, { useState, useEffect } from 'react';
// import {
//   HStack,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Select,
//   Box,
//   IconButton,
//   Heading,
//   Text,
//   chakra
// } from '@chakra-ui/react';
// import useStateStore from '../zustand/store';
// import BATTERY_DATA from '../common/data';
// import { FaTrashAlt } from 'react-icons/fa';
// import { SlArrowRight } from 'react-icons/sl';
// import { SlArrowLeft } from 'react-icons/sl';

// const AddNewInvoice = () => {
//   const vendors = [
//     'Vendor 1',
//     'Vendor 2',
//     'Vendor 3',
//     'Vendor 4',
//     'Vendor 5',
//     'Vendor 6',
//     'Vendor 7',
//     'Vendor 8',
//     'Vendor 9',
//     'Vendor 10',
//   ];
//   const ITEMS_PER_PAGE = 10;

//   const [invoiceNumber, setInvoiceNumber] = useState();
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [quantity, setQuantity] = useState('');
//   const [addedBatteries, setAddedBatteries] = useState([]);
//   const { setSelectedComponent } = useStateStore();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredBatteryData, setFilteredBatteryData] = useState(BATTERY_DATA);
//   const [battery, setBattery] = useState();
//   const [products, setProducts] = useState(BATTERY_DATA);

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentBatteryData = filteredBatteryData.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(filteredBatteryData.length / ITEMS_PER_PAGE);

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handleBatteryClick = (battery) => {
//     setSelectedBattery(battery);
//   };

//   const handleAddClick = () => {
//     if (selectedBattery && quantity) {
//       setAddedBatteries([...addedBatteries, { ...selectedBattery, quantity }]);
//       setQuantity('');
//     }
//   };

//   const handleDeleteClick = (index) => {
//     const newBatteries = [...addedBatteries];
//     newBatteries.splice(index, 1);
//     setAddedBatteries(newBatteries);
//   };

//   useEffect(() => {
//     const fetchInvoiceNumber = async () => {
//       try {
//         const response = await axios.get('https://localhost:7059/api/Sale/NextOrderNumber');
//         console.log('Data:', response.data);
//         console.log(response.data)
//         setInvoiceNumber(String(response.data));
//         console.log(invoiceNumber)

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchInvoiceNumber();
//   }, []);


//   return (
//     <>
//       <Box align="center" py="2">
//         <HStack w="90%" justifyContent="space-between">
//           <HStack>



//             <Text fontWeight="600" fontSize="20" color="#4682b4">
//               Invoice #
//             </Text>
//             <Input
//               border="1px solid #949494"
//               bgColor="white"
//               w="24"
//               value={invoiceNumber}
//             />
//             <Text pl="10" fontWeight="600" fontSize="20" color="#4682b4">
//               Select Vendor
//             </Text>
//             <Select
//               border="1px solid #949494"
//               w="44"
//               bgColor="white"
//             // rounded="full"
//             >
//               {vendors.map((vendor, index) => (
//                 <option key={index} value={vendor}>
//                   {vendor}
//                 </option>
//               ))}
//             </Select>
//           </HStack>
//         </HStack>
//         <Box w="90%" py="6">
//           <HStack alignItems="start">
//             <Box
//               h="60dvh"
//               w="40%"
//               pos="relative"
//               css={{
//                 '&::-webkit-scrollbar': {
//                   width: '10px',
//                   height: '6px',
//                 },
//                 '&::-webkit-scrollbar-track': {
//                   borderRadius: '10px',
//                   background: '#f0f0f0',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   borderRadius: '10px',
//                   background: '#ccc',
//                 },
//               }}
//             >
//               <Table variant="simple" size="sm">
//                 <Thead pos="sticky" top="0" zIndex={1} bgColor="#F0FFF4">
//                   <Tr bg="#4682b4" color="white" pb="4">
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Battery Name
//                     </Th>
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Model Number
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody size="sm">
//                   {currentBatteryData.map((battery, index) => (
//                     <Tr
//                       cursor="pointer"
//                       borderWidth={selectedBattery === battery ? '2px' : '0'}
//                       borderColor={
//                         selectedBattery === battery ? '#4682b4' : 'transparent'
//                       }
//                       borderStyle={
//                         selectedBattery === battery ? 'solid' : 'none'
//                       }
//                       bgColor={selectedBattery === battery ? 'blue.50' : 'none'}
//                       key={index}
//                       onClick={() => handleBatteryClick(battery)}
//                     >
//                       <Td>{battery.name}</Td>
//                       <Td>{battery.modelNumber}</Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Box>
//             <VStack>
//               <Input
//                 w="32"
//                 type="number"
//                 min="1"
//                 max="99"
//                 placeholder="Quantity"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//               <Button
//                 bg="#4682b4"
//                 color="white"
//                 _hover={{
//                   backgroundColor: '#4682b4',
//                   color: 'white',
//                 }}
//                 onClick={handleAddClick}
//               >
//                 Add
//               </Button>
//             </VStack>
//             <Box
//               overflowY="auto"
//               overflowX="hidden"
//               h="50dvh"
//               w="50%"
//               pos="relative"
//               css={{
//                 '&::-webkit-scrollbar': {
//                   width: '10px',
//                   height: '6px',
//                 },
//                 '&::-webkit-scrollbar-track': {
//                   borderRadius: '10px',
//                   background: '#f0f0f0',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   borderRadius: '10px',
//                   background: '#ccc',
//                 },
//               }}
//             >
//               <Table variant="simple" size="sm">
//                 <Thead pos="sticky" top="0" zIndex={1} bgColor="#F0FFF4">
//                   <Tr bg="#4682b4" color="white" pb="4">
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Battery Name
//                     </Th>
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Model Number
//                     </Th>
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Quantity
//                     </Th>
//                     <Th textTransform="capitilize" color="white" fontSize="16">
//                       Actions
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody size="sm">
//                   {addedBatteries.map((battery, index) => (
//                     <Tr key={index}>
//                       <Td>{battery.name}</Td>
//                       <Td>{battery.modelNumber}</Td>
//                       <Td>{battery.quantity}</Td>
//                       <Td>
//                         <IconButton
//                           onClick={() => handleDeleteClick(index)}
//                           bgColor="transparent"
//                           color="#4682b4"
//                           aria-label="left-icon"
//                           icon={<FaTrashAlt />}
//                           fontSize="20"
//                           _hover={{
//                             backgroundColor: 'transparent',
//                           }}
//                         />
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Box>
//           </HStack>
//         </Box>
//         <Box w="90%" display="flex" justifyContent="flex-end">
//           <Button
//             mr="2"
//             onClick={() => setSelectedComponent('LandingPage')}
//             bg="#4682b4"
//             color="white"
//             _hover={{
//               backgroundColor: '#4682b4',
//               color: 'white',
//             }}
//           >
//             Close
//           </Button>
//           <Button
//             bg="#4682b4"
//             color="white"
//             _hover={{
//               backgroundColor: '#4682b4',
//               color: 'white',
//             }}
//           >
//             Save
//           </Button>
//         </Box>

//         <HStack
//           pos="absolute"
//           bottom="4"
//           left="25%"
//           spacing={4}
//           alignItems="center"
//           justifyContent="center"
//         >
//           <IconButton
//             // disabled={currentPage == 1}
//             rounded="full"
//             bg="#4682b4"
//             aria-label="left-icon"
//             icon={<SlArrowLeft backgroundColor="red" />}
//             fontSize="20"
//             color="white"
//             onClick={goToPreviousPage}
//             _hover={{
//               backgroundColor: '#4682b4',
//             }}
//           />

//           <Text>
//             Showing
//             {startIndex + 1} to {Math.min(endIndex, filteredBatteryData.length)}{' '}
//             of {filteredBatteryData.length} entries entries
//           </Text>
//           <IconButton
//             rounded="full"
//             bg="#4682b4"
//             aria-label="left-icon"
//             icon={<SlArrowRight />}
//             color="white"
//             fontSize="20"
//             onClick={goToNextPage}
//             _hover={{
//               backgroundColor: '#4682b4',
//             }}
//           // disabled={currentPage == totalPages}
//           />
//         </HStack>
//       </Box>
//     </>
//   );
// };

// export default AddNewInvoice;
