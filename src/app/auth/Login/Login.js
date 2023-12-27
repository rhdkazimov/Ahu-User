import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import React from 'react'
import { useService } from '../../../API/Services'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/Home/Navbar/Navbar'
import Footer from '../../components/Home/Footer/Footer'
import { useMutation } from 'react-query'
import { ROUTES } from '../../../routes/const'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import '../Register/register.scss'

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [loginData, setLoginData] = React.useState()
    const { authService } = useService()
    const navigate = useNavigate()

    const { mutateAsync: mutateLogin } = useMutation((body) => authService.login(body).then(() => navigate(ROUTES.MAIN.HOME)).catch((err) => { Swal.fire("Error", "Password or Email is incorrect", "error") }))

    const handleOnChangeInput = ({ target: { name, value } }) => {
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmitLogin = () => mutateLogin(loginData)

    return (
        <>
            <Navbar />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'} mt={2}>
                            Please login using account detail bellow.
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name='email' onChange={(e) => handleOnChangeInput(e)} placeholder='Enter your Email' />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} name='password' onChange={(e) => handleOnChangeInput(e)} placeholder='Enter your Password' />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <a href='/forgotpassword'>
                                        <Text color={'red.400'}>Forgot password?</Text>
                                    </a>
                                </Stack>
                                <Button onClick={() => handleSubmitLogin()} bg={'red'} color={'white'} _hover={{ bg: 'white', color: 'red' }}>
                                    Sign in
                                </Button>
                                <Text align={'center'}>
                                    Don't have an account? <a className='register-link' onClick={() => navigate(ROUTES.USER.REGISTER)}>Register</a>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
}