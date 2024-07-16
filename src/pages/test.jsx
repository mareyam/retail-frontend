import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Box } from '@chakra-ui/react';

const YourComponent = () => {
  const [batteries, setBatteries] = useState([]);

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
    <Box bg='pink' w='100dvw' h='30dvh'>
      {batteries.map((battery) => (
        <Text key={battery.id}>{battery.id}</Text>
      ))}
    </Box>
  );
};

export default YourComponent;


// // pages/index.js
// import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
// import useStateStore from "@/components/zustand/store";

// const products = [
//   { id: 1, name: "Product A", price: 100 },
//   { id: 2, name: "Product B", price: 200 },
//   { id: 3, name: "Product C", price: 300 },
//   { id: 4, name: "Product D", price: 400 },
//   { id: 5, name: "Product E", price: 500 },
// ];

// export default function Test() {
//   const { cart, addToCart, removeFromCart } = useStateStore();

//   return (
//     <Box p={5}>
//       <Heading mb={5}>Product List</Heading>
//       {products.map((product) => (
//         <Flex key={product.id} justifyContent="space-between" mb={3}>
//           <Box>
//             <Text fontWeight="bold">{product.name}</Text>
//             <Text>${product.price}</Text>
//           </Box>
//           <Box>
//             <Button onClick={() => removeFromCart(product.id)}>-</Button>
//             <Text display="inline" mx={2}>
//               {cart[product.id] || 0}
//             </Text>
//             <Button onClick={() => addToCart(product.id)}>+</Button>
//           </Box>
//         </Flex>
//       ))}

//       <Heading mt={5} mb={3}>
//         Shopping Cart
//       </Heading>
//       {Object.keys(cart).length === 0 ? (
//         <Text>No items in cart</Text>
//       ) : (
//         <Box>
//           {products.map((product) => {
//             if (cart[product.id]) {
//               return (
//                 <Flex key={product.id} justifyContent="space-between" mb={3}>
//                   <Box>
//                     <Text fontWeight="bold">{product.name}</Text>
//                     <Text>${product.price}</Text>
//                   </Box>
//                   <Text>{cart[product.id]}</Text>
//                 </Flex>
//               );
//             }
//             return null;
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// }

// // import React, { useState } from "react";
// // import { ChakraProvider, Box, Button, Flex, Text } from "@chakra-ui/react";

// // const initialProducts = [
// //   { name: "Item 1", quantity: 0, price: 10.99 },
// //   { name: "Item 2", quantity: 0, price: 15.49 },
// //   { name: "Item 3", quantity: 0, price: 8.25 },
// //   { name: "Item 4", quantity: 0, price: 20.0 },
// //   { name: "Item 5", quantity: 0, price: 5.75 },
// //   { name: "Item 6", quantity: 0, price: 18.3 },
// //   { name: "Item 7", quantity: 0, price: 3.99 },
// //   { name: "Item 8", quantity: 0, price: 12.49 },
// //   { name: "Item 9", quantity: 0, price: 7.65 },
// //   { name: "Item 10", quantity: 0, price: 11.99 },
// // ];

// // const Test = () => {
// //   const [products, setProducts] = useState(initialProducts);

// //   const handleAdd = (index) => {
// //     const newProducts = [...products];
// //     newProducts[index].quantity += 1;
// //     setProducts(newProducts);
// //   };

// //   const totalQuantity = products.reduce(
// //     (sum, product) => sum + product.quantity,
// //     0
// //   );
// //   const totalPrice = products.reduce(
// //     (sum, product) => sum + product.price * product.quantity,
// //     0
// //   );

// //   return (
// //     <ChakraProvider>
// //       <Box p={5}>
// //         <Text fontSize="2xl" mb={4}>
// //           Product List
// //         </Text>
// //         {products.map((product, index) => (
// //           <Flex key={index} align="center" justify="space-between" mb={2}>
// //             <Text>{product.name}</Text>
// //             <Text>Price: ${product.price.toFixed(2)}</Text>
// //             <Text>Quantity: {product.quantity}</Text>
// //             <Text>Total: ${(product.price * product.quantity).toFixed(2)}</Text>
// //             <Button colorScheme="teal" onClick={() => handleAdd(index)}>
// //               Add
// //             </Button>
// //           </Flex>
// //         ))}
// //         <Box mt={4}>
// //           <Text fontSize="xl">Total Quantity: {totalQuantity}</Text>
// //           <Text fontSize="xl">Total Price: ${totalPrice.toFixed(2)}</Text>
// //         </Box>
// //       </Box>
// //     </ChakraProvider>
// //   );
// // };

// // export default Test;
