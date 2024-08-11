import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Flex,
    IconButton,
    useToast
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';
import { FaTrashAlt } from 'react-icons/fa';


const ReceiveStock = ({ saleMade }) => {
    const toast = useToast();
    const { setTotalAmountReceived, totalAmountReceived, rows, setRows } = useStateStore();
    const [isOpen, setIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({
        batteryName: '',
        model: '',
        date: new Date().toLocaleDateString(),
        price: '',
        quantity: '',
    });

    const onOpen = () => setIsOpen(true);
    const onClose = () => {
        setIsOpen(false);
        setNewRow({
            batteryName: '',
            model: '',
            date: new Date().toLocaleDateString(),
            price: '',
            quantity: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleAddProduct = () => {

        const missingFields = [];
        if (newRow.batteryName === "") missingFields.push("Battery Name");
        if (newRow.model === "") missingFields.push("Model");
        if (newRow.price === "") missingFields.push("Price");
        if (newRow.quantity === "") missingFields.push("Quantity");

        if (missingFields.length > 0) {
            toast({
                title: `${missingFields.join(', ')} fields are missing`,
                description: `Please fill`,
                status: 'warning',
                duration: 3000,
                isClosable: true
            });
        }
        else {
            setRows([...rows, newRow]);
            setNewRow({
                batteryName: '',
                model: '',
                date: new Date().toLocaleDateString(),
                price: '',
                quantity: '',
            });
        }
    };

    const totalAmount = rows.reduce((total, row) => {
        return total + (parseFloat(row.price) * parseInt(row.quantity));
    }, 0);

    console.log(totalAmount)

    useEffect(() => {
        setTotalAmountReceived(totalAmount)
    }, [totalAmount])
    console.log(totalAmountReceived)




    const handleDeleteClick = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };
    return (
        <>
            <Button
                bg="#4682b4"
                color="white"
                _hover={{
                    bgColor: '4682b4',
                    color: 'white',
                }}
                onClick={onOpen}
                isDisabled={saleMade}
                w='28'
                fontSize='12'

            >
                Return Goods
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent maxW='70dvw' maxH='70dvh'>
                    <ModalHeader>Receive Stock</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody h='40dvh' overflowY='auto' >
                        <Table>
                            <Thead pos="sticky" top="-2" bgColor="white" zIndex='1'
                            >
                                <Tr>
                                    <Th>Battery Name</Th>
                                    <Th>Model</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody maxH='40dvh' overflowY='auto'>
                                {rows.map((row, index) => (
                                    <Tr key={index} >
                                        <Td>{row.batteryName}</Td>
                                        <Td>{row.model}</Td>
                                        <Td>{row.quantity}</Td>
                                        <Td>{row.price}</Td>
                                        <Td>{row.date}</Td>
                                        <Td>{(row.price * row.quantity).toFixed(2)}</Td>
                                        <Td >
                                            <IconButton
                                                p="none"
                                                onClick={() => handleDeleteClick(index)}
                                                bgColor="transparent"
                                                color="#4682b4"
                                                aria-label="left-icon"
                                                icon={<FaTrashAlt />}
                                                fontSize="16"
                                                _hover={{
                                                    backgroundColor: 'transparent',
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                                <Tr w='full'>
                                    <Td w='full'>
                                        <Input
                                            w='8rem'
                                            maxLength={15}
                                            minLength={3}
                                            placeholder="Battery Name"
                                            name="batteryName"
                                            value={newRow.batteryName}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td w='full'>
                                        <Input
                                            w='7rem'
                                            maxLength={15}
                                            minLength={3}
                                            placeholder="Model"
                                            name="model"
                                            value={newRow.model}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td

                                        w='full'
                                    >
                                        <Input
                                            w='6rem'
                                            maxLength={4}
                                            minLength={1}
                                            placeholder="Quantity"
                                            name="quantity"
                                            type='number'
                                            value={newRow.quantity}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td
                                        w='full'

                                    >
                                        <Input
                                            w='7rem'
                                            maxLength={8}
                                            minLength={1}
                                            placeholder="Price"
                                            name="price"
                                            type='number'
                                            value={newRow.price}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td>{newRow.date}</Td>

                                </Tr>
                            </Tbody>
                        </Table>
                        <Text mt={4} fontWeight="bold">
                            Total Amount: PKR: {totalAmount.toFixed(2)}
                        </Text>
                    </ModalBody>
                    <ModalFooter >
                        <Flex gap='3'>

                            <Button
                                bg="#4682b4"
                                color="white"
                                _hover={{
                                    bgColor: '4682b4',
                                    color: 'white',
                                }}
                                onClick={handleAddProduct}
                            >
                                Add and Save
                            </Button>

                            <Button
                                bg="#4682b4"
                                color="white"
                                _hover={{
                                    bgColor: '4682b4',
                                    color: 'white',
                                }}
                                onClick={onClose}

                            >
                                Close
                            </Button>
                            {/* <Button
                                bg="#4682b4"
                                color="white"
                                _hover={{
                                    bgColor: '4682b4',
                                    color: 'white',
                                }}
                                onClick={handleCancel}

                            >
                                Delete all
                            </Button> */}


                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReceiveStock;
// const handleCancel = () => {
//     setRows([]);
//     setTotalAmountReceived(0)
// }