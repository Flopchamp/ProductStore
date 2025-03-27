import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box, Heading, HStack, IconButton, Image, useColorMode, useToast, Text,
    Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalBody, VStack,
    Input, ModalFooter, Button
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { colorMode } = useColorMode();
    const textColor = colorMode === "light" ? "gray.600" : "gray.200";
    const bg = colorMode === "light" ? 'white' : 'gray.800';

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const response = await deleteProduct(pid);
        const { success, message } = response;
        
        toast({
            title: success ? 'Success' : 'Error',
            description: message,
            status: success ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async () => {
        const response = await updateProduct(product._id, updatedProduct);
        if (response.success) {
            toast({
                title: 'Product Updated',
                description: 'The product has been updated successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } else {
            toast({
                title: 'Update Failed',
                description: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box shadow="lg" rounded="lg" overflow="hidden" _hover={{ transform: "translateY(-5px)", shadow: 'xl' }} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p='4'>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>

            {/* Update Product Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdateProduct}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
