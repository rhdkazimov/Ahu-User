import { Box, Container, Icon, SimpleGrid, Stack, Text, useColorModeValue, } from '@chakra-ui/react'
import { BiLogoInstagram } from 'react-icons/bi'
import '../Footer/footer.scss'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../routes/const'

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}

export default function Footer() {
    const navigate = useNavigate()

    return (
        <Box className='footer'
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }} spacing={8}
                    display={"flex"} justifyContent={"space-between"}>
                    <Stack spacing={6}>
                        <Box>
                            <Link to={ROUTES.MAIN.HOME} onClick={() => navigate(ROUTES.MAIN.HOME)}>
                                <img src="https://ahuboutique.com/cdn/shop/files/ahu-logo.png?v=1613551579" className='nav-logo' />
                            </Link>
                        </Box>
                        <Text fontSize={'sm'}>© AHU Boutique. Beautiful life, fashion style !</Text>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Information</ListHeader>
                        <Box as="a" onClick={() => navigate(ROUTES.CONTACT)}>
                            Contact us
                        </Box>
                        <Box as="a" onClick={() => navigate(ROUTES.SHOP)}>
                            Our Product
                        </Box>
                        <Box as="a" onClick={() => navigate(ROUTES.ORDER)}>
                            Order
                        </Box>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Follow Us</ListHeader>
                        <a href='https://www.instagram.com/ahu_um/'><Icon as={BiLogoInstagram} h={8} w={8} color="red" /></a>
                    </Stack>

                    <Stack align={'flex-start'} w={'25%'}>
                        <ListHeader>About</ListHeader>
                        <Text>Ahu boutique has been operating for 14 years. The first branch was opened in 2009 Neftchiler. Later, in 2017, the 2nd branch opened in Narimanov</Text>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    )
}