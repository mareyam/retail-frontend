import React, { useState } from 'react';

const LiveUpdateInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue)

  };


  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <p>Live Output: {inputValue}</p>
    </div>
  );
};

export default LiveUpdateInput;

// import React, { useState, useEffect } from 'react';
// import { ChakraProvider, Box, Select } from '@chakra-ui/react';
// import axios from 'axios';

// function App() {
//   const [selectedCustomerId, setSelectedCustomerId] = useState(null);
//   const [customers, setCustomers] = useState([]);


//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get('https://localhost:7059/api/Customer');
//         setCustomers(response.data);
//         console.log(customers)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);



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

//   return (
//     <ChakraProvider>
//       <Box p={5}>
//         <Select placeholder="Select customer" onChange={handleCustomerChange}>
//           {customers.map((customer) => (
//             <option key={customer.customerId} value={customer.customerName}>
//               {customer.customerName}
//             </option>
//           ))}
//         </Select>
//         {selectedCustomerId && <Box mt={3}>Selected Customer ID: {selectedCustomerId}</Box>}
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import { ChakraProvider, Box, Button, Text, VStack, HStack, IconButton, Divider } from '@chakra-ui/react';
// import { FaTrash } from 'react-icons/fa';

// // Sample data with prices
// const initialItems = [
//     { name: 'Item 1', price: 10 },
//     { name: 'Item 2', price: 20 },
//     { name: 'Item 3', price: 30 },
//     { name: 'Item 4', price: 40 },
//     { name: 'Item 5', price: 50 }
// ];

// const App = () => {
//     const [items] = useState(initialItems);
//     const [selectedItems, setSelectedItems] = useState([]);

//     const handleAddItem = (item) => {
//         if (!selectedItems.find(selected => selected.name === item.name)) {
//             setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
//         }
//     };

//     const handleIncreaseQuantity = (itemName) => {
//         setSelectedItems(selectedItems.map(selected =>
//             selected.name === itemName ? { ...selected, quantity: selected.quantity + 1 } : selected
//         ));
//     };

//     const handleDecreaseQuantity = (itemName) => {
//         setSelectedItems(selectedItems.map(selected =>
//             selected.name === itemName
//                 ? { ...selected, quantity: Math.max(0, selected.quantity - 1) }
//                 : selected
//         ));
//     };

//     const handleRemoveItem = (itemName) => {
//         setSelectedItems(selectedItems.filter(selected => selected.name !== itemName));
//     };

//     // Calculate the total price for each item
//     const calculateTotalPrice = (quantity, price) => quantity * price;

//     // Calculate the overall total price
//     const overallTotal = selectedItems.reduce((total, item) => total + calculateTotalPrice(item.quantity, item.price), 0);

//     // Calculate the total quantity of all added items
//     const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);

//     return (
//         <ChakraProvider>
//             <HStack spacing="24px" p="4">
//                 {/* Left Column: List of Items */}
//                 <Box borderWidth="1px" borderRadius="md" p="4" width="200px">
//                     <VStack spacing="4" align="start">
//                         {items.map((item, index) => (
//                             <Button
//                                 key={index}
//                                 onClick={() => handleAddItem(item)}
//                                 width="100%"
//                                 variant="outline"
//                             >
//                                 {item.name} - ${item.price}
//                             </Button>
//                         ))}
//                     </VStack>
//                 </Box>

//                 {/* Right Column: Selected Items List */}
//                 <Box borderWidth="1px" borderRadius="md" p="4" width="300px">
//                     <Text fontSize="xl" mb="4">
//                         Selected Items
//                     </Text>
//                     {selectedItems.length === 0 ? (
//                         <Text>No items selected</Text>
//                     ) : (
//                         selectedItems.map((selected, index) => (
//                             <Box key={index} p="2" borderBottomWidth="1px">
//                                 <HStack spacing="4" align="center">
//                                     <Text>{selected.name}</Text>
//                                     <Text>${selected.price.toFixed(2)}</Text>
//                                     <HStack spacing="4">
//                                         <Button size="sm" onClick={() => handleDecreaseQuantity(selected.name)}>-</Button>
//                                         <Text>{selected.quantity}</Text>
//                                         <Button size="sm" onClick={() => handleIncreaseQuantity(selected.name)}>+</Button>
//                                     </HStack>
//                                     <Text>${calculateTotalPrice(selected.quantity, selected.price).toFixed(2)}</Text>
//                                     <IconButton
//                                         aria-label="Remove item"
//                                         icon={<FaTrash />}
//                                         onClick={() => handleRemoveItem(selected.name)}
//                                     />
//                                 </HStack>
//                             </Box>
//                         ))
//                     )}
//                     <Divider my="4" />
//                     <Text fontSize="lg" fontWeight="bold">
//                         Total Quantity: {totalQuantity}
//                     </Text>
//                     <Text fontSize="lg" fontWeight="bold">
//                         Total Cost: ${overallTotal.toFixed(2)}
//                     </Text>
//                 </Box>
//             </HStack>
//         </ChakraProvider>
//     );
// };

// export default App;
