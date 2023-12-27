import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useService } from "../../../API/Services";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/const";
import { spread } from "axios";
const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const { basketService, orderService } = useService();
  const [orderSum, setOrderSum] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  const navigate = useNavigate();

  const {} = useQuery(
    ["orderItemDelete"],
    () => basketService.getAllBasketItems(),
    {
      onSuccess: ({ data }) => {
        let sum = 0;
        data.forEach(({ count, product: { id, name, salePrice } }) => {
          let item = { productId: id, productName: name, count: count };
          setOrderItems((prev) => [...prev, item]);
          sum = salePrice * count + sum;
        });
        setOrderSum(sum);
      },
    }
  );

  const user = JSON.parse(localStorage.getItem("user"));

  const { mutateAsync: mutateOrderComplate } = useMutation(
    () =>
      orderService.createOrder({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        note: "Order Created",
        orderItems: orderItems,
      }),
    {
      onSuccess: () => navigate(ROUTES.MAIN.HOME),
    }
  );

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(orderSum)} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(orderSum)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={() => mutateOrderComplate()}
      >
        Checkout
      </Button>
    </Stack>
  );
};
