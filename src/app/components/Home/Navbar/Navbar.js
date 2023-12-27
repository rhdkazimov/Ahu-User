import "../Navbar/navbar.scss";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Collapse,
  Popover,
  IconButton,
  useDisclosure,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/const";
import { useMutation } from "react-query";
import { useService } from "../../../../API/Services";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { authService } = useService();
  const { mutateAsync: mutateLogOut } = useMutation(() => {
    authService.logout();
  });

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate(ROUTES.USER.LOGIN);
    // mutateLogOut().then(() => navigate(ROUTES.USER.LOGIN))
  };

  return (
    <Box className="navbar">
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        align={"center"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <button onClick={() => navigate(ROUTES.MAIN.HOME)}>
              <img
                src="https://ahuboutique.com/cdn/shop/files/ahu-logo.png?v=1613551579"
                alt="ahu-logo"
                className="nav-logo"
              />
            </button>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {user ? (
            <>
              <Button
                as={"a"}
                fontSize={"l"}
                fontWeight={400}
                variant={"link"}
                onClick={() => navigate(ROUTES.USER.LOGIN)}
              >
                {user.userName}
              </Button>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red"}
                onClick={() => handleLogOut()}
                display={{ base: "none", md: "inline-flex" }}
                _hover={{ bg: "red.400" }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"l"}
                fontWeight={400}
                variant={"link"}
                onClick={() => navigate(ROUTES.USER.LOGIN)}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red"}
                onClick={() => navigate(ROUTES.USER.REGISTER)}
                display={{ base: "none", md: "inline-flex" }}
                _hover={{ bg: "red.400" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                onClick={() => navigate(navItem.href)}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{ textDecoration: "none", color: linkHoverColor }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
                bg={popoverContentBgColor}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>

          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>

        <Flex
          flex={1}
          align={"center"}
          justify={"flex-end"}
          opacity={0}
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{ textDecoration: "none" }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>

        {children && (
          <Icon
            as={ChevronDownIcon}
            w={6}
            h={6}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          align={"start"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Order",
    href: "/order",
  },
];

// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>Navbar</div>
//   )
// }

// export default Navbar
