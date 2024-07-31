import React, { useState } from 'react';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 3, name: 'Sam Green', age: 45 },
  ]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleToggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <ChakraProvider>
      <Box p={5} position="relative">
        <Box position="relative">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Age</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.id}</Td>
                  <Td>{row.name}</Td>
                  <Td>{row.age}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {isOverlayVisible && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              zIndex={1}
            />
          )}
        </Box>
        <Button mt={4} onClick={handleToggleOverlay}>
          Toggle Overlay
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default App;

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
