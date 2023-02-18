import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  Input,
  useToast,
  VStack,
  Image,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/avatar.webp";
import { LEADS_PAGE, LOGIN_PAGE } from "../../utils/routes/APP_ROUTE";
import { ChevronDownIcon, HamburgerIcon, Search2Icon, UnlockIcon } from "@chakra-ui/icons";
import { GET_USER_INFO, REMOVE_TOKEN } from "../../utils/sessions/token";
import { BASE_URL } from "../../utils/routes/URLs";
import Loader from "../loader/Loader";

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} minH="80vh" p="2">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  //   let user = USER_INFO();
  return (
    <Box
      transition="1s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY="scroll"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt="logo" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box px="4">
        <Link to={LEADS_PAGE}>
          <NavItem key={"1"} icon={Search2Icon}>
            LEADS
          </NavItem>
        </Link>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Text href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        px="4"
        py="2"
        borderRadius="4"
        role="group"
        cursor="pointer"
        fontWeight="500"
        color="gray.600"
        transition="100ms"
        _hover={{
          bg: "blue.50",
          color: "blue.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "blue.400",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Text>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  let user = GET_USER_INFO();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    REMOVE_TOKEN();
    navigate(LOGIN_PAGE);
    setLoading(false);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="60px"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "end" }}
      {...rest}
    >
      {loading && <Loader />}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Box display={{ base: "none", md: "none" }}>
        <Image src={logo} alt="logo" />
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton p={2} transition="all 0.3s" _focus={{ boxShadow: "none" }} _hover={{ bg: "gray.50", borderRadius: "6" }}>
              <HStack>
                <Avatar size={"sm"} src={user?.image ? BASE_URL + "/" + user?.image : avatar} />
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm" color="gray.600" fontWeight={"500"}>
                    {user?.name}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <ChevronDownIcon />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")} px="2">
              <Button
                mt="2"
                width={"100%"}
                colorScheme="red"
                onClick={() => {
                  handleLogout();
                }}
                leftIcon={<UnlockIcon />}
              >
                Sign out
              </Button>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
