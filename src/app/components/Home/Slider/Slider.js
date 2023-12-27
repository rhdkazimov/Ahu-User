import React from 'react'
import { Box, IconButton, useBreakpointValue, Stack, Heading, Text, Container, } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import { useService } from '../../../../API/Services'
import { useQuery } from 'react-query'
import { ClipLoader } from 'react-spinners';
import "./slider.scss";

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export default function SliderSection() {
    const [slider, setSlider] = React.useState()
    const [sliderData, setSliderData] = React.useState([])
    const { sliderService } = useService();
    const { isLoading } = useQuery(["GetAllSliders"], () => {
        sliderService.getAllSliders()
            .then(({ data }) => setSliderData(data))
    })

    const top = useBreakpointValue({ base: '90%', md: '50%' })
    const side = useBreakpointValue({ base: '30%', md: '40px' })

    if (isLoading)
        <ClipLoader color="#36d7b7" />

    return (
        <Box className='slider' position={'relative'} height={'100vh'} width={'full'} overflow={'hidden'}>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

            <IconButton top={top} left={side} zIndex={2} variant="ghost" position="absolute" aria-label="left-arrow"
                transform={'translate(0%, -50%)'}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt size="40px" />
            </IconButton>

            <IconButton top={top} right={side} zIndex={2} variant="ghost" position="absolute" aria-label="right-arrow"
                transform={'translate(0%, -50%)'}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt size="40px" />
            </IconButton>

            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {sliderData.map(({ id, title, description, imageUrl }) => (
                    <Box className='slider-image' key={id} backgroundImage={`url(https://localhost:7094/${imageUrl})`}>
                        <Container size="container.lg" height="600px" position="relative">
                            <Stack spacing={6} w={'full'} maxW={'lg'} position="absolute" top="50%" transform="translate(0, -50%)">
                                <Heading fontSize={{ base: '3xl', md: '5xl', lg: '7xl' }} color="red">
                                    {title}
                                </Heading>
                                <Text className='slider-text' fontSize={{ base: 'md', lg: '2xl' }} color="black" lineHeight={"1px"}>
                                    {description}
                                </Text>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}