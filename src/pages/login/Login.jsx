import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN } from "../../utils/axios/axiosConfig";
import { LEADS_PAGE } from "../../utils/routes/APP_ROUTE";
import { LOGIN_API } from "../../utils/routes/URLs";
import SET_TOKEN, { GET_TOKEN, SET_USER_INFO } from "../../utils/sessions/token";

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let res = await LOGIN.post(LOGIN_API, { email, password });
      if (res?.data?.code === 200) {
        let user = res?.data?.data?.user;
        SET_TOKEN(res?.data?.data?.token);
        SET_USER_INFO(JSON.stringify(user));
        navigate("/leads", { replace: true });
      } else {
        setErr("Error! Please try again later");
      }
    } catch (err) {
      if (err?.response?.data?.code === 404) {
        setErr(err?.response?.data?.message);
      }
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (GET_TOKEN()) {
    return <Navigate to={LEADS_PAGE} />;
  }
  return (
    <Box>
      <Flex bg={"gray.200"} minHeight={"100vh"} justify="center" align={"center"}>
        <Card width={"350px"}>
          <CardHeader>
            <Heading size="lg" mb="0">
              Login
            </Heading>
          </CardHeader>
          <CardBody>
            {err && (
              <Box bg="red.50" mb="2" p="2" rounded="lg">
                <Text size="sm" color="red.400" fontWeight={500}>
                  {err}
                </Text>
              </Box>
            )}
            <form onSubmit={submit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" w="100%" isLoading={loading} isDisabled={loading}>
                  Login
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
