import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/routes/APP_ROUTE";

export default function NotFound() {
  return (
    <Box>
      <Flex h={"100vh"} direction="column" justify="center" align={"center"}>
        <Text fontSize={"4xl"} fontWeight="700">
          404!
        </Text>
        <Text fontSize={"xl"} fontWeight="500" mb="2">
          Page not found
        </Text>
        <Link to={LOGIN_PAGE}>
          <Button>Go Back</Button>
        </Link>
      </Flex>
    </Box>
  );
}
