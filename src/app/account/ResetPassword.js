import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    InputGroup,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import React from 'react';
import Navbar from '../components/Home/Navbar/Navbar';
import Footer from '../components/Home/Footer/Footer';
import { useMutation } from 'react-query';
import { useService } from '../../API/Services';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/const';

export default function ResetPassword() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [token, setToken] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [resetPass, setResetPass] = React.useState()
    const { authService } = useService()
    const navigate = useNavigate()

    const handleOnChangeInput = ({ target: { name, value } }) => {
        setResetPass((prev) => ({ ...prev, [name]: value }))
    }

    const { mutateAsync: mutateResetPassword } = useMutation((body) => { authService.resetPassword(body) }, {
        onSuccess: () => navigate(ROUTES.USER.LOGIN),
        onError: () => <Alert status='error'><AlertIcon />Something went wrong</Alert>
    })

    const handleSumbitResetPassword = () => {
        mutateResetPassword({
            email,
            token,
            password: resetPass.password,
            confirmPassword: resetPass.confirmPassword,
        })
    }

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const tokenParam = params?.encodedToken;
        const emailParam = params?.email;
        setToken(tokenParam);
        setEmail(emailParam);
    }, []);

    return (
        <>
            <Navbar />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'100%'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Reset Password</Heading>
                    </Stack>
                    <Box
                        w={'1000px'}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={(e) => handleOnChangeInput(e)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter your Password' />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="ConfirmPassword" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={(e) => handleOnChangeInput(e)} type={showPassword ? 'text' : 'password'} name='confirmPassword' placeholder='Enter your Confirm Password' />
                                </InputGroup>
                            </FormControl>
                            <Button onClick={() => handleSumbitResetPassword()} bg={'red'} color={'white'} _hover={{ bg: 'white', color: 'red' }}>Reset Password</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
}