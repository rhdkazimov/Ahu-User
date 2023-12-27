import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { useService } from "../../../API/Services";
import { useMutation, useQueryClient } from "react-query";

export const CartItem = (props) => {
  const { count, id, productId, userId, product } = props;
  const { basketService } = useService();
  const queryClient = useQueryClient();

  const { mutateAsync: mutateDeleteBasket } = useMutation(
    () => basketService.deleteBasketItemById(productId),
    {
      onSuccess: () => queryClient.invalidateQueries(["orderItemDelete"]),
    }
  );
  const onClickDelete = () => mutateDeleteBasket();

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={product.name}
        description={product.description}
        image={
          "https://images.creativemarket.com/0.1.0/ps/7114984/1820/1213/m1/fpnw/wm1/ho7yew5e5aabacfyp5wkdzki3gsrd9jsnbsg8stu94tez2fxy5xrrpn7rl61de7d-.jpg?1&s=9ad76d4e6dadc28a60a3f473fc86d73d"
        }
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <span>x {count}</span>
        <PriceTag price={product.salePrice} />
        <CloseButton
          aria-label={`Delete ${product.name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <span>x {count}</span>
        <PriceTag price={product.salePrice} />
      </Flex>
    </Flex>
  );
};
