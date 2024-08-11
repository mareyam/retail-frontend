import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    ModalCloseButton,
    VStack,
    Text,
    Input,
    Flex,
    RadioGroup,
    Stack,
    Radio,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';

const EditProduct = ({ productDetails, refresh, setRefresh, onClose, isOpen, onOpen }) => {
    const toast = useToast();

    const [brandName, setBrandName] = useState(productDetails.brandName || '');
    const [productModel, setProductModel] = useState(productDetails.productModel || '');
    const [productDescription, setProductDescription] = useState(productDetails.productDescription || '');
    const [productPrice, setProductPrice] = useState(productDetails.productPrice || 0);
    const [productStatus, setProductStatus] = useState(productDetails.productStatus || true);
    const [quantity, setQuantity] = useState(productDetails.quantity || 0);

    console.log(productDetails)

    useEffect(() => {
        if (productDetails) {
            setBrandName(productDetails.brandName);
            setProductModel(productDetails.productModel);
            setProductDescription(productDetails.productDescription);
            setProductPrice(productDetails.productPrice);
            setProductStatus(productDetails.productStatus);
            setQuantity(productDetails.quantity);
        }
    }, [productDetails]);

    const validateFields = () => {
        const missingFields = [];

        if (!brandName || brandName.length < 3) {
            missingFields.push('Brand Name is required and should be at least 3 characters.');
        }
        if (!productModel || productModel.length < 3) {
            missingFields.push('Product Model is required and should be at least 3 characters.');
        }
        if (productPrice <= 0) {
            missingFields.push('Product Price must be greater than 0.');
        }
        if (quantity < 0) {
            missingFields.push('Quantity cannot be negative.');
        }
        if (missingFields.length > 0) {
            toast({
                title: 'Validation Error',
                description: missingFields.join(' '),
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            return false;
        }
        return true;
    };

    const handleEditProduct = async () => {
        if (!validateFields()) return;

        const updatedProduct = {
            brandName,
            productModel,
            productDescription,
            productPrice,
            productStatus,
            quantity
        };
        console.log(updatedProduct)

        try {
            const response = await axios.put(`https://localhost:7059/api/Product/${productDetails.productId}`, updatedProduct);
            console.log('Data:', response.data);

            toast({
                title: 'Product updated successfully',
                status: 'success',
                duration: 3000,
                isClosable: true
            });

            setRefresh(!refresh);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
            toast({
                title: 'An error occurred.',
                description: 'Unable to update the product.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
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
            >
                Edit Product
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full" spacing={4}>
                            <Flex w="full" justifyContent="space-between">
                                <Text>Brand Name</Text>
                                <Input
                                    w="52"
                                    placeholder="Brand Name"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Product Model</Text>
                                <Input
                                    w="52"
                                    placeholder="Product Model"
                                    value={productModel}
                                    onChange={(e) => setProductModel(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Product Description</Text>
                                <Input
                                    w="52"
                                    placeholder="Product Description"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Product Price</Text>
                                <Input
                                    w="52"
                                    type='number'
                                    placeholder="Product Price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Product Status</Text>
                                <RadioGroup value={productStatus ? 'Available' : 'Not Available'} onChange={(value) => setProductStatus(value === 'Available')}>
                                    <Stack spacing='12' direction='row'>
                                        <Radio colorScheme='green' value='Available'>
                                            Available
                                        </Radio>
                                        <Radio colorScheme='red' value='Not Available'>
                                            Not Available
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Flex>

                            <Flex w="full" justifyContent="space-between">
                                <Text>Quantity</Text>
                                <Input
                                    w="52"
                                    type='number'
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg="#4682b4"
                            color="white"
                            onClick={handleEditProduct}
                            _hover={{
                                backgroundColor: "#4682b4",
                                color: "white"
                            }}
                        >
                            Update Product
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProduct;
