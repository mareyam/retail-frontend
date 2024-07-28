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
} from '@chakra-ui/react';
import useStateStore from '../zustand/store';

const ReceiveStock = () => {
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
        setRows([...rows, newRow]);
        setNewRow({
            batteryName: '',
            model: '',
            date: new Date().toLocaleDateString(),
            price: '',
            quantity: '',
        });

    };

    const totalAmount = rows.reduce((total, row) => {
        return total + (parseFloat(row.price) * parseInt(row.quantity));
    }, 0);

    console.log(totalAmount)

    useEffect(() => {
        setTotalAmountReceived(totalAmount)
    }, [totalAmount])
    console.log(totalAmountReceived)


    const handleCancel = () => {
        setRows([]);
setTotalAmountReceived(0)
    }
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
            >
                Receive Stock
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Receive Stock</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Battery Name</Th>
                                    <Th>Model</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {rows.map((row, index) => (
                                    <Tr key={index} >
                                        <Td>{row.batteryName}</Td>
                                        <Td>{row.model}</Td>
                                        <Td>{row.quantity}</Td>
                                        <Td>{row.price}</Td>
                                        <Td>{row.date}</Td>
                                        <Td>{(row.price * row.quantity).toFixed(2)}</Td>
                                    </Tr>
                                ))}
                                <Tr w='full' >
                                    <Td w='full'>
                                        <Input
                                            w='8rem'
                                            placeholder="Battery Name"
                                            name="batteryName"
                                            value={newRow.batteryName}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td w='full'>
                                        <Input
                                            w='7rem'
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


                                            placeholder="Quantity"
                                            name="quantity"
                                            value={newRow.quantity}
                                            onChange={handleInputChange}
                                        />
                                    </Td>
                                    <Td
                                        w='full'

                                    >
                                        <Input
                                            w='7rem'

                                            placeholder="Price"
                                            name="price"
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
                    <ModalFooter>
                        {/* <Button
                            bgColor="#319795"
                            color="white"
                            onClick={handleAddProduct}
                            _hover={{
                                bgColor: '#319795',
                                color: 'white',
                            }}
                        >
                            Add New
                        </Button> */}
                        <Button
                            bgColor="#319795"
                            color="white"
                            onClick={handleAddProduct}
                            _hover={{
                                bgColor: '#319795',
                                color: 'white',
                            }}
                        >
                            Save
                        </Button>

                         <Button
                            bgColor="#319795"
                            color="white"
                            onClick={onClose}
                            _hover={{
                                bgColor: '#319795',
                                color: 'white',
                            }}
                        >
                          Close
                        </Button>
                          <Button
                            bgColor="#319795"
                            color="white"
                            onClick={handleCancel}
                            _hover={{
                                bgColor: '#319795',
                                color: 'white',
                            }}
                        >
                          Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReceiveStock;
