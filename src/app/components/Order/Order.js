import React from "react";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Spinner } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useService } from "../../../API/Services";
import { useQuery } from "react-query";

const Order = () => {
  const { basketService } = useService();
  const [orderItems, setOrderItems] = React.useState([]);
  const { isLoading } = useQuery(
    ["orderItemDelete"],
    () => basketService.getAllBasketItems(),
    {
      onSuccess: ({ data }) => setOrderItems(data),
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "16",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({orderItems.length} items)
            </Heading>

            <Stack spacing="6">
              {orderItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={mode("blue.500", "blue.200")}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default Order;
