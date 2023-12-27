// import React, { useState } from 'react'
// import ProductAddToCart from '../Product/ProductCard'
// import { useService } from '../../../API/Services';
// import { useQuery } from 'react-query';
// import Swal from 'sweetalert2';
// import "../Shop/shop.scss"
// import { Button, Checkbox, Select, Spinner } from '@chakra-ui/react';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import { QUERYKEYS } from '../../../consts';

import React, { useState } from "react";
import { useService } from "../../../../API/Services";
import { useQuery } from "react-query";
import Swal from 'sweetalert2';
import { Button, Checkbox, Select, Spinner } from "@chakra-ui/react";
import Navbar from "../../Home/Navbar/Navbar";
import ProductAddToCart from "../../Home/Product/Product";
import Footer from "../../Home/Footer/Footer";
import { QUERYKEYS } from '../../../../const';
import "../Products/products.scss"

export const Products = () => {
    const { productService, categoryService, brandService } = useService();
    const [productData, setProductData] = React.useState([])
    const [defaultProductData, setDefaultProductData] = React.useState([])
    const [categoryData, setCategoryData] = React.useState([])
    const [brandData, setBrandData] = React.useState([])
    const [selectedBrand, setSelectedBrand] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [isDiscounted, setIsDiscounted] = React.useState(false)
    const { isLoading } = useQuery([QUERYKEYS.GetAllProducts], () => {
        productService.getAllProducts().then(
            ({ data }) => {
                setDefaultProductData(data);
                setProductData(data)
            }).catch(() => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }))
    })
    const { isLoading: isLoadingCategory } = useQuery([QUERYKEYS.GetAllCategories], () => {
        categoryService.getAllCategorys()
            .then(({ data }) => setCategoryData(data)).catch(() => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }))
    })
    const { isLoading: isLoadingBrand } = useQuery([QUERYKEYS.GetAllBrands], () => {
        brandService.getAllBrands()
            .then(({ data }) => setBrandData(data)).catch(() => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }))
    })

    function handleCategoryChange({ target: { value } }) {
        setSelectedCategory(value);
    }

    function handleBrandChange({ target: { value } }) {
        setSelectedBrand(value);
    }

    function handleSubmitFilter() {
        if (selectedBrand && selectedCategory)
            setProductData(defaultProductData.filter(({ brand, category }) => category.name === selectedCategory && brand.name === selectedBrand))
        else if (selectedBrand && !selectedCategory)
            setProductData(defaultProductData.filter(({ brand }) => brand.name === selectedBrand))
        else if (!selectedBrand && selectedCategory)
            setProductData(defaultProductData.filter(({ category }) => category.name === selectedCategory))
        else
            setProductData(defaultProductData)
        if (isDiscounted)
            setProductData(productData.filter(({ discountPercent }) => discountPercent > 0))
    }

    if (isLoading || isLoadingCategory || isLoadingBrand || productData == null) {
        return <Spinner />
    }

    return (
        <>
            <Navbar />
            <h1 className='shop-header'>Shop Centre</h1>
            <div className='product-filter'>
                <div>
                    <div className='brand-filter'>
                        <h1 className='filter-text'>Brands</h1>
                        {
                            <Select onChange={(e) => handleBrandChange(e)}>
                                <option disabled value="-1" selected>Select Brand</option>
                                <option value="all" >All</option>
                                {
                                    brandData.map(({ name }) => (<option value={name}>{name}</option>))
                                }
                            </Select>
                        }
                    </div>

                    <div className='category-filter'>
                        <h1 className='filter-text'>Category</h1>
                        {
                            <Select onChange={(e) => handleCategoryChange(e)}>
                                <option disabled value="-1" selected>Select Category</option>
                                <option value="all">All</option>
                                {
                                    categoryData.map(({ name }) => (<option value={name}>{name}</option>))
                                }
                            </Select>
                        }
                    </div>

                    <div className='category-filter'>
                        <Checkbox onChange={(e) => setIsDiscounted(!isDiscounted)}>Discounted</Checkbox>
                    </div>

                    <div className='filter-button'>
                        <Button fontSize={'sm'} fontWeight={600} color={'white'} bg={'red'}
                            display={{ base: 'none', md: 'inline-flex' }} _hover={{ bg: 'red.400', }}
                            onClick={() => handleSubmitFilter()}>Filter
                        </Button>
                    </div>
                </div>

                <div className='product-flex'>
                    {
                        productData.map((data) => (
                            <ProductAddToCart data={data} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Products