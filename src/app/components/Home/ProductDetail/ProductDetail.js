import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    Spinner,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useService } from '../../../../API/Services';
import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../../routes/const';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productService } = useService()
    const [productData, setProductData] = React.useState();
    const { isLoading } = useQuery([], () => {
        productService.getProductById(location.state?.id).then(({ data }) => setProductData(data)).catch(() => {
            Swal.fire("Error", "This product not found", 'error')
            navigate(ROUTES.MAIN.HOME)
        })
    })

    if (isLoading)
        return <Spinner />

    return (
        <>
            <Navbar />
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={`Picture of ${productData?.name}`}
                            src={`https://localhost:7094/${productData?.posterImage?.imageUrl}`}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '600px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {productData?.name}
                            </Heading>
                            <Text
                                color={"#171923"}
                                fontWeight={600}
                                fontSize={'2xl'}>
                                ${productData?.discountPercent > 0 ? (productData?.salePrice.toFixed(2) - (productData?.salePrice.toFixed(2) / 100) * productData?.discountPercent) : (productData?.salePrice.toFixed(2))}
                                {productData?.discountPercent > 0 &&
                                    (<Box className='discounted-product' as="span" color={'red'} fontSize="lg">
                                        {productData?.salePrice.toFixed(2)}
                                    </Box>)
                                }
                            </Text>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider borderColor={"gray.200"} />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }} alignItems={'flex-start'}>
                                <Text fontSize={'lg'}>
                                    {productData?.description}
                                </Text>
                            </VStack>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={"red"}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Product Details
                                </Text>

                                <List spacing={2}>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Description:
                                        </Text>{' '}
                                        {productData?.description}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Brand:
                                        </Text>{' '}
                                        {productData?.brand.name}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Category:
                                        </Text>{' '}
                                        {productData?.category.name}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Color:
                                        </Text>{' '}
                                        {productData?.color}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Size:
                                        </Text>{' '}
                                        {productData?.size}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Stock:
                                        </Text>{' '}
                                        {productData?.stockCount}
                                    </ListItem>
                                </List>
                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={"red"}
                            color={"white"}
                            textTransform={'uppercase'}
                            _hover={{ bg: 'white', color: 'red' }}>
                            Add to cart
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Footer />
        </>
    )
}