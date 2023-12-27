import { Container, Flex, Box, Heading, Text, IconButton, Button, VStack, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'
import { BsInstagram } from 'react-icons/bs'
import '../Contact/contact.scss'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'

export default function Contact() {
    return (
        <>
            <Navbar />
            <Container className='contact' maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box bg="#02054B" color="white" borderRadius="lg" m={{ sm: 4, md: 16, lg: 10 }} p={{ sm: 5, md: 5, lg: 16 }}>
                        <Box p={4}>
                            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                <WrapItem>
                                    <Box>
                                        <div className='contact-header'>
                                            <Heading>Contact</Heading>
                                            <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                                Contact Us
                                            </Text>
                                        </div>
                                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                            <VStack pl={0} spacing={3} alignItems="flex-start">
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="250px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                                                    +994 55 560 89 55
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="250px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                                    elekberovk442@gmail.com
                                                </Button>
                                                <a href='https://www.google.com/maps/@40.4040617,49.8710375,3a,90y,90t/data=!3m9!1e1!3m7!1sAF1QipNdO6eTLmGROWz4wf2hhEJBY-eiaZLWga6Bci28!2e10!7i3840!8i1920!9m2!1b1!2i49?entry=ttu'>
                                                    <Button
                                                        size="md"
                                                        height="48px"
                                                        width="250px"
                                                        variant="ghost"
                                                        color="#DCE2FF"
                                                        _hover={{ border: '2px solid #1C6FEB' }}
                                                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                                                        Narimanov, Baku
                                                    </Button>
                                                </a>
                                                <a href='https://www.google.com/maps/place/Ahu+butik/@40.4096372,49.9414883,17z/data=!3m1!4b1!4m6!3m5!1s0x4030634a0498f053:0x67e4b804a448bfaf!8m2!3d40.4096331!4d49.9440632!16s%2Fg%2F11pkhvwly5?entry=ttu'>
                                                    <Button
                                                        size="md"
                                                        height="48px"
                                                        width="250px"
                                                        variant="ghost"
                                                        color="#DCE2FF"
                                                        _hover={{ border: '2px solid #1C6FEB' }}
                                                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                                                        Neftchiler, Baku
                                                    </Button>
                                                </a>
                                            </VStack>
                                        </Box>
                                        <HStack
                                            spacing={5}
                                            px={5}
                                            justifyContent="center">
                                            <a href='https://www.instagram.com/ahu_um/'>
                                                <IconButton
                                                    color="red"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<BsInstagram size="30px" />}
                                                />
                                            </a>
                                        </HStack>
                                    </Box>
                                </WrapItem>

                                {/* <Map
                                    apiKey="YOUR_API_KEY"
                                    defaultZoom={8}
                                    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                                    // defaultOptions={{ disableDefaultUI: true }}
                                >
                                    <Marker />
                                </Map> */}
                                {/* <WrapItem>

                                    <Box bg="white" borderRadius="lg">
                                        <Box m={8} color="#0B0E3F">
                                            <VStack spacing={5}>
                                                <FormControl id="name">
                                                    <FormLabel>Your Name</FormLabel>
                                                    <InputGroup borderColor="#E0E1E7">
                                                        <InputLeftElement pointerEvents="none">
                                                            <BsPerson color="gray.800" />
                                                        </InputLeftElement>
                                                        <Input type="text" size="md" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Mail</FormLabel>
                                                    <InputGroup borderColor="#E0E1E7">
                                                        <InputLeftElement pointerEvents="none">
                                                            <MdOutlineEmail color="gray.800" />
                                                        </InputLeftElement>
                                                        <Input type="text" size="md" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Message</FormLabel>
                                                    <Textarea
                                                        borderColor="gray.300"
                                                        _hover={{
                                                            borderRadius: 'gray.300',
                                                        }}
                                                        placeholder="message"
                                                    />
                                                </FormControl>
                                                <FormControl id="name" float="right">
                                                    <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                                                        Send Message
                                                    </Button>
                                                </FormControl>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem> */}
                            </Wrap>
                        </Box>
                    </Box>
                </Flex>
            </Container>
            <Footer />
        </>
    )
}