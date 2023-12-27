import "./product.scss";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/const";
import { useBasketContext } from "../../../../hooks";
import { useService } from "../../../../API/Services";

function Rating({ rate, numReviews }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rate * 2) / 2;
          if (roundedRating - i >= 1)
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rate ? "orange" : "orange.300"}
              />
            );

          if (roundedRating - i === 0.5)
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;

          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} review{numReviews > 1 && 's'}
            </Box> */}
    </Box>
  );
}

function ProductAddToCart({ data }) {
  const navigate = useNavigate();
  const { setBasketItems, basketItems } = useBasketContext();
  const { basketService } = useService();
  const { id, name, rate, salePrice, discountPercent, brand, posterImage } =
    data;

  return (
    <Flex my={2} w="25%" alignItems="center" justifyContent="center">
      <Box
        className="product-card"
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {true && (
          <Circle size="10px" position="absolute" top={2} right={2} bg="red" />
        )}

        <Image
          onClick={() => navigate(ROUTES.PRODUCT.DETAIL, { state: { id } })}
          key={id}
          className="product-image"
          src={`https://localhost:7094/${posterImage?.imageUrl}`}
          alt={`Picture of ${name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge
              rounded="full"
              px="2"
              fontSize="0.8em"
              colorScheme="white"
              color="red"
            >
              {brand?.name}
            </Badge>
          </Box>

          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>

            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Icon
                onClick={() => {
                  const userData = JSON.parse(localStorage.getItem("user"));
                  if (userData)
                    basketService.postBasketItem({
                      productId: id,
                      userId: userData.id,
                    });
                  else setBasketItems((previus) => ({ ...previus, [name]: 1 }));
                }}
                as={FiShoppingCart}
                h={7}
                w={7}
                alignSelf={"center"}
                color="red"
              />
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rate={rate} />

            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $
              </Box>
              {discountPercent > 0
                ? salePrice.toFixed(2) -
                  (salePrice.toFixed(2) / 100) * discountPercent
                : salePrice.toFixed(2)}
              {discountPercent > 0 && (
                <Box
                  className="discounted-product"
                  as="span"
                  color={"red"}
                  fontSize="lg"
                >
                  {salePrice.toFixed(2)}
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
