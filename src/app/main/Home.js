import React from "react";
import { useService } from "../../API/Services";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Home/Navbar/Navbar";
import SliderSection from "../components/Home/Slider/Slider";
import ProductAddToCart from "../components/Home/Product/Product";
import Footer from "../components/Home/Footer/Footer";
import Hero from "../components/Home/Hero/Hero";
import { ImageSection } from "../components/Home/ImageSection/ImageSection";

const Home = () => {
  const { productService } = useService();
  const [productData, setProductData] = React.useState([]);
  const { isLoading } = useQuery(["GETPRODUCT"], () => {
    productService
      .getAllProducts()
      .then(({ data }) => setProductData(data))
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
      );
  });

  if (isLoading || !productData) {
    return <ClipLoader color="#36d7b7" />;
  }

  return (
    <div>
      <Navbar />
      <SliderSection />
      <div className="product-flex">
        {productData.slice(0, 8).map((data) => (
          <ProductAddToCart data={data} />
        ))}
      </div>
      <Hero />
      <div className="product-flex">
        {productData.slice(8, 12).map((data) => (
          <ProductAddToCart data={data} />
        ))}
      </div>
      <ImageSection />
      <Footer />
    </div>
  );
};

export default Home;
